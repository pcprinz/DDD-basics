import { SafeDate } from '../../src';
import {testValue} from '../basic/TestResult';

const expected = '2022-11-11T00:00:00.000Z';

test('create and validate', () => {
  const stringDate = testValue(SafeDate.create('2022-11-11'));
  expect(stringDate.value.toJSON()).toStrictEqual(expected);

  const stringDate2 = testValue(SafeDate.create('11.11.2022'));
  expect(stringDate2.value.toJSON()).toStrictEqual(expected);

  const numberDate = testValue(SafeDate.create(1668124800000));
  expect(numberDate.value.toJSON()).toStrictEqual(expected);

  const dateDate = testValue(SafeDate.create(new Date(1668124800000)));
  expect(dateDate.value.toJSON()).toStrictEqual(expected);

  expect(SafeDate.create('0.8.1.5.').error).toStrictEqual(
    ` > SafeDate: the given (0.8.1.5.: string) is not parsable!`
  );
  //@ts-ignore
  expect(SafeDate.create(true).error).toStrictEqual(
    ` > SafeDate: the given (true: boolean) is whether a Date nor a string | number!`
  );

  expect(SafeDate.now().isSuccess()).toBeTruthy();
  expect(SafeDate.now(2000).isSuccess()).toBeTruthy();
});

test('equals', () => {
  const stringDate = testValue(SafeDate.create('2022-11-11'));
  const stringDate2 = testValue(SafeDate.create('11.11.2022'));
  const stringDate3 = testValue(SafeDate.create('12.11.2022'));

  expect(stringDate.equals(stringDate2)).toBeTruthy();
  expect(stringDate.equals(stringDate3)).toBeFalsy();

  expect(stringDate.equals('10.11.2022')).toBeFalsy();
  expect(stringDate.equals('alwidfhoa')).toBeFalsy();
});

test('intervals', () => {
  const minDate = testValue(SafeDate.create('11.11.2022', { min: '10.11.2022' }));
  expect(minDate.value.toJSON()).toStrictEqual(expected);
  expect(SafeDate.create('11.11.2022', { min: '12.11.2022' }).error).toStrictEqual(
    ' > SafeDate: the given Date (2022-11-11T00:00:00.000Z) must be in the interval [2022-11-12T00:00:00.000Z, *]!'
  );
  expect(SafeDate.create('11.11.2022', { min: '0.8.1.5.' }).error).toContain(
    `.min > SafeDate: the given (0.8.1.5.: string) is not parsable!`
  );

  const maxDate = testValue(SafeDate.create('11.11.2022', { max: '12.11.2022' }));
  expect(maxDate.value.toJSON()).toStrictEqual(expected);
  expect(SafeDate.create('12.11.2022', { max: '11.11.2022' }).error).toStrictEqual(
    ' > SafeDate: the given Date (2022-11-12T00:00:00.000Z) must be in the interval [*, 2022-11-11T00:00:00.000Z]!'
  );
  expect(SafeDate.create('11.11.2022', { max: '0.8.1.5.' }).error).toContain(
    `.max > SafeDate: the given (0.8.1.5.: string) is not parsable!`
  );

  const minMaxDate = testValue(
    SafeDate.create('11.11.2022', { min: '10.11.2022', max: '12.11.2022' })
  );
  expect(minMaxDate.value.toJSON()).toStrictEqual(expected);
});

test('lists', () => {
  const valueObjectList = testValue(SafeDate.fromList(['11.11.2022', '12.11.2022']));
  const jsonVOList = valueObjectList.map((el) => el.toJSON());
  expect(jsonVOList).toEqual(['2022-11-11T00:00:00.000Z', '2022-11-12T00:00:00.000Z']);

  const valueList = SafeDate.toList(valueObjectList);
  const jsonValueList = valueList.map((el) => el.toJSON());
  expect(jsonValueList).toEqual(['2022-11-11T00:00:00.000Z', '2022-11-12T00:00:00.000Z']);
});
