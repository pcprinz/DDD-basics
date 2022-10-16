import { DomainEvent } from './DomainEvent';

export interface Subscription<Payload> {
  name: string;
  callback: (event: DomainEvent<Payload>) => void;
  suppressLogging?: boolean;
}

/** A Handler that allows Subscribers (any caller) to subscribe to a specific event.
 * All Subscribers will be notified if the event dispatcher dispatched the event
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

  /** indicates if a `DomainEvent` has at least once been fired */
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
   * Dispatches that the handled event has been fired. Therefore, all Subscribers callbacks are called
   * with the given optional payload.
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

  protected logSubscribe(name: string) {
    // extend this class to implement this function in order to inject logging
  }

  protected logUnsubscribe(name: string) {
    // extend this class to implement this function in order to inject logging
  }

  protected logDispatch() {
    // extend this class to implement this function in order to inject logging
  }

  protected logDispatchedSubscription(subscription: Subscription<Payload>) {
    // extend this class to implement this function in order to inject logging
  }
}
