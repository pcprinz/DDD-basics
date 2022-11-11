import { Result } from '../../src/basic/Result';
import { TestResult } from './TestResult';

// THE TESTS
describe('create', () => {
  test('<TestResult>', () => {
    const tr = TestResult.ok('test').getValue();
    expect(tr).toStrictEqual('test');
  });
  test('create with success', () => {
    const result = Result.ok('test');
    expect(result.isSuccess()).toBeTruthy();
    expect(result.error).toStrictEqual('');
    expect((result as TestResult<string>).getValue()).toStrictEqual('test');
  });

  test('create with failure', () => {
    const result = Result.fail('error message');
    expect(result.isSuccess()).toBeFalsy();
    expect(result.error).toStrictEqual('error message');
    expect(() => (result as TestResult<unknown>).getValue()).toThrow(
      `[Result]: Can't retrieve the value from a failed result.`
    );

    expect(() => Result.fail<string>('')).toThrow(
      '[Result]: A failing result needs to contain an error message'
    );
  });
});

describe('combine', () => {
  test('combine with success', () => {
    const combined = Result.combine({
      myString: Result.ok('str'),
      myNumber: Result.ok(42),
      myBool: Result.ok(false),
    });

    expect(combined instanceof Result).toBeTruthy();
    expect(combined.isSuccess()).toBeTruthy();
    expect((combined as TestResult<any>).getValue()).toStrictEqual({
      myBool: false,
      myNumber: 42,
      myString: 'str',
    });
  });
  test('combine with failure', () => {
    const combined = Result.combine({
      myString: Result.ok('str'),
      myNumber: Result.fail<number>('the number was false'),
      myBool: Result.ok(false),
    });

    expect(combined instanceof Result).toBeTruthy();
    expect(combined.isSuccess()).toBeFalsy();
    expect(combined.error).toStrictEqual('the number was false');
  });
});

describe('chain', () => {
  test('chain with success', () => {
    const validate1 = (value: string) => Result.ok(value);
    const validate2 = (value: string) => Result.ok(value + ', second');
    const validate3 = (value: string) => Result.ok(value + ' and third');
    const chained = validate1('first').chain(
      (v1) => validate2(v1),
      (v2) => validate3(v2)
    );

    expect(chained instanceof Result).toBeTruthy();
    expect(chained.isSuccess()).toBeTruthy();
    expect((chained as TestResult<string>).getValue()).toStrictEqual('first, second and third');
  });
  test('chain with failure', () => {
    const validate1 = (value: string) => Result.ok(value);
    const validate2 = (value: string) => Result.fail<string>('you shall not pass');
    const validate3 = (value: string) => Result.ok(value + ' and third');
    const chained = validate1('first').chain(
      (v1) => validate2(v1),
      (v2) => validate3(v2)
    );

    expect(chained instanceof Result).toBeTruthy();
    expect(chained.isSuccess()).toBeFalsy();
    expect(chained.error).toStrictEqual('you shall not pass');

    const chained2 = validate2('second').chain(
      (v2) => validate1(v2),
      (v1) => validate3(v1)
    );
    expect(chained2.isSuccess()).toBeFalsy();
    expect(chained2.error).toStrictEqual('you shall not pass');
  });
});

test('convert', () => {
  const result = Result.ok(42);
  const converted = result.convertTo((num) => `The number is ${num}`);

  expect(converted instanceof Result).toBeTruthy();
  expect((converted as TestResult<string>).getValue()).toStrictEqual('The number is 42');
});

describe('on...', () => {
  test('onSuccess', () => {
    let value = 'not set';
    let error = 'not occurred';
    Result.ok('test')
      .onSuccess((v) => (value = v))
      .onFail((e) => (error = e));
    expect(value).toStrictEqual('test');
    expect(error).toStrictEqual('not occurred');
  });
  test('onFailure', () => {
    let value = 'not set';
    let error = 'not occurred';
    Result.fail<string>('error message')
      .onFail((e) => (error = e))
      .onSuccess((v) => (value = v));
    expect(value).toStrictEqual('not set');
    expect(error).toStrictEqual('error message');
  });
});
