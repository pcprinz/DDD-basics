import { v4 as uuid } from 'uuid';
import { Serializable } from '../basic';

/** An event passed from an EventHandler to a Subscriber.
 * Usually this will not be created manually but automatically
 * while `dispatch`ing events at the `EventHandler`. 
 * 
 * This event will be provided at `EventHandler.subscribe(event => ...)`.*/
export class DomainEvent<Payload> extends Serializable {
  private _id: string = uuid();
  public get id(): string {
    return this._id;
  }

  private _name: string;
  /** The name of the `EventHandler` which dispatched this event */
  public get name(): string {
    return this._name;
  }

  private _timestamp: Date = new Date();
  /** the `Date` this event was dispatched at the `EventHandler` */
  public get timestamp(): Date {
    return this._timestamp;
  }

  private _payload: Payload;
  /** the payload which was given while dispatching the event */
  public get payload(): Payload {
    return this._payload;
  }

  constructor(name: string, payload: Payload) {
    super();
    this._name = name;
    this._payload = payload;
  }
}
