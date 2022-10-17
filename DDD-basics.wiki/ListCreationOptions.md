# Interface: ListCreationOptions

Options especially for the `fromList()` methods on ValueObjects. These options regard to the
constraints of the list itself - not the specific ValueObjects inside it.

## Table of contents

### Properties

- [forbidUndefined](../wiki/ListCreationOptions#forbidundefined)
- [listSize](../wiki/ListCreationOptions#listsize)

## Properties

### forbidUndefined

• `Optional` **forbidUndefined**: `boolean`

is undefined forbidden as a valid input

#### Defined in

[valueObjects/ValueObject.ts:183](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/ValueObject.ts#L183)

___

### listSize

• `Optional` **listSize**: `Object`

constraints on the list's size

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `fix?` | `number` | fix amount of values inside of the list. This serves as a shortcut for min = max. |
| `max?` | `number` | maximum amount of values inside of the list |
| `min?` | `number` | minimum amount of values inside of the list |

#### Defined in

[valueObjects/ValueObject.ts:185](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/ValueObject.ts#L185)
