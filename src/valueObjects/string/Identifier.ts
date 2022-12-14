import { v4 as uuid } from 'uuid';
import { Result } from '../../basic';
import { ListCreationOptions, ValueObject } from '../ValueObject';
import { NonEmptyString } from './NonEmptyString';
import { OptionalStringOptions } from './OptionalString';
/** ### An Identifier used for Entitied
 * @example
 * const id      = Identifier.create('foo', { name: 'MyID' });
 * const sizeId  = Identifier.create('long_enough', { min: 3, max: 69 });
 * const regexId = Identifier.create('foo', { regex: /oo/ });
 *
 * // extract the Result:
 * if (id.isSuccess()) {
 *   console.log(id.getValue()) // Identifier { _value: 'foo' }
 * }
 *
 * @fails
 * - if the value is not a string or empty
 * - if the value is not matching the regex
 * - if the value's length is not inside the interval
 */
export class Identifier extends NonEmptyString {
  /**
   * Creates an Identifier (`NonEmptyString`) from the given `id`.
   *
   * **If no id is given, a new uuid (v4) will be used!**
   *
   * @param value to create the Identifier of
   * @param options constraints for the structure of the string
   * @returns a `Result` with the created Identifier
   */
  public static create(id?: string, options?: IdentifierOptions): Result<Identifier> {
    return super.validate(id ?? uuid(), options).convertTo((valid) => new Identifier(valid));
  }

  /**
   * @param values an array of primitives to map to an array of Identifiers
   * @param options constraints the values / list has to fulfill
   * @returns a `Result` with an array of created Identifiers
   */
  public static fromList(
    values: string[] | undefined,
    options?: IdentifierOptions & ListCreationOptions
  ): Result<Identifier[]> {
    return ValueObject.createList(values, (value) => this.create(value, options), options);
  }

  /**
   * @param values an array of Identifiers to map to an array of their values
   * @returns the array of values
   */
  public static toList(values: Identifier[]): string[] {
    return values.map((id) => id.value);
  }
}

/**
 * The options for an `Identifier`:
 * - `regex?: RegExp` - a regular expression the string id has to match
 * - `min?: number` - minimum required length of the string id
 * - `max?: number` - maximum allowed length of the string id
 */
export interface IdentifierOptions extends Omit<OptionalStringOptions, 'format'> {}
