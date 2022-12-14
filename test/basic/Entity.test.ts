import { v4 as uuid } from 'uuid';
import {
  Entity,
  Integer,
  Result,
  NonEmptyString,
  Identifier,
  NonEmptyStringOptions,
} from '../../src';
import { testValue } from './TestResult';

test('create', () => {
  const givenId = '2k90t9fdjh3s';
  const entityWithGivenId = testValue(TestEntity.create(givenId));
  const entityWithoutId = testValue(TestEntity.create());

  const referencedEntity = entityWithoutId;
  const jsonEntity = entityWithGivenId.toJSON();
  const copiedEntity = JSON.parse(JSON.stringify(entityWithGivenId));
  const recreatedEntity = testValue(TestEntity.create(entityWithoutId.id));

  // is entity
  expect(Entity.isEntity(entityWithGivenId)).toBeTruthy();
  expect(Entity.isEntity(entityWithoutId)).toBeTruthy();
  expect(Entity.isEntity(referencedEntity)).toBeTruthy();
  expect(Entity.isEntity(jsonEntity)).toBeFalsy();
  expect(Entity.isEntity(copiedEntity)).toBeFalsy();
  expect(Entity.isEntity(recreatedEntity)).toBeTruthy();
});

test('id', () => {
  const givenId = '2k90t9fdjh3s';
  const entityWithGivenId = testValue(TestEntity.create(givenId));
  const entityWithoutId = testValue(TestEntity.create());

  const referencedEntity = entityWithoutId;
  const recreatedEntity = testValue(TestEntity.create(entityWithoutId.id));

  // test id
  expect(entityWithGivenId.id).toEqual(givenId);
  expect(entityWithoutId.id).not.toEqual(givenId);
  expect(referencedEntity.id).toEqual(entityWithoutId.id);
  expect(referencedEntity.id).not.toEqual(givenId);
  expect(recreatedEntity.id).toEqual(entityWithoutId.id);
  expect(recreatedEntity.id).not.toEqual(givenId);
});

test('equals', () => {
  const givenId = '2k90t9fdjh3s';
  const entityWithGivenId = testValue(TestEntity.create(givenId));
  const entityWithoutId = testValue(TestEntity.create());

  const referencedEntity = entityWithoutId;
  const copiedEntity = JSON.parse(JSON.stringify(entityWithGivenId));
  const recreatedEntity = testValue(TestEntity.create(entityWithoutId.id));

  // equals
  expect(referencedEntity.equals(entityWithoutId)).toBeTruthy();
  expect(referencedEntity.equals(entityWithGivenId)).toBeFalsy();
  expect(copiedEntity.equals).toBeUndefined();
  expect(recreatedEntity.equals(entityWithGivenId)).toBeFalsy();
  expect(recreatedEntity.equals(entityWithoutId)).toBeTruthy();
  // @ts-ignore
  expect(recreatedEntity.equals(null)).toBeFalsy();
  // @ts-ignore
  expect(recreatedEntity.equals(23)).toBeFalsy();
  expect(recreatedEntity.equals(undefined)).toBeFalsy();
});

test('toJSON', () => {
  const specialEntity = testValue(SpecialEntity.create('1234'));
  const jsoned = JSON.parse(JSON.stringify(specialEntity));
  expect(jsoned.id).toStrictEqual('1234');
  expect(jsoned.special).toBeDefined();
  expect(jsoned.special).toStrictEqual(69);
  expect(JSON.stringify(testValue(TestEntity.create('kjdo2')))).toStrictEqual(
    `{"id":"kjdo2","testVal":42}`
  );
});

// ----------------------- TEST DATA -----------------------

class TestEntity extends Entity<{ testVal: Integer }> {
  static create(id?: string) {
    return Result.combine({
      id: NonEmptyString.create(id ?? uuid()),
      testVal: Integer.create(42),
    }).convertTo((validProps) => new this(validProps));
  }
}
class SpecialEntity extends Entity<{ special: Integer }> {
  static create(id: string) {
    return Result.combine({
      id: Identifier.create(id),
      special: Integer.create(69),
    }).convertTo((vp) => new this(vp));
  }
}

// ----------------------- PLAYGROUND -----------------------

class BookTitle extends NonEmptyString {
  // recommended to access the options
  static readonly options: NonEmptyStringOptions = { name: 'Book.title' };

  // required for clean creation
  public static create(title: string) {
    return super.create(title, BookTitle.options);
  }
}

class SoldBooksAmount extends Integer {
  public static create(amount: number) {
    return super.create(amount, { min: 0, name: 'Book.soldBooksAmount' });
  }
}

type BookProps = {
  title: BookTitle;
  soldBooksAmount: SoldBooksAmount;
};

class Book extends Entity<BookProps> {
  public static create(isbn: string, title: string, amount: number = 0): Result<Book> {
    return Result.combine({
      id: Identifier.create(isbn, { name: 'Book.isbn [ID]' }),
      title: BookTitle.create(title),
      soldBooksAmount: SoldBooksAmount.create(amount),
    }).convertTo((validProps) => new this(validProps));
  }

  get title() {
    return this.props.title.value;
  }

  get soldBooksAmount() {
    return this.props.soldBooksAmount.value;
  }

  increaseSoldBooksAmount() {
    SoldBooksAmount.create(this.soldBooksAmount + 1)
      .onSuccess((newAmout) => (this.props.soldBooksAmount = newAmout))
      .onFail((error) => console.log('something strange happened: ' + error));
  }
}

const book = Book.create('978-3-12-732320-7', 'How to create Entities');
