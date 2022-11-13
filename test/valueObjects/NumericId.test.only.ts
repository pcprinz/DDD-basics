import { NumericId } from '../../src';
import { testValue } from '../basic/TestResult';

test('create and validate', () => {
  const numId = testValue(NumericId.create(12));
  expect(numId instanceof NumericId).toBeTruthy();
  expect(numId.value).toStrictEqual(12);

  // @ts-ignore
  expect(NumericId.create(false).error).toContain(
    'the given value (false: boolean) must be a number!'
  );
  expect(NumericId.create(NaN).error).toContain(
    'the given value (NaN: number) is not a number (NaN)!'
  );
});

test('equals', () => {
  const i1 = testValue(NumericId.create(69));
  const i2 = testValue(NumericId.create(69));
  expect(i1.equals(i2)).toBeTruthy();
  expect(i1.equals(69)).toBeTruthy();
});

test('lists', () => {
  const valueObjectList = testValue(NumericId.fromList([12, 69]));
  expect(valueObjectList.map((vo) => vo.value)).toEqual([12, 69]);

  const valueList = NumericId.toList(valueObjectList);
  expect(valueList).toEqual([12, 69]);
});
