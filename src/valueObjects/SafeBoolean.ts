import { CreationOptions, ListCreationOptions, ValueObject } from './ValueObject';

/** A Boolean that is definitely a Boolean that (with options) can be undefined or a string */
export class SafeBoolean extends ValueObject<boolean> {
  protected constructor(value: boolean) {
    super(value);
  }

  public equals(obj: SafeBoolean | boolean | string): boolean {
    const value = obj instanceof SafeBoolean ? obj.value : obj;
    let safeBoolean = value === undefined ? false : value;
    safeBoolean =
      typeof safeBoolean === 'boolean' ? safeBoolean : (JSON.parse(safeBoolean) as boolean);

    return safeBoolean === this._value;
  }

  // VALIDATION #################################################################################

  /**
   * @param value to be validated as a valid boolean / string representation of a boolean
   * @param options constraints the value has to fulfill
   * @returns the value if the validation was successful
   * @throws `TypeError` if undefined (and not allowed to)
   * @throws `TypeError` if not a boolean
   */
  public static validate(
    value: boolean | string | undefined,
    options?: SafeBooleanOptions
  ): boolean {
    let safeBoolean = value;
    if (safeBoolean === undefined) {
      if (options?.allowUndefinedAs === undefined) {
        throw new TypeError(`${this.prefix(options)}the given boolean has to be defined!`);
      } else if (options?.allowUndefinedAs !== undefined) {
        safeBoolean = options.allowUndefinedAs === true; // otherwise = false
      }
    } else {
      safeBoolean =
        typeof safeBoolean === 'boolean' ? safeBoolean : (JSON.parse(safeBoolean) as boolean);
    }

    // type
    if (typeof safeBoolean !== 'boolean') {
      throw new TypeError(
        `${this.prefix(
          options
        )}the given value (${safeBoolean}: ${typeof safeBoolean}) has to be a (parsable) boolean!`
      );
    }

    return safeBoolean;
  }

  // CREATION ###################################################################################

  /**
   * @param value to create the ValueObject of
   * @param options constraints the value has to fulfill
   * @returns the created ValueObject
   */
  public static create(
    value: boolean | string | undefined,
    options?: SafeBooleanOptions
  ): SafeBoolean {
    return new SafeBoolean(this.validate(value, options));
  }

  /**
   * @param values an array of primitives to map to an array of ValueObjects
   * @param options constraints the values / list has to fulfill
   * @returns the array of ValueObjects
   */
  public static fromList(
    values: (boolean | string | undefined)[] | undefined,
    options?: SafeBooleanOptions & ListCreationOptions
  ): SafeBoolean[] {
    return this.validateList(values, options) ? values.map((val) => this.create(val, options)) : [];
  }

  /**
   * @param values an array of ValueObjects to map to an array of their values
   * @returns the array of values
   */
  public static toList(values: SafeBoolean[]): boolean[] {
    return values.map((nes) => nes.value);
  }
}

export interface SafeBooleanOptions extends CreationOptions {
  /** should `undefined` be treated as a specific default. If this option remains `undefined`, the creation will throw
   * an error on undefined values
   */
  allowUndefinedAs?: true | false;
  // /** maps the boolean to string values used at `SafeBoolean.create()` as well as `SafeBoolean.toJSON()` */
  // mapping?: {
  //     true: string;
  //     false: string;
  // };
}
