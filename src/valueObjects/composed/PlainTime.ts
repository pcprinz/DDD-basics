import { Integer } from '../numeric/Integer';
import { CreationOptions, ListCreationOptions, ValueObject } from '../ValueObject';

export type PlainTimeObject = {
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};
/** an array representation of `PlainTimeProps` */
export type PlainTimeArray = [
  hours?: number,
  minutes?: number,
  seconds?: number,
  milliseconds?: number
];
/** everything that might be parsable to a valid `PlainTime` */
export type PlainTimeValue = PlainTimeObject | PlainTimeArray | string;

/** This is a more simplified, but also flexible version of a `Date` which specifically represents just the time.
 * Related to `PlainDate` for dates and `PlaneDateTime` for a combination of both.
 */
export class PlainTime extends ValueObject<void> {
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly milliseconds: number;

  /** returns the time in `ms` since 1970 similar to `Date.getTime()`  */
  getTime(density: PlainTimeDensity) {
    return (
      this.hours * 3600000 +
      (density.length > 1 ? this.minutes * 60000 : 0) +
      (density.length > 2 ? this.seconds * 1000 : 0) +
      (density.length > 3 ? this.milliseconds : 0)
    );
  }

  private constructor(props: Required<PlainTimeObject>) {
    super();
    this.hours = props.hours;
    this.minutes = props.minutes;
    this.seconds = props.seconds;
    this.milliseconds = props.milliseconds;
  }

  // CREATION ###################################################################################

  /**
   * ### `PlainTimeable`
   * can be either `PlainTimeProps`:
   * ```typescript
   * {
   *  hours?: number;
   *  minutes?: number;
   *  seconds?: number;
   *  milliseconds?: number;
   * }
   * ```
   *
   * or `HMSs_Array`:
   * ```typescript
   * [hours?: number, minutes?: number, seconds?: number, milliseconds?: number]
   * ```
   *
   * or a `string` representation:
   * - `"HH"`
   * - `"HH:MM"`
   * - `"HH:MM:SS"`
   * - `"HH:MM:SS.sss+hh:mm"` (with offset)
   *
   * @param value to create the ValueObject of
   * @param options constraints the value has to fulfill
   * @returns the created ValueObject
   */
  public static create(value: PlainTimeValue, options?: PlainTimeOptions) {
    return new PlainTime(this.validate(value, options));
  }

  /**
   * @param values an array of primitives to map to an array of ValueObjects
   * @param options constraints the values / list has to fulfill
   * @returns the array of ValueObjects
   */
  public static fromList(
    values: PlainTimeValue[] | undefined,
    options?: PlainTimeOptions & ListCreationOptions
  ) {
    return this.validateList(values, options) ? values.map((val) => this.create(val, options)) : [];
  }

  /** creates a `PlainTime` from the current time. Similar to `new Date()` */
  public static now(options?: PlainTimeOptions & PlainTimeNowOptions) {
    const now = new Date(Date.now());
    const d = options?.density ?? 'HMSs';

    return this.create(
      [
        now.getUTCHours(),
        d.length > 1 ? now.getUTCMinutes() : 0,
        d.length > 2 ? now.getUTCSeconds() : 0,
        d.length > 3 ? now.getUTCMilliseconds() : 0,
      ],
      options
    );
  }

  /** creates a new `PlainTime` derived from the existing time, where the given `newData`
   * partial replaces the old data.
   */
  createSet(newData: Partial<PlainTimeObject>, options?: PlainTimeOptions) {
    return PlainTime.create(
      {
        hours: newData.hours ?? this.hours,
        minutes: newData.minutes ?? this.minutes,
        seconds: newData.seconds ?? this.seconds,
        milliseconds: newData.milliseconds ?? this.milliseconds,
      },
      options
    );
  }

