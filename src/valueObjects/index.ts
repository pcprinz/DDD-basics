/**
 * @module ValueObjects
 *
 * @information
 * A ValueObject is a wrapper for a primitive value.
 * It extends the value to include the ability to set constraints on creation and to
 * validate compliance with the constraints. Furthermore, they ensure that the value is
 * immutable and thus cannot be changed.
 *
 * # Remarks
 * - In order to change a ValueObject, it must be created again and thus also validated again.
 * - Each ValueObject is created with the static `create(value, options)` method.
 * - During creation, the static `validate(value, options)` method is automatically called,
 *   which can also be used separately.
 *
 * # API
 * every ValueObject inherits from the `abstract ValueObject`:
 * - `.value` - the getter for the internal primitive value
 * - `.toJSON()` - which returns a readable representation of the value (commonly just the value)
 * - `.equals(...)` - for comparison of ValueObjects
 *
 * additionally every ValueObject has at least a static implementation for:
 * - `.create(value, options)` - to create (and validate) the ValueObject
 * - `.validate(value, options)` - to validate the constraints on the value
 * - `.fromList(values, options)` - to create a list of ValueObjects from a list of primitives
 *   (this is the list equivalent of `.create()`)
 * - `.toList(values)` - to transform a list of ValueObjects to a list of primitives
 *   (this is the list equivalent of `.value`)
 *
 * some of the ValueObjects (especially the composed ones) have additional useful methods.
 *
 * # Options
 * every ValueObject has an `options` parameter for `create()`, `validate()` and `fromList()`.
 * These options can be used to define constraints for the passed value(s).
 *
 * There are some common options that are used independently of the individual ValueObject:
 *
 * ```ts
 * // All ValueObjects [all methods]
 * interface CreationOptions {
 *   name?: string; // the name of the ValueObject to identify in a possible ErrorMessage.
 * }
 *
 * // Numeric & (string) ValueObjects [all methods]
 * interface IntervalCreationOptions extends CreationOptions {
 *   min?: number; // the lower bound of the interval the value (length) has to be in
 *   max?: number; // the upper bound of the interval the value (length) has to be in
 * }
 *
 * // All ValueObjects [fromList(value, OPTIONS)]
 * interface ListCreationOptions {
 *   forbidUndefined?: boolean; // is undefined forbidden as a valid input
 *   listSize?: {
 *     min?: number; // minimum amount of values inside of the list
 *     max?: number; // maximum amount of values inside of the list
 *     fix?: number; // fix amount of values inside of the list. This serves as a shortcut for min = max.
 *   }
 * }
 * ```
 *
 * Most ValueObjects have additional options depending on their individual needs. Those are always called `<ValueObjectName>Options`
 *
 * # Basic ValueObjects
 * ### numeric
 * - `Float` - the common wrapper for `number`
 * - `Integer` - an extension of `Float` without decimal digits
 * - `FloatString` - also a `Float`, but can be created from a `string`
 * - `IntegerString` - also an `Integer`, but can be created from a `string`
 * - `NumericId` - an extension of `Integer` with the inbuilt constraints to be positive and not round-able
 *
 * ### string
 * - `OptionalString` - the common wrapper for `string`, but can be created from falsy values (if required)
 * - `NonEmptyString` - an extension of `OptionalString`, but can only be created from strings that are not empty
 *
 * ### other (pseudo) primitive
 * - `SafeBoolean` - the common wrapper for `boolean`, that can also be created from `undefined` or `string` (if required)
 * - `SafeDate` - the common wrapper for JS's `Date`
 *
 * ### composed / special (not so basic)
 * - `SemVersion` - for semantic versions like `"0.13.5"`
 * - `PlainDate` - for simple dates (without the time)
 * - `PlainTime` - for simple times (without the date)
 * - `PlainDateTime` - a combination of both (This is like JS's `Date` but with more / other / better functionality)
 * - `TimeStamp` - a special `PlainDateTime` with additional measuring functionality (like "expiresIn")
 *
 * # General usage
 * Due to the better readability and reusability, it is recommended not to use the ValueObjects directly,
 * but to expand them. For example, if a ValueObject "Book title" is to be created for an entity "Book",
 * which is a string with at least 1 and a maximum of 50 characters, then the ValueObject
 * `NonEmptyString` is expanded as follows:
 *
 * ```ts
 * const BookTitle = (title: string) => NonEmptyString.create(title, { name: 'Book.title', max: 50});
 * ```
 *
 * There is now a "constructor" for a "book title" that always requires the same constraints.
 * It is then used as follows:
 *
 * ```ts
 * this._title = BookTitle('Domain Driven Design');
 * ```
 */

export * from './composed/PlainDate';
export * from './composed/PlainDateTime';
export * from './composed/PlainTime';
export * from './composed/SemVersion';
export * from './composed/Timestamp';
export * from './numeric/Float';
export * from './numeric/FloatString';
export * from './numeric/Integer';
export * from './numeric/IntegerString';
export * from './numeric/NumericId';
export * from './SafeBoolean';
export * from './SafeDate';
export * from './string/NonEmptyString';
export * from './string/OptionalString';
export * from './ValueObject';
