# Interface: IntegerOptions

## Hierarchy

- [`FloatOptions`](../wiki/Exports#floatoptions)

  ↳ **`IntegerOptions`**

## Table of contents

### Properties

- [max](../wiki/IntegerOptions#max)
- [min](../wiki/IntegerOptions#min)
- [name](../wiki/IntegerOptions#name)
- [round](../wiki/IntegerOptions#round)

## Properties

### max

• `Optional` **max**: `number`

the upper bound of the interval the value has to be in

#### Inherited from

FloatOptions.max

#### Defined in

[valueObjects/ValueObject.ts:174](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L174)

___

### min

• `Optional` **min**: `number`

the lower bound of the interval the value has to be in

#### Inherited from

FloatOptions.min

#### Defined in

[valueObjects/ValueObject.ts:170](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L170)

___

### name

• `Optional` **name**: `string`

the name of the ValueObject to identify in a possible ErrorMessage.
- eg: `'MealPlan.price'`

#### Inherited from

FloatOptions.name

#### Defined in

[valueObjects/ValueObject.ts:157](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L157)

___

### round

• `Optional` **round**: ``"round"`` \| ``"floor"`` \| ``"ceil"`` \| ``"deny"``

how should the number be rounded.
- defaults to `'deny'` which causes the `validate()` method to throw an error if the number
  has decimal places.

#### Defined in

[valueObjects/numeric/Integer.ts:126](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/Integer.ts#L126)
