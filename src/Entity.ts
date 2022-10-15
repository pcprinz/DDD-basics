import { v4 as uuid } from 'uuid';
import { Serializable } from './Serializable';
import { NonEmptyString } from './valueObjects/string/NonEmptyString';

export abstract class Entity extends Serializable {
  private _id: NonEmptyString;

  constructor(id?: string) {
    super();
    const idName = `${this.constructor.name}.id`;
    this._id = NonEmptyString.create(id ?? uuid(), { name: idName });
  }

  public get id() {
    return this._id.value;
  }

  /** Entities are compared based on their referential equality. */
  public equals(object?: Entity): boolean {
    if (object == null) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity.isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }

  public static isEntity(v: any): v is Entity {
    return v instanceof Entity;
  }
}
