import { v4 as uuid } from 'uuid';
import { Serializable } from '../Serializable';

/** An event passed from an EventHandler to a Subscriber */
export class DomainEvent<Payload> extends Serializable {
  private _id: string = uuid();
  public get id(): string {
    return this._id;
  }

  private _name: string;
  public get name(): string {
    return this._name;
  }

  private _timestamp: Date = new Date();
  public get timestamp(): Date {
    return this._timestamp;
  }

  private _payload: Payload;
  public get payload(): Payload {
    return this._payload;
  }

  constructor(name: string, payload: Payload) {
    super();
    this._name = name;
    this._payload = payload;
  }
}
