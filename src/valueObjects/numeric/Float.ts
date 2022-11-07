import { Result } from '../../basic/Result';
import { IntervalCreationOptions, ListCreationOptions, ValueObject } from '../ValueObject';

/** ### A floating point number
 *
 * @example
 * const mi = Float.create(42.69, { name: 'MyFloat' }); // a.value === 42.69
 * const mi2 = Float.create(42, { name: 'MyFloat2' });
 * const mi3 = Float.create(21.4, { name: 'MyFloat3', min: 12.1, max: 41.9 });
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
      this.validateInterval(valid, options)
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
        `${this.prefix(options)}the given value (${value}: ${typeof value}) must be a number!`
      );
    }
    if (isNaN(value)) {
      return Result.fail(
        `${this.prefix(options)}the given value (${value}: ${typeof value}) is not a number (NaN)!`
      );
    }
    return Result.ok(value);
  }

  // CREATION ###################################################################################

  /**
   * @param value to create the ValueObject of
   * @param options constraints the value has to fulfill
   * @returns the created ValueObject
   */
  public static create(value: number, options?: FloatOptions): Result<Float> {
    return this.validate(value, options).convertTo((valid) => new Float(valid));
  }

  /**
   * @param values an array of primitives to map to an array of ValueObjects
   * @param options constraints the values / list has to fulfill
   * @returns the array of ValueObjects
   */
  public static fromList(
    values: number[] | undefined,
    options?: FloatOptions & ListCreationOptions
  ): Result<Float[]> {
    return ValueObject.createList(values, (value) => this.create(value, options), options);
  }

  /**
   * @param values an array of ValueObjects to map to an array of their values
   * @returns the array of values
   */
  public static toList(values: Float[]): number[] {
    return values.map((pi) => pi.value);
  }
}

export interface FloatOptions extends IntervalCreationOptions {}
