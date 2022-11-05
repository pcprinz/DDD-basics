import {
  Entity,
  Entity2,
  Integer,
  NonEmptyString,
  NonEmptyStringOptions,
  SafeBoolean,
} from '../src';
import { Result } from '../src/basic/Result';

test('Entity', () => {
  const givenId = '2k90t9fdjh3s';
  const entityWithGivenId = new TestEntity(givenId);
  const entityWithoutId = new TestEntity();

  const referencedEntity = entityWithoutId;
  const jsonEntity = entityWithGivenId.toJSON();
  const copiedEntity = JSON.parse(JSON.stringify(entityWithGivenId));
  const recreatedEntity = new TestEntity(entityWithoutId.id);

  // is entity
  expect(Entity.isEntity(entityWithGivenId)).toBeTruthy();
  expect(Entity.isEntity(entityWithoutId)).toBeTruthy();
  expect(Entity.isEntity(referencedEntity)).toBeTruthy();
  expect(Entity.isEntity(jsonEntity)).toBeFalsy();
  expect(Entity.isEntity(copiedEntity)).toBeFalsy();
  expect(Entity.isEntity(recreatedEntity)).toBeTruthy();

  // test id
  expect(entityWithGivenId.id).toEqual(givenId);
  expect(entityWithoutId.id).not.toEqual(givenId);
  expect(referencedEntity.id).toEqual(entityWithoutId.id);
  expect(referencedEntity.id).not.toEqual(givenId);
  expect(recreatedEntity.id).toEqual(entityWithoutId.id);
  expect(recreatedEntity.id).not.toEqual(givenId);

  // equals
  expect(referencedEntity.equals(entityWithoutId)).toBeTruthy();
  expect(referencedEntity.equals(entityWithGivenId)).toBeFalsy();
  expect(jsonEntity.equals).toBeUndefined();
  expect(copiedEntity.equals).toBeUndefined();
  expect(recreatedEntity.equals(entityWithGivenId)).toBeFalsy();
  expect(recreatedEntity.equals(entityWithoutId)).toBeTruthy();
  // @ts-ignore
  expect(recreatedEntity.equals(null)).toBeFalsy();
  // @ts-ignore
  expect(recreatedEntity.equals(23)).toBeFalsy();
  expect(recreatedEntity.equals(undefined)).toBeFalsy();
});

test('Serializable', () => {
  const specialEntity = new SpecialEntity('1234');
  const jsoned = JSON.parse(JSON.stringify(specialEntity));
  expect(jsoned.special).toBeUndefined();
  expect(jsoned.underscored).toStrictEqual('abc');
  expect(jsoned.id).toStrictEqual('1234');
});

class TestEntity extends Entity {}
class SpecialEntity extends Entity {
  public special: number = 69;
  private _underscored: string = 'abc';
}

// playground

class BookTitle extends NonEmptyString {
  // recommended to access the options
  static readonly options: NonEmptyStringOptions = { name: 'Book.title' };

  // required for clean creation
  public static create(title: string) {
    return super.create(title, BookTitle.options);
  }

  // optional if separate validation is needed:
  public static validate(value: string): string {
    return super.validate(value, BookTitle.options);
  }
}

class SoldBooksAmount extends Integer {
  public static create(amount: number) {
    return super.create(amount, { min: 0, name: 'Book.soldBooksAmount' });
  }
}

interface BookProps {
  title: BookTitle;
  soldBooksAmount: SoldBooksAmount;
}

class Book extends Entity2<BookProps> {
  public static create(isbn: string, title: string, amount: number = 0) {
    return new this({
      id: isbn,
      title: BookTitle.create(title),
      soldBooksAmount: SoldBooksAmount.create(amount),
    });
  }

  get title() {
    return this.props.title.value;
  }

  get soldBooksAmount() {
    return this.props.soldBooksAmount;
  }

  increaseSoldBooksAmount() {
    this.props.soldBooksAmount = SoldBooksAmount.create(this.soldBooksAmount.value + 1);
  }
}

const b2 = Book.create('2098', 'nseo ij');

const a = Result.combine({
  title: SafeBoolean.create('title'),
  soldBooksAmount: SafeBoolean.create(true),
});

const aV = a.getValue();
