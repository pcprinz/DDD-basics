import { OptionalString } from '../../src';
import { testValue } from '../basic/TestResult';

test('create and validate', () => {
  const os = testValue(OptionalString.create('content'));
  expect(os instanceof OptionalString).toBeTruthy();
  expect(os.value).toStrictEqual('content');

  const os2 = testValue(OptionalString.create(''));
  expect(os2.value).toStrictEqual('');

  const os3 = testValue(OptionalString.create(undefined));
  expect(os3.value).toStrictEqual('');

  // @ts-ignore
  expect(OptionalString.create(false).error).toContain(
    'the given value (false: boolean) has to be a string!'
  );
});

test('equals', () => {
  const os = testValue(OptionalString.create('content'));
  const os2 = testValue(OptionalString.create('content'));
  expect(os.equals(os2)).toBeTruthy();
  expect(os.equals('content')).toBeTruthy();

  const os3 = testValue(OptionalString.create(''));
  expect(os3.equals(undefined)).toBeTruthy();
});

test('regex', () => {
  const regexOs = testValue(OptionalString.create('foo', { regex: /oo/ }));
  expect(regexOs.value).toStrictEqual('foo');

  expect(OptionalString.create('bar', { regex: /oo/ }).error).toContain(
    'the given value (bar: string) does not match the regular expression (/oo/)!'
  );
});

test('lists', () => {
  const valueObjectList = testValue(OptionalString.fromList(['foo', 'bar']));
  expect(valueObjectList.map((vo) => vo.value)).toEqual(['foo', 'bar']);

  const valueList = OptionalString.toList(valueObjectList);
  expect(valueList).toEqual(['foo', 'bar']);
});
