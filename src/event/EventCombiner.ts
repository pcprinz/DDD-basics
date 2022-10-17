import { DomainEvent } from './DomainEvent';
import { EventHandler } from './EventHandler';

/**
 * Combines multiple events to let Subscribers listen to any combination of the events. There are 6
 * different combinations that can be achieved by the following chaining of the EventCombiners methods.
 *
 * | method | first call on | subsequent calls on | provided payloads of |
 * |---|---|---|---|
 * | .all() | all events | every event | every events last received |
 * | .some() | any event | every event | every events last (received or not) |
 * | .once().all() | all events | never again | every events last received |
 * | .once().some() | any event | never again | only the first received |
 * | .consume().all() | all events | again all events | every events freshly received |
 * | .consume().some() | any event | every event | only the last received |
 *
 * ## Detailed overview
 *
 * Consider having `new EventCombiner('myCombiner')` as a prefix for the following method chains:
 *
 * ### `.all(HANDLERS).then(CALLBACK)`
 * - Calls the given CALLBACK once **all** of the given HANDLERS have fired.
 * - After that, every time one of the HANDLERS fires, the CALLBACK is called again.
 * - *use this if you want to react to multiple events, that all* **must** *be fired once*
 *
 * ### `.some(HANDLERS).then(CALLBACK)`
 * - Calls the given CALLBACK once **one** of the given HANDLERS has fired.
 * - After that, every time one of the HANDLERS fires, the CALLBACK is called again.
 * - *use this to react to multiple events without any restriction*
 *
 * ### `.once().all(HANDLERS).then(CALLBACK)`
 * - Calls the given CALLBACK once **all** of the given HANDLERS have fired.
 * - After that, the CALLBACK is never called again, when one of the HANDLERS is fired.
 * - *use this if you want to react when a whole set of events has fired once*
 *
 * ### `.once().some(HANDLERS).then(CALLBACK)`
 * - Calls the given CALLBACK once **one** of the given HANDLERS has fired.
 * - After that, the CALLBACK is never called again, when one of the HANDLERS is fired.
 * - *use this if you want to react if a random event fires once*
 *
 * ### `.consume().all(HANDLERS).then(CALLBACK)`
 * - Calls the given CALLBACK once **all** of the given HANDLERS have fired.
 * - After that **all** of the given HANDLERS have to be fired once **again** for another CALLBACK call.
 * - *Use this if you want to react to a synchronously repeated occurrence of a whole set of events*
 *
 * ### `.consume().some(HANDLERS).then(CALLBACK)`
 * - Calls the given CALLBACK once **one** of the given HANDLERS has fired.
 * - After that, every time one of the HANDLERS fires, the CALLBACK is called again.
 * - *use this to react to multiple events with the restriction, that only the last occurred event
 *   has a payload in the CALLBACK*
 *
 * ## `consume()` behavior
 * "consume" can be understood as a consumption of the fired events when the callback is called, so
 * `consume()` resets the received events. This means that the payloads provided in the CALLBACK will
 * only be the ones that have been delivered since the last call of the CALLBACK. Therefore `all()`
 * will have all "*fresh*" payloads and `some()` will have only one (the last) payload.
 *
 * Without `consume()` the CALLBACKS will always receive the respectively last payload that has been
 * delivered for every corresponding event - even if the event has fired in a previous iteration
 * of the CALLBACK.
 *
 * ## HANDLERS
 * HANDLERS is a list of `EventHandler`s that one would normally subscribe separately to.
 *
 * ## CALLBACK
 * The CALLBACK is a function that provides the fired `DomainEvent`s from the given HANDLERS as an array. The order of the DomainEvents
 * in the array correlates to the order of the given HANDLERS from the `all(HANDLERS)` or `some(HANDLERS)` method.
 * The DomainEvents including their payloads are also correctly typed corresponding to their HANDLERS.
 *
 * ### ATTENTION:
 * Since `some()` means that not all of the HANDLERS have to fire, not all of the provided
 * DomainEvents may exist. Therefore the type is `DomainEvent<any> | 'pending'`, where 'pending' means,
 * that the EVENT has not yet been fired. This has to be catched when working with the `.some(HANDLERS)` payloads.
 */
export class EventCombiner {
  protected _name: string;
  protected _eventHandlers: EventHandler<any>[] = [];
  protected _receivedEvents: Map<string, DomainEvent<any> | 'pending'> = new Map();

  constructor(name: string) {
    this._name = name;
  }

  private _all: Partial<boolean> = true;
  /** When all given events occur ... */
  all = <EH extends EventHandler<any>[]>(...eventHandler: [...EH]): AllThenType<EH> => {
    this._eventHandlers = eventHandler;

    // @ts-ignore
    return { then: this.then };
  };

  /** When one of the given events occurs ... */
  some = <EH extends EventHandler<any>[]>(...eventHandler: [...EH]): SomeThenType<EH> => {
    this._eventHandlers = eventHandler;
    this._all = false;

    // @ts-ignore
    return { then: this.then };
  };

  private _once: boolean = false;
  /** Just the first time ... */
  once = () => {
    this._once = true;

    return { all: this.all, some: this.some };
  };

  private _consume: boolean = false;
  /** Every time ... */
  consume = () => {
    this._consume = true;

    return { all: this.all, some: this.some };
  };

  private then = (callback: (events: (DomainEvent<any> | 'pending')[]) => void) => {
    this._eventHandlers?.forEach((handler) => {
      // set empty events
      this._receivedEvents.set(handler.name, 'pending');
      // set events when dispatched
      handler.subscribe(
        this._name,
        (event) => {
          this._receivedEvents.set(handler.name, event);
          if (this.thenIsFulfilled(this._all)) {
            this.logDispatch();
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

  protected logDispatch() {
    // extend this class to implement this function in order to inject logging
  }

  private thenIsFulfilled(all: boolean): boolean {
    for (const event of this._receivedEvents.values()) {
      if (all && event === 'pending') {
        return false;
      }
      if (!all && event !== 'pending') {
        return true;
      }
    }

    return all; // ===   all & no event pending   ||  !all (some) & every event pending
  }

  private unsubscribeEventHandlers(): void {
    this._eventHandlers.forEach((handler) => handler.unsubscribe(this._name));
  }

  private resetReceivedEvents(): void {
    [...this._receivedEvents.keys()].forEach((handlerName) => {
      this._receivedEvents.set(handlerName, 'pending');
    });
  }
}

export type AllThenType<EH> = {
  /**
   * ... Call the given callback.
   *
   * A list of all possible `DomainEvent`s is passed to the callback,
   * which corresponds to the order of the defined `EventHandler`.
   */
  then: (
    callback: (events: {
      [K in keyof EH]: EH[K] extends EventHandler<infer X> ? DomainEvent<X> : never;
    }) => void
  ) => void;
};

export type SomeThenType<EH> = {
  /**
   * ... Call the given callback.
   *
   * A list of all possible `DomainEvent`s is passed to the callback,
   * which corresponds to the order of the defined `EventHandler`.
   *
   * Since this method is chained with a `some(...)` method, the `DomainEvent`s may also be `'pending'`
   * for those `EventHandler`s which have not fired yet.
   */
  then: (
    callback: (events: {
      [K in keyof EH]: EH[K] extends EventHandler<infer X> ? DomainEvent<X> | 'pending' : never;
    }) => void
  ) => void;
};
