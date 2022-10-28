/** ### An abstract class that overrides the `toJSON()` method to serialize private attributes
 *
 * **Only underscored values are serialized!**
 *
 * @example
 * class MyClass extends Serializable {
 *   private _myNumber = 69;
 *   private _myString = '420';
 *   myNotSerializedValue = 13;
 *   // ... not serialized constructor and methods ...
 * }
 *
 * console.log(new MyClass().toJSON());
 * // { myNumber: 69, myString: "420" }
 */
export abstract class Serializable {
  protected constructor() {
    // you shall not construct !
  }
  /**
   * reduces the Serializable to its private ("underscored") attributes.
   * All non-underscored attributes and methods will be omitted.
   *
   * **This method overrides the built-in `toJSON()` which is primarily used in `JSON.stringify()`**
   *
   * @returns an object containing all private attributes
   */
  toJSON(): Record<any, any> {
    const result: Record<any, any> = {};
    for (const property of Object.keys(this)) {
      // copy only property slots with underscore prefix
      if (!property.startsWith('_')) {
        continue;
      }
      // @ts-ignore remove underscore prefix
      result[property.substring(1)] = this[property];
    }

    return result;
  }
}
