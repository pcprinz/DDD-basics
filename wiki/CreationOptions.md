# Interface: CreationOptions

Options that every ValueObject must provide

## Hierarchy

- **`CreationOptions`**

  ↳ [`SafeBooleanOptions`](../wiki/SafeBooleanOptions)

  ↳ [`SafeDateOptions`](../wiki/SafeDateOptions)

  ↳ [`IntervalCreationOptions`](../wiki/IntervalCreationOptions)

## Table of contents

### Properties

- [name](../wiki/CreationOptions#name)

## Properties

### name

• `Optional` **name**: `string`

the name of the ValueObject to identify in a possible ErrorMessage.
- eg: `'MealPlan.price'`

#### Defined in

[valueObjects/ValueObject.ts:157](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L157)