  /** creates a new `PlainTime` derived from the existing time, with a given offset */
  createOffset(offset: Partial<PlainTimeObject>, options?: PlainTimeOptions) {
    const date = new Date(
      Date.UTC(
        0,
        0,
        1,
        this.hours + (offset.hours ?? 0),
        this.minutes + (offset.minutes ?? 0),
        this.seconds + (offset.seconds ?? 0),
        this.milliseconds + (offset.milliseconds ?? 0)
      )
    );

    return PlainTime.create(
      {
        hours: date.getUTCHours(),
        minutes: date.getUTCMinutes(),
        seconds: date.getUTCSeconds(),
        milliseconds: date.getUTCMilliseconds(),
      },
      options
    );
  }

  // VALIDATION #################################################################################

  /**
   * @param value to be validated as a valid time with the corresponding constraints (options)
   * @param options constraints the value has to fulfill
   * @returns the value if the validation was successful
   * @throws various errors if not correct
   */
  public static validate(
    value: PlainTimeValue,
    options?: PlainTimeOptions
  ): Required<PlainTimeObject> {
    value = this.validatePlainTimeable(value, options);
    value = this.parseString(value, options);
    const hours = (Array.isArray(value) ? value[0] : value.hours) ?? 0;
    const minutes = (Array.isArray(value) ? value[1] : value.minutes) ?? 0;
    const seconds = (Array.isArray(value) ? value[2] : value.seconds) ?? 0;
    const milliseconds = (Array.isArray(value) ? value[3] : value.milliseconds) ?? 0;
    Integer.validate(hours, { name: this.prefix(options, 'hours'), min: 0, max: 23 });
    Integer.validate(minutes, { name: this.prefix(options, 'minutes'), min: 0, max: 59 });
    Integer.validate(seconds, { name: this.prefix(options, 'seconds'), min: 0, max: 59 });
    Integer.validate(milliseconds, {
      name: this.prefix(options, 'milliseconds'),
      min: 0,
      max: 999,
    });

    return { hours, minutes, seconds, milliseconds };
  }

  /**
   * @param value to be validated as a string, array or object representation of time
   * @param options constraints the value has to fulfill
   * @returns the valid time
   */
  static validatePlainTimeable(
    value: PlainTimeValue,
    options: PlainTimeOptions | undefined
  ): PlainTimeValue {
    if (
      typeof value !== 'string' &&
      !Array.isArray(value) &&
      typeof value !== 'object' &&
      value !== undefined
    ) {
      throw new TypeError(
        `${this.prefix(
          options
        )}the given value is not a parsable Object, Array, string, or undefined!`
      );
    }

    return value;
  }

  private static parseString(
    value: PlainTimeValue,
    options?: PlainTimeOptions
  ): PlainTimeArray | PlainTimeObject {
    if (typeof value === 'string') {
      // single hour
      if (value.length <= 2 && /\d{1,2}/.test(value)) {
        return [Number(value)];
      }
      // HH:MM
      if (value.length <= 5 && /\d{1,2}:\d\d/.test(value)) {
        const parts = value.split(':');

        return [Number(parts[0]), Number(parts[1])];
      }
      // HH:MM:SS
      if (value.length <= 8 && /\d{1,2}:\d\d:\d\d/.test(value)) {
        const parts = value.split(':');

        return [Number(parts[0]), Number(parts[1]), Number(parts[2])];
      }
      // HH:MM:SS.sss
      if (value.length <= 13 && /\d{1,2}:\d\d:\d\d\.\d{1,3}Z?/.test(value)) {
        const parts = value.split(':');
        const secMs = parts[2].split('.');
        const ms = secMs[1]?.endsWith('Z') ? secMs[1].slice(0, -1) : secMs[1];

        return [Number(parts[0]), Number(parts[1]), Number(secMs[0]), Number(ms)];
      }
      // HH:MM:SS.sss+hh:mm
      if (value.length <= 14 && /\d{1,2}:\d\d:\d\d\+\d\d:\d\d/.test(value)) {
        const outer = value.split('+');
        const times = outer[0].split(':');
        const offs = outer[1].split(':'); // TODO timezones

        return [Number(times[0]), Number(times[1]), Number(times[2])];
      }
      throw new TypeError(
        `${this.prefix(options)}the given (${value}: ${typeof value}) is not parsable!`
      );
    } else {
      return value;
    }
  }

