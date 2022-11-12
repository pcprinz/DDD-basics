/** ### The Result of a validation, either successful or failed.
 * - `isSuccess`  => has a value (`getValue()`)
 * - `!isSuccess` => has an `error`(string) and `throws Error` when `getValue()` is called
 * - To use the `getValue()` method, which returns the vaule of `Result.ok(value)`,
 *   you need to check if the result was successful by calling `isSuccess()`.
 */
export class Result<T> {
  protected readonly _isSuccess: boolean;
  /** The error message that was given in `Result.fail(error)` */
  public readonly error: string;
  protected _value: T;

  protected constructor(isSuccess: boolean, error?: string, value?: T) {
    if (!isSuccess && !error) {
      throw new Error(`[Result]: A failing result needs to contain an error message`);
    }

    this._isSuccess = isSuccess;
    this.error = error ?? '';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this._value = value!;

    Object.freeze(this);
  }

  /**
   * Indicates if this Result was successful and converts it to reveal the `getValue()` method.
   *
   * ## Important:
   * - To use the `getValue()` method, which returns the actual value, you need to check if the result was successful.
   * - This is necessary to avoid trying to get the value from a result that failed.
   * - (`Result.fail('message').getValue()` throws an `Error` because there is no value!)
   * - For this reason, this method has a return value of something like `is Result+getValue()` - i.e. after checking, `getValue()` is "activated".
   *
   * @returns true if the Result is successful + activation of the `getValue()` method on the Result
   *
   * @example
   * const result = Result.ok('test');
   * result.getValue();   // ❌ TS: Property 'getValue' is protected and only accessible ...
   * if (result.isSuccess()) {
   *   result.getValue(); // ✅ fine
   * } else {
   *   result.getValue(); // ❌ same
   * }
   */
  public isSuccess(): this is Result<T> & { getValue: () => T } {
    return this._isSuccess;
  }

  /**
   * @returns the `value` provided in `Result.ok(value)`
   * @throws **an `Error` if called on a failed Result!**
   */
  protected getValue(): T {
    if (!this._isSuccess) {
      throw new Error(
        `[Result]: Can't retrieve the value from a failed result. [Error]: ${this.error}`
      );
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
    const result: { [key: string]: any } = {};
    for (const [key, value] of Object.entries(map)) {
      if (!value._isSuccess) {
        return value;
      }
      result[key] = value._value;
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
    if (!this._isSuccess) return this;

    let currentValue = this._value;

    for (const member of members) {
      const nextResult = member(currentValue);
      if (!nextResult._isSuccess) return nextResult;
      else currentValue = nextResult._value;
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
    return this._isSuccess ? Result.ok(callback(this._value)) : Result.fail(this.error);
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
  public onSuccess(callback: (value: T) => void): Omit<this, 'onSuccess'> {
    if (this._isSuccess) callback(this._value);

    return this;
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
  public onFail(callback: (error: string) => void): Omit<this, 'onFail'> {
    if (!this._isSuccess) callback(this.error);

    return this;
  }
}

export type ResultsOf<EP extends Record<any, any>> = {
  [Key in keyof EP]: EP[Key] extends infer X ? Result<X> : never;
};
