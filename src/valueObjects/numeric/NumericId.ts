import { Result } from '../../basic/Result';
import { IntervalCreationOptions, ListCreationOptions, ValueObject } from '../ValueObject';
import { Integer } from './Integer';

/** ### A special Integer with the predefined interval [0,∞]
 * which will not accept and parse floating point numbers.
 *
 * @example
 * const ni = NumericId.create(11, {name: 'MyID'});
 * const maxNi = NumericId.create(420, {max: 421});
 *
 * @fails
 * - if not a valid integer
 * - if the value has decimal digits
 * - if the value is not inside the interval (at least positive)
 */
export class NumericId extends Integer {
  protected constructor(value: number) {
    super(value);
  }

  public equals(obj: NumericId | number): boolean {
    return (obj instanceof NumericId ? obj.value : obj) === this._value;
  }

  // VALIDATION #################################################################################

  /**
   * @param value to be validated as an integer with the corresponding constraints (options)
   * @param options constraints the value has to fulfill
   * @returns the value if the validation was successful
   * @fails if not a valid integer
   * @fails if the value has decimal digits
   * @fails if the value is not inside the interval (at least positive)
   */
  public static validate(value: number, options?: NumericIdOptions): Result<number> {
    return super.validate(value, { ...options, min: 0, round: 'deny' });
  }

  // CREATION ###################################################################################

  /**
   * @param value to create the ValueObject of
   * @param options constraints the value has to fulfill
   * @returns the created ValueObject
   */
  public static create(value: number, options?: NumericIdOptions): Result<NumericId> {
    return this.validate(value, options).convertTo((valid) => new NumericId(valid));
  }

  /**
   * @param values an array of primitives to map to an array of ValueObjects
   * @param options constraints the values / list has to fulfill
   * @returns the array of ValueObjects
   */
  public static fromList(
    values: number[] | undefined,
    options?: NumericIdOptions & ListCreationOptions
  ): Result<NumericId[]> {
    return ValueObject.createList(values, (value) => this.create(value, options), options);
  }

  /**
   * @param values an array of ValueObjects to map to an array of their values
   * @returns the array of values
   */
  public static toList(values: NumericId[]): number[] {
    return values.map((pi) => pi.value);
  }
}

/** the options for a numeric identifier, which are basically the {@link IntervalCreationOptions}
 * without the `min` property, because this is fixed to `0`. */
export interface NumericIdOptions extends Omit<IntervalCreationOptions, 'min'> {}
