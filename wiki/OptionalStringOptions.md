# Interface: OptionalStringOptions

The options for any string. Strings can be matched with a `RegExp` and be `format`ted

## Hierarchy

- [`IntervalCreationOptions`](../wiki/IntervalCreationOptions)

  ↳ **`OptionalStringOptions`**

  ↳↳ [`NonEmptyStringOptions`](../wiki/NonEmptyStringOptions)

## Table of contents

### Properties

- [format](../wiki/OptionalStringOptions#format)
- [max](../wiki/OptionalStringOptions#max)
- [min](../wiki/OptionalStringOptions#min)
- [name](../wiki/OptionalStringOptions#name)
- [regex](../wiki/OptionalStringOptions#regex)

## Properties

### format

• `Optional` **format**: [`FormatOptions`](../wiki/Exports#formatoptions)

an array of possible formatting operations:
- `'umlauts'`: replaces all unicode umlauts with the correct ones
- `'singleSpace'` converts all spaces with single spaces
- `'stripHTML'` deletes all HTML stuff, but converts line breaks and lists

#### Defined in

[valueObjects/string/OptionalString.ts:123](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/string/OptionalString.ts#L123)

___

### max

• `Optional` **max**: `number`

the upper bound of the interval the value has to be in

#### Inherited from

[IntervalCreationOptions](../wiki/IntervalCreationOptions).[max](../wiki/IntervalCreationOptions#max)

#### Defined in

[valueObjects/ValueObject.ts:174](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L174)

___

### min

• `Optional` **min**: `number`

the lower bound of the interval the value has to be in

#### Inherited from

[IntervalCreationOptions](../wiki/IntervalCreationOptions).[min](../wiki/IntervalCreationOptions#min)

#### Defined in

[valueObjects/ValueObject.ts:170](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L170)

___

### name

• `Optional` **name**: `string`

the name of the ValueObject to identify in a possible ErrorMessage.
- eg: `'MealPlan.price'`

#### Inherited from

[IntervalCreationOptions](../wiki/IntervalCreationOptions).[name](../wiki/IntervalCreationOptions#name)

#### Defined in

[valueObjects/ValueObject.ts:157](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L157)

___

### regex

• `Optional` **regex**: `RegExp`

a regular expression the given value must match

#### Defined in

[valueObjects/string/OptionalString.ts:117](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/string/OptionalString.ts#L117)
