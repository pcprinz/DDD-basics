# Interface: NonEmptyStringOptions

The options for a string that is not empty. Can be matched with a `range`,
so a list of other strings or a string enum

## Hierarchy

- [`OptionalStringOptions`](../wiki/OptionalStringOptions)

  ↳ **`NonEmptyStringOptions`**

## Table of contents

### Properties

- [format](../wiki/NonEmptyStringOptions#format)
- [max](../wiki/NonEmptyStringOptions#max)
- [min](../wiki/NonEmptyStringOptions#min)
- [name](../wiki/NonEmptyStringOptions#name)
- [range](../wiki/NonEmptyStringOptions#range)
- [regex](../wiki/NonEmptyStringOptions#regex)

## Properties

### format

• `Optional` **format**: [`FormatOptions`](../wiki/Exports#formatoptions)

an array of possible formatting operations:
- `'umlauts'`: replaces all unicode umlauts with the correct ones
- `'singleSpace'` converts all spaces with single spaces
- `'stripHTML'` deletes all HTML stuff, but converts line breaks and lists

#### Inherited from

[OptionalStringOptions](../wiki/OptionalStringOptions).[format](../wiki/OptionalStringOptions#format)

#### Defined in

[valueObjects/string/OptionalString.ts:123](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/string/OptionalString.ts#L123)

___

### max

• `Optional` **max**: `number`

the upper bound of the interval the value has to be in

#### Inherited from

[OptionalStringOptions](../wiki/OptionalStringOptions).[max](../wiki/OptionalStringOptions#max)

#### Defined in

[valueObjects/ValueObject.ts:174](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/ValueObject.ts#L174)

___

### min

• `Optional` **min**: `number`

the lower bound of the interval the value has to be in

#### Inherited from

[OptionalStringOptions](../wiki/OptionalStringOptions).[min](../wiki/OptionalStringOptions#min)

#### Defined in

[valueObjects/ValueObject.ts:170](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/ValueObject.ts#L170)

___

### name

• `Optional` **name**: `string`

the name of the ValueObject to identify in a possible ErrorMessage.
- eg: `'MealPlan.price'`

#### Inherited from

[OptionalStringOptions](../wiki/OptionalStringOptions).[name](../wiki/OptionalStringOptions#name)

#### Defined in

[valueObjects/ValueObject.ts:157](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/ValueObject.ts#L157)

___

### range

• `Optional` **range**: `string`[] \| readonly `string`[] \| { `[s: string]`: `string`;  }

a list of all possible values the given value can match. This can either be a simple Array:
```typescript
['first', 'second', ..., 'last']
```
or a String enum structured like this:
```typescript
enum MyEnum {
  first = 'first',
  second = 'second',
  ...
  last = 'last',
}
```

#### Defined in

[valueObjects/string/NonEmptyString.ts:133](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/string/NonEmptyString.ts#L133)

___

### regex

• `Optional` **regex**: `RegExp`

a regular expression the given value must match

#### Inherited from

[OptionalStringOptions](../wiki/OptionalStringOptions).[regex](../wiki/OptionalStringOptions#regex)

#### Defined in

[valueObjects/string/OptionalString.ts:117](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/string/OptionalString.ts#L117)
