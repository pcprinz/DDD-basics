import { ListCreationOptions } from '../ValueObject';
import { Integer, IntegerOptions } from './Integer';

/** An Integer (number without decimal digits) that can also be created from a string representation of an integer */
export class IntegerString extends Integer {
  protected constructor(value: number) {
    super(value);
  }

  public equals(obj: IntegerString | number | string): boolean {
    let comp = obj instanceof IntegerString ? obj.value : obj;
    comp = typeof comp === 'number' ? comp : IntegerString.parse(comp);

    return comp === this._value;
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
  public static validate(value: number | string, options?: IntegerStringOptions): number {
    const converted = this.validateIntegerString(value, options);

    return super.validate(converted, options);
  }

  /**
   * @param value to be validated as a valid integer / string representation of an integer
   * @param options constraints the value has to fulfill
   * @returns the (possibly parsed) integer (number)
   */
  protected static validateIntegerString(
    value: number | string,
    options?: IntegerStringOptions
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
   * parses the given string to an integer (number).
   * @param value to parse (unchecked)
   * @returns the parsed number **OR** `NaN` if not parsable
   */
  public static parse(value: string): number {
    return parseInt(value, 10);
  }

  // CREATION ###################################################################################

  /**
   * @param value to create the ValueObject of
   * @param options constraints the value has to fulfill
   * @returns the created ValueObject
   */
  public static create(value: number | string, options?: IntegerStringOptions): IntegerString {
    return new IntegerString(this.validate(value, options));
  }

  /**
   * @param values an array of primitives to map to an array of ValueObjects
   * @param options constraints the values / list has to fulfill
   * @returns the array of ValueObjects
   */
  public static fromList(
    values: (number | string)[] | undefined,
    options?: IntegerStringOptions & ListCreationOptions
  ): IntegerString[] {
    return this.validateList(values, options) ? values.map((val) => this.create(val, options)) : [];
  }

  /**
   * @param values an array of ValueObjects to map to an array of their values
   * @returns the array of values
   */
  public static toList(values: IntegerString[]): number[] {
    return values.map((pi) => pi.value);
  }
}

export type IntegerStringOptions = IntegerOptions;
