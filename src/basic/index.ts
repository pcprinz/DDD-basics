/**
 * @module Basic
 * @description
 * This module contains basic classes to structure an application.
 * # Entity
 * An {@link Entity} represents the base class for a model. Its attributes consist of {@link ValueObjects}.
 *
 * # Result
 * A {@link Result} is the result of a validation - not to be confused with an error.
 * When creating ValueObjects, a Result is returned which states whether the validation of the
 * transferred value was successful. This forces the result of the validation to be checked and
 * any false validations to be intercepted. Additionally, usually when an entity is created
 * (where ValueObjects are also created), a Result is returned to ensure that the entity is correct
 * and the domain core is consistent.
 *
 * A Result must always be checked before its value can be accessed to prevent using the
 * (non-existent) value of a failed Result. This is "type-safed" with Typescript:
 * ```ts
 * const result = Result.ok('test');
 * result.getValue();   // ❌ TS: Property 'getValue' is protected and only accessible ...
 * if (result.isSuccess()) {
 *   result.getValue(); // ✅ fine
 * }
 * ```
 *
 * # Serializable
 * The abstract class {@link Serializable} overrides the JS internal `.toJSON()` method. All private attributes (which are denoted starting with an underscore) are returned as an object with all leading underscores removed. The `.toJSON()` method of any class is automatically called recursively when the class is serialized with `JSON.stringify(myClass)`.
 *
 * Although most components of this package have their own implementation for it, this class can be used to make other classes serializable.
 */
export * from './Entity';
export * from './Result';
export * from './Serializable';
