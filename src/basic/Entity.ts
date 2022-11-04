import { v4 as uuid } from 'uuid';
import { Serializable } from './Serializable';
import { NonEmptyString } from '../valueObjects/string/NonEmptyString';

/** ### An abstract Entity with an `id`, which can be serialized to its private attributes
 *
 * @example
 * A common example would be:
 *
 * ```ts
 * class Book extends Entity { // <-- extend Entity
 *   // [recommended] class attributes are private ValueObjects
 *   private _title: NonEmptyString;
 *   private _author: NonEmptyString;
 *
 *   constructor(isbn: string, title: string, author: string) {
 *     super(isbn); // isbn is the entity's identifier
 *     this._title = NonEmptyString.create(title, { name: 'Book.title' });
 *     this._author = NonEmptyString.create(author, { name: 'Book.author' });
 *   }
 *
 *   // ... getter and setter ...
 * }
 * ```
 *
 * With this approach you would have to duplicate the creation of the internal ValueObjects for the classes setters.
 * To avoid this (and to make the code cleaner) its recommended to derivate the ValueObjects to
 * separate functions. This is especially helpful when dealing with heavy options for the ValueObjects,
 * as well as when working with ValueObjects outside of the classes.
 *
 * ```ts
 * const BookTitle = (title: string) => NonEmptyString.create(title, { name: 'Book.title' });
 * const BookAuthor = (author: string) => NonEmptyString.create(author, { name: 'Book.author' });
 *
 * class Book extends Entity {
 *   private _title: NonEmptyString;
 *   private _author: NonEmptyString;
 *
 *   constructor(isbn: string, title: string, author: string) {
 *     super(isbn); // isbn is the entity's identifier
 *     this._title = BookTitle(title);
 *     this._author = BookAuthor(author);
 *   }
 *
 *   get title() {
 *     return this._title.value;
 *   }
 *   set title(title: string) {
 *     this._title = BookTitle(title);
 *   }
 *
 *   // ... author
 * }
 * ```
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

  /** Entities are compared based on their `id`. */
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

export abstract class Entity2<T> {
  protected readonly _id: NonEmptyString;
  protected props: T;

  /**
   * @param id (optional) identifier. Will be a generated `UUID` if omitted
   */
  protected constructor(props: T & { id?: string }) {
    const idName = `${this.constructor.name}.id`;
    this._id = NonEmptyString.create(props.id ?? uuid(), { name: idName });
    this.props = props;
  }

  /** The identifier of this Entity is an internal `NonEmptyString` */
  public get id() {
    return this._id.value;
  }

  /** Entities are compared based on their `id`. */
  public equals(object?: Entity2<T>): boolean {
    if (object == null) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity2.isEntity<T>(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }

  /** ensures that the given `value` is an instance of `Entity` */
  public static isEntity<T>(value: unknown): value is Entity2<T> {
    return value instanceof Entity2<T>;
  }
}
