import { CreationOptions, ListCreationOptions, ValueObject } from '../ValueObject';
import { PlainDate } from './PlainDate';
import { PlainTime } from './PlainTime';

export type PlainDateTimeObject = {
  year: number;
  month?: number;
  date?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};
/** an array representation of `PlainDateTimeProps` */
export type PlainDateTimeArray = [
  year: number,
  month?: number,
  date?: number,
  hours?: number,
  minutes?: number,
  seconds?: number,
  milliseconds?: number
];
/** everything that might be parsable to a valid `PlainDateTime` */
export type PlainDateTimeValue = PlainDateTimeObject | PlainDateTimeArray | string | number;

/** ### A more simplified, but also flexible version of a `Date`
 *
 * Related to `PlainTime` for the time and `PlaneDate` for the date.
 */
export class PlainDateTime extends ValueObject<void> {
  readonly year: number;
  readonly month: number;
  readonly date: number;
  readonly weekday: number;

  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly milliseconds: number;

  /** returns the total amount of minutes that have passed on this day */
  get dayMinutes() {
    return this.hours * 60 + this.minutes;
  }

  /** returns the time in `ms` since 1970 similar to `Date.getTime()`  */
  getTime() {
    return new Date(
      Date.UTC(
        this.year,
        this.month,
        this.date,
        this.hours,
        this.minutes,
        this.seconds,
        this.milliseconds
      )
    ).getTime();
  }

  /** returns `true` if this date matches with the date of today (without time) */
  isToday() {
    const now = new Date(Date.now());

    return (
      this.year === now.getFullYear() &&
      this.month === now.getUTCMonth() &&
      this.date === now.getUTCDate()
    );
  }

  isSummerTime() {
    const now = this.toDate();
    const then = this.createOffset({ month: 6 }).toDate();

    return now.getTimezoneOffset() > then.getTimezoneOffset();
  }

  protected constructor(props: Required<PlainDateTimeObject>) {
    super();
    this.year = props.year;
    this.month = props.month;
    this.date = props.date;
    this.weekday = new Date(Date.UTC(props.year, props.month, props.date)).getUTCDay();
    this.hours = props.hours;
    this.minutes = props.minutes;
    this.seconds = props.seconds;
    this.milliseconds = props.milliseconds;
  }

  // CREATION ###################################################################################

  /**
   * ### `PlainDateTimeable`
   * can be either `PlainDateTimeProps`:
   * ```typescript
   * {
   *   year: number;
   *   month?: number;
   *   date?: number;
   *   hours?: number;
   *   minutes?: number;
   *   seconds?: number;
   *   milliseconds?: number;
   * }
   * ```
   *
   * or `YMDHMSs_Array`:
   * ```typescript
   * [
   *   year: number,
   *   month?: number,
   *   date?: number,
   *   hours?: number,
   *   minutes?: number,
   *   seconds?: number,
   *   milliseconds?: number
   * ]
   * ```
   *
   * or a `string` representation:
   * - `"DD.MM.YYYY"`
   * - `"YYYY-MM-DD"`
   * - `"DD.MM.YYYYTHH:MM:SS.sss+hh:mm"`
   * - JS dateString (RFC2822 || ISO8601)
   *
   * @param value to create the ValueObject of
   * @param options constraints the value has to fulfill
   * @returns the created ValueObject
   */
  public static create(value: PlainDateTimeValue, options?: PlainDateTimeOptions) {
    return new PlainDateTime(this.validate(value, options));
  }

  /**
   * @param values an array of primitives to map to an array of ValueObjects
   * @param options constraints the values / list has to fulfill
   * @returns the array of ValueObjects
   */
  public static fromList(
    values: PlainDateTimeValue[] | undefined,
    options?: PlainDateTimeOptions & ListCreationOptions
  ) {
    return this.validateList(values, options) ? values.map((val) => this.create(val, options)) : [];
  }

  /** creates a `PlainDateTime` from the current dateTime. Similar to `new Date()` */
  public static now(options?: PlainDateTimeOptions & PlainDateTimeNowOptions) {
    const now = new Date(Date.now());
    const density = options?.density ?? 'milliseconds';

    return this.create(
      [
        now.getFullYear(),
        PDTD[density] > 0 ? now.getUTCMonth() : 0,
        PDTD[density] > 1 ? now.getUTCDate() : 1,
        PDTD[density] > 2 ? now.getUTCHours() : 0,
        PDTD[density] > 3 ? now.getUTCMinutes() : 0,
        PDTD[density] > 4 ? now.getUTCSeconds() : 0,
        PDTD[density] > 5 ? now.getUTCMilliseconds() : 0,
      ],
      options
    );
  }

  /** creates a new `PlainDateTime` derived from the existing dateTime, where the given `newData`
   * partial replaces the old data.
   */
  createSet(newData: Partial<PlainDateTimeObject>, options?: PlainDateTimeOptions) {
    return PlainDateTime.create(
      {
        year: newData.year ?? this.year,
        month: newData.month ?? this.month,
        date: newData.date ?? this.date,
        hours: newData.hours ?? this.hours,
        minutes: newData.minutes ?? this.minutes,
        seconds: newData.seconds ?? this.seconds,
        milliseconds: newData.milliseconds ?? this.milliseconds,
      },
      options
    );
  }

