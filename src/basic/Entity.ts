import { ValueObject } from '../valueObjects';
import { NonEmptyString } from '../valueObjects/string/NonEmptyString';
import { Serializable } from './Serializable';

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
export abstract class Entity<T extends EntityPropsType> extends Serializable {
  protected readonly _id: NonEmptyString;
  protected props: T;

  protected constructor(props: T & { id: NonEmptyString }) {
    super();
    this._id = props.id;
    this.props = props;
  }

  /** The identifier of this Entity is an internal `NonEmptyString` */
  public get id() {
    return this._id.value;
  }

  /** Entities are compared based on their `id`. */
  public equals(object?: Entity<T>): boolean {
    if (object == null) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity.isEntity<T>(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }

  /** ensures that the given `value` is an instance of `Entity` */
  public static isEntity<T extends EntityPropsType>(value: unknown): value is Entity<T> {
    return value instanceof Entity<T>;
  }

  toJSON(): Record<any, any> {
    return {
      id: this.id,
      ...this.props,
    };
  }
}

type EntityPropsType = Record<string, ValueObject<any>>;
