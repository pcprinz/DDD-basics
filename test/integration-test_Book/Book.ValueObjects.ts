import { CompondValueObject, Integer, NonEmptyString, Result } from '../../src';

export class Author extends CompondValueObject {
  constructor(readonly firstName: NonEmptyString, readonly lastName: NonEmptyString) {
    super();
  }

  public static create(firstName: string, lastName: string) {
    return Result.combine({
      firstName: NonEmptyString.create(firstName, { name: 'Book.author.firstName' }),
      lastName: NonEmptyString.create(lastName, { name: 'Book.author.lastName' }),
    }).convertTo((valid) => new this(valid.firstName, valid.lastName));
  }
}

export class BookTitle extends NonEmptyString {
  public static create(title: string) {
    return super.create(title, { name: 'Book.title' });
  }
}

export class SoldBooksAmount extends Integer {
  public static create(amount: number) {
    return super.create(amount, { min: 0, name: 'Book.soldBooksAmount' });
  }
}

enum Genre {
  ROMANCE,
  FANTASY,
  BIOGRAPHY,
}

export class BookGenre extends NonEmptyString {
  public static create(value: string) {
    return super.create(value, { min: 0, name: 'Book.genre', range: Genre });
  }
}

// ____________________

const auth = Author.create('a', 'b');
if (auth.isSuccess()) {
  // const bbb: {[key: string|number|symbol]: ValueObject<any>} = auth.getValue();
}

const b = BookTitle.fromList([]);
