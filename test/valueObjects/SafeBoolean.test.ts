import { SafeBoolean } from '../../src';
import { testValue } from '../basic/TestResult';

test('create and validate', () => {
  const boolFalse = testValue(SafeBoolean.create(false));
  expect(boolFalse instanceof SafeBoolean).toBeTruthy();
  expect(boolFalse.value).toBe(false);
  const boolTrue = testValue(SafeBoolean.create(true));
  expect(boolTrue.value).toBe(true);

  const undefinedFalse = testValue(SafeBoolean.create(undefined, { allowUndefinedAs: false }));
  expect(undefinedFalse.value).toBe(false);
  const undefinedTrue = testValue(SafeBoolean.create(undefined, { allowUndefinedAs: true }));
  expect(undefinedTrue.value).toBe(true);
  expect(SafeBoolean.create(undefined).error).toEqual(
    ' > SafeBoolean: the given boolean has to be defined!'
  );

  const stringFalse = testValue(SafeBoolean.create('false'));
  expect(stringFalse.value).toBe(false);
  const stringTrue = testValue(SafeBoolean.create('true'));
  expect(stringTrue.value).toBe(true);
  expect(SafeBoolean.create('12').error).toEqual(
    ' > SafeBoolean: the given value (12: number) has to be a (parsable) boolean!'
  );

  expect(SafeBoolean.create('xyz').error).toEqual(
    ' > SafeBoolean: the given value (xyz: string) can not be parsed to a boolean!'
  );
});

test('lists', () => {
  const boolSBList = testValue(SafeBoolean.fromList([false, true]));
  const boolValueList = SafeBoolean.toList(boolSBList);
  expect(boolValueList[0]).toBe(false);
  expect(boolValueList[1]).toBe(true);

  const undefinedFalseSBList = testValue(
    SafeBoolean.fromList([undefined, false], {
      allowUndefinedAs: false,
    })
  );
  const undefinedFalseValueList = SafeBoolean.toList(undefinedFalseSBList);
  expect(undefinedFalseValueList[0]).toBe(false);
  expect(undefinedFalseValueList[1]).toBe(false);
  const undefinedTrueSBList = testValue(
    SafeBoolean.fromList([false, undefined], {
      allowUndefinedAs: true,
    })
  );
  const undefinedTrueValueList = SafeBoolean.toList(undefinedTrueSBList);
  expect(undefinedTrueValueList[0]).toBe(false);
  expect(undefinedTrueValueList[1]).toBe(true);

  const stringFalseSBList = testValue(SafeBoolean.fromList(['false', false]));
  const stringFalseValueList = SafeBoolean.toList(stringFalseSBList);
  expect(stringFalseValueList[0]).toBe(false);
  expect(stringFalseValueList[1]).toBe(false);
  const stringTrueSBList = testValue(SafeBoolean.fromList([false, 'true']));
  const stringTrueValueList = SafeBoolean.toList(stringTrueSBList);
  expect(stringTrueValueList[0]).toBe(false);
  expect(stringTrueValueList[1]).toBe(true);

  // @ts-ignore
  const emptySBList = testValue(SafeBoolean.fromList(undefined));
  const emptyValueList = SafeBoolean.toList(emptySBList);
  expect(emptyValueList.length).toBe(0);
});

test('equals', () => {
  const sbTrue = testValue(SafeBoolean.create(true));
  const sbTrue2 = testValue(SafeBoolean.create(true));
  const sbFalse = testValue(SafeBoolean.create(false));

  expect(sbTrue.equals(sbTrue2)).toBeTruthy();
  expect(sbTrue.equals(sbFalse)).toBeFalsy();
  expect(sbFalse.equals(false)).toBeTruthy();
  expect(sbFalse.equals(true)).toBeFalsy();
  expect(sbTrue2.equals('true')).toBeTruthy();
  expect(sbTrue2.equals('false')).toBeFalsy();
  // @ts-ignore
  expect(sbFalse.equals(undefined)).toBeTruthy();
});
