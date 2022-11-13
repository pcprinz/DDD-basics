import { Result } from '../../basic';
import { ListCreationOptions, ValueObject } from '../ValueObject';
import { Float, FloatOptions } from './Float';

/** ### An Integer (`number` without decimal digits)
 *
 * @example
 * const int      = Integer.create(42, { name: 'MyInteger' });
 * const roundInt = Integer.create(42.6, { round: 'floor' });
 * const rangeInt = Integer.create(42, { min: 12, max: 43 });
 *
 * // extract the Result:
 * if (int.isSuccess()) {
 *   console.log(int.getValue()) // Integer { _value: 42 }
 * }
 *
 * @fails
 * - if not a valid integer
 * - if the value has not allowed decimal digits
 * - if the value is not inside the interval
 */
export class Integer extends Float {
  protected constructor(value: number) {
    super(value);
  }

  public equals(obj: Integer | number): boolean {
    return (obj instanceof Integer ? obj.value : obj) === this._value;
  }

  // VALIDATION #################################################################################

  /**
   * @param value to be validated as an integer with the corresponding constraints (options)
   * @param options constraints the value has to fulfill
   * @returns the value if the validation was successful
   * @fails if not a valid integer
   * @fails if the value has not allowed decimal digits
   * @fails if the value is not inside the interval
   */
  public static validate(value: number, options?: IntegerOptions): Result<number> {
    return super.validateNumber(value, options).chain(
      (valid) => this.validateIntegerAndRound(valid, options),
      (valid) => super.validateInterval(valid, options)
    );
  }

  /**
   * If defined in the options the number will possibly be rounded.
   * @param value to be validated as a valid integer
   * @param options constraints the value has to fulfill
   * @returns the (possibly rounded) integer
   * @fails if the value has not allowed decimal digits
   * @fails if the round option incorrect
   */
  protected static validateIntegerAndRound(
    value: number,
    options?: IntegerOptions
  ): Result<number> {
    const round = options?.round ?? 'deny';
    switch (round) {
      case 'ceil':
        return Result.ok(Math.ceil(value));
      case 'floor':
        return Result.ok(Math.floor(value));
      case 'round':
        return Result.ok(Math.round(value));
      case 'deny':
        if (value % 1 !== 0) {
          return Result.fail(
            `${super.prefix(
              options
            )}the given value (${value}) must be an integer but has decimal places!`
          );
        } else {
          return Result.ok(value); // value is already an integer
        }
      default:
        return Result.fail(
          `${super.prefix(
            options
          )}the given options.round (${round}: ${typeof round}) does not match 'floor' | 'ceil' | 'round' | 'deny'`
        );
    }
  }

  // CREATION ###################################################################################

  /**
   * @param value to create the Integer of
   * @param options constraints the value has to fulfill
   * @returns a `Result` with the created Integer
   */
  public static create(value: number, options?: IntegerOptions): Result<Integer> {
    return this.validate(value, options).convertTo((valid) => new Integer(valid));
  }

  /**
   * @param values an array of primitives to map to an array of Integers
   * @param options constraints the values / list has to fulfill
   * @returns a `Result` with an array of created Integers
   */
  public static fromList(
    values: number[] | undefined,
    options?: IntegerOptions & ListCreationOptions
  ): Result<Integer[]> {
    return ValueObject.createList(values, (value) => this.create(value, options), options);
  }

  /**
   * @param values an array of Integers to map to an array of their values
   * @returns the array of values
   */
  public static toList(values: Integer[]): number[] {
    return values.map((pi) => pi.value);
  }
}

export interface IntegerOptions extends FloatOptions {
  // TODO maybe give the opportunity to just round specified decimal points
  /** how should the number be rounded.
   * - defaults to `'deny'` which causes the `validate()` method to throw an error if the number
   *   has decimal places.
   */
  round?: 'floor' | 'ceil' | 'round' | 'deny';
}
