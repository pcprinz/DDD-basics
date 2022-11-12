import { Result } from '../../src';

export class TestResult<T> extends Result<T> {
  static ok<U>(value?: U): TestResult<U> {
    return new TestResult<U>(true, undefined, value);
  }
  getValue(): T {
    return super.getValue();
  }
}
export function testValue<T>(result: Result<T>) {
  return (result as TestResult<T>).getValue();
}