  // COMPARISON #################################################################################

  equals(obj: PlainTime | PlainTimeValue, density: PlainTimeDensity = 'HMSs') {
    let comp;
    try {
      comp = obj instanceof PlainTime ? obj : PlainTime.create(obj, { name: 'PlainTime.equals' });
    } catch (error) {
      // definitely not equal
      return false;
    }
    const h = comp.hours === this.hours;
    const m = density.length >= 2 ? comp.minutes === this.minutes : true;
    const s = density.length >= 3 ? comp.seconds === this.seconds : true;
    const ms = density.length === 4 ? comp.milliseconds === this.milliseconds : true;

    return h && m && s && ms;
  }

  /**
   * compares this time with a given other `PlainTime` or `'now'` to compare it with the current time.
   * - returns `-1` if this time is earlier than the other one
   * - returns `0` if the times are equal
   * - returns `1` if this time is sooner than the other one
   *
   * ##### Examples
   * ```typescript
   * '05:24:57'.compare('08:15:30') => -1
   * '05:24:57'.compare('01:00:00') => 1
   * '05:24:57'.compare('05:00:01', 'H') => 0 (with density)
   * ```
   * @param other the PlainTime to compare to / 'now' to use the current time
   * @param density the density the comparison has to have
   * @returns `-1 | 0 | 1` indicating which time is more recent
   */
  compare(other: PlainTime | 'now', density: PlainTimeDensity = 'HMSs'): -1 | 0 | 1 {
    const comp = (fst: number, snd: number) => (fst > snd ? 1 : -1);
    const b = other === 'now' ? PlainTime.now() : PlainTime.validate(other);
    const h = this.hours === b.hours ? 0 : comp(this.hours, b.hours);
    if (h !== 0) {
      return h;
    }
    const m = density.length < 2 || this.minutes === b.minutes ? 0 : comp(this.minutes, b.minutes);
    if (m !== 0) {
      return m;
    }
    const s = density.length < 3 || this.seconds === b.seconds ? 0 : comp(this.seconds, b.seconds);
    if (s !== 0) {
      return s;
    }

    return density.length < 4 || this.milliseconds === b.milliseconds
      ? 0
      : comp(this.milliseconds, b.milliseconds);
  }

  /**
   * compares this time with a given other `PlainTime` or `'now'` to compare it with the current time
   * and returns the distance between both.
   * - distance = other - this
   *   - positive result = other time was later
   *   - negative result = other time was earlier
   * - units depending on density:
   *   - "H" = hours
   *   - "HM" = minutes
   *   - "HMS" = seconds
   *   - "HMSs" = milliseconds (default)
   * @param other the PlainTime to compare to / 'now' to use the current time
   * @param density the density the comparison has to have
   * @returns the distance whereas the unit correlates to the given density (defaults to `ms`)
   */
  distance(toOther: PlainTime | 'now', density: PlainTimeDensity = 'HMSs') {
    const b = toOther === 'now' ? PlainTime.now() : toOther;
    const distance = b.getTime(density) - this.getTime(density);
    switch (density.length) {
      case 1:
        return distance / (1000 * 60 * 60);
      case 2:
        return distance / (1000 * 60);
      case 3:
        return distance / 1000;
      default:
        return distance;
    }
  }

  // SERIALIZATION #################################################################################

  toString() {
    return `${[this.hours, this.minutes, this.seconds].join(':')}.${this.milliseconds}`;
  }

  toJSON() {
    return {
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
      milliseconds: this.milliseconds,
    };
  }
}

/**
 * the density / accuracy to compare and create times
 * - "H" = hours
 * - "HM" = minutes
 * - "HMS" = seconds
 * - "HMSs" = milliseconds
 */
export type PlainTimeDensity = 'H' | 'HM' | 'HMS' | 'HMSs';

export interface PlainTimeOptions extends CreationOptions {}
export interface PlainTimeNowOptions {
  density?: PlainTimeDensity;
}
