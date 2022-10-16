import { IntervalCreationOptions, ListCreationOptions, ValueObject } from '../ValueObject';

/** A String that can be also created from  either `"" | undefined | null` (falsy values) => ends up being converted to `""` */
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
   * @throws {@link TypeError} if not a string (when defined)
   * @throws {@link TypeError} if doesn't fit the given enum (when defined)
   * @throws {@link RangeError} if the value is not matching the regex (when defined)
   * @throws {@link RangeError} if the value is not inside the interval (when defined)
   */
  public static validate(value: string, options?: OptionalStringOptions): string {
    let result = value;
    this.validateString(result, options);
    if (result.length > 0 && options) {
      result = this.format(result, options);
      this.validateInterval(result, options);
      this.validateRegex(result, options);
    }

    return result;
  }

  /**
   * @param value to be validated to match the given regular expression
   * @param options constraints the value has to fulfill
   */
  protected static validateRegex(value: string, options: OptionalStringOptions): void {
    if (options.regex && !options.regex.test(value)) {
      throw new RangeError(
        `${this.prefix(
          options
        )}the given value (${value}: ${typeof value}) does not match the regular expression (${
          options.regex
        })!`
      );
    }
  }

  /**
   * @param value to be validated as a valid string
   * @param options constraints the value has to fulfill
   */
  protected static validateString(value: string, options?: OptionalStringOptions): void {
    if (typeof value !== 'string') {
      throw new TypeError(
        `${this.prefix(options)}the given value (${value}: ${typeof value}) has to be a string!`
      );
    }
  }

  /**
   *
   * @param value to be formatted with the given formatting options
   * @param options constraints the value has to fulfill
   * @returns the formatted string
   * @throws {@link Error} if the formatting failed
   */
  protected static format(value: string, options?: OptionalStringOptions): string {
    try {
      return options?.format ? format(value, options?.format) : value;
    } catch (error) {
      throw new Error(
        `${this.prefix(options)}the given string is not formattable with (${options?.format})`
      );
    }
  }

  // CREATION ###################################################################################

  /**
   * @param value to create the ValueObject of
   * @param options constraints the value has to fulfill
   * @returns the created ValueObject
   */
  public static create(value: string | undefined, options?: OptionalStringOptions): OptionalString {
    return new OptionalString(this.validate(value ?? '', options));
  }

  /**
   * @param values an array of primitives to map to an array of ValueObjects
   * @param options constraints the values / list has to fulfill
   * @returns the array of ValueObjects
   */
  public static fromList(
    values: string[] | undefined,
    options?: OptionalStringOptions & ListCreationOptions
  ): OptionalString[] {
    return this.validateList(values, options) ? values.map((val) => this.create(val, options)) : [];
  }

  /**
   * @param values an array of ValueObjects to map to an array of their values
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
  /** an array of possible formatting operations:
   * - `'umlauts'`: replaces all unicode umlauts with the correct ones
   * - `'singleSpace'` converts all spaces with single spaces
   * - `'stripHTML'` deletes all HTML stuff, but converts line breaks and lists
   */
  format?: FormatOptions;
}

// string formatting

export type FormatOptions = FormatOption[];
export type FormatOption = 'umlauts' | 'singleSpace' | 'stripHTML';
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
