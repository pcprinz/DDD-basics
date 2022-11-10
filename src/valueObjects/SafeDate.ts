import { Result } from '../basic/Result';
import { CreationOptions, ListCreationOptions, ValueObject } from './ValueObject';

/** ### A Date that is definitely a Date
 *
 * ... that can be created from either a Date or a string that represents a Date,
 * or a number that represents the time in ms.
 * Every creation that the original JS `Date` offers is allowed.
 *
 * @example
 * const sd = SafeDate.create(new Date(), { name: 'NewSafeDate' });
 * const numericSd = SafeDate.create(1666945777309); // ~ 2022-10-28T08:29:37.309Z
 * const stringSd = SafeDate.create('2022-10-28T08:29:37.309Z');
 * const rangeSd = SafeDate.create('2022-10-28T08:31:00.914Z', {
 *   min: '2022-10-14T00:00:00.000Z',
 *   max: '2022-11-01T00:00:00.000Z',
 * });
 *
 * @fails
 * - if not parsable to a valid Date
 * - if the Date is not inside the interval (between the given intervals' Dates)
 */
export class SafeDate extends ValueObject<Date> {
  protected constructor(value: Date) {
    super(value);
  }

  public equals(obj: SafeDate | (Date | string | number)): boolean {
    if (obj instanceof SafeDate) return obj.value.toJSON() === this._value.toJSON();

    const comparable = SafeDate.create(obj, { name: 'SafeDate.equals' });
    if (!comparable.isSuccess()) return false;

    return comparable.getValue().value.toJSON() === this._value.toJSON();
  }

  // VALIDATION #################################################################################

  /**
   * @param value to be validated as a valid Date
   * @param options constraints the value has to fulfill
   * @returns the value if the validation was successful
   * @fails if not parsable to a valid Date
   * @fails if the Date is not inside the interval (between the given intervals' Dates)
   * @fails if the given interval Dates are no valid (parsable) Dates
   */
  public static validate(value: Date | string | number, options?: SafeDateOptions): Result<Date> {
    // safe date
    const validDate = SafeDate.validateDate(value, options);
    if (!validDate.isSuccess()) return validDate;

    if (options) {
      const validInterval = SafeDate.validateDateInterval(validDate.getValue(), options);
      if (!validInterval.isSuccess()) return validInterval;
    }

    return Result.ok(validDate.getValue());
  }

  /**
   * @param date to be validated in the given date range
   * @param options constraints the value has to fulfill
   * @fails if the Date is not inside the interval (between the given intervals' Dates)
   * @fails if the given interval Dates are no valid (parsable) Dates
   */
  private static validateDateInterval(date: Date, options: SafeDateOptions): Result<Date> {
    const validMin =
      options.min !== undefined
        ? this.validate(options.min, { name: `${options.name}.min` })
        : undefined;
    if (validMin && !validMin.isSuccess()) return validMin;

    const validMax =
      options.max !== undefined
        ? this.validate(options.max, { name: `${options.name}.max` })
        : undefined;
    if (validMax && !validMax.isSuccess()) return validMax;

    if (
      (validMin && date.getTime() < validMin.getValue().getTime()) ||
      (validMax && date.getTime() > validMax.getValue().getTime())
    ) {
      return Result.fail(
        `${this.prefix(options)}the given Date (${date}) must be in the interval [${
          validMin ?? '*'
        }, ${validMax ?? '*'}]!`
      );
    }

    return Result.ok(date);
  }

  /**
   * @param value to be validated as a parsable `Date`
   * @param options constraints the value has to fulfil
   * @returns the validated `Date`
   * @fails if the value is not parsable
   * @fails if the value is not a `Date | string | number`
   */
  private static validateDate(
    value: Date | string | number,
    options?: SafeDateOptions
  ): Result<Date> {
    value = this.parseDottedFormat(value);
    if (typeof value === 'string' || typeof value === 'number') {
      if (typeof value === 'string' ? isNaN(Date.parse(value)) : isNaN(value)) {
        return Result.fail(
          `${this.prefix(options)}the given (${value}: ${typeof value}) is not parsable!`
        );
      } else {
        return Result.ok(new Date(value));
      }
    } else if (value instanceof Date) {
      return Result.ok(value);
    }

    return Result.fail(
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
  public static create(value: Date | string | number, options?: SafeDateOptions): Result<SafeDate> {
    return this.validate(value, options).convertTo((valid) => new SafeDate(valid));
  }

  public static now(addMs: number = 0, options?: CreationOptions): Result<SafeDate> {
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
  ): Result<SafeDate[]> {
    return ValueObject.createList(values, (value) => this.create(value, options), options);
  }

  /**
   * @param values an array of ValueObjects to map to an array of their values
   * @returns the array of values
   */
  public static toList(values: SafeDate[]): Date[] {
    return values.map((pi) => pi.value);
  }

  toJSON() {
    // TODO it works but check why this can't be the super.toJSON()
    return this._value.toJSON() as any;
  }
}

export interface SafeDateOptions extends CreationOptions {
  /** the latest allowed Date. Both Dates will be compared with their `getTime()` milliseconds. */
  max?: Date | string | number;
  /** the earliest allowed Date. Both Dates will be compared with their `getTime()` milliseconds. */
  min?: Date | string | number;
}
