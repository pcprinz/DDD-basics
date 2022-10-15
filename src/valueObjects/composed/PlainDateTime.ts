import { CreationOptions, ListCreationOptions, ValueObject } from '../ValueObject';
import { PlainDate } from './PlainDate';
import { PlainTime } from './PlainTime';

export interface PlainDateTimeProps {
  year: number;
  month?: number;
  date?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

export type YMD_Array = [
  year: number,
  month?: number,
  date?: number,
  hours?: number,
  minutes?: number,
  seconds?: number,
  milliseconds?: number
];
export type PlainDateTimeable = PlainDateTimeProps | YMD_Array | string | number;

export class PlainDateTime extends ValueObject<void> {
  // attributes

  readonly year: number;
  readonly month: number;
  readonly date: number;
  readonly weekday: number;

  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly milliseconds: number;

  get dayMinutes() {
    return this.hours * 60 + this.minutes;
  }

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

  isToday() {
    const now = new Date(Date.now());

    return (
      this.year === now.getFullYear() &&
      this.month === now.getUTCMonth() &&
      this.date === now.getUTCDate()
    );
  }

  // construction

  protected constructor(props: Required<PlainDateTimeProps>) {
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

  public static create(value: PlainDateTimeable, options?: PlainDateTimeOptions) {
    return new PlainDateTime(this.validate(value, options));
  }

  public static fromList(
    values: PlainDateTimeable[] | undefined,
    options?: PlainDateTimeOptions & ListCreationOptions
  ) {
    return this.validateList(values, options) ? values.map((val) => this.create(val, options)) : [];
  }

  public static now(options?: PlainDateTimeOptions & PlainDateTimeNowOptions) {
    const now = new Date(Date.now());
    const d = options?.density ?? 'YMDHMSs';

    return this.create(
      [
        now.getFullYear(),
        d.length > 1 ? now.getUTCMonth() : 0,
        d.length > 2 ? now.getUTCDate() : 1,
        d.length > 3 ? now.getUTCHours() : 0,
        d.length > 4 ? now.getUTCMinutes() : 0,
        d.length > 5 ? now.getUTCSeconds() : 0,
        d.length > 6 ? now.getUTCMilliseconds() : 0,
      ],
      options
    );
  }

  createSet(newData: Partial<PlainDateTimeProps>, options?: PlainDateTimeOptions) {
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

  createOffset(offset: Partial<PlainDateTimeProps>, options?: PlainDateTimeOptions) {
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

  createGerman(options?: PlainDateTimeOptions) {
    const now = new Date();
    const then = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
    const actualOffset = now.getTimezoneOffset() > then.getTimezoneOffset() ? 1 : 2;

    return this.createOffset({ hours: actualOffset }, options);
  }

  // validation := |=

  public static validate(
    value: PlainDateTimeable,
    options?: Omit<PlainDateTimeOptions, 'offset'>
  ): Required<PlainDateTimeProps> {
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

  // compairsion

  equals(obj: PlainDateTime | PlainDateTimeable, density: PlainDateTimeDensity = 'YMDHMSs') {
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
    const m = density.length >= 2 ? comp.month === this.month : true;
    const d = density.length >= 3 ? comp.date === this.date : true;
    const h = density.length >= 4 ? comp.hours === this.hours : true;
    const min = density.length >= 5 ? comp.minutes === this.minutes : true;
    const s = density.length >= 6 ? comp.seconds === this.seconds : true;
    const ms = density.length === 7 ? comp.milliseconds === this.milliseconds : true;

    return y && m && d && h && min && s && ms;
  }

  /**
   * compares this date with a given other `PlainDate` or `'now'` to compair it with the current time.
   * - returns `-1` if this date is older then the other
   * - returns `0` if the dates are equal
   * - returns `1` if this date is more recent than the other one
   *
   * ##### Examples
   * ```typescript
   * '2020-05-25'.compare('2020-09-18') => -1
   * '2020-05-25'.compare('2020-01-01') => 1
   * '2020-05-25'.compare('2020-05-06', 'YM') => 0
   * ```
   * @param other the PlainDate to compare to / 'now' to use the current time
   * @param density the density the comparison has to have
   * @returns `-1 | 0 | 1` indicating which date is more recent
   */
  compare(other: PlainDateTime | 'now', density: PlainDateTimeDensity = 'YMDHMSs'): -1 | 0 | 1 {
    const comp = (fst: number, snd: number) => (fst > snd ? 1 : -1);
    const b = other === 'now' ? PlainDateTime.now() : other;
    const y = this.year === b.year ? 0 : comp(this.year, b.year);
    if (y !== 0) {
      return y;
    }
    const m = density.length < 2 || this.month === b.month ? 0 : comp(this.month, b.month);
    if (m !== 0) {
      return m;
    }
    const d = density.length < 3 || this.date === b.date ? 0 : comp(this.date, b.date);
    if (d !== 0) {
      return d;
    }
    const h = density.length < 4 || this.hours === b.hours ? 0 : comp(this.hours, b.hours);
    if (h !== 0) {
      return h;
    }
    const min =
      density.length < 5 || this.minutes === b.minutes ? 0 : comp(this.minutes, b.minutes);
    if (min !== 0) {
      return min;
    }
    const s = density.length < 6 || this.seconds === b.seconds ? 0 : comp(this.seconds, b.seconds);
    if (s !== 0) {
      return s;
    }

    return density.length < 7 || this.milliseconds === b.milliseconds
      ? 0
      : comp(this.milliseconds, b.milliseconds);
  }

  /** other - this */
  distance(toOther: PlainDateTime | 'now', density: PlainDateTimeDensity = 'YMDHMSs') {
    const b = toOther === 'now' ? PlainDateTime.now() : toOther;
    const distance = b.toDate(density).getTime() - this.toDate(density).getTime();
    switch (density.length) {
      case 1:
      case 2:
      case 3:
        return distance / (1000 * 60 * 60 * 24);
      case 4:
        return distance / (1000 * 60 * 60);
      case 5:
        return distance / (1000 * 60);
      case 6:
        return distance / 1000;
      default:
        return distance;
    }
  }

  // serialization

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

  toDate(density: PlainDateTimeDensity = 'YMDHMSs', timeZoned: boolean = false) {
    const tzOff = new Date().getTimezoneOffset();
    const minutes = (density.length > 4 ? this.minutes : 0) + (timeZoned ? tzOff : 0);

    return new Date(
      Date.UTC(
        this.year,
        density.length > 1 ? this.month : 0,
        density.length > 2 ? this.date : 1,
        density.length > 3 ? this.hours : 0,
        minutes,
        density.length > 5 ? this.seconds : 0,
        density.length > 6 ? this.milliseconds : 0
      )
    );
  }
}

export type PlainDateTimeDensity = 'Y' | 'YM' | 'YMD' | 'YMDH' | 'YMDHM' | 'YMDHMS' | 'YMDHMSs';

export type PlainDateTimeOptions = CreationOptions;
export interface PlainDateTimeNowOptions {
  density?: PlainDateTimeDensity;
}
