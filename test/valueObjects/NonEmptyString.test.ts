import { NonEmptyString } from '../../src';
import { testValue } from '../basic/TestResult';

test('create and validate', () => {
  const nes = testValue(NonEmptyString.create('content'));
  expect(nes instanceof NonEmptyString).toBeTruthy();
  expect(nes.value).toStrictEqual('content');

  expect(NonEmptyString.create('').error).toContain(
    'the given value (: string) has to be a string with length > 0!'
  );
});

test('equals', () => {
  const nes = testValue(NonEmptyString.create('content'));
  const nes2 = testValue(NonEmptyString.create('content'));
  expect(nes.equals(nes2)).toBeTruthy();
  expect(nes.equals('content')).toBeTruthy();
});

test('range', () => {
  const strArr = testValue(NonEmptyString.create('foo', { range: ['foo', 'bar'] }));
  expect(strArr.value).toStrictEqual('foo');
  enum num {
    foo,
    bar,
  }
  const regEnum = testValue(NonEmptyString.create('foo', { range: num }));
  expect(regEnum.value).toStrictEqual('foo');
  enum str {
    foo = 'foo',
    bar = 'bar',
  }
  const strEnum = testValue(NonEmptyString.create('bar', { range: str }));
  expect(strEnum.value).toStrictEqual('bar');
  enum het {
    foo = 0,
    bar = 'bar',
  }
  const hetEnum = testValue(NonEmptyString.create('bar', { range: het }));
  expect(hetEnum.value).toStrictEqual('bar');

  expect(NonEmptyString.create('baz', { range: ['foo', 'bar'] }).error).toContain(
    `the given value (baz: string) is not in the range ["foo","bar"]`
  );
});

test('lists', () => {
  const valueObjectList = testValue(NonEmptyString.fromList(['foo', 'bar']));
  expect(valueObjectList.map((vo) => vo.value)).toEqual(['foo', 'bar']);

  const valueList = NonEmptyString.toList(valueObjectList);
  expect(valueList).toEqual(['foo', 'bar']);
});
