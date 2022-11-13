import { Result } from '../../basic';
import { IntervalCreationOptions, ListCreationOptions, ValueObject } from '../ValueObject';

/** ### A floating point number
 *
 * @example
 * const float1     = Float.create(42.69, { name: 'MyFloat' });
 * const intFloat   = Float.create(42);
 * const rangeFloat = Float.create(21.4, { min: 12.1, max: 41.9 });
 *
 * // extract the Result:
 * if (float1.isSuccess()) {
 *   console.log(float1.getValue()) // Float { _value: 42.69 }
 * }
 *
 * @fails
 * - if not a valid number
 * - if the value is not inside the interval
 */
export class Float extends ValueObject<number> {
  constructor(value: number) {
    super(value);
  }

  public equals(obj: Float | number): boolean {
    return (obj instanceof Float ? obj.value : obj) === this._value;
  }

  // VALIDATION #################################################################################

  /**
   * @param value to be validated as a float with the corresponding constraints (options)
   * @param options constraints the value has to fulfill
   * @returns the value if the validation was successful
   * @fails if not a valid number
   * @fails if the value is not inside the interval
   */
  public static validate(value: number, options?: FloatOptions): Result<number> {
    return this.validateNumber(value, options).chain((valid) =>
      super.validateInterval(valid, options)
    );
  }

  /**
   * @param value to be validated as a valid number (not NaN)
   * @param options constraints the value has to fulfill
   * @fails if not a valid number
   */
  protected static validateNumber(value: number, options?: FloatOptions): Result<number> {
    if (typeof value !== 'number') {
      return Result.fail(
        `${super.prefix(options)}the given value (${value}: ${typeof value}) must be a number!`
      );
    }
    if (isNaN(value)) {
      return Result.fail(
        `${super.prefix(options)}the given value (${value}: ${typeof value}) is not a number (NaN)!`
      );
    }

    return Result.ok(value);
  }

  // CREATION ###################################################################################

  /**
   * @param value to create the Float of
   * @param options constraints the value has to fulfill
   * @returns a `Result` with the created Float
   */
  public static create(value: number, options?: FloatOptions): Result<Float> {
    return this.validate(value, options).convertTo((valid) => new Float(valid));
  }

  /**
   * @param values an array of primitives to map to an array of Floats
   * @param options constraints the values / list has to fulfill
   * @returns a `Result` with an array of created Floats
   */
  public static fromList(
    values: number[] | undefined,
    options?: FloatOptions & ListCreationOptions
  ): Result<Float[]> {
    return ValueObject.createList(values, (value) => this.create(value, options), options);
  }

  /**
   * @param values an array of Floats to map to an array of their values
   * @returns the array of values
   */
  public static toList(values: Float[]): number[] {
    return values.map((pi) => pi.value);
  }
}

export interface FloatOptions extends IntervalCreationOptions {}
