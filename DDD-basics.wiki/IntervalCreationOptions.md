# Interface: IntervalCreationOptions

The extended `CreationOptions` that every ValueObject should provide, if the Object allows to
have a Range.
- eg.: `PositiveInteger` within a specific Interval like `[0, 100]`
- eg.: `NonEmptyString` that has to have a specific length

## Hierarchy

- [`CreationOptions`](../wiki/CreationOptions)

  ↳ **`IntervalCreationOptions`**

  ↳↳ [`OptionalStringOptions`](../wiki/OptionalStringOptions)

## Table of contents

### Properties

- [max](../wiki/IntervalCreationOptions#max)
- [min](../wiki/IntervalCreationOptions#min)
- [name](../wiki/IntervalCreationOptions#name)

## Properties

### max

• `Optional` **max**: `number`

the upper bound of the interval the value has to be in

#### Defined in

[valueObjects/ValueObject.ts:174](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/ValueObject.ts#L174)

___

### min

• `Optional` **min**: `number`

the lower bound of the interval the value has to be in

#### Defined in

[valueObjects/ValueObject.ts:170](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/ValueObject.ts#L170)

___

### name

• `Optional` **name**: `string`

the name of the ValueObject to identify in a possible ErrorMessage.
- eg: `'MealPlan.price'`

#### Inherited from

[CreationOptions](../wiki/CreationOptions).[name](../wiki/CreationOptions#name)

#### Defined in

[valueObjects/ValueObject.ts:157](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/ValueObject.ts#L157)
