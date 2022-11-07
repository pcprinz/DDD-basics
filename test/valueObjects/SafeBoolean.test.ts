import { SafeBoolean } from './../../src/valueObjects/SafeBoolean';

test('create and validate', () => {
  const boolFalse = SafeBoolean.create(false).getValue();
  expect(boolFalse.value).toBe(false);
  const boolTrue = SafeBoolean.create(true).getValue();
  expect(boolTrue.value).toBe(true);

  const undefinedFalse = SafeBoolean.create(undefined, { allowUndefinedAs: false }).getValue();
  expect(undefinedFalse.value).toBe(false);
  const undefinedTrue = SafeBoolean.create(undefined, { allowUndefinedAs: true }).getValue();
  expect(undefinedTrue.value).toBe(true);
  expect(SafeBoolean.create(undefined).error).toEqual(
    ' > SafeBoolean: the given boolean has to be defined!'
  );

  const stringFalse = SafeBoolean.create('false').getValue();
  expect(stringFalse.value).toBe(false);
  const stringTrue = SafeBoolean.create('true').getValue();
  expect(stringTrue.value).toBe(true);
  expect(SafeBoolean.create('12').error).toEqual(
    ' > SafeBoolean: the given value (12: number) has to be a (parsable) boolean!'
  );
});

test('list creation', () => {
  const boolSBList = SafeBoolean.fromList([false, true]).getValue();
  const boolValueList = SafeBoolean.toList(boolSBList);
  expect(boolValueList[0]).toBe(false);
  expect(boolValueList[1]).toBe(true);

  const undefinedFalseSBList = SafeBoolean.fromList([undefined, false], {
    allowUndefinedAs: false,
  }).getValue();
  const undefinedFalseValueList = SafeBoolean.toList(undefinedFalseSBList);
  expect(undefinedFalseValueList[0]).toBe(false);
  expect(undefinedFalseValueList[1]).toBe(false);
  const undefinedTrueSBList = SafeBoolean.fromList([false, undefined], {
    allowUndefinedAs: true,
  }).getValue();
  const undefinedTrueValueList = SafeBoolean.toList(undefinedTrueSBList);
  expect(undefinedTrueValueList[0]).toBe(false);
  expect(undefinedTrueValueList[1]).toBe(true);

  const stringFalseSBList = SafeBoolean.fromList(['false', false]).getValue();
  const stringFalseValueList = SafeBoolean.toList(stringFalseSBList);
  expect(stringFalseValueList[0]).toBe(false);
  expect(stringFalseValueList[1]).toBe(false);
  const stringTrueSBList = SafeBoolean.fromList([false, 'true']).getValue();
  const stringTrueValueList = SafeBoolean.toList(stringTrueSBList);
  expect(stringTrueValueList[0]).toBe(false);
  expect(stringTrueValueList[1]).toBe(true);

  // @ts-ignore
  const emptySBList = SafeBoolean.fromList(undefined).getValue();
  const emptyValueList = SafeBoolean.toList(emptySBList);
  expect(emptyValueList.length).toBe(0);
});

test('equals', () => {
  const sbTrue = SafeBoolean.create(true).getValue();
  const sbTrue2 = SafeBoolean.create(true).getValue();
  const sbFalse = SafeBoolean.create(false).getValue();

  expect(sbTrue.equals(sbTrue2)).toBeTruthy();
  expect(sbTrue.equals(sbFalse)).toBeFalsy();
  expect(sbFalse.equals(false)).toBeTruthy();
  expect(sbFalse.equals(true)).toBeFalsy();
  expect(sbTrue2.equals('true')).toBeTruthy();
  expect(sbTrue2.equals('false')).toBeFalsy();
  // @ts-ignore
  expect(sbFalse.equals(undefined)).toBeTruthy();
});
