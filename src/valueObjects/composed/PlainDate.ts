/** @module ValueObjects.PlainDate */
import { Integer } from '../numeric/Integer';
import { CreationOptions, ListCreationOptions, ValueObject } from '../ValueObject';

export type PlainDateObject = {
  year: number;
  month?: number;
  date?: number;
};
/** an array representation of `PlainDateProps` */
export type PlainDateArray = [year: number, month?: number, date?: number];
/** everything that might be parsable to a valid `PlainDate` */
export type PlainDateValue = PlainDateObject | PlainDateArray | string;

/** This is a more simplified, but also flexible version of a `Date` which specifically represents
 * just the date (without the time).
 * Related to `PlainTime` for the time and `PlaneDateTime` for a combination of both.
 */
export class PlainDate extends ValueObject<void> {
  readonly year: number;
  readonly month: number;
  readonly date: number;
  readonly weekday: number;

  private constructor(props: Required<PlainDateObject>) {
    super();
    this.year = props.year;
    this.month = props.month;
    this.date = props.date;
    this.weekday = new Date(Date.UTC(props.year, props.month, props.date)).getUTCDay();
  }

  // CREATION ###################################################################################

  /**
   * ### `PlainDateable`
   * can be either `PlainDateProps`:
   * ```typescript
   * {
   *  year: number;
   *  month?: number;
   *  date?: number;
   * }
   * ```
   *
   * or `YMD_Array`:
   * ```typescript
   * [year: number, month?: number, date?: number]
   * ```
   *
   * or a `string` representation:
   * - `"DD.MM.YYYY"`
   * - `"DD.M.YYYY"`
   * - `"D.MM.YYYY"`
   * - `"D.M.YYYY"`
   * - `"YYYY-MM-DD"`
   * - `"YYYY-MM-D"`
   * - `"YYYY-M-DD"`
   * - `"YYYY-M-D"`
   *
   * @param value to create the ValueObject of
   * @param options constraints the value has to fulfill
   * @returns the created ValueObject
   */
  public static create(value: PlainDateValue, options?: PlainDateOptions) {
    return new PlainDate(this.validate(value, options));
  }

  /**
   * @param values an array of primitives to map to an array of ValueObjects
   * @param options constraints the values / list has to fulfill
   * @returns the array of ValueObjects
   */
  public static fromList(
    values: PlainDateValue[] | undefined,
    options?: PlainDateOptions & ListCreationOptions
  ) {
    return this.validateList(values, options) ? values.map((val) => this.create(val, options)) : [];
  }

  /** creates a `PlainDate` from the current date. Similar to `new Date()` */
  public static now(options?: PlainDateOptions & PlainDateNowOptions) {
    const today = new Date(Date.now());
    const density = options?.density ?? 'days';

    return this.create(
      [
        today.getFullYear(),
        PDD[density] > 0 ? today.getUTCMonth() : 0,
        PDD[density] > 1 ? today.getUTCDate() : 1,
      ],
      options
    );
  }

  /** creates a new `PlainDate` derived from the existing date, where the given `newData`
   * partial replaces the old data.
   */
  createSet(newData: Partial<PlainDateObject>, options?: PlainDateOptions) {
    return PlainDate.create(
      {
        year: newData.year ?? this.year,
        month: newData.month ?? this.month,
        date: newData.date ?? this.date,
      },
      options
    );
  }

  /** creates a new `PlainDate` derived from the existing date, with a given offset */
  createOffset(offset: Partial<PlainDateObject>, options?: PlainDateOptions) {
    const date = new Date(
      Date.UTC(
        this.year + (offset.year ?? 0),
        this.month + (offset.month ?? 0),
        this.date + (offset.date ?? 0)
      )
    );

    return PlainDate.create(
      {
        year: date.getFullYear(),
        month: date.getUTCMonth(),
        date: date.getUTCDate(),
      },
      options
    );
  }

  // VALIDATION #################################################################################

  /**
   * @param value to be validated as a valid date with the corresponding constraints (options)
   * @param options constraints the value has to fulfill
   * @returns the value if the validation was successful
   * @throws various errors if not correct
   */
  public static validate(
    value: PlainDateValue,
    options?: PlainDateOptions
  ): Required<PlainDateObject> {
    value = this.validatePlainDateable(value, options);
    value = this.parseString(value, options);
    const year = Array.isArray(value) ? value[0] : value.year;
    const month = (Array.isArray(value) ? value[1] : value.month) ?? 0;
    const date = (Array.isArray(value) ? value[2] : value.date) ?? 1;
    Integer.validate(year, { name: this.prefix(options, 'year'), min: 0 });
    Integer.validate(month, { name: this.prefix(options, 'month'), min: 0, max: 11 });
    switch (month) {
      case 0:
      case 2:
      case 4:
      case 6:
      case 7:
      case 9:
      case 11:
        Integer.validate(date, { name: this.prefix(options, 'date'), min: 1, max: 31 });
        break;
      case 1:
        const isSchalt = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
        Integer.validate(date, {
          name: `${options?.name}(PlainDate.date)`,
          min: 1,
          max: isSchalt ? 29 : 28,
        });
        break;
      default:
        Integer.validate(date, { name: this.prefix(options, 'date'), min: 1, max: 30 });
        break;
    }

    return { year, month, date };
  }

