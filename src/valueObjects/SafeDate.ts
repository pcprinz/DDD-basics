import { CreationOptions, ListCreationOptions, ValueObject } from './ValueObject';

/** a Date that is definitely a Date that can be created from either a Date or a string that
 * represents a Date or a number that represents the Time in ms */
export class SafeDate extends ValueObject<Date> {
  protected constructor(value: Date) {
    super(value);
  }

  public equals(obj: SafeDate | Dateable): boolean {
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
   * {@inheritDoc SafeDate!}
   * @param value to be validated as a valid Date
   * @param options constraints the value has to fulfill
   * @returns the value if the validation was successful
   * @throws {@link TypeError} if not parsable to a valid Date
   *
   */
  public static validate(value: Dateable, options?: SafeDateOptions): Date {
    // safe date
    const safeDate: Date = SafeDate.validateDate(value, options);

    if (options) {
      // interval
      const safeMin =
        options.min !== undefined
          ? this.validate(options.min, { name: `${options.name}.min` })
          : undefined;
      const safeMax =
        options.max !== undefined
          ? this.validate(options.max, { name: `${options.name}.max` })
          : undefined;
      if (
        (safeMin && safeDate.getTime() < safeMin.getTime()) ||
        (safeMax && safeDate.getTime() > safeMax.getTime())
      ) {
        throw new RangeError(
          `${this.prefix(options)}the given Date (${safeDate}) must be in the interval [${
            safeMin ?? '*'
          }, ${safeMax ?? '*'}]!`
        );
      }
    }

    return safeDate;
  }

  private static validateDate(value: Dateable, options?: SafeDateOptions): Date {
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

  static parseDottedFormat(value: Dateable): Dateable {
    if (typeof value === 'string' && /\d\d.\d\d.\d\d\d\d/.test(value)) {
      const parts = value.split('.');

      return new Date(Date.UTC(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0])));
    }

    return value;
  }

  // VALIDATION #################################################################################

  /**
   * @param value to create a PositiveIntegerString from
   * @param options for the creation
   * @returns the created ValueObject
   */
  public static create(value: Dateable, options?: SafeDateOptions): SafeDate {
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
    values: Dateable[] | undefined,
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

export type Dateable = Date | string | number;

export interface SafeDateOptions extends CreationOptions {
  max?: Dateable;
  min?: Dateable;
}
