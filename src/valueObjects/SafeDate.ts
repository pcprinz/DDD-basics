import { CreationOptions, ListCreationOptions, ValueObject } from './ValueObject';

/** a Date that is definitely a Date that can be created from either a Date or a string that
 * represents a Date or a number that represents the Time in ms. Every creation that the original
 * JS `Date` offers is allowed.
 *
 * @example
 * const sd = SafeDate.create(new Date(), { name: 'NewSafeDate' });
 * const numericSd = SafeDate.create(1666945777309); // === 2022-10-28T08:29:37.309Z
 * const stringSd = SafeDate.create('2022-10-28T08:29:37.309Z');
 * const rangeSd = SafeDate.create('2022-10-28T08:31:00.914Z', {
 *   min: '2022-10-14T00:00:00.000Z',
 *   max: '2022-11-01T00:00:00.000Z',
 * });
 *
 * @throws
 * - `TypeError` if not parsable to a valid Date
 * - `RangeError` if the value's length is not inside the interval
 */
export class SafeDate extends ValueObject<Date> {
  protected constructor(value: Date) {
    super(value);
  }

  public equals(obj: SafeDate | (Date | string | number)): boolean {
    if (obj instanceof SafeDate) {
      return obj.value.toJSON() === this._value.toJSON();
    }
    let comparable;
    try {
      comparable = SafeDate.create(obj, { name: 'SafeDate.equals' });
    } catch (error) {
      // definitely not equal
      return false;
    }

    return comparable.value.toJSON() === this._value.toJSON();
  }

  // VALIDATION #################################################################################

  /**
   * @param value to be validated as a valid Date
   * @param options constraints the value has to fulfill
   * @returns the value if the validation was successful
   * @throws `TypeError` if not parsable to a valid Date
   * @throws `RangeError` if the value's length is not inside the interval
   */
  public static validate(value: Date | string | number, options?: SafeDateOptions): Date {
    // safe date
    const safeDate: Date = SafeDate.validateDate(value, options);

    if (options) {
      SafeDate.validateDateInterval(safeDate, options);
    }

    return safeDate;
  }

  /**
   *
   * @param date to be validated in the given date range
   * @param options constraints the value has to fulfill
   */
  private static validateDateInterval(date: Date, options: SafeDateOptions) {
    const safeMin =
      options.min !== undefined
        ? this.validate(options.min, { name: `${options.name}.min` })
        : undefined;
    const safeMax =
      options.max !== undefined
        ? this.validate(options.max, { name: `${options.name}.max` })
        : undefined;
    if (
      (safeMin && date.getTime() < safeMin.getTime()) ||
      (safeMax && date.getTime() > safeMax.getTime())
    ) {
      throw new RangeError(
        `${this.prefix(options)}the given Date (${date}) must be in the interval [${
          safeMin ?? '*'
        }, ${safeMax ?? '*'}]!`
      );
    }
  }

  /**
   * @param value to be validated as a parsable `Date`
   * @param options constraints the value has to fulfil
   * @returns the validated `Date`
   * @throws `TypeError` if the value is not parsable
   * @throws `TypeError` if the value is not a `Date | string | number`
   */
  private static validateDate(value: Date | string | number, options?: SafeDateOptions): Date {
    value = this.parseDottedFormat(value);
    if (typeof value === 'string' || typeof value === 'number') {
      if (typeof value === 'string' ? isNaN(Date.parse(value)) : isNaN(value)) {
        throw new TypeError(
          `${this.prefix(options)}the given (${value}: ${typeof value}) is not parsable!`
        );
      } else {
        return new Date(value);
      }
    } else if (value instanceof Date) {
      return value;
    }
    throw new TypeError(
      `${this.prefix(
        options
      )}the given (${value}: ${typeof value}) is whether a Date nor a string | number!`
    );
  }

  static parseDottedFormat(value: Date | string | number): Date | string | number {
    if (typeof value === 'string' && /\d\d.\d\d.\d\d\d\d/.test(value)) {
      const parts = value.split('.');

      return new Date(Date.UTC(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0])));
    }

    return value;
  }

  // CREATION #################################################################################

  /**
   * @param value to create a PositiveIntegerString from
   * @param options for the creation
   * @returns the created ValueObject
   */
  public static create(value: Date | string | number, options?: SafeDateOptions): SafeDate {
    return new SafeDate(this.validate(value, options));
  }

  public static now(addMs: number = 0, options?: CreationOptions): SafeDate {
    return SafeDate.create(new Date().getTime() + addMs, options);
  }

  /**
   * @param values an array of strings to map to an array of ValueObjects
   * @param options for the **individual** creation
   * @returns the array of ValueObjects
   */
  public static fromList(
    values: (Date | string | number)[] | undefined,
    options?: SafeDateOptions & ListCreationOptions
  ): SafeDate[] {
    return this.validateList(values, options) ? values.map((val) => this.create(val, options)) : [];
  }

  /**
   * @param values an array of ValueObjects to map to an array of their values
   * @returns the array of values
   */
  public static toList(values: SafeDate[]): Date[] {
    return values.map((pi) => pi.value);
  }

  /* @ts-ignore */
  toJSON() {
    // TODO it works but check why this can't be the super.toJSON()
    return this._value.toJSON();
  }
}

export interface SafeDateOptions extends CreationOptions {
  /** the latest allowed Date. Both Dates will be compared with their `getTime()` milliseconds. */
  max?: Date | string | number;
  /** the earliest allowed Date. Both Dates will be compared with their `getTime()` milliseconds. */
  min?: Date | string | number;
}
