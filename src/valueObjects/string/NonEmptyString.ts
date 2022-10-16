import { ListCreationOptions } from '../ValueObject';
import { OptionalString, OptionalStringOptions } from './OptionalString';

/** A String that is definitely a String that is not empty */
export class NonEmptyString extends OptionalString {
  protected constructor(value: string) {
    super(value);
  }

  public equals(obj: NonEmptyString | string): boolean {
    return (obj instanceof NonEmptyString ? obj.value : obj) === this._value;
  }

  // VALIDATION #################################################################################

  /**
   * @param value to be validated as a not empty string with the corresponding constraints (options)
   * @param options constraints the value has to fulfill
   * @returns the value if the validation was successful
   * @throws {@link TypeError} if not a string or empty
   * @throws {@link TypeError} if the value doesn't fit the given enum
   * @throws {@link RangeError} if the value is not matching the regex
   * @throws {@link RangeError} if the value's length is not inside the interval
   */
  public static validate(value: string, options?: NonEmptyStringOptions): string {
    // format first so that the result passed validation
    const result = options?.format ? this.format(value, options) : value;
    this.validateNonEmptyString(result, options);

    if (options) {
      this.validateRange(result, options);
      this.validateInterval(result, options);
      this.validateRegex(result, options);
    }

    return result;
  }

  /**
   * @param value to be validated as a valid string that is not the empty string (`""`)
   * @param options constraints the value has to fulfill
   */
  private static validateNonEmptyString(
    value: string,
    options: NonEmptyStringOptions | undefined
  ): void {
    this.validateString(value, options);
    if (value === '') {
      throw new TypeError(
        `${this.prefix(
          options
        )}the given value (${value}: ${typeof value}) has to be a string with length > 0!`
      );
    }
  }

  /**
   * @param value to be validated to match a given range (enum / string[])
   * @param options constraints the value has to fulfill
   */
  private static validateRange(value: string, options: NonEmptyStringOptions): void {
    if (!options.range) {
      return;
    }
    const notInArray = Array.isArray(options.range) && !options.range.includes(value);
    const notInObjectValues =
      typeof options.range === 'object' && !Object.values(options.range).includes(value);
    const notInObjectKeys =
      typeof options.range === 'object' && !Object.keys(options.range).includes(value);
    const notInObject = notInObjectKeys && notInObjectValues;
    if (notInArray || notInObject) {
      throw new RangeError(
        `${this.prefix(
          options
        )}the given value (${value}: ${typeof value}) is not in the range ${JSON.stringify(
          options?.range
        )}`
      );
    }
  }

  // CREATION ###################################################################################

  /**
   * @param value to create the ValueObject of
   * @param options constraints the value has to fulfill
   * @returns the created ValueObject
   */
  public static create(value: string, options?: NonEmptyStringOptions): NonEmptyString {
    return new NonEmptyString(this.validate(value, options));
  }

  /**
   * @param values an array of primitives to map to an array of ValueObjects
   * @param options constraints the values / list has to fulfill
   * @returns the array of ValueObjects
   */
  public static fromList(
    values: string[] | undefined,
    options?: NonEmptyStringOptions & ListCreationOptions
  ): NonEmptyString[] {
    return this.validateList(values, options) ? values.map((val) => this.create(val, options)) : [];
  }

  /**
   * @param values an array of ValueObjects to map to an array of their values
   * @returns the array of values
   */
  public static toList(values: NonEmptyString[]): string[] {
    return values.map((nes) => nes.value);
  }
}

/**
 * The options for a string that is not empty. Can be matched with a `range`,
 * so a list of other strings or a string enum
 */
export interface NonEmptyStringOptions extends OptionalStringOptions {
  /** a list of all possible values the given value can match. This can either be a simple Array:
   * ```typescript
   * ['first', 'second', ..., 'last']
   * ```
   * or a String enum structured like this:
   * ```typescript
   * enum MyEnum {
   *   first = 'first',
   *   second = 'second',
   *   ...
   *   last = 'last',
   * }
   * ```
   */
  range?: string[] | readonly string[] | { [s: string]: string };
}
