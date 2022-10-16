import { IntegerString } from '../numeric/IntegerString';

/** the SemVer version in form of "X.Y.Z" */
export class SemVersion {
  private _version: IntegerString[];

  constructor(version: string) {
    this._version = IntegerString.fromList(version.split('.'), {
      name: 'SemVersion.version',
      min: 0,
      listSize: { fix: 3 },
    });
  }

  /**
   * the `number[]` representation of the version:
   * `"23.1.5"` => `[23, 1, 5]`
   */
  get numbers(): [number, number, number] {
    return IntegerString.toList(this._version) as [number, number, number];
  }

  /**
   * the string representation of the version
   */
  get string(): string {
    return IntegerString.toList(this._version).join('.');
  }

  /**
   * compares this version with another version
   * @param other can also be a string representation
   * @returns if the `other` version is more recent
   */
  isMoreRecentThan(other: SemVersion | string): boolean {
    const ov = other instanceof SemVersion ? other.numbers : new SemVersion(other).numbers;
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
}
