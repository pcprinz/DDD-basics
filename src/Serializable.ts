export class Serializable {
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
