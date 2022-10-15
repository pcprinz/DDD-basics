import { ListCreationOptions } from '../ValueObject';
import {
  PlainDateTime,
  PlainDateTimeable,
  PlainDateTimeDensity,
  PlainDateTimeNowOptions,
  PlainDateTimeOptions,
  PlainDateTimeProps,
} from './PlainDateTime';

export class Timestamp extends PlainDateTime {
  isExpired(range?: Partial<PlainDateTime>) {
    return this.createOffset(range ?? {}).compare(Timestamp.now()) < 1;
  }

  expiresIn(density?: PlainDateTimeDensity) {
    return -this.distance('now', density);
  }

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

  createGerman(options?: PlainDateTimeOptions) {
    return new Timestamp(super.createGerman(options));
  }
}
