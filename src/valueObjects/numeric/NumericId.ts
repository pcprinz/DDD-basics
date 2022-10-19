import { IntervalCreationOptions, ListCreationOptions } from '../ValueObject';
import { Integer, IntegerOptions } from './Integer';

/** A special Integer with the predefined interval [0,∞] which will not accept and parse floating point numbers. */
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
   * @throws `TypeError` if not a valid integer
   * @throws `RangeError` if the value has decimal digits
   * @throws `RangeError` if the value is not inside the interval
   */
  public static validate(value: number, options?: NumericIdOptions): number {
    const intOpts: IntegerOptions = { ...options, min: 0, round: 'deny' };
    super.validate(value, intOpts);

    return value;
  }

  // CREATION ###################################################################################

  /**
   * @param value to create the ValueObject of
   * @param options constraints the value has to fulfill
   * @returns the created ValueObject
   */
  public static create(value: number, options?: NumericIdOptions): NumericId {
    return new NumericId(this.validate(value, options));
  }

  /**
   * @param values an array of primitives to map to an array of ValueObjects
   * @param options constraints the values / list has to fulfill
   * @returns the array of ValueObjects
   */
  public static fromList(
    values: number[] | undefined,
    options?: NumericIdOptions & ListCreationOptions
  ): NumericId[] {
    return this.validateList(values, options) ? values.map((val) => this.create(val, options)) : [];
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
