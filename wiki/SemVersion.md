# Class: SemVersion

the SemVer version in form of "X.Y.Z"

## Table of contents

### Constructors

- [constructor](../wiki/SemVersion#constructor)

### Properties

- [\_version](../wiki/SemVersion#_version)

### Accessors

- [numbers](../wiki/SemVersion#numbers)
- [string](../wiki/SemVersion#string)

### Methods

- [isMoreRecentThan](../wiki/SemVersion#ismorerecentthan)

## Constructors

### constructor

• **new SemVersion**(`version`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `version` | `string` |

#### Defined in

[valueObjects/composed/SemVersion.ts:7](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/SemVersion.ts#L7)

## Properties

### \_version

• `Private` **\_version**: [`IntegerString`](../wiki/IntegerString)[]

#### Defined in

[valueObjects/composed/SemVersion.ts:5](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/SemVersion.ts#L5)

## Accessors

### numbers

• `get` **numbers**(): [`number`, `number`, `number`]

the `number[]` representation of the version:
`"23.1.5"` => `[23, 1, 5]`

#### Returns

[`number`, `number`, `number`]

#### Defined in

[valueObjects/composed/SemVersion.ts:19](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/SemVersion.ts#L19)

___

### string

• `get` **string**(): `string`

the string representation of the version

#### Returns

`string`

#### Defined in

[valueObjects/composed/SemVersion.ts:26](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/SemVersion.ts#L26)

## Methods

### isMoreRecentThan

▸ **isMoreRecentThan**(`other`): `boolean`

compares this version with another version

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | `string` \| [`SemVersion`](../wiki/SemVersion) | can also be a string representation |

#### Returns

`boolean`

if the `other` version is more recent

#### Defined in

[valueObjects/composed/SemVersion.ts:35](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/SemVersion.ts#L35)
