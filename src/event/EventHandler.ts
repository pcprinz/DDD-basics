import { DomainEvent } from './DomainEvent';

export interface Subscription<Payload> {
  name: string;
  callback: (event: DomainEvent<Payload>) => void;
  suppressLogging?: boolean;
}

/** ### A Handler that allows subscribers (any caller) to subscribe to a specific event
 *
 * All subscribers will be notified if the EventHandler dispatched the event.
 *
 * @example
 * At first the EventHandler has to be created with a **unique** name that subscribes the purpose.
 * - the generic can be of any type / interface
 * - to create a handler which only handles "notification" (without payload) the generic has to be `<void>`
 * - the unique name gets relevant when combining EventHandlers with `EventCombiner`s
 *
 * ```ts
 * const StringEventHandler = new EventHandler<string>('StringEventHandler');
 * ```
 *
 * To receive messages from the handler, a subscription has to be made with a **unique** name.
 * - the name of the subscription is relevant when handling multiple subscribers an referencing when unsubscribing
 * - the `event` which is provided in the callback is a `DomainEvent` with the dispatched payload (typed)
 *
 * ```ts
 * StringEventHandler.subscribe('StringEventLogger', (event) => {
 *   console.log(event.payload);
 * });
 * ```
 *
 * To send messages a dispatch with the correctly typed value has to be made.
 *
 * ```ts
 * StringEventHandler.dispatch('my payload'); // StringEventLogger logs 'my payload'
 * ```
 *
 * When a Subscription is unsubscribed, the callback will no longer be called
 *
 * ```ts
 * StringEventHandler.unsubscribe('StringEventLogger');
 * StringEventHandler.dispatch('another payload'); // StringEventLogger is no longer notified
 * ```
 *
 * @Logging
 * To use the logging functionality the handler has to be extended to activate the following logging methods:
 * - `protected logSubscribe(name: string)` - log when `.subscribe()` is called
 * - `protected logUnsubscribe(name: string)` - log when `.unsubscribe()` is called
 * - `protected logDispatch()` - log when `dispatch()` is called
 * - `protected logDispatchedSubscription(subscription: Subscription<Payload>)` - log when a subscription is notified
 *
 */
export class EventHandler<Payload> {
  protected _name: string;
  protected _subscriptions: Map<string, Subscription<Payload>> = new Map();
  protected _occurred: boolean = false;

  constructor(name: string) {
    this._name = name;
  }

  public get name(): string {
    return this._name;
  }

  /** indicates if a {@link DomainEvent} has at least once been fired */
  public get occurred(): boolean {
    return this._occurred;
  }

  /**
   * @param name of the calling Subscriber
   * @param callback to call if the event has been dispatched
   * @param suppressLogging suppresses the usage of the extendable logging functionality of this handler
   */
  subscribe(
    name: string,
    callback: (event: DomainEvent<Payload>) => void,
    suppressLogging: boolean = false
  ): void {
    this.logSubscribe(name);
    this._subscriptions.set(name, { name, callback, suppressLogging });
  }

  /**
   * @param name of the Subscriber that has to match the name, the subscription was made with
   */
  unsubscribe(name: string): void {
    this.logUnsubscribe(name);
    this._subscriptions.delete(name);
  }

  /**
   * Dispatches a {@link DomainEvent}. Therefore, all Subscribers callbacks are called
   * with the given optional `payload`.
   *
   * @param payload (optional) payload to broadcast to all Subscribers
   */
  dispatch(payload: Payload): void {
    this.logDispatch();
    this._occurred = true;
    const event = new DomainEvent(this._name, payload);
    this._subscriptions.forEach((subscription) => {
      !subscription.suppressLogging && this.logDispatchedSubscription(subscription);
      subscription.callback(event);
    });
  }

  // extendable logging methods
  /** log when `.subscribe()` is called. Provides the `name` of the subscription */
  protected logSubscribe(name: string) {
    // extend this class to implement this function in order to inject logging
  }

  /** log when `.unsubscribe()` is called. Provides the `name` of the subscription */
  protected logUnsubscribe(name: string) {
    // extend this class to implement this function in order to inject logging
  }

  /** log when `dispatch()` is called */
  protected logDispatch() {
    // extend this class to implement this function in order to inject logging
  }

  /** log when a subscription is notified. Provides the subscription itself (all parameters from `subscribe()`) */
  protected logDispatchedSubscription(subscription: Subscription<Payload>) {
    // extend this class to implement this function in order to inject logging
  }
}
