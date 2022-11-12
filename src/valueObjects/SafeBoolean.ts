import { Result } from '../basic/Result';
import { CreationOptions, ListCreationOptions, ValueObject } from './ValueObject';

/** ### A Boolean that is definitely a Boolean that (with options) can be undefined or a string
 *
 * @example
 * const sb       = SafeBoolean.create(true, { name: 'MyBoolean' });
 * const stringSb = SafeBoolean.create('true');
 * const undefSb  = SafeBoolean.create(undefined, { allowUndefinedAs: true });
 *
 * // extract the Result:
 * if (sb.isSuccess()) {
 *   console.log(sb.getValue()) // SafeBoolean { _value: true }
 * }
 *
 * @fails
 * - if undefined (and not allowed to)
 * - if not a (parsable) boolean
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
   * @fails if undefined (and not allowed to)
   * @fails if not a (parsable) boolean
   */
  public static validate(
    value: boolean | string | undefined,
    options?: SafeBooleanOptions
  ): Result<boolean> {
    let defined = value;
    if (defined === undefined) {
      if (options?.allowUndefinedAs === undefined) {
        return Result.fail(`${this.prefix(options)}the given boolean has to be defined!`);
      } else if (options?.allowUndefinedAs !== undefined) {
        defined = options.allowUndefinedAs === true; // otherwise = false
      }
    } else {
      try {
        defined = typeof defined === 'boolean' ? defined : (JSON.parse(defined) as boolean);
      } catch (error) {
        return Result.fail(
          `${this.prefix(
            options
          )}the given value (${defined}: ${typeof defined}) can not be parsed to a boolean!`
        );
      }
    }

    // type
    if (typeof defined !== 'boolean') {
      return Result.fail(
        `${this.prefix(
          options
        )}the given value (${defined}: ${typeof defined}) has to be a (parsable) boolean!`
      );
    }

    return Result.ok(defined);
  }

  // CREATION ###################################################################################

  /**
   * @param value to create the SafeBoolean of
   * @param options constraints the value has to fulfill
   * @returns a `Result` with the created SafeBoolean
   */
  public static create(
    value: boolean | string | undefined,
    options?: SafeBooleanOptions
  ): Result<SafeBoolean> {
    return this.validate(value, options).convertTo((valid) => new SafeBoolean(valid));
  }

  /**
   * @param values an array of primitives to map to an array of SafeBooleans
   * @param options constraints the values / list has to fulfill
   * @returns a `Result` with an array of created SafeBooleans
   */
  public static fromList(
    values: (boolean | string | undefined)[] | undefined,
    options?: SafeBooleanOptions & ListCreationOptions
  ): Result<SafeBoolean[]> {
    return ValueObject.createList(values, (value) => this.create(value, options), options);
  }

  /**
   * @param values an array of SafeBooleans to map to an array of their values
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