  /** creates a new `PlainDateTime` derived from the existing dateTime, with a given offset */
  createOffset(offset: Partial<PlainDateTimeObject>, options?: PlainDateTimeOptions) {
    const date = new Date(
      Date.UTC(
        this.year + (offset.year ?? 0),
        this.month + (offset.month ?? 0),
        this.date + (offset.date ?? 0),
        this.hours + (offset.hours ?? 0),
        this.minutes + (offset.minutes ?? 0),
        this.seconds + (offset.seconds ?? 0),
        this.milliseconds + (offset.milliseconds ?? 0)
      )
    );

    return PlainDateTime.create(
      {
        year: date.getFullYear(),
        month: date.getUTCMonth(),
        date: date.getUTCDate(),
        hours: date.getUTCHours(),
        minutes: date.getUTCMinutes(),
        seconds: date.getUTCSeconds(),
        milliseconds: date.getUTCMilliseconds(),
      },
      options
    );
  }

  /** creates a new `PlainDateTime` derived from the existing dateTime, with a given timezone offset.
   * The difference from `createOffset()` is that you only create the hour offset and automatically
   * have the daylight saving time offset added.
   */
  createTimezoneOffset(
    timezone: number,
    hasSummertime: boolean = true,
    options?: PlainDateTimeOptions
  ) {
    const actualOffset = timezone + (hasSummertime && this.isSummerTime() ? 1 : 0);

    return this.createOffset({ hours: actualOffset }, options);
  }

  // VALIDATION #################################################################################

  /**
   * @param value to be validated as a valid dateTime with the corresponding constraints (options)
   * @param options constraints the value has to fulfill
   * @returns the value if the validation was successful
   * @throws various errors if not correct
   */
  public static validate(
    value: PlainDateTimeValue,
    options?: Omit<PlainDateTimeOptions, 'offset'>
  ): Required<PlainDateTimeObject> {
    const dateOptions = { ...options, name: this.prefix(options, 'date') };
    const timeOptions = { ...options, name: this.prefix(options, 'time') };
    let parsed = value;
    if (typeof parsed === 'string') {
      // stringified PlainDateTime (not the sateString "Tue, 23 Sep ...")
      if (parsed.includes('T') && !parsed.startsWith('T')) {
        const parts = parsed.split('T');

        return {
          ...PlainDate.validate(parts[0], dateOptions),
          ...PlainTime.validate(parts[1], timeOptions),
        };
      }
      if (/\d\d.\d\d.\d\d\d\d/.test(parsed) || /\d\d\d\d-\d\d-\d\d/.test(parsed)) {
        // stringified PlainDate
        return {
          ...PlainDate.validate(parsed, dateOptions),
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        };
      }

      // JS dateString (RFC2822 || ISO8601)
      const fromDate = Date.parse(parsed);
      // time in ms since 1970 as string
      const fromNumber = Number(parsed);
      if (!isNaN(fromDate)) {
        parsed = fromDate;
      } else if (!isNaN(fromNumber)) {
        parsed = fromNumber;
      } else {
        throw new TypeError(
          `${this.prefix(options)}the given (${parsed}: ${typeof parsed}) is not parsable!`
        );
      }
    }
    if (typeof parsed === 'number') {
      const date = new Date(parsed);

      return {
        year: date.getFullYear(),
        month: date.getUTCMonth(),
        date: date.getUTCDate(),
        hours: date.getUTCHours(),
        minutes: date.getUTCMinutes(),
        seconds: date.getUTCSeconds(),
        milliseconds: date.getUTCMilliseconds(),
      };
    }
    if (Array.isArray(parsed)) {
      return {
        ...PlainDate.validate([parsed[0], parsed[1], parsed[2]], dateOptions),
        ...PlainTime.validate([parsed[3], parsed[4], parsed[5], parsed[6]], dateOptions),
      };
    }

    if (typeof parsed === 'object' && parsed.year !== undefined) {
      return {
        ...PlainDate.validate(parsed, dateOptions),
        ...PlainTime.validate(parsed, dateOptions),
      };
    }

    throw new TypeError(
      `${this.prefix(options)}the given value is not a parsable Object, Array, or string!`
    );
  }

  // COMPARISON #################################################################################

  equals(obj: PlainDateTime | PlainDateTimeValue, density: PlainDateTimeDensity = 'milliseconds') {
    let comp;
    try {
      comp =
        obj instanceof PlainDateTime
          ? obj
          : PlainDateTime.create(obj, { name: 'PlainDate.equals' });
    } catch (error) {
      // definitely not equal
      return false;
    }
    const y = comp.year === this.year;
    const m = PDTD[density] >= 1 ? comp.month === this.month : true;
    const d = PDTD[density] >= 2 ? comp.date === this.date : true;
    const h = PDTD[density] >= 3 ? comp.hours === this.hours : true;
    const min = PDTD[density] >= 4 ? comp.minutes === this.minutes : true;
    const s = PDTD[density] >= 5 ? comp.seconds === this.seconds : true;
    const ms = PDTD[density] === 6 ? comp.milliseconds === this.milliseconds : true;

    return y && m && d && h && min && s && ms;
  }

