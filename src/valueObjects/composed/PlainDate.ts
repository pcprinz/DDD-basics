import { Integer } from '../numeric/Integer';
import { CreationOptions, ListCreationOptions, ValueObject } from '../ValueObject';

export interface PlainDateProps {
  year: number;
  month?: number;
  date?: number;
}

type YMD_Array = [year: number, month?: number, date?: number];
export type PlainDateable = PlainDateProps | YMD_Array | string;

export class PlainDate extends ValueObject<void> {
  // attributes

  readonly year: number;
  readonly month: number;
  readonly date: number;
  readonly weekday: number;

  // construction

  private constructor(props: Required<PlainDateProps>) {
    super();
    this.year = props.year;
    this.month = props.month;
    this.date = props.date;
    this.weekday = new Date(Date.UTC(props.year, props.month, props.date)).getUTCDay();
  }

  public static create(value: PlainDateable, options?: PlainDateOptions) {
    return new PlainDate(this.validate(value, options));
  }

  public static fromList(
    values: PlainDateable[] | undefined,
    options?: PlainDateOptions & ListCreationOptions
  ) {
    return this.validateList(values, options) ? values.map((val) => this.create(val, options)) : [];
  }

  public static now(options?: PlainDateOptions & PlainDateNowOptions) {
    const today = new Date(Date.now());
    const d = options?.density ?? 'YMD';

    return this.create(
      [
        today.getFullYear(),
        d.length > 1 ? today.getUTCMonth() : 0,
        d.length > 2 ? today.getUTCDate() : 1,
      ],
      options
    );
  }

  createSet(newData: Partial<PlainDateProps>, options?: PlainDateOptions) {
    return PlainDate.create(
      {
        year: newData.year ?? this.year,
        month: newData.month ?? this.month,
        date: newData.date ?? this.date,
      },
      options
    );
  }

  createOffset(offset: Partial<PlainDateProps>, options?: PlainDateOptions) {
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

  // validation

  public static validate(
    value: PlainDateable,
    options?: PlainDateOptions
  ): Required<PlainDateProps> {
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

  public static validatePlainDateable(
    value: PlainDateable,
    options?: PlainDateOptions
  ): PlainDateable {
    if (typeof value !== 'string' && !Array.isArray(value) && !value.year) {
      throw new TypeError(
        `${this.prefix(options)}the given value is not a parsable Object, Array, or string!`
      );
    }

    return value;
  }

  private static parseString(
    value: PlainDateable,
    options?: PlainDateOptions
  ): YMD_Array | PlainDateProps {
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

  // compairsion

  equals(obj: PlainDate | PlainDateable, density: PlainDateDensity = 'YMD') {
    let comp;
    try {
      comp = obj instanceof PlainDate ? obj : PlainDate.create(obj, { name: 'PlainDate.equals' });
    } catch (error) {
      // definitely not equal
      return false;
    }
    const y = comp.year === this.year;
    const m = density.length >= 2 ? comp.month === this.month : true;
    const d = density.length >= 3 ? comp.date === this.date : true;

    return y && m && d;
  }

  compare(other: PlainDate | 'now', density: PlainDateDensity = 'YMD'): -1 | 0 | 1 {
    const comp = (fst: number, snd: number) => (fst > snd ? 1 : -1);
    const b = other === 'now' ? PlainDate.now() : other;
    const y = this.year === b.year ? 0 : comp(this.year, b.year);
    if (y !== 0) {
      return y;
    }
    const m = density.length < 2 || this.month === b.month ? 0 : comp(this.month, b.month);
    if (m !== 0) {
      return m;
    }

    return density.length < 3 || this.date === b.date ? 0 : comp(this.date, b.date);
  }

  distance(toOther: PlainDate | 'now', density: PlainDateDensity = 'YMD') {
    const b = toOther === 'now' ? PlainDate.now() : toOther;
    const distance = this.toDate(density).getTime() - b.toDate(density).getTime();

    return distance / (1000 * 60 * 60 * 24);
  }

  // serialization

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

  toDate(density: PlainDateDensity = 'YMD') {
    return new Date(
      Date.UTC(this.year, density.length > 1 ? this.month : 0, density.length > 2 ? this.date : 1)
    );
  }
}

export type PlainDateDensity = 'Y' | 'YM' | 'YMD';

export type PlainDateOptions = CreationOptions;
export interface PlainDateNowOptions {
  density?: PlainDateDensity;
}
