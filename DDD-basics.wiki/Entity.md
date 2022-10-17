# Class: Entity

An Entity with an `id`, which can be serialized to its private attributes. Extends `Serializable`

## Hierarchy

- [`Serializable`](../wiki/Serializable)

  ↳ **`Entity`**

## Table of contents

### Constructors

- [constructor](../wiki/Entity#constructor)

### Properties

- [\_id](../wiki/Entity#_id)

### Accessors

- [id](../wiki/Entity#id)

### Methods

- [equals](../wiki/Entity#equals)
- [toJSON](../wiki/Entity#tojson)
- [isEntity](../wiki/Entity#isentity)

## Constructors

### constructor

• **new Entity**(`id?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id?` | `string` | (optional) identifier. Will be a generated `UUID` if omitted |

#### Overrides

[Serializable](../wiki/Serializable).[constructor](../wiki/Serializable#constructor)

#### Defined in

[Entity.ts:14](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/Entity.ts#L14)

## Properties

### \_id

• `Private` **\_id**: [`NonEmptyString`](../wiki/NonEmptyString)

#### Defined in

[Entity.ts:9](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/Entity.ts#L9)

## Accessors

### id

• `get` **id**(): `string`

The identifier of this Entity is an internal `NonEmptyString`

#### Returns

`string`

#### Defined in

[Entity.ts:21](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/Entity.ts#L21)

## Methods

### equals

▸ **equals**(`object?`): `boolean`

Entities are compared based on their ID.

#### Parameters

| Name | Type |
| :------ | :------ |
| `object?` | [`Entity`](../wiki/Entity) |

#### Returns

`boolean`

#### Defined in

[Entity.ts:26](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/Entity.ts#L26)

___

### toJSON

▸ **toJSON**(): `Record`<`any`, `any`\>

reduces the Serializable to its private ("underscored") attributes.
All non-underscored attributes and methods will be omitted.

**This method overrides the built-in `toJSON()` which is primarily used in `JSON.stringify()`**

#### Returns

`Record`<`any`, `any`\>

an object containing all private attributes

#### Inherited from

[Serializable](../wiki/Serializable).[toJSON](../wiki/Serializable#tojson)

#### Defined in

[Serializable.ts:10](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/Serializable.ts#L10)

___

### isEntity

▸ `Static` **isEntity**(`value`): value is Entity

ensures that the given `value` is an instance of `Entity`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is Entity

#### Defined in

[Entity.ts:43](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/Entity.ts#L43)
