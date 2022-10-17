# Interface: SafeBooleanOptions

Options that every ValueObject must provide

## Hierarchy

- [`CreationOptions`](../wiki/CreationOptions)

  ↳ **`SafeBooleanOptions`**

## Table of contents

### Properties

- [allowUndefinedAs](../wiki/SafeBooleanOptions#allowundefinedas)
- [name](../wiki/SafeBooleanOptions#name)

## Properties

### allowUndefinedAs

• `Optional` **allowUndefinedAs**: ``"true"`` \| ``"false"``

should `undefined` be treated as a specific default. If this option remains `undefined`, the creation will throw
an error on undefined values

#### Defined in

[valueObjects/SafeBoolean.ts:94](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/SafeBoolean.ts#L94)

___

### name

• `Optional` **name**: `string`

the name of the ValueObject to identify in a possible ErrorMessage.
- eg: `'MealPlan.price'`

#### Inherited from

[CreationOptions](../wiki/CreationOptions).[name](../wiki/CreationOptions#name)

#### Defined in

[valueObjects/ValueObject.ts:157](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L157)
