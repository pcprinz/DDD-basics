# Class: Serializable

## Hierarchy

- **`Serializable`**

  ↳ [`Entity`](../wiki/Entity)

  ↳ [`DomainEvent`](../wiki/DomainEvent)

## Table of contents

### Constructors

- [constructor](../wiki/Serializable#constructor)

### Methods

- [toJSON](../wiki/Serializable#tojson)

## Constructors

### constructor

• **new Serializable**()

## Methods

### toJSON

▸ **toJSON**(): `Record`<`any`, `any`\>

reduces the Serializable to its private ("underscored") attributes.
All non-underscored attributes and methods will be omitted.

**This method overrides the built-in `toJSON()` which is primarily used in `JSON.stringify()`**

#### Returns

`Record`<`any`, `any`\>

an object containing all private attributes

#### Defined in

[Serializable.ts:10](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/Serializable.ts#L10)