  /**
   * @param value to be validated as a string, array or object representation of a date
   * @param options constraints the value has to fulfill
   * @returns the valid date
   */
  public static validatePlainDateable(
    value: PlainDateValue,
    options?: PlainDateOptions
  ): PlainDateValue {
    if (typeof value !== 'string' && !Array.isArray(value) && !value.year) {
      throw new TypeError(
        `${this.prefix(options)}the given value is not a parsable Object, Array, or string!`
      );
    }

    return value;
  }

  private static parseString(
    value: PlainDateValue,
    options?: PlainDateOptions
  ): PlainDateArray | PlainDateObject {
    if (typeof value === 'string') {
      if (/\d{1,2}\.\d{1,2}\.\d\d\d\d/.test(value)) {
        const parts = value.split('.');

        return [Number(parts[2]), Number(parts[1]) - 1, Number(parts[0])];
      }
      if (/\d\d\d\d-\d{1,2}-\d{1,2}/.test(value)) {
        const parts = value.split('-');

        return [Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])];
      }
      throw new TypeError(
        `${this.prefix(options)}the given (${value}: ${typeof value}) is not parsable!`
      );
    } else {
      return value;
    }
  }

  // COMPARISON #################################################################################

  equals(obj: PlainDate | PlainDateValue, density: PlainDateDensity = 'days') {
    let comp;
    try {
      comp = obj instanceof PlainDate ? obj : PlainDate.create(obj, { name: 'PlainDate.equals' });
    } catch (error) {
      // definitely not equal
      return false;
    }
    const y = comp.year === this.year;
    const m = PDD[density] >= 1 ? comp.month === this.month : true;
    const d = PDD[density] >= 2 ? comp.date === this.date : true;

    return y && m && d;
  }

  /**
   * compares this date with a given other `PlainDate` or `'now'` to compare it with the current date.
   * - returns `-1` if this date is older than the other one
   * - returns `0` if the dates are equal
   * - returns `1` if this date is more recent than the other one
   *
   * ##### Examples
   * ```typescript
   * '2020-05-25'.compare('2020-09-18') => -1
   * '2020-05-25'.compare('2020-01-01') => 1
   * '2020-05-25'.compare('2020-05-06', 'months') => 0 (with density)
   * ```
   * @param other the PlainDate to compare to / 'now' to use the current date
   * @param density the density the comparison has to have
   * @returns `-1 | 0 | 1` indicating which date is more recent
   */
  compare(other: PlainDate | 'now', density: PlainDateDensity = 'days'): -1 | 0 | 1 {
    const comp = (fst: number, snd: number) => (fst > snd ? 1 : -1);
    const b = other === 'now' ? PlainDate.now() : PlainDate.validate(other);
    const y = this.year === b.year ? 0 : comp(this.year, b.year);
    if (y !== 0) {
      return y;
    }
    const m = PDD[density] < 1 || this.month === b.month ? 0 : comp(this.month, b.month);
    if (m !== 0) {
      return m;
    }

    return PDD[density] < 2 || this.date === b.date ? 0 : comp(this.date, b.date);
  }

  /**
   * compares this date with a given other `PlainDate` or `'now'` to compare it with the current date
   * and returns the distance between both.
   * - distance = other - this
   *   - positive result = other date was later
   *   - negative result = other date was earlier
   * - always returns the distance in days (independent from the density)
   * @param other the PlainDate to compare to / 'now' to use the current date
   * @param density the density the comparison has to have
   * @returns the distance in days
   */
  distance(toOther: PlainDate | 'now', density: PlainDateDensity = 'days') {
    const b = toOther === 'now' ? PlainDate.now() : toOther;
    const distance = b.toDate(density).getTime() - this.toDate(density).getTime();

    return distance / (1000 * 60 * 60 * 24);
  }

  // SERIALIZATION #################################################################################

  toString() {
    return [this.date, this.month + 1, this.year].join('.');
  }

  toJSON() {
    return {
      year: this.year,
      month: this.month,
      date: this.date,
      weekday: this.weekday,
    };
  }

  toDate(density: PlainDateDensity = 'days') {
    return new Date(
      Date.UTC(this.year, PDD[density] > 0 ? this.month : 0, PDD[density] > 1 ? this.date : 1)
    );
  }
}

/** the density / accuracy to compare and create dates */
export type PlainDateDensity = keyof typeof PDD;
enum PDD {
  'years',
  'months',
  'days',
}

export interface PlainDateOptions extends CreationOptions {}
export interface PlainDateNowOptions {
  density?: PlainDateDensity;
}
