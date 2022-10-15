import { Integer } from '../numeric/Integer';
import { CreationOptions, ListCreationOptions, ValueObject } from '../ValueObject';

export interface PlainTimeProps {
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

type HMSs_Array = [hours?: number, minutes?: number, seconds?: number, milliseconds?: number];
type PlainTimeable = PlainTimeProps | HMSs_Array | string;

export class PlainTime extends ValueObject<void> {
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly milliseconds: number;

  getTime(density: PlainTimeDensity) {
    return (
      this.hours * 3600000 +
      (density.length > 1 ? this.minutes * 60000 : 0) +
      (density.length > 2 ? this.seconds * 1000 : 0) +
      (density.length > 3 ? this.milliseconds : 0)
    );
  }

  // construction

  private constructor(props: Required<PlainTimeProps>) {
    super();
    this.hours = props.hours;
    this.minutes = props.minutes;
    this.seconds = props.seconds;
    this.milliseconds = props.milliseconds;
  }

  public static create(value: PlainTimeable, options?: PlainTimeOptions) {
    return new PlainTime(this.validate(value, options));
  }

  public static fromList(
    values: PlainTimeable[] | undefined,
    options?: PlainTimeOptions & ListCreationOptions
  ) {
    return this.validateList(values, options) ? values.map((val) => this.create(val, options)) : [];
  }

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

  createSet(newData: Partial<PlainTimeProps>, options?: PlainTimeOptions) {
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

  createOffset(offset: Partial<PlainTimeProps>, options?: PlainTimeOptions) {
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

  // validation

  public static validate(
    value: PlainTimeable,
    options?: PlainTimeOptions
  ): Required<PlainTimeProps> {
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

  static validatePlainTimeable(
    value: PlainTimeable,
    options: PlainTimeOptions | undefined
  ): PlainTimeable {
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
    value: PlainTimeable,
    options?: PlainTimeOptions
  ): HMSs_Array | PlainTimeProps {
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

  // compairsion

  equals(obj: PlainTime | PlainTimeable, density: PlainTimeDensity = 'HMSs') {
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

  compare(other: PlainTime | 'now', density: PlainTimeDensity = 'HMSs'): -1 | 0 | 1 {
    const comp = (fst: number, snd: number) => (fst > snd ? 1 : -1);
    const b = other === 'now' ? PlainTime.now() : other;
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

  distance(toOther: PlainTime | 'now', density: PlainTimeDensity = 'HMSs') {
    const b = toOther === 'now' ? PlainTime.now() : toOther;
    const distance = this.getTime(density) - b.getTime(density);
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

  // serialization

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

export type PlainTimeDensity = 'H' | 'HM' | 'HMS' | 'HMSs';

export type PlainTimeOptions = CreationOptions;
export interface PlainTimeNowOptions {
  density?: PlainTimeDensity;
}
