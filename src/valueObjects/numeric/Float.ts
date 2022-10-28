import { IntervalCreationOptions, ListCreationOptions, ValueObject } from '../ValueObject';

/** ### A floating point number
 *
 * @example
 * const mi = Float.create(42.69, { name: 'MyFloat' }); // a.value === 42.69
 * const mi2 = Float.create(42, { name: 'MyFloat2' });
 * const mi3 = Float.create(21.4, { name: 'MyFloat3', min: 12.1, max: 41.9 });
 *
 * @throws
 * - `TypeError` if not a valid number
 * - `RangeError` if the value is not inside the interval
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
   * @throws `TypeError` if not a valid number
   * @throws `RangeError` if the value is not inside the interval
   */
  public static validate(value: number, options?: FloatOptions): number {
    this.validateNumber(value, options);
    if (options) {
      this.validateInterval(value, options);
    }

    return value;
  }

  /**
   * @param value to be validated as a valid number (not NaN)
   * @param options constraints the value has to fulfill
   * @throws `TypeError` if not a valid number
   */
  protected static validateNumber(value: number, options?: FloatOptions): void {
    if (typeof value !== 'number') {
      throw new TypeError(
        `${this.prefix(options)}the given value (${value}: ${typeof value}) must be a number!`
      );
    }

    if (isNaN(value)) {
      throw new TypeError(
        `${this.prefix(options)}the given value (${value}: ${typeof value}) is not a number (NaN)!`
      );
    }
  }

  // CREATION ###################################################################################

  /**
   * @param value to create the ValueObject of
   * @param options constraints the value has to fulfill
   * @returns the created ValueObject
   */
  public static create(value: number, options?: FloatOptions): Float {
    return new Float(this.validate(value, options));
  }

  /**
   * @param values an array of primitives to map to an array of ValueObjects
   * @param options constraints the values / list has to fulfill
   * @returns the array of ValueObjects
   */
  public static fromList(
    values: number[] | undefined,
    options?: FloatOptions & ListCreationOptions
  ): Float[] {
    return this.validateList(values, options) ? values.map((val) => this.create(val, options)) : [];
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
