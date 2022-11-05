import { Result } from '../basic/Result';
import { CreationOptions, ListCreationOptions, ValueObject } from './ValueObject';

/** ### A Boolean that is definitely a Boolean that (with options) can be undefined or a string
 *
 * @example
 * const sb = SafeBoolean.create(true, { name: 'MyBoolean' });
 * const stringSb = SafeBoolean.create('true');
 * const undefSb = SafeBoolean.create(undefined, { allowUndefinedAs: true });
 *
 * @throws
 * - `TypeError` if undefined (and not allowed to)
 * - `TypeError` if not a (parsable) boolean
 */
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
   * @throws `TypeError` if not a (parsable) boolean
   */
  public static validate(
    value: boolean | string | undefined,
    options?: SafeBooleanOptions
  ): Result<boolean> {
    let safeBoolean = value;
    if (safeBoolean === undefined) {
      if (options?.allowUndefinedAs === undefined) {
        return Result.fail<boolean>(
          new TypeError(`${this.prefix(options)}the given boolean has to be defined!`)
        );
      } else if (options?.allowUndefinedAs !== undefined) {
        safeBoolean = options.allowUndefinedAs === true; // otherwise = false
      }
    } else {
      safeBoolean =
        typeof safeBoolean === 'boolean' ? safeBoolean : (JSON.parse(safeBoolean) as boolean);
    }

    // type
    if (typeof safeBoolean !== 'boolean') {
      return Result.fail<boolean>(
        new TypeError(
          `${this.prefix(
            options
          )}the given value (${safeBoolean}: ${typeof safeBoolean}) has to be a (parsable) boolean!`
        )
      );
    }

    return Result.ok(safeBoolean);
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
  ): Result<SafeBoolean> {
    const valid = this.validate(value, options);
    return valid.isSuccess
      ? Result.ok(new SafeBoolean(valid.getValue()))
      : Result.fail<SafeBoolean>(valid.error);
  }

  /**
   * @param values an array of primitives to map to an array of ValueObjects
   * @param options constraints the values / list has to fulfill
   * @returns the array of ValueObjects
   */
  public static fromList(
    values: (boolean | string | undefined)[] | undefined,
    options?: SafeBooleanOptions & ListCreationOptions
  ): Result<SafeBoolean[]> {
    const list = this.validateList(values, options);
    if (list.isFailure) {
      return Result.fail(list.error);
    }
    return ValueObject.createList(list, (value) => this.create(value, options));
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
