import { IntegerString } from '../numeric/IntegerString';
import { CreationOptions, ListCreationOptions, ValueObject } from '../ValueObject';

type SemVerType = [IntegerString, IntegerString, IntegerString];

/** ### A SemVer version in form of "X.Y.Z"
 *
 * @example
 * const sv = SemVersion.create('12.4.5', { name: 'MyVersion' });
 * sv.numbers; // === [12, 4, 5]
 * sv.value; // === "12.4.5"
 */
export class SemVersion extends ValueObject<string> {
  private _version: SemVerType;

  private constructor(value: string, version: SemVerType) {
    super(value);
    this._version = version;
  }

  /**
   * the `number[]` representation of the version:
   * `"23.1.5"` => `[23, 1, 5]`
   */
  get numbers(): [number, number, number] {
    return IntegerString.toList(this._version) as [number, number, number];
  }

  // CREATION + VALIDATION ######################################################################
  /**
   * @param version to create the ValueObject of
   * @param options constraints the value has to fulfill
   * @returns the created ValueObject
   */
  public static create(version: string, options?: CreationOptions) {
    const { stringVersion, integerStringVersion } = this.validate(version, options);
    return new SemVersion(stringVersion, integerStringVersion);
  }

  /**
   * @param values an array of primitives to map to an array of ValueObjects
   * @param options constraints the values / list has to fulfill
   * @returns the array of ValueObjects
   */
  public static fromList(
    values: string[] | undefined,
    options?: CreationOptions & ListCreationOptions
  ): SemVersion[] {
    return this.validateList(values, options) ? values.map((val) => this.create(val, options)) : [];
  }

  /**
   * @param values an array of ValueObjects to map to an array of their values
   * @returns the array of values
   */
  public static toList(values: SemVersion[]): string[] {
    return values.map((sv) => sv.value);
  }

  // VALIDATION #################################################################################

  /**
   * @param value to be validated as a semantic version
   * @param options constraints the value has to fulfill
   * @returns the version as `string` and `IntegerString[]` if the validation was successful
   * @throws `TypeError` if not a parsable version numbers
   * @throws `RangeError` if the value has not allowed decimal digits
   * @throws `RangeError` if the value is not inside the interval
   */
  public static validate(version: string, options?: CreationOptions) {
    const integerStringVersion = IntegerString.fromList(version.split('.'), {
      name: options?.name ?? 'SemVersion.version',
      min: 0,
      listSize: { fix: 3 },
    }) as SemVerType;

    return { stringVersion: version, integerStringVersion };
  }

  // COMPARISON #################################################################################

  /**
   * compares this version with another version
   * @param other can also be a string representation
   * @returns if the `other` version is more recent
   */
  isMoreRecentThan(other: SemVersion | string): boolean {
    const ov = other instanceof SemVersion ? other.numbers : SemVersion.create(other).numbers;
    const tv = this.numbers;
    if (ov[0] > tv[0]) {
      return false;
    }
    if (ov[0] < tv[0]) {
      return true;
    }
    if (ov[1] > tv[1]) {
      return false;
    }
    if (ov[1] < tv[1]) {
      return true;
    }
    if (ov[2] > tv[2]) {
      return false;
    }
    if (ov[2] < tv[2]) {
      return true;
    }

    return false;
  }

  public equals(other: SemVersion | string): boolean {
    const ov = other instanceof SemVersion ? other.numbers : SemVersion.create(other).numbers;
    const tv = this.numbers;

    return ov[0] === tv[0] && ov[1] === tv[1] && ov[2] === tv[2];
  }
}
