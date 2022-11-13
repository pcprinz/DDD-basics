import { Result } from '../../basic';
import { ListCreationOptions, ValueObject } from '../ValueObject';
import { Float, FloatOptions } from './Float';

/** ### A floating point number that can also be created from a string representation of a floating point number
 *
 * @example
 * const floatString1      = FloatString.create(42.69, { name: 'MyFloat' });
 * const intFloatString1   = FloatString.create(42);
 * const rangeFloatString1 = FloatString.create(21.4, { min: 12.1, max: 41.9 });
 * const floatString2      = FloatString.create('42.69');
 * const intFloatString2   = FloatString.create('42');
 * const rangeFloatString2 = FloatString.create('21.4', { min: 12.1, max: 41.9 });
 *
 * // extract the Result:
 * if (floatString2.isSuccess()) {
 *   console.log(floatString2.getValue()) // FloatString { _value: 42.69 }
 * }
 *
 * @fails
 * - if the value is not a parsable number
 * - if the value is not inside the interval
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
   * @fails if the value is not a parsable number
   * @fails if the value is not inside the interval
   */
  public static validate(value: number | string, options?: FloatStringOptions): Result<number> {
    return this.validateFloatString(value, options).chain((valid) =>
      super.validate(valid, options)
    );
  }

  /**
   * @param value to be validated as a valid number / string representation of a valid number
   * @param options constraints the value has to fulfill
   * @returns the (possibly parsed) number
   * @fails if the value is not a parsable number
   */
  protected static validateFloatString(
    value: number | string,
    options?: FloatStringOptions
  ): Result<number> {
    if (typeof value !== 'number') {
      const parsed = this.parse(value);
      if (isNaN(parsed)) {
        return Result.fail(
          `${super.prefix(
            options
          )}the given value (${value}: ${typeof value}) must be a number or a string representing a number!`
        );
      }

      return Result.ok(parsed);
    }

    return Result.ok(value);
  }

  /**
   * parses the given string to a (float) number where a possible `,` will be correctly replaced by a `.`.
   * @param value to parse (unchecked)
   * @returns the parsed number **OR** `NaN` if not parsable
   */
  public static parse(value: string): number {
    if (typeof value !== 'string') return NaN;

    return parseFloat(value.replace(',', '.'));
  }

  // CREATION ###################################################################################

  /**
   * @param value to create the FloatString of
   * @param options constraints the value has to fulfill
   * @returns a `Result` with the created FloatString
   */
  public static create(value: number | string, options?: FloatStringOptions): Result<FloatString> {
    return this.validate(value, options).convertTo((valid) => new FloatString(valid));
  }

  /**
   * @param values an array of primitives to map to an array of FloatStrings
   * @param options constraints the values / list has to fulfill
   * @returns a `Result` with an array of created FloatStrings
   */
  public static fromList(
    values: (number | string)[] | undefined,
    options?: FloatStringOptions & ListCreationOptions
  ): Result<FloatString[]> {
    return ValueObject.createList(values, (value) => this.create(value, options), options);
  }

  /**
   * @param values an array of FloatStrings to map to an array of their values
   * @returns the array of values
   */
  public static toList(values: FloatString[]): number[] {
    return values.map((pi) => pi.value);
  }
}

export interface FloatStringOptions extends FloatOptions {}
