type ErrorType = string | Error;
export class Result<T> {
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;
  public readonly error: Error;
  private _value: T;

  private constructor(isSuccess: boolean, error?: ErrorType, value?: T) {
    if (isSuccess && error) {
      throw new Error(`InvalidOperation: A result cannot be 
          successful and contain an error`);
    }
    if (!isSuccess && !error) {
      throw new Error(`InvalidOperation: A failing result 
          needs to contain an error message`);
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error instanceof Error ? error : new Error(error);
    this._value = value!;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error(`Cant retrieve the value from a failed result.`);
    }

    return this._value;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: ErrorType): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine<
    Input extends Record<string, Result<any>>,
    Output = {
      [K in keyof Input]: Input[K] extends Result<infer X> ? X : never;
    }
  >(input: Input): Result<Output> {
    let result: { [key: string]: any } = {};
    for (let [key, value] of Object.entries(input)) {
      if (value.isFailure) {
        return value;
      }
      result[key] = value.getValue();
    }

    return Result.ok(result as Output);
  }
}
