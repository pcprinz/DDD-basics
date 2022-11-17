import { DomainEvent } from './DomainEvent';
import { EventHandler } from './EventHandler';

/** ### Combines multiple events to let subscribers listen to any combination of the events
 *
 * There are 6 different combinations that can be achieved by the following chaining of the EventCombiners methods.
 *
 * | method              | first call on  | subsequent calls on    | provided payloads of                |
 * |:--------------------|:---------------|:-----------------------|:------------------------------------|
 * | `.all()`            | all events     | every event            | every events last received          |
 * | `.some()`           | any event      | every event            | every events last (received or not) |
 * | `.once().all()`     | all events     | never again            | every events last received          |
 * | `.once().some()`    | any event      | never again            | only the first received             |
 * | `.consume().all()`  | all events     | again all events       | every events freshly received       |
 * | `.consume().some()` | any event      | every event            | only the last received              |
 * |_____________________|________________|________________________|_____________________________________|
 *
 * @example
 * const A = new EventHandler<string>('HandlerA');
 * const B = new EventHandler<number>('HandlerB');
 *
 * new EventCombiner('All').all(A, B).then((events) => {
 *   // events has the type [DomainEvent<string>, DomainEvent<number>]
 * });
 * new EventCombiner('Some').some(A, B).then(...);
 * new EventCombiner('OnceAll').once().all(A, B).then(...);
 * new EventCombiner('OnceSome').once().some(A, B).then(...);
 * new EventCombiner('ConsumeAll').consume().all(A, B).then(...);
 * new EventCombiner('ConsumeSome').consume().some(A, B).then(...);
 *
 * A.dispatch('foo'); // (Consume)Some  +  OnceSome
 * A.dispatch('bar'); // (Consume)Some
 * B.dispatch(420);   // (Consume)Some  +  All  +  OnceAll  +  ConsumeAll
 * B.dispatch(69);    // (Consume)Some  +  All
 * B.dispatch(41);    // (Consume)Some  +  All
 * A.dispatch('baz'); // (Consume)Some  +  All  +  ConsumeAll
 *
 * @description
 * #### Detailed overview
 *
 * Consider having `new EventCombiner('myCombiner')` as a prefix for the following method chains:
 *
 * ##### `.all(HANDLERS).then(CALLBACK)`
 * - Calls the given CALLBACK once **all** of the given HANDLERS have fired.
 * - After that, every time one of the HANDLERS fires, the CALLBACK is called again.
 * - *use this if you want to react to multiple events, that all* **must** *be fired once*
 *
 * ##### `.some(HANDLERS).then(CALLBACK)`
 * - Calls the given CALLBACK once **one** of the given HANDLERS has fired.
 * - After that, every time one of the HANDLERS fires, the CALLBACK is called again.
 * - *use this to react to multiple events without any restriction*
 *
 * ##### `.once().all(HANDLERS).then(CALLBACK)`
 * - Calls the given CALLBACK once **all** of the given HANDLERS have fired.
 * - After that, the CALLBACK is never called again, when one of the HANDLERS is fired.
 * - *use this if you want to react when a whole set of events has fired once*
 *
 * ##### `.once().some(HANDLERS).then(CALLBACK)`
 * - Calls the given CALLBACK once **one** of the given HANDLERS has fired.
 * - After that, the CALLBACK is never called again, when one of the HANDLERS is fired.
 * - *use this if you want to react if a random event fires once*
 *
 * ##### `.consume().all(HANDLERS).then(CALLBACK)`
 * - Calls the given CALLBACK once **all** of the given HANDLERS have fired.
 * - After that **all** of the given HANDLERS have to be fired once **again** for another CALLBACK call.
 * - *Use this if you want to react to a synchronously repeated occurrence of a whole set of events*
 *
 * ##### `.consume().some(HANDLERS).then(CALLBACK)`
 * - Calls the given CALLBACK once **one** of the given HANDLERS has fired.
 * - After that, every time one of the HANDLERS fires, the CALLBACK is called again.
 * - *use this to react to multiple events with the restriction, that only the last occurred event
 *   has a payload in the CALLBACK*
 *
 * #### `consume()` behavior
 * "consume" can be understood as a consumption of the fired events when the callback is called, so
 * `consume()` resets the received events. This means that the payloads provided in the CALLBACK will
 * only be the ones that have been delivered since the last call of the CALLBACK. Therefore `all()`
 * will have all "*fresh*" payloads and `some()` will have only one (the last) payload.
 *
 * Without `consume()` the CALLBACKS will always receive the respectively last payload that has been
 * delivered for every corresponding event - even if the event has fired in a previous iteration
 * of the CALLBACK.
 *
 * #### HANDLERS
 * HANDLERS is a list of `EventHandler`s that one would normally subscribe separately to.
 *
 * #### CALLBACK
 * The CALLBACK is a function that provides the fired `DomainEvent`s from the given HANDLERS as an array. The order of the DomainEvents
 * in the array correlates to the order of the given HANDLERS from the `all(HANDLERS)` or `some(HANDLERS)` method.
 * The DomainEvents including their payloads are also correctly typed corresponding to their HANDLERS.
 *
 * ##### ATTENTION:
 * Since `some()` means that not all of the HANDLERS have to fire, not all of the provided
 * DomainEvents may exist. Therefore the type is `DomainEvent<any> | 'pending'`, where 'pending' means,
 * that the EVENT has not yet been fired. This has to be catched when working with the `.some(HANDLERS)` payloads.
 */
