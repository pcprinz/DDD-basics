import { Result } from '../../basic';
import { ListCreationOptions } from '../ValueObject';
import { Integer, IntegerOptions } from './Integer';

/** ### An Integer (`number` without decimal digits) that can also be created from a string representation of an integer
 * - this is an extension of {@link Integer}, so you can also create from `number`s
 *
 * @example
 * const intString1      = IntegerString.create(42, { name: 'MyInteger' });
 * const roundIntString1 = IntegerString.create(42.6, { round: 'floor' });
 * const rangeIntString1 = IntegerString.create(42, { min: 12, max: 43 });
 * const intString2      = IntegerString.create('42', { name: 'MyInteger' });
 * const roundIntString2 = IntegerString.create('42.6', { round: 'floor' });
 * const rangeIntString2 = IntegerString.create('42', { min: 12, max: 43 });
 *
 * // extract the Result:
 * if (intString2.isSuccess()) {
 *   console.log(intString2.getValue()) // IntegerString { _value: 42 }
 * }
 *
 * @fails
 * - if not a parsable integer
 * - if the value has not allowed decimal digits
 * - if the value is not inside the interval
 */
export class IntegerString extends Integer {
  protected constructor(value: number) {
    super(value);
  }

  public equals(obj: IntegerString | number | string): boolean {
    let comp = obj instanceof IntegerString ? obj.value : obj;
    comp = typeof comp === 'number' ? comp : IntegerString.parse(comp);

    return comp === this._value;
  }

  // VALIDATION #################################################################################

  /**
   * @param value to be validated as an integer with the corresponding constraints (options)
   * @param options constraints the value has to fulfill
   * @returns the value if the validation was successful
   * @fails if not a parsable integer
   * @fails if the value has not allowed decimal digits
   * @fails if the value is not inside the interval
   */
  public static validate(value: number | string, options?: IntegerStringOptions): Result<number> {
    return this.validateIntegerString(value, options).chain((valid) =>
      super.validate(valid, options)
    );
  }

  /**
   * @param value to be validated as a valid integer / string representation of an integer
   * @param options constraints the value has to fulfill
   * @returns the (possibly parsed) integer (`number`)
   * @fails if the value is not a parsable number
   */
  protected static validateIntegerString(
    value: number | string,
    options?: IntegerStringOptions
  ): Result<number> {
    if (typeof value !== 'number') {
      const parsed = this.parse(value);
      if (isNaN(parsed)) {
        return Result.fail(
          `${super.prefix(
            options
          )}the given value (${value}: ${typeof value}) must be a number or a string representing a number!`
        );
      }

      return Result.ok(parsed);
    }

    return Result.ok(value);
  }

  /**
   * parses the given string to an integer (number).
   * @param value to parse (unchecked)
   * @returns the parsed number **OR** `NaN` if not parsable
   */
  public static parse(value: string): number {
    return parseInt(value, 10);
  }

  // CREATION ###################################################################################

  /**
   * @param value to create the IntegerString of
   * @param options constraints the value has to fulfill
   * @returns a `Result` with the created IntegerString
   */
  public static create(
    value: number | string,
    options?: IntegerStringOptions
  ): Result<IntegerString> {
    return this.validate(value, options).convertTo((valid) => new IntegerString(valid));
  }

  /**
   * @param values an array of primitives to map to an array of IntegerStrings
   * @param options constraints the values / list has to fulfill
   * @returns a `Result` with an array of created IntegerStrings
   */
  public static fromList(
    values: (number | string)[] | undefined,
    options?: IntegerStringOptions & ListCreationOptions
  ): Result<IntegerString[]> {
    return IntegerString.createList(values, (value) => this.create(value, options), options);
  }

  /**
   * @param values an array of IntegerStrings to map to an array of their values
   * @returns the array of values
   */
  public static toList(values: IntegerString[]): number[] {
    return values.map((pi) => pi.value);
  }
}

export interface IntegerStringOptions extends IntegerOptions {}
