import { Serializable } from '../basic';

/** A basic ValueObject that wraps a primitive value immutably and does validation on creation */
export abstract class ValueObject<T> {
  /** the actual value of the ValueObject */
  protected readonly _value: T;

  protected constructor(value: T) {
    this._value = value;
  }

  /**
   * the actual value of this ValueObject
   */
  public get value() {
    return this._value;
  }

  /**
   * compares if the given value is either an equal ValueObject, or an equal value which would create an equal ValueObject
   * @param obj to compare of equality
   */
  public abstract equals(obj: ValueObject<T> | unknown): boolean;

  /**
   * compares 2 Lists of ValueObjects / values on equality
   * @param a the list of ValueObjects to compare with
   * @param b a list of ValueObjects / values for comparison
   * @returns true if the lists are equal
   */
  public static listEquals<ValueType>(
    a: ValueObject<ValueType>[],
    b: ValueObject<ValueType>[] | ValueType[]
  ): boolean {
    // lengths
    if (a.length === 0 && b.length === 0) {
      return true;
    }
    if (a.length !== b.length) {
      return false;
    }

    // elements
    for (let i = 0; i < a.length; i++) {
      const ai = a[i];
      const bi = b[i];
      // types
      if (bi instanceof ValueObject && ai.constructor.name !== bi.constructor.name) {
        return false;
      }
      if (!ai.equals(bi)) {
        return false;
      }
    }

    return true;
  }

  /**
   * this function is invoked by `JSON.stringify()` and converts the inner `"_propertyKey"` to `"propertyKey"`
   * @returns {{}} the value
   */
  public toJSON(): T {
    return this._value;
  }

  // VALIDATION #################################################################################

  /**
   * constructs a prefix for possible error messages based on the ValueObjects name and an additional string:
   * - example for NonEmptyString with `name='Person'`:
   * ```typescript
   * "Person > NonEmptyString"
   * ```
   * @param options the `CreationOptions` where the optional `name: string` is taken from
   * @param addition An additional name which will be added as `"name.addition"`
   * @returns the name of the ValueObject
   */
  protected static prefix(options: CreationOptions | undefined, addition: string = ''): string {
    const add = addition ? `.${addition}` : '';
    const name = options?.name ?? '';
    const fixedName = name.endsWith(': ') ? name.slice(0, -2) : name;
    const symbol = ' > ';

    return `${fixedName + symbol + this.name + add}: `;
  }

  protected static validateInterval(
    value: number | string,
    options: IntervalCreationOptions
  ): void {
    const v = typeof value === 'string' ? value.length : value;
    const str = typeof value === 'string' ? `string's length` : `number`;
    if (options && ((options.min && v < options.min) || (options.max && v > options.max))) {
      const min = options.min ?? '-∞';
      const max = options.max ?? '∞';
      throw new RangeError(
        `${this.prefix(options)}the given ${str} (${v}) must be in the interval [${min}, ${max}]!`
      );
    }
  }

  protected static validateList<Primitive>(
    list: Primitive[] | undefined,
    options?: CreationOptions & ListCreationOptions
  ): list is Primitive[] {
    const pfx = this.prefix(options, 'fromList');
    if (list == null) {
      if (options?.forbidUndefined) {
        throw new TypeError(`${pfx}list is undefined but forbidden as a valid input!`);
      } else {
        return false;
      }
    }
    const lsz = options?.listSize;
    if (!lsz) {
      return true;
    }
    if (lsz.fix && lsz.max && lsz.max !== lsz.fix) {
      throw new RangeError(
        `${pfx}the list options have a fixed (${lsz.fix}) and a deviating max (${lsz.max}) listSize!`
      );
    }
    if (lsz.fix && lsz.min && lsz.min !== lsz.fix) {
      throw new RangeError(
        `${pfx}the list options have a fixed (${lsz.fix}) and a deviating min (${lsz.min}) listSize!`
      );
    }
    if (lsz.fix && list.length !== lsz.fix) {
      throw new RangeError(
        `${pfx}the given list must have ${lsz.fix} values, but has ${list.length}!`
      );
    }
    if (lsz.min && list.length < lsz.min) {
      throw new RangeError(
        `${pfx}the given list must have at least ${lsz.min} values, but has ${list.length}!`
      );
    }
    if (lsz.max && list.length > lsz.max) {
      throw new RangeError(
        `${pfx}the given list must not have more than ${lsz.max} values, but has ${list.length}!`
      );
    }

    return true;
  }
}

// INTERFACES #####################################################################################

/**
 * Options that every ValueObject must provide
 */
export interface CreationOptions {
  /**
   * the name of the ValueObject to identify in a possible ErrorMessage.
   * - eg: `'MealPlan.price'`
   */
  name?: string;
}

/**
 * The extended `CreationOptions` that every ValueObject should provide, if the Object allows to
 * have a Range.
 * - eg.: `PositiveInteger` within a specific Interval like `[0, 100]`
 * - eg.: `NonEmptyString` that has to have a specific length
 */
export interface IntervalCreationOptions extends CreationOptions {
  /**
   * the lower bound of the interval the value has to be in
   */
  min?: number;
  /**
   * the upper bound of the interval the value has to be in
   */
  max?: number;
}

/**
 * Options especially for the `fromList()` methods on ValueObjects. These options regard to the
 * constraints of the list itself - not the specific ValueObjects inside it.
 */
export interface ListCreationOptions {
  /** is undefined forbidden as a valid input */
  forbidUndefined?: boolean;
  /** constraints on the list's size */
  listSize?: {
    /** minimum amount of values inside of the list */
    min?: number;
    /** maximum amount of values inside of the list */
    max?: number;
    /** fix amount of values inside of the list. This serves as a shortcut for min = max. */
    fix?: number;
  };
}
