import { DomainEvent } from './DomainEvent';
import { AllThen, Consume, Once, SomeThen } from './EventCombiner.type';
import { EventHandler } from './EventHandler';

/** ### Combines multiple events to let subscribers listen to any combination of the events
 *
 * There are 8 different combinations that can be achieved by the following chaining of the EventCombiners methods.
 *
 * | method                      | first call on  | subsequent calls on    | provided payloads of                 |
 * |:----------------------------|:---------------|:-----------------------|:-------------------------------------|
 * | `.all()`                    | all events     | every event            | every events last received           |
 * | `.once().all()`             | all events     | never again            | every events last received           |
 * | `.once().all().first()`     | all events     | never again            | every events first received          |
 * | `.consume().all()`          | all events     | again all events       | every events freshly received        |
 * | `.consume().all().first()`  | all events     | again all events       | every events first freshly received  |
 * | `.some()`                   | any event      | every event            | every events last (received or not)  |
 * | `.once().some()`            | any event      | never again            | only the first received              |
 * | `.consume().some()`         | any event      | every event            | only the last received               |
 * |_____________________________|________________|________________________|______________________________________|
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
 * new EventCombiner('OnceAllFirst').once().all(A, B).first().then(...);
 * new EventCombiner('OnceSome').once().some(A, B).then(...);
 * new EventCombiner('ConsumeAll').consume().all(A, B).then(...);
 * new EventCombiner('ConsumeAllFirst').consume().all(A, B).first().then(...);
 * new EventCombiner('ConsumeSome').consume().some(A, B).then(...);
 *
 * A.dispatch('foo'); // (Consume)Some  +  OnceSome
 * A.dispatch('bar'); // (Consume)Some
 * B.dispatch(420);   // (Consume)Some  +  All
 *                    // + OnceAll[420, bar]  +  OnceAllFirst[420, foo]
 *                    // + ConsumeAll[420, bar]  +  ConsumeAllFirst[420, foo]
 * B.dispatch(69);    // (Consume)Some  +  All
 * B.dispatch(41);    // (Consume)Some  +  All
 * A.dispatch('baz'); // (Consume)Some  +  All  +  ConsumeAll[41, baz] + ConsumeAllFirst[69, baz]
 *
 * @description
 * #### Detailed overview
 *
 * Consider having `new EventCombiner('myCombiner')` as a prefix for the following method chains:
 *
 * ##### `.all(HANDLERS).then(CALLBACK)`
 * - Calls the given CALLBACK once **all** of the given HANDLERS have dispatched.
 * - After that, every time one of the HANDLERS dispatches, the CALLBACK is called again.
 * - *use this if you want to react to multiple events, that all* **must** *be dispatched once*
 *
 * ##### `.some(HANDLERS).then(CALLBACK)`
 * - Calls the given CALLBACK once **one** of the given HANDLERS has dispatched.
 * - After that, every time one of the HANDLERS dispatches, the CALLBACK is called again.
 * - *use this to react to multiple events without any restriction*
 *
 * ##### `.once().all(HANDLERS).then(CALLBACK)`
 * - Calls the given CALLBACK once **all** of the given HANDLERS have dispatched.
 * - After that, the CALLBACK is never called again, when one of the HANDLERS is dispatched.
 * - *use this if you want to react when a whole set of events has dispatched once*
 *
 * ##### `.once().all(HANDLERS).first().then(CALLBACK)`
 * - Calls the given CALLBACK once **all** of the given HANDLERS have dispatched.
 * - After that, the CALLBACK is never called again, when one of the HANDLERS is dispatched.
 * - Different to once.all just the first occurred event for every handler is provided
 * - *use this if you want to react when a whole set of events has dispatched once*
 *
 * ##### `.once().some(HANDLERS).then(CALLBACK)`
 * - Calls the given CALLBACK once **one** of the given HANDLERS has dispatched.
 * - After that, the CALLBACK is never called again, when one of the HANDLERS is dispatched.
 * - *use this if you want to react if a random event dispatches once*
 *
 * ##### `.consume().all(HANDLERS).then(CALLBACK)`
 * - Calls the given CALLBACK once **all** of the given HANDLERS have dispatched.
 * - After that **all** of the given HANDLERS have to be dispatched once **again** for another CALLBACK call.
 * - *Use this if you want to react to a synchronously repeated occurrence of a whole set of events*
 *
 * ##### `.consume().all(HANDLERS)first().then(CALLBACK)`
 * - Calls the given CALLBACK once **all** of the given HANDLERS have dispatched.
 * - After that **all** of the given HANDLERS have to be dispatched once **again** for another CALLBACK call.
 * - Different to consume.all just the first occurred event for every handler is provided
 * - *Use this if you want to react to a synchronously repeated occurrence of a whole set of events*
 *
 * ##### `.consume().some(HANDLERS).then(CALLBACK)`
 * - Calls the given CALLBACK once **one** of the given HANDLERS has dispatched.
 * - After that, every time one of the HANDLERS dispatches, the CALLBACK is called again.
 * - *use this to react to multiple events with the restriction, that only the last occurred event
 *   has a payload in the CALLBACK*
 *
 * #### `consume()` behavior
 * "consume" can be understood as a consumption of the dispatched events when the callback is called, so
 * `consume()` resets the received events. This means that the payloads provided in the CALLBACK will
 * only be the ones that have been delivered since the last call of the CALLBACK. Therefore `all()`
 * will have all "*fresh*" payloads and `some()` will have only one (the last) payload.
 *
 * Without `consume()` the CALLBACKS will always receive the respectively last payload that has been
 * delivered for every corresponding event - even if the event has dispatched in a previous iteration
 * of the CALLBACK.
 *
 * #### HANDLERS
 * HANDLERS is a list of `EventHandler`s that one would normally subscribe separately to.
 *
 * #### CALLBACK
 * The CALLBACK is a function that provides the dispatched `DomainEvent`s from the given HANDLERS as an array. The order of the DomainEvents
 * in the array correlates to the order of the given HANDLERS from the `all(HANDLERS)` or `some(HANDLERS)` method.
 * The DomainEvents including their payloads are also correctly typed corresponding to their HANDLERS.
 *
 * ##### ATTENTION:
 * Since `some()` means that not all of the HANDLERS have to dispatch, not all of the provided
 * DomainEvents may exist. Therefore the type is `DomainEvent<any> | 'pending'`, where 'pending' means,
 * that the EVENT has not yet been dispatched. This has to be catched when working with the `.some(HANDLERS)` payloads.
 */
