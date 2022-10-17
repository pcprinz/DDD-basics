# Interface: SafeDateOptions

Options that every ValueObject must provide

## Hierarchy

- [`CreationOptions`](../wiki/CreationOptions)

  ↳ **`SafeDateOptions`**

## Table of contents

### Properties

- [max](../wiki/SafeDateOptions#max)
- [min](../wiki/SafeDateOptions#min)
- [name](../wiki/SafeDateOptions#name)

## Properties

### max

• `Optional` **max**: [`Dateable`](../wiki/Exports#dateable)

#### Defined in

[valueObjects/SafeDate.ts:139](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/SafeDate.ts#L139)

___

### min

• `Optional` **min**: [`Dateable`](../wiki/Exports#dateable)

#### Defined in

[valueObjects/SafeDate.ts:140](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/SafeDate.ts#L140)

___

### name

• `Optional` **name**: `string`

the name of the ValueObject to identify in a possible ErrorMessage.
- eg: `'MealPlan.price'`

#### Inherited from

[CreationOptions](../wiki/CreationOptions).[name](../wiki/CreationOptions#name)

#### Defined in

[valueObjects/ValueObject.ts:157](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L157)
