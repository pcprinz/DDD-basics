import { Result } from '../basic/Result';

/** ### A basic ValueObject that wraps a primitive value immutably and does validation on creation */
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
    if (a.length === 0 && b.length === 0) return true;
    if (a.length !== b.length) return false;

    // elements
    for (let i = 0; i < a.length; i++) {
      const ai = a[i];
      const bi = b[i];
      // types
      if (bi instanceof ValueObject && ai.constructor.name !== bi.constructor.name) return false;
      if (!ai.equals(bi)) return false;
    }

    return true;
  }

  /**
   * this function is invoked by `JSON.stringify()` and returns the internal `value`
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

  /** @fails if the value is not inside the interval */
  protected static validateInterval<Value = string | number>(
    value: Value,
    options?: IntervalCreationOptions
  ): Result<Value> {
    const v = typeof value === 'string' ? value.length : value;
    const comparison = typeof value === 'string' ? `string's length` : `number`;
    if (options && ((options.min && v < options.min) || (options.max && v > options.max))) {
      const min = options.min ?? '-∞';
      const max = options.max ?? '∞';

      return Result.fail(
        `${this.prefix(
          options
        )}the given ${comparison} (${v}) must be in the interval [${min}, ${max}]!`
      );
    }

    return Result.ok(value);
  }
  /**
   * @fails if list is undefined but must not be
   * @fails if the list length not matching
   */
  protected static validateListSize<Primitive>(
    list: Primitive[] | undefined,
    options?: CreationOptions & ListCreationOptions
  ): Result<Primitive[]> {
    const pfx = this.prefix(options, 'fromList');
    if (list == null) {
      if (options?.forbidUndefined) {
        return Result.fail(`${pfx}list is undefined but forbidden as a valid input!`);
      } else {
        return Result.ok([]);
      }
    }
    const size = options?.listSize;
    if (!size) return Result.ok(list);

    if (size.fix && size.max && size.max !== size.fix) {
      return Result.fail(
        `${pfx}the list options have a fixed (${size.fix}) and a deviating max (${size.max}) listSize!`
      );
    }
    if (size.fix && size.min && size.min !== size.fix) {
      return Result.fail(
        `${pfx}the list options have a fixed (${size.fix}) and a deviating min (${size.min}) listSize!`
      );
    }
    if (size.fix && list.length !== size.fix) {
      return Result.fail(
        `${pfx}the given list must have ${size.fix} values, but has ${list.length}!`
      );
    }
    if (size.min && list.length < size.min) {
      return Result.fail(
        `${pfx}the given list must have at least ${size.min} values, but has ${list.length}!`
      );
    }
    if (size.max && list.length > size.max) {
      return Result.fail(
        `${pfx}the given list must not have more than ${size.max} values, but has ${list.length}!`
      );
    }

    return Result.ok(list);
  }

  /**
   * Verifies a list of values with the given list constraints (`options`) and creates a list of ValueObjects from it.
   * The Results from the separate creation of ValueObjects intercepts the creation process if not successful.
   *
   * @param values to create a list of ValueObjects from
   * @param createCallback to create a ValueObject from the provided value
   * @param options to verify the list constraints
   * @returns a list of ValueObject
   * @fails if the list doesn't fulfill the list constraints from the given `options`
   * @fails if one of the Results of the `createCallback` fails
   */
  protected static createList<Value, Created>(
    values: Value[] | undefined,
    createCallback: (value: Value) => Result<Created>,
    options?: CreationOptions & ListCreationOptions
  ): Result<Created[]> {
    const validList = this.validateListSize(values, options);
    if (!validList.isSuccess()) return Result.fail(validList.error);

    const verified = [];
    for (const value of validList.getValue()) {
      const created = createCallback(value);
      if (!created.isSuccess()) return Result.fail(created.error);

      verified.push(created.getValue());
    }

    return Result.ok(verified);
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
