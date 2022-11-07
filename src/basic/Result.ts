/** ### The Result of a validation, either successful or failed.
 * - `isSuccess` => has a value (`getValue()`)
 * - `isFailure` => has an `error`(string) and `throws Error` when `getValue()`is called
 */
export class Result<T> {
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;
  public readonly error: string;
  private _value: T;

  private constructor(isSuccess: boolean, error?: string, value?: T) {
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
    this.error = error ?? '';
    this._value = value!;

    Object.freeze(this);
  }

  /**
   * @returns the `value` provided in `Result.ok(value)`
   * @throws **an `Error` if called on a failed Result!**
   */
  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error(`Cant retrieve the value from a failed result.`);
    }

    return this._value;
  }

  /**
   * @param value of the successful validation
   * @returns a successful `Result`
   */
  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  /**
   * @param error reason why the validation failed
   * @returns a failed `Result`
   */
  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }

  /**
   * Combines multiple `Result`s in a map, checks every result and:
   * - **success:** returns a single `Result` with a `Record` of all results values
   * - **failure:** returns a single `Result` wit the error of the first failed result
   * @param map a `Record` of multiple `Result`s
   * @returns a combined Result of the map
   * @example
   * // .create returns Results:
   * const book = Result.combine({
   *   title: BookTitle.create('MyBook'),
   *   author: Author.create('My Self'),
   * })
   *
   * book.getValue() // === {title: 'MyBook', author: 'My Self'}
   */
  public static combine<
    ResultMap extends Record<string, Result<any>>,
    Output = {
      [K in keyof ResultMap]: ResultMap[K] extends Result<infer X> ? X : never;
    }
  >(map: ResultMap): Result<Output> {
    let result: { [key: string]: any } = {};
    for (let [key, value] of Object.entries(map)) {
      if (value.isFailure) {
        return value;
      }
      result[key] = value.getValue();
    }

    return Result.ok(result as Output);
  }

  /**
   * Chains multiple callbacks (which return `Results`) together (on this result),
   * where every previous value is forwarded to the next callback.
   * - if one of the callback `Result` fails, the chain will return it
   * - on success, the last callbacks result will be returned
   * @param members to chain together
   * @returns the `Result` of the chain
   * @example
   * // every validate*** returns a Result<number>:
   * const veryValid: Result<number> = this.validateNumber(420).chain(
   *   (valid) => this.validateIntegerAndRound(valid),
   *   (valid) => this.validateInterval(valid, {min: 69})
   * );
   */
  public chain = <F extends (value: T) => Result<T>>(...members: F[]) => {
    if (this.isFailure) return this;

    let currentValue = this.getValue();

    for (const member of members) {
      const nextResult = member(currentValue);
      if (nextResult.isFailure) return nextResult;
      else currentValue = nextResult.getValue();
    }

    return Result.ok(currentValue);
  };

  /**
   * Converts the `value` of this Result to another Result, if this Result is **successful**.
   * Returns this failed `Result` otherwise.
   * @param callback for the conversion of the value
   * @returns a `Result` with the converted value, if successful
   * @example
   * // Result<number> => Result<Integer>
   * this.validate(420).convertTo((valid) => new Integer(valid));
   */
  public convertTo<R>(callback: (valid: T) => R): Result<R> {
    return this.isSuccess ? Result.ok(callback(this._value)) : Result.fail(this.error);
  }

  /**
   * Calls the given `callback` if the `Result` is successful.
   * - provides the `value` for the `callback`
   * - can be chained with the corresponding `onFail()` method
   * @param callback to be called if this `Result` is successful
   * @returns a chained method to handle the failure of this `Result`
   *
   * @example
   * Integer.validate(42)
   *   .onSuccess((value) => console.log(`Yes ${value} is an integer`));
   *   .onFail((error) => console.error(error))
   */
  public onSuccess(callback: (value: T) => void) {
    this.successCallback(callback);

    return {
      onFail: this.failCallback,
    };
  }
  /**
   * Calls the given `callback` if the `Result` fails.
   * - provides the `error` for the `callback`
   * - can be chained with the corresponding `onSuccess()` method
   * @param callback to be called if this `Result` fails
   * @returns a chained method to handle the success of this `Result`
   *
   * @example
   * Integer.validate(42)
   *   .onFail((error) => console.error(error))
   *   .onSuccess((value) => console.log(`Yes ${value} is an integer`));
   */
  public onFail(callback: (error: string) => void) {
    this.failCallback(callback);

    return {
      onSuccess: this.successCallback,
    };
  }

  private failCallback(callback: (error: string) => void) {
    if (this.isFailure) callback(this.error);
  }
  private successCallback(callback: (value: T) => void) {
    if (this.isFailure) callback(this._value);
  }
}
