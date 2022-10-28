import { ListCreationOptions } from '../ValueObject';
import { Float, FloatOptions } from './Float';

/** ### A floating point number that can also be created from a string representation of a floating point number
 *
 * @example
 * const mi = FloatString.create(42.69, { name: 'MyFloat' }); // a.value === 42.69
 * const mi2 = FloatString.create(42, { name: 'MyFloat2' });
 * const mi3 = FloatString.create(21.4, { name: 'MyFloat3', min: 12.1, max: 41.9 });
 * const stringMi = FloatString.create('42.69', { name: 'MyFloat' });
 * const stringMi2 = FloatString.create('42', { name: 'MyFloat2' });
 * const stringMi3 = FloatString.create('21.4', { name: 'MyFloat3', min: 12.1, max: 41.9 });
 *
 * @throws
 * - `TypeError` if the value is not a parsable number
 * - `RangeError` if the value is not inside the interval
 */
export class FloatString extends Float {
  protected constructor(value: number) {
    super(value);
  }

  public equals(obj: FloatString | number | string): boolean {
    let comp = obj instanceof FloatString ? obj.value : obj;
    comp = typeof comp === 'number' ? comp : FloatString.parse(comp);

    return comp === this._value;
  }

  // VALIDATION #################################################################################

  /**
   * @param value to be validated as a float with the corresponding constraints (options)
   * @param options constraints the value has to fulfill
   * @returns the value if the validation was successful
   * @throws `TypeError` if the value is not a parsable number
   * @throws `RangeError` if the value is not inside the interval
   */
  public static validate(value: number | string, options?: FloatStringOptions): number {
    const converted = this.validateFloatString(value, options);

    return super.validate(converted, options);
  }

  /**
   * @param value to be validated as a valid number / string representation of a valid number
   * @param options constraints the value has to fulfill
   * @returns the (possibly parsed) number
   * @throws `TypeError` if the value is not a parsable number
   */
  protected static validateFloatString(
    value: number | string,
    options?: FloatStringOptions
  ): number {
    if (typeof value !== 'number') {
      if (isNaN(this.parse(value))) {
        throw new TypeError(
          `${this.prefix(
            options
          )}the given value (${value}: ${typeof value}) has to be a number or a string representing a number!`
        );
      }

      return this.parse(value);
    }

    return value;
  }

  /**
   * parses the given string to a (float) number where a possible `,` will be correctly replaced by a `.`.
   * @param value to parse (unchecked)
   * @returns the parsed number **OR** `NaN` if not parsable
   */
  public static parse(value: string): number {
    return parseFloat(value.replace(',', '.'));
  }

  // CREATION ###################################################################################

  /**
   * @param value to create the ValueObject of
   * @param options constraints the value has to fulfill
   * @returns the created ValueObject
   */
  public static create(value: number | string, options?: FloatStringOptions): FloatString {
    return new FloatString(this.validate(value, options));
  }

  /**
   * @param values an array of primitives to map to an array of ValueObjects
   * @param options constraints the values / list has to fulfill
   * @returns the array of ValueObjects
   */
  public static fromList(
    values: (number | string)[] | undefined,
    options?: FloatStringOptions & ListCreationOptions
  ): FloatString[] {
    return this.validateList(values, options) ? values.map((val) => this.create(val, options)) : [];
  }

  /**
   * @param values an array of ValueObjects to map to an array of their values
   * @returns the array of values
   */
  public static toList(values: FloatString[]): number[] {
    return values.map((pi) => pi.value);
  }
}

export interface FloatStringOptions extends FloatOptions {}
