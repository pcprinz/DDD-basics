import { IntegerString } from '../../src';
import { testValue } from '../basic/TestResult';

test('create and validate', () => {
  const intStr = testValue(IntegerString.create(12));
  expect(intStr instanceof IntegerString).toBeTruthy();
  expect(intStr.value).toStrictEqual(12);
  const intString = testValue(IntegerString.create('12'));
  expect(intString.value).toStrictEqual(12);

  // @ts-ignore
  expect(IntegerString.create(false).error).toContain(
    'the given value (false: boolean) must be a number or a string representing a number!'
  );
  expect(IntegerString.create(NaN).error).toContain(
    'the given value (NaN: number) is not a number (NaN)!'
  );
});

test('equals', () => {
  const intStr1 = testValue(IntegerString.create(69));
  const intStr2 = testValue(IntegerString.create(69));
  expect(intStr1.equals(intStr2)).toBeTruthy();
  expect(intStr1.equals(69)).toBeTruthy();
  expect(intStr1.equals('69')).toBeTruthy();
});

test('lists', () => {
  const valueObjectList = testValue(IntegerString.fromList([12, 69]));
  expect(valueObjectList.map((vo) => vo.value)).toEqual([12, 69]);

  const valueList = IntegerString.toList(valueObjectList);
  expect(valueList).toEqual([12, 69]);
});
