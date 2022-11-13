import { Result } from '../../basic';
import { IntervalCreationOptions, ListCreationOptions, ValueObject } from '../ValueObject';

/** ### A String that can be also created from either `""` or `undefined`
 * - `undefined` ends up being converted to `""`
 *
 * @example
 * const optStr      = OptionalString.create('not empty', {name: 'MyOptStr'});
 * const optStr2     = OptionalString.create(''); // a.value === ''
 * const optStr3     = OptionalString.create(undefined); // a.value === ''
 * const sizeOptStr  = OptionalString.create('foo', {min: 3, max: 4});
 * const regexOptStr = OptionalString.create('foo', {regex: /fo/});
 *
 * // extract the Result:
 * if (optStr3.isSuccess()) {
 *   console.log(optStr3.getValue()) // OptionalString { _value: '' }
 * }
 *
 * @fails
 * - if not a string (when defined)
 * - if the value is not matching the regex (when defined)
 * - if the value is not inside the interval (when defined)
 */
export class OptionalString extends ValueObject<string> {
  protected constructor(value: string) {
    super(value);
  }

  public equals(obj: OptionalString | string | undefined): boolean {
    return (obj instanceof OptionalString ? obj.value : obj ?? '') === this._value;
  }

  // VALIDATION #################################################################################

  /**
   * @param value to be validated as a string with the corresponding constraints (options)
   * @returns the value if the validation was successful
   * @fails if not a string (when defined)
   * @fails if the value is not matching the regex (when defined)
   * @fails if the value is not inside the interval (when defined)
   */
  public static validate(value: string, options?: OptionalStringOptions): Result<string> {
    return this.validateString(value, options).chain(
      (val) => this.format(val, options),
      (val) => this.validateInterval(val, options),
      (val) => this.validateRegex(val, options)
    );
  }

  /**
   * @param value to be validated to match the given regular expression
   * @param options constraints the value has to fulfill
   * @fails if the value is not matching the regex (when defined)
   */
  protected static validateRegex(value: string, options?: OptionalStringOptions): Result<string> {
    if (options && options.regex && !options.regex.test(value)) {
      return Result.fail(
        `${this.prefix(
          options
        )}the given value (${value}: ${typeof value}) does not match the regular expression (${
          options.regex
        })!`
      );
    }

    return Result.ok(value);
  }

  /**
   * @param value to be validated as a valid string
   * @param options constraints the value has to fulfill
   * @fails if not a string
   */
  protected static validateString(value: string, options?: OptionalStringOptions): Result<string> {
    if (typeof value !== 'string') {
      return Result.fail(
        `${this.prefix(options)}the given value (${value}: ${typeof value}) has to be a string!`
      );
    }

    return Result.ok(value);
  }

  /** @TODO
   * **THIS METHOD IS DISABLED**
   * @param value to be formatted with the given formatting options
   * @param options constraints the value has to fulfill
   * @returns the formatted string
   * @fails if the formatting throws an error
   */
  protected static format(value: string, options?: OptionalStringOptions): Result<string> {
    return Result.ok(value);
    // try {
    //   return Result.ok(options?.format ? format(value, options?.format) : value);
    // } catch (error) {
    //   return Result.fail(
    //     `${this.prefix(options)}the given string is not formattable with (${options?.format})`
    //   );
    // }
  }

  // CREATION ###################################################################################

  /**
   * @param value to create the OptionalString of
   * @param options constraints the value has to fulfill
   * @returns a `Result` with the created OptionalString
   */
  public static create(
    value: string | undefined,
    options?: OptionalStringOptions
  ): Result<OptionalString> {
    return this.validate(value ?? '', options).convertTo((valid) => new OptionalString(valid));
  }

  /**
   * @param values an array of primitives to map to an array of OptionalStrings
   * @param options constraints the values / list has to fulfill
   * @returns a `Result` with an array of created OptionalStrings
   */
  public static fromList(
    values: string[] | undefined,
    options?: OptionalStringOptions & ListCreationOptions
  ): Result<OptionalString[]> {
    return ValueObject.createList(values, (value) => this.create(value, options), options);
  }

  /**
   * @param values an array of OptionalStrings to map to an array of their values
   * @returns the array of values
   */
  public static toList(values: OptionalString[]): string[] {
    return values.map((pes) => pes.value);
  }
}

/**
 * The options for any string. Strings can be matched with a `RegExp` and be `format`ted
 */
export interface OptionalStringOptions extends IntervalCreationOptions {
  /** a regular expression the given value must match */
  regex?: RegExp;
  /**
   * @alpha
   * an array of possible formatting operations:
   * - `'umlauts'`: replaces all unicode umlauts with the correct ones
   * - `'singleSpace'` converts all spaces with single spaces
   * - `'stripHTML'` deletes all HTML stuff, but converts line breaks and lists
   */
  // @TODO format?: FormatOptions;
}

// string formatting
export type FormatOptions = FormatOption[];
export type FormatOption = 'umlauts' | 'singleSpace' | 'stripHTML';
/* @TODO
export function format(text: string, options: FormatOptions): string {
  let r: { [key: string]: string } = options.includes('umlauts') ? umlauts : {};
  r = options.includes('stripHTML') ? { ...r, ...html } : r;
  // r = options.includes('entities') ? { ...r, ...entities } : r;

  const regex = new RegExp(Object.keys(r).join('|'), 'g');
  let result = text;
  // spaces must be shortened at first in order to not erase stripped <br>s
  result = options.includes('singleSpace') ? result.replace(/\s{2,}|\t+/g, ' ') : result;
  // replace the elements from the list
  result = result.replace(regex, (matched) => {
    if (matched.startsWith('<ul>')) {
      return matched
        .replace(/<ul>|<\/ul>/g, '')
        .split('<li>')
        .map((element) => `- ${element.replace('</li>', '').trim()}`)
        .filter((element) => element.length > 2)
        .join('\n');
    }

    return r[matched]?.length > 0 ? r[matched] : '';
  });
  // erase all other html tags (won't work with a list)
  result = options.includes('stripHTML') ? result.replace(/<[^>]*>/g, '') : result;

  return result;
}
const html = {
  '<br>': '\n',
  '<br/>': '\n',
  '<br />': '\n',
  '<ul>[^]*</ul>': '', // will be handeled separately
};
const umlauts = {
  '&auml;': 'ä',
  '&Auml;': 'Ä',
  '&ouml;': 'ö',
  '&Ouml;': 'Ö',
  '&uuml;': 'ü',
  '&Uuml;': 'Ü',
  '&amp;Uuml;': 'Ü',
  '&szlig;': 'ß',
  '&Szlig;': 'ẞ',
  '\u00e4': 'ä',
  '\u00c4': 'Ä',
  '\u00f6': 'ö',
  '\u00d6': 'Ö',
  '\u00fc': 'ü',
  '\u00dc': 'Ü',
  '\u00df': 'ß',
};
const entities = {
  '&amp;': '&',
  '&apos;': "'",
  '&#x27;': "'",
  '&#x2F;': '/',
  '&#39;': "'",
  '&#039;': "'",
  '&#47;': '/',
  '&#047;': '/',
  '&lt;': '<',
  '&gt;': '>',
  '&nbsp;': ' ',
  '&quot;': '"',
};
*/