export class EventCombiner {
  protected _name: string;
  protected _eventHandlers: EventHandler<any>[] = [];
  protected _receivedEvents: Map<string, DomainEvent<any> | 'pending'> = new Map();
  protected _destroyed = false;
  private _all: boolean = false;
  private _once: boolean = false;
  private _consume: boolean = false;

  constructor(name: string) {
    this._name = name;
  }

  /**
   * unsubscribes from all listened {@link EventHandler}s and marks this combiner as destroyed.
   * Further chains that end with `.then(...)` will not subscribe to the given handlers and thus
   * no listening will happen, but the extendable `onLog()` method will be called with
   * `type = 'alreadyDestroyed'`
   */
  public destroy() {
    this.unsubscribeEventHandlers();
    this._destroyed = true;
  }

  /**
   * ### When all given events occur ...
   * (every given {@link EventHandler} has dispatched at least one {@link DomainEvent})
   */
  all = <EH extends EventHandler<any>[]>(...eventHandler: [...EH]): AllThenType<EH> => {
    this._eventHandlers = eventHandler;
    this._all = true;

    // @ts-ignore
    return { then: this.then };
  };

  /** ### When one of the given events occurs ...
   * (just one of the given {@link EventHandler} has dispatched a {@link DomainEvent})
   */
  some = <EH extends EventHandler<any>[]>(...eventHandler: [...EH]): SomeThenType<EH> => {
    this._eventHandlers = eventHandler;

    // @ts-ignore
    return { then: this.then };
  };

  /** ### Just the first time ...
   * (and never again)
   */
  once = () => {
    this._once = true;

    return { all: this.all, some: this.some };
  };

  /** ### Every time ...
   * (`all.consume` means: always every {@link EventHandler} again)
   */
  consume = () => {
    this._consume = true;

    return { all: this.all, some: this.some };
  };

  private then = (callback: (events: (DomainEvent<any> | 'pending')[]) => void) => {
    this._destroyed && this.onLog('alreadyDestroyed');
    this._eventHandlers?.forEach((handler) => {
      // set empty events
      this._receivedEvents.set(handler.name, 'pending');
      // set events when dispatched
      handler.subscribe(
        this._name,
        (event) => {
          this._receivedEvents.set(handler.name, event);
          if (this.thenIsFulfilled()) {
            this.onLog('then');
            const events = [...this._receivedEvents.values()];
            callback(events);
            if (this._once) {
              this.unsubscribeEventHandlers();
            }
            if (this._consume) {
              this.resetReceivedEvents();
            }
          }
        },
        true
      );
    });
  };

  /** This method is called when the `.then(...)` callback is called, the combiner is destroyed,
   * or the callback is called, when already destroyed. The original method will do nothing.
   * To utilize this method (eg. for a Logger integration) this class must be extended:
   *
   * @example
   * class MyEventCombiner extends EventCombiner {
   *   protected onLog(type: 'then' | 'destroy' | 'alreadyDestroyed'): void {
   *     console.log(type, this._name, this._receivedEvents, this._eventHandlers);
   *   }
   * }
   */
  protected onLog(type: 'then' | 'destroy' | 'alreadyDestroyed') {
    // extend this class to implement this function in order to inject logging
  }

  private thenIsFulfilled(): boolean {
    for (const event of this._receivedEvents.values()) {
      if (this._all && event === 'pending') {
        return false;
      }
      if (!this._all && event !== 'pending') {
        return true;
      }
    }

    return this._all; // ===   all & no event pending   ||  !all (some) & every event pending
  }

  private unsubscribeEventHandlers(): void {
    this._eventHandlers.forEach((handler) => handler.unsubscribe(this._name));
    this.onLog('destroy');
  }

  private resetReceivedEvents(): void {
    [...this._receivedEvents.keys()].forEach((handlerName) => {
      this._receivedEvents.set(handlerName, 'pending');
    });
  }
}

export type AllThenType<Handler> = {
  /** ### ... Call the given callback.
   *
   * A list of all possible {@link DomainEvent}s is passed to the callback,
   * which corresponds to the order of the defined {@link EventHandler}s.
   */
  then: (
    callback: (events: {
      [K in keyof Handler]: Handler[K] extends EventHandler<infer X> ? DomainEvent<X> : never;
    }) => void
  ) => void;
};

export type SomeThenType<EH> = {
  /** ### ... Call the given callback.
   *
   * A list of all possible {@link DomainEvent}s is passed to the callback,
   * which corresponds to the order of the defined {@link EventHandler}s.
   *
   * ### Since this method is chained with a `some(...)` method, the {@link DomainEvent}s may also be `'pending'` for those {@link EventHandler}s which have not fired yet.
   */
  then: (
    callback: (events: {
      [K in keyof EH]: EH[K] extends EventHandler<infer X> ? DomainEvent<X> | 'pending' : never;
    }) => void
  ) => void;
};
