import { Result } from '../../src/basic/Result';
import {
  CreationOptions,
  IntervalCreationOptions,
  ListCreationOptions,
  ValueObject,
} from '../../src/valueObjects';
import { TestResult } from '../basic/TestResult';

test('construction', () => {
  const vo = TestVO.create(42);
  expect(vo.value).toBe(42);
  expect(vo.toJSON()).toBe(42);
});

test('listEquals', () => {
  expect(ValueObject.listEquals([], [])).toBeTruthy();

  const list = [TestVO.create(1), TestVO.create(2)];
  const clone = [TestVO.create(1), TestVO.create(2)];
  const differentValueObjects = [TestVO.create(1), OtherTestVO.create(2)];
  const notAllValueObjects = [TestVO.create(1), 4];
  const differentValues = [TestVO.create(1), TestVO.create(3)];

  expect(TestVO.listEquals([], list)).toBeFalsy();
  expect(TestVO.listEquals(list, clone)).toBeTruthy();
  expect(TestVO.listEquals(list, differentValueObjects)).toBeFalsy();
  expect(TestVO.listEquals(list, notAllValueObjects)).toBeFalsy();
  expect(TestVO.listEquals(list, differentValues)).toBeFalsy();
});

test('prefix', () => {
  const prf = TestVO.prefix({});
  const prf2 = TestVO.prefix({ name: 'Test Osterone: ' });
  const prf3 = TestVO.prefix({ name: 'Testy' }, 'McTestenstein');

  expect(prf).toStrictEqual(' > ValueObject: ');
  expect(prf2).toStrictEqual('Test Osterone > ValueObject: ');
  expect(prf3).toStrictEqual('Testy > ValueObject.McTestenstein: ');
});

test('validateInterval', () => {
  expect(TestVO.validateInterval('hello').getValue()).toBe('hello');
  expect(TestVO.validateInterval('hello', { min: 2, max: 5 }).getValue()).toBe('hello');
  expect(TestVO.validateInterval(42, { min: 12, max: 43 }).getValue()).toBe(42);
  expect(TestVO.validateInterval(11, { min: 12, max: 43 }).error).toBe(
    ' > ValueObject: the given number (11) must be in the interval [12, 43]!'
  );
  expect(TestVO.validateInterval(11, { min: 12 }).error).toBe(
    ' > ValueObject: the given number (11) must be in the interval [12, ∞]!'
  );
  expect(TestVO.validateInterval(44, { max: 43 }).error).toBe(
    ' > ValueObject: the given number (44) must be in the interval [-∞, 43]!'
  );
});

test('validateListSize', () => {
  expect(TestVO.validateListSize(undefined).getValue()).toStrictEqual([]);
  expect(TestVO.validateListSize(undefined, { listRequired: true }).error).toContain(
    'required list is undefined'
  );
  expect(TestVO.validateListSize([1, 2]).getValue()).toStrictEqual([1, 2]);
  expect(TestVO.validateListSize([1], { listSize: { fix: 1, max: 2 } }).error).toContain(
    'fixed (1) and a deviating max (2)'
  );
  expect(TestVO.validateListSize([1], { listSize: { fix: 1, min: 2 } }).error).toContain(
    'fixed (1) and a deviating min (2)'
  );
  expect(TestVO.validateListSize([1], { listSize: { fix: 2 } }).error).toContain(
    'must have 2 values, but has 1'
  );
  expect(TestVO.validateListSize([1], { listSize: { min: 2 } }).error).toContain(
    'must have at least 2 values, but has 1'
  );
  expect(TestVO.validateListSize([1, 2], { listSize: { max: 1 } }).error).toContain(
    'must not have more than 1 values, but has 2'
  );
  expect(TestVO.validateListSize([1, 2], { listSize: { fix: 2 } }).getValue()).toStrictEqual([
    1, 2,
  ]);
});

test('createList', () => {
  expect(
    TestVO.createList(undefined, (v) => TestResult.ok(v), { listRequired: true }).error
  ).toContain('required list is undefined');
  expect(
    TestVO.createList([1], (v) => TestResult.fail('error message'), { listRequired: true }).error
  ).toContain('error message');
  expect(
    TestVO.createList([1, 2], (v) => TestResult.ok(v), { listRequired: true }).getValue()
  ).toStrictEqual([1, 2]);
});

// ----------------------- TEST DATA -----------------------

class TestVO extends ValueObject<number> {
  equals(obj: unknown): boolean {
    const value = obj instanceof TestVO ? obj.value : obj;

    return value === this._value;
  }
  static create(num: number) {
    return new TestVO(num);
  }
  static prefix(options: CreationOptions | undefined, addition: string = ''): string {
    return ValueObject.prefix(options, addition);
  }
  static validateInterval<Value = string | number>(
    value: Value,
    options?: IntervalCreationOptions | undefined
  ): TestResult<Value> {
    return super.validateInterval(value, options) as TestResult<Value>;
  }
  static validateListSize<Primitive>(
    list: Primitive[] | undefined,
    options?: (CreationOptions & ListCreationOptions) | undefined
  ): TestResult<Primitive[]> {
    return super.validateListSize(list, options) as TestResult<Primitive[]>;
  }
  static createList<Value, Created>(
    values: Value[] | undefined,
    createCallback: (value: Value) => Result<Created>,
    options?: (CreationOptions & ListCreationOptions) | undefined
  ): TestResult<Created[]> {
    return super.createList(values, createCallback, options) as TestResult<Created[]>;
  }
}

class OtherTestVO extends ValueObject<number> {
  equals(obj: unknown): boolean {
    const value = obj instanceof OtherTestVO ? obj.value : obj;

    return value === this._value;
  }
  static create(num: number) {
    return new OtherTestVO(num);
  }
}
