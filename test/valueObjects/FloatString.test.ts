import { FloatString } from '../../src';
import { testValue } from '../basic/TestResult';

test('create and validate', () => {
  const float = testValue(FloatString.create(1.2));
  expect(float instanceof FloatString).toBeTruthy();
  expect(float.value).toStrictEqual(1.2);
  const floatString = testValue(FloatString.create('1.2'));
  expect(floatString.value).toStrictEqual(1.2);

  // @ts-ignore
  expect(FloatString.create(false).error).toContain(
    'the given value (false: boolean) must be a number or a string representing a number!'
  );
  expect(FloatString.create(NaN).error).toContain(
    'the given value (NaN: number) is not a number (NaN)!'
  );
});

test('equals', () => {
  const f1 = testValue(FloatString.create(6.9));
  const f2 = testValue(FloatString.create(6.9));
  expect(f1.equals(f2)).toBeTruthy();
  expect(f1.equals(6.9)).toBeTruthy();
  expect(f1.equals('6.9')).toBeTruthy();
});

test('lists', () => {
  const valueObjectList = testValue(FloatString.fromList([1.2, 6.9]));
  expect(valueObjectList.map((vo) => vo.value)).toEqual([1.2, 6.9]);

  const valueList = FloatString.toList(valueObjectList);
  expect(valueList).toEqual([1.2, 6.9]);
});
