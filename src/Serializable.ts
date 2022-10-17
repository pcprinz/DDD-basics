export abstract class Serializable {
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
