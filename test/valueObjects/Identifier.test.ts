import { Identifier } from '../../src';
import { testValue } from '../basic/TestResult';

test('create and validate', () => {
  const id = testValue(Identifier.create('abc1234'));
  expect(id instanceof Identifier).toBeTruthy();
  expect(id.value).toStrictEqual('abc1234');
  const id2 = testValue(Identifier.create(undefined));
  expect(id2.value).toBeDefined();
  expect(id2.value.length).toBeGreaterThan(10);

  expect(Identifier.create('').error).toContain(
    'the given value (: string) has to be a string with length > 0!'
  );
});

test('lists', () => {
  const valueObjectList = testValue(Identifier.fromList(['foo', 'bar']));
  expect(valueObjectList.map((vo) => vo.value)).toEqual(['foo', 'bar']);

  const valueList = Identifier.toList(valueObjectList);
  expect(valueList).toEqual(['foo', 'bar']);
});
