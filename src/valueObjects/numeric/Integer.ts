import { IntervalCreationOptions, ListCreationOptions } from '../ValueObject';
import { Float } from './Float';

/** An Integer (number without decimal digits) */
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
   * @throws {@link TypeError} if not a valid integer
   * @throws {@link RangeError} if the value has not allowed decimal digits
   * @throws {@link RangeError} if the value is not inside the interval
   */
  public static validate(value: number, options?: IntegerOptions): number {
    const converted = this.validateInteger(value, options);
    if (options) {
      this.validateInterval(converted, options);
    }

    return converted;
  }

  /**
   * If defined in the options the number will possibly be rounded.
   * @param value to be validated as a valid integer
   * @param options constraints the value has to fulfill
   * @returns the (possibly rounded) integer
   */
  protected static validateInteger(value: number, options?: IntegerOptions): number {
    this.validateNumber(value, options);
    const converted = value;
    const round = options?.round ?? 'deny';
    if (round !== undefined) {
      switch (round) {
        case 'ceil':
          return Math.ceil(converted);
        case 'floor':
          return Math.floor(converted);
        case 'round':
          return Math.round(converted);
        case 'deny':
          if (converted % 1 !== 0) {
            throw new RangeError(
              `${this.prefix(
                options
              )}the given value (${converted}) must be an integer but has decimal places!`
            );
          }
          break;
        default:
          throw new TypeError(
            `${this.prefix(
              options
            )}the given options.round (${round}: ${typeof round}) does not match 'floor' | 'ceil' | 'round' | 'deny'`
          );
      }
    }

    return converted;
  }

  // CREATION ###################################################################################

  /**
   * @param value to create the ValueObject of
   * @param options constraints the value has to fulfill
   * @returns the created ValueObject
   */
  public static create(value: number, options?: IntegerOptions): Integer {
    return new Integer(this.validate(value, options));
  }

  /**
   * @param values an array of primitives to map to an array of ValueObjects
   * @param options constraints the values / list has to fulfill
   * @returns the array of ValueObjects
   */
  public static fromList(
    values: number[] | undefined,
    options?: IntegerOptions & ListCreationOptions
  ): Integer[] {
    return this.validateList(values, options) ? values.map((val) => this.create(val, options)) : [];
  }

  /**
   * @param values an array of ValueObjects to map to an array of their values
   * @returns the array of values
   */
  public static toList(values: Integer[]): number[] {
    return values.map((pi) => pi.value);
  }
}

export interface IntegerOptions extends IntervalCreationOptions {
  // TODO maybe give the opportunity to just round specified decimal points
  /** how should the number be rounded.
   * - defaults to `'deny'` which causes the `validate()` method to throw an error if the number
   *   has decimal places.
   */
  round?: 'floor' | 'ceil' | 'round' | 'deny';
}
