import { Integer } from '../../src';
import { testValue } from '../basic/TestResult';

test('create and validate', () => {
  const integer = testValue(Integer.create(12));
  expect(integer instanceof Integer).toBeTruthy();
  expect(integer.value).toStrictEqual(12);

  // @ts-ignore
  expect(Integer.create(false).error).toContain(
    'the given value (false: boolean) must be a number!'
  );
  expect(Integer.create(NaN).error).toContain(
    'the given value (NaN: number) is not a number (NaN)!'
  );
});

test('equals', () => {
  const i1 = testValue(Integer.create(69));
  const i2 = testValue(Integer.create(69));
  expect(i1.equals(i2)).toBeTruthy();
  expect(i1.equals(69)).toBeTruthy();
});

test('round', () => {
  const integer = testValue(Integer.create(12.84, { round: 'floor' }));
  expect(integer.value).toStrictEqual(12);
  const integer2 = testValue(Integer.create(11.34, { round: 'ceil' }));
  expect(integer2.value).toStrictEqual(12);
  const integer3 = testValue(Integer.create(12.34, { round: 'round' }));
  expect(integer3.value).toStrictEqual(12);

  expect(Integer.create(12.34).error).toContain(
    'the given value (12.34) must be an integer but has decimal places!'
  );
  // @ts-ignore
  expect(Integer.create(12.34, { round: 'xyz' }).error).toContain(
    `the given options.round (xyz: string) does not match 'floor' | 'ceil' | 'round' | 'deny'`
  );
});

test('lists', () => {
  const valueObjectList = testValue(Integer.fromList([12, 69]));
  expect(valueObjectList.map((vo) => vo.value)).toEqual([12, 69]);

  const valueList = Integer.toList(valueObjectList);
  expect(valueList).toEqual([12, 69]);
});
