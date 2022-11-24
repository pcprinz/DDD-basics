import { ComposedValueObject, Identifier, ValueObject } from '../valueObjects';

/** ### An abstract Entity with an `id`, which can be serialized to its private attributes
 * - Entities are usually things that are characterized by something concrete and not by a property.
 * - Entities are not distinguished from each other by the sum of their properties, but by an identifier.
 * - 2 entities can have the same properties, but ultimately differ by having different IDs.
 * - If 2 entities have the same ID, then they are one and the same entity.
 *
 * @example
 * #### Define a class for a book entity:
 * ```ts
 * type BookProps = {
 *   title: BookTitle;
 *   soldBooksAmount: SoldBooksAmount;
 * };
 *
 * class Book extends Entity<BookProps> {
 *   public static create(isbn: string, title: string, amount: number = 0): Result<Book> {
 *     return Result.combine({
 *       id: Identifier.create(isbn, { name: 'Book.isbn [ID]' }),
 *       title: BookTitle.create(title),
 *       soldBooksAmount: SoldBooksAmount.create(amount),
 *     }).convertTo((validProps) => new this(validProps));
 *   }
 *
 *   get title() {
 *     return this.props.title.value;
 *   }
 *
 *   get soldBooksAmount() {
 *     return this.props.soldBooksAmount.value;
 *   }
 *
 *   increaseSoldBooksAmount() {
 *     SoldBooksAmount.create(this.soldBooksAmount + 1)
 *       .onSuccess((newAmout) => (this.props.soldBooksAmount = newAmout))
 *       .onFail((error) => console.log('something strange happened: ' + error));
 *   }
 * }
 *
 * const book = Book.create('978-3-12-732320-7', 'How to create Entities');
 * ```
 *
 * #### Define the `ValueObjects` associated to the book entity:
 *
 * ```ts
 * class BookTitle extends NonEmptyString {
 *   // recommended to access the options
 *   static readonly options: NonEmptyStringOptions = { name: 'Book.title' };
 *
 *   // required for clean creation
 *   public static create(title: string) {
 *     return super.create(title, BookTitle.options);
 *   }
 * }
 *
 * class SoldBooksAmount extends Integer {
 *   public static create(amount: number) {
 *     return super.create(amount, { min: 0, name: 'Book.soldBooksAmount' });
 *   }
 * }
 * ```
 */
export abstract class Entity<T extends EntityPropsType> {
  protected readonly _id: Identifier;
  protected props: T;

  protected constructor(props: T & { id: Identifier }) {
    this._id = props.id;
    this.props = props;
  }

  /** The id of this Entity is an internal `Identifier` */
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

  toJSON(): T & { id: Identifier } {
    return {
      id: this._id,
      ...this.props,
    };
  }
}

/**
 * A `Record` for the properties of an Entity, where:
 * - the key is a `string`
 * - the value is a `ValueObject`
 */
export type EntityPropsType = Record<string, ValueObject<any> | ComposedValueObject>;
