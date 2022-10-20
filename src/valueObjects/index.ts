/**
 * @module ValueObjects
 *
 * @information
 * A ValueObject is a wrapper for a primitive value.
 * It extends the value to include the ability to set constraints on creation and to
 * validate compliance with the constraints. Furthermore, they ensure that the value is
 * immutable and thus cannot be changed.
 *
 * @remarks
 * - In order to change a ValueObject, it must be created again and thus also validated again.
 * - Each ValueObject is created with the static `create(value, options)` method.
 * - During creation, the static `validate(value, options)` method is automatically called,
 *   which can also be used separately.
 *
 * @API
 * every ValueObject inherits from the `abstract ValueObject`:
 * - `.value` - the getter for the internal primitive value
 * - `.toJSON()` - which returns a readable representation of the value (commonly just the value)
 * - `.equals(...)` - for comparison of ValueObjects
 *
 * additionally every ValueObject has at least a static implementation for:
 * - `.validate(value, options)` - to validate a value
 * - `.create(value, options)` - for the creation
 * - `.fromList(values, options)` - to create a list of ValueObjects from a list of primitives
 *   (this is the list equivalent of `.create()`)
 * - `.toList(values)` - to transform a list of ValueObjects to a list of primitives
 *   (this is the list equivalent of `.value`)
 *
 * some of the ValueObjects (especially the composed ones) have additional useful methods.
 *
 * @Options
 * every ValueObject has an `options` parameter for `create()`, `validate()` and `fromList()`.
 * These options can be used to define constraints for the passed value(s).
 *
 * There are som common options that are used independently of the individual ValueObject:
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
