import { v4 as uuid } from 'uuid';
import { Serializable } from './Serializable';
import { NonEmptyString } from './valueObjects/string/NonEmptyString';

/**
 * An Entity with an `id`, which can be serialized to its private attributes. Extends `Serializable`
 */
export abstract class Entity extends Serializable {
  private _id: NonEmptyString;

  /**
   * @param id (optional) identifier. Will be a generated `UUID` if omitted
   */
  constructor(id?: string) {
    super();
    const idName = `${this.constructor.name}.id`;
    this._id = NonEmptyString.create(id ?? uuid(), { name: idName });
  }

  /** The identifier of this Entity is an internal `NonEmptyString` */
  public get id() {
    return this._id.value;
  }

  /** Entities are compared based on their ID. */
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

  /** ensures that the given `value` is an instance of `Entity` */
  public static isEntity(value: unknown): value is Entity {
    return value instanceof Entity;
  }
}
