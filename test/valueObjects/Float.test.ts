import { Float } from '../../src';
import { testValue } from '../basic/TestResult';

test('create and validate', () => {
  const float = testValue(Float.create(1.2));
  expect(float instanceof Float).toBeTruthy();
  expect(float.value).toStrictEqual(1.2);

  // @ts-ignore
  expect(Float.create(false).error).toContain('the given value (false: boolean) must be a number!');
  expect(Float.create(NaN).error).toContain('the given value (NaN: number) is not a number (NaN)!');
});

test('equals', () => {
  const f1 = testValue(Float.create(6.9));
  const f2 = testValue(Float.create(6.9));
  expect(f1.equals(f2)).toBeTruthy();
  expect(f1.equals(6.9)).toBeTruthy();
});

test('lists', () => {
  const valueObjectList = testValue(Float.fromList([1.2, 6.9]));
  expect(valueObjectList.map((vo) => vo.value)).toEqual([1.2, 6.9]);

  const valueList = Float.toList(valueObjectList);
  expect(valueList).toEqual([1.2, 6.9]);
});
