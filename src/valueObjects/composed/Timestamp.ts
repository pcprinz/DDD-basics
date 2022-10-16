import { ListCreationOptions } from '../ValueObject';
import {
  PlainDateTime,
  PlainDateTimeable,
  PlainDateTimeDensity,
  PlainDateTimeNowOptions,
  PlainDateTimeOptions,
  PlainDateTimeProps,
} from './PlainDateTime';

/** a special version of a `PlainDateTime` which offers expire calculations */
export class Timestamp extends PlainDateTime {
  /**
   * @param range to add to the existing Timestamp
   * @returns if the timestamp (incl. range) is expired
   */
  isExpired(range?: Partial<PlainDateTime>) {
    return this.createOffset(range ?? {}).compare(Timestamp.now()) < 1;
  }

  /** returns the (negative) distance from the timestamp to "now" */
  expiresIn(density?: PlainDateTimeDensity) {
    return -this.distance('now', density);
  }

  /**
   * creates a timestamp with an offset to "now" e.g. 1h in the future:
   * ```typescript
   * const soon = Timestamp.in({hours: 1});
   * soon.expiresIn('YMDH');  // 1
   * soon.isExpired();        // false
   * ```
   */
  public static in(offset: Partial<PlainDateTimeProps>, options?: PlainDateTimeOptions) {
    return Timestamp.now().createOffset(offset, options);
  }

  // Overwritten creation

  public static create(value: PlainDateTimeable, options?: PlainDateTimeOptions): Timestamp {
    return new Timestamp(super.validate(value, options));
  }

  public static fromList(
    values: PlainDateTimeable[] | undefined,
    options?: PlainDateTimeOptions & ListCreationOptions
  ): Timestamp[] {
    return this.validateList(values, options) ? values.map((val) => this.create(val, options)) : [];
  }

  public static now(options?: PlainDateTimeOptions & PlainDateTimeNowOptions): Timestamp {
    return new Timestamp(super.now(options));
  }

  createSet(newData: Partial<PlainDateTimeProps>, options?: PlainDateTimeOptions): Timestamp {
    return new Timestamp(super.createSet(newData, options));
  }

  createOffset(offset: Partial<PlainDateTimeProps>, options?: PlainDateTimeOptions): Timestamp {
    return new Timestamp(super.createOffset(offset, options));
  }

  createTimezoneOffset(
    timezone: number,
    hasSummertime: boolean = true,
    options?: PlainDateTimeOptions
  ) {
    return new Timestamp(super.createTimezoneOffset(timezone, hasSummertime, options));
  }
}