export class EventCombiner {
  protected _name: string;
  protected _eventHandlers: EventHandler<any>[] = [];
  protected _receivedEvents: Map<string, DomainEvent<any> | 'pending'> = new Map();
  protected _destroyed = false;
  private _all: boolean = false;
  private _once: boolean = false;
  private _consume: boolean = false;
  private _first: boolean = false;

  // CONSTRUCTION + SUBSCRIPTION ___________________________________________________________________

  constructor(name: string) {
    this._name = name;
  }

  /** 💬 unsubscribes from all listened {@link EventHandler}s and marks this combiner as destroyed.
   *
   * Further chains that end with `.then(...)` will not subscribe to the given handlers and thus
   * no listening will happen, but the extendable `onLog()` method will be called with
   * `type = 'alreadyDestroyed'`
   */
  destroy(): void {
    this.unsubscribeEventHandlers();
    this._destroyed = true;
  }

  private unsubscribeEventHandlers(): void {
    this._eventHandlers.forEach((handler) => handler.unsubscribe(this._name));
    this.onLog('destroy');
  }

  // MODIFIERS _____________________________________________________________________________________

  /** 💬 `Just the first time ...`
   *
   * (and never again)
   * @chains {@link all} & {@link some}
   */
  once = (): Once => {
    this._once = true;

    // @ts-ignore STATIC TYPE CONVERSION
    return { all: this.all, some: this.some };
  };

  /** 💬 `Every time ...`
   *
   * (`consume().all()` means: always every {@link EventHandler} must dispatch again)
   * @chains {@link all} & {@link some}
   */
  consume = (): Consume => {
    this._consume = true;

    // @ts-ignore STATIC TYPE CONVERSION
    return { all: this.all, some: this.some };
  };

  /** 💬 `Always when one of the given handlers dispatches ...`
   *
   * (just one of the given {@link EventHandler} has dispatched a {@link DomainEvent})
   * @chains {@link then}
   */
  some = <Handlers extends EventHandler<any>[]>(...handlers: [...Handlers]): SomeThen<Handlers> => {
    this._eventHandlers = handlers;

    // @ts-ignore STATIC TYPE CONVERSION
    return { then: this.then };
  };

  /** 💬 `When all given handlers dispatch (and then on every event) ...`
   *
   * (every given {@link EventHandler} has dispatched at least one {@link DomainEvent})
   * @chains {@link then}
   */
  all = <Handlers extends EventHandler<any>[]>(...handlers: [...Handlers]): AllThen<Handlers> => {
    this._eventHandlers = handlers;
    this._all = true;

    // @ts-ignore STATIC TYPE CONVERSION
    return { then: this.then, first: this.first };
  };

  private first = <Handlers extends EventHandler<any>[]>(): AllThen<Handlers> => {
    this._first = this._consume || this._once; // otherwise first is not allowed and should not work
    // TS users will not see this method, but JS users can force using this with combiner.all().first().then(...)

    // @ts-ignore STATIC TYPE CONVERSION
    return { then: this.then };
  };

  // THEN __________________________________________________________________________________________

  /** 💬 `... Call the given callback.`
   *
   * A list of all possible {@link DomainEvent}s is passed to the callback,
   * which corresponds to the order of the defined {@link EventHandler}s.
   *
   * ### When this method is chained with a `some(...)` method, the {@link DomainEvent}s may also be `'pending'` for those {@link EventHandler}s which have not dispatched yet.
   */
  private then = (callback: (events: (DomainEvent<any> | 'pending')[]) => void): void => {
    this._destroyed && this.onLog('alreadyDestroyed');
    this._eventHandlers?.forEach((handler) => {
      // set empty events
      this._receivedEvents.set(handler.name, 'pending');
      // set events when dispatched
      handler.subscribe(
        this._name,
        (event) => {
          if (!(this._first && this._receivedEvents.get(handler.name) !== 'pending')) {
            this._receivedEvents.set(handler.name, event);
          }
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

  private resetReceivedEvents(): void {
    [...this._receivedEvents.keys()].forEach((handlerName) => {
      this._receivedEvents.set(handlerName, 'pending');
    });
  }

  /** 💬 Inject Logging (by extending this class)
   *
   *  This method is called when the `.then(...)` callback is called, the combiner is destroyed,
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
  protected onLog(type: 'then' | 'destroy' | 'alreadyDestroyed'): void {
    // extend this class to implement this function in order to inject logging
  }
}