  /**
   * compares this date with a given other `PlainDateTime` or `'now'` to compare it with the current dateTime.
   * - returns `-1` if this dateTime is earlier than the other one
   * - returns `0` if the dates are equal
   * - returns `1` if this dateTime is later than the other one
   *
   * ##### Examples
   * ```typescript
   * '2020-05-25'.compare('2020-09-18') => -1
   * '2020-05-25'.compare('2020-01-01') => 1
   * '2020-05-25'.compare('2020-05-06', 'months') => 0
   * ```
   * @param other the PlainDateTime to compare to / 'now' to use the current dateTime
   * @param density the density the comparison has to have
   * @returns `-1 | 0 | 1` indicating which dateTime is more recent
   */
  compare(
    other: PlainDateTime | 'now',
    density: PlainDateTimeDensity = 'milliseconds'
  ): -1 | 0 | 1 {
    const comp = (fst: number, snd: number) => (fst > snd ? 1 : -1);
    const b = other === 'now' ? PlainDateTime.now() : PlainDateTime.validate(other);
    const y = this.year === b.year ? 0 : comp(this.year, b.year);
    if (y !== 0) {
      return y;
    }
    const m = PDTD[density] < 1 || this.month === b.month ? 0 : comp(this.month, b.month);
    if (m !== 0) {
      return m;
    }
    const d = PDTD[density] < 2 || this.date === b.date ? 0 : comp(this.date, b.date);
    if (d !== 0) {
      return d;
    }
    const h = PDTD[density] < 3 || this.hours === b.hours ? 0 : comp(this.hours, b.hours);
    if (h !== 0) {
      return h;
    }
    const min = PDTD[density] < 4 || this.minutes === b.minutes ? 0 : comp(this.minutes, b.minutes);
    if (min !== 0) {
      return min;
    }
    const s = PDTD[density] < 5 || this.seconds === b.seconds ? 0 : comp(this.seconds, b.seconds);
    if (s !== 0) {
      return s;
    }

    return PDTD[density] < 6 || this.milliseconds === b.milliseconds
      ? 0
      : comp(this.milliseconds, b.milliseconds);
  }

  /**
   * compares this date with a given other `PlainDateTime` or `'now'` to compare it with the current dateTime
   * and returns the distance between both.
   * - distance = other - this
   *   - positive result = other dateTime was later
   *   - negative result = other dateTime was earlier
   * - units depending on density:
   *   - "years" | "months" | "days" = days
   *   - all other are fitting
   * @param other the PlainDate to compare to / 'now' to use the current date
   * @param density the density the comparison has to have
   * @returns the distance between the dates
   */
  distance(toOther: PlainDateTime | 'now', density: PlainDateTimeDensity = 'milliseconds') {
    const b = toOther === 'now' ? PlainDateTime.now() : toOther;
    const distance = b.toDate(density).getTime() - this.toDate(density).getTime();
    switch (PDTD[density]) {
      case 0:
      case 1:
      case 2:
        return distance / (1000 * 60 * 60 * 24);
      case 3:
        return distance / (1000 * 60 * 60);
      case 4:
        return distance / (1000 * 60);
      case 5:
        return distance / 1000;
      default:
        return distance;
    }
  }

  // SERIALIZATION #################################################################################

  toString() {
    return (
      [this.date, this.month + 1, this.year].join('.') +
      'T' +
      [this.hours, this.minutes, this.seconds].join(':') +
      '.' +
      this.milliseconds
    );
  }

  toJSON() {
    return {
      year: this.year,
      month: this.month,
      date: this.date,
      weekday: this.weekday,
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
      milliseconds: this.milliseconds,
    };
  }

  toDate(density: PlainDateTimeDensity = 'milliseconds', timeZoned: boolean = false) {
    const tzOff = new Date().getTimezoneOffset();
    const minutes = (PDTD[density] > 3 ? this.minutes : 0) + (timeZoned ? tzOff : 0);

    return new Date(
      Date.UTC(
        this.year,
        PDTD[density] > 0 ? this.month : 0,
        PDTD[density] > 1 ? this.date : 1,
        PDTD[density] > 2 ? this.hours : 0,
        minutes,
        PDTD[density] > 4 ? this.seconds : 0,
        PDTD[density] > 5 ? this.milliseconds : 0
      )
    );
  }
}

/** the density / accuracy to compare and create dateTimes */
export type PlainDateTimeDensity = keyof typeof PDTD;
enum PDTD {
  'years',
  'months',
  'days',
  'hours',
  'minutes',
  'seconds',
  'milliseconds',
}

export interface PlainDateTimeOptions extends CreationOptions {}
export interface PlainDateTimeNowOptions {
  density?: PlainDateTimeDensity;
}

PlainDateTime.create({ year: 2020 }).distance('now', 'minutes');
