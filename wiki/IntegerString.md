# Class: IntegerString

An Integer (number without decimal digits) that can also be created from a string representation of an integer

## Hierarchy

- [`Integer`](../wiki/Integer)

  ↳ **`IntegerString`**

## Table of contents

### Constructors

- [constructor](../wiki/IntegerString#constructor)

### Properties

- [\_value](../wiki/IntegerString#_value)

### Accessors

- [value](../wiki/IntegerString#value)

### Methods

- [equals](../wiki/IntegerString#equals)
- [toJSON](../wiki/IntegerString#tojson)
- [create](../wiki/IntegerString#create)
- [fromList](../wiki/IntegerString#fromlist)
- [listEquals](../wiki/IntegerString#listequals)
- [parse](../wiki/IntegerString#parse)
- [prefix](../wiki/IntegerString#prefix)
- [toList](../wiki/IntegerString#tolist)
- [validate](../wiki/IntegerString#validate)
- [validateInteger](../wiki/IntegerString#validateinteger)
- [validateIntegerString](../wiki/IntegerString#validateintegerstring)
- [validateInterval](../wiki/IntegerString#validateinterval)
- [validateList](../wiki/IntegerString#validatelist)
- [validateNumber](../wiki/IntegerString#validatenumber)

## Constructors

### constructor

• `Protected` **new IntegerString**(`value`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Overrides

[Integer](../wiki/Integer).[constructor](../wiki/Integer#constructor)

#### Defined in

[valueObjects/numeric/IntegerString.ts:6](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/IntegerString.ts#L6)

## Properties

### \_value

• `Protected` `Readonly` **\_value**: `number`

the actual value of the ValueObject

#### Inherited from

[Integer](../wiki/Integer).[_value](../wiki/Integer#_value)

#### Defined in

[valueObjects/ValueObject.ts:4](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L4)

## Accessors

### value

• `get` **value**(): `T`

the actual value of this ValueObject

#### Returns

`T`

#### Inherited from

Integer.value

#### Defined in

[valueObjects/ValueObject.ts:13](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L13)

## Methods

### equals

▸ **equals**(`obj`): `boolean`

compares if the given value is either an equal ValueObject, or an equal value which would create an equal ValueObject

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `string` \| `number` \| [`IntegerString`](../wiki/IntegerString) | to compare of equality |

#### Returns

`boolean`

#### Overrides

[Integer](../wiki/Integer).[equals](../wiki/Integer#equals)

#### Defined in

[valueObjects/numeric/IntegerString.ts:10](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/IntegerString.ts#L10)

___

### toJSON

▸ **toJSON**(): `number`

this function is invoked by `JSON.stringify()` and converts the inner `"_propertyKey"` to `"propertyKey"`

#### Returns

`number`

the value

#### Inherited from

[Integer](../wiki/Integer).[toJSON](../wiki/Integer#tojson)

#### Defined in

[valueObjects/ValueObject.ts:61](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L61)

___

### create

▸ `Static` **create**(`value`, `options?`): [`IntegerString`](../wiki/IntegerString)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` \| `number` | to create the ValueObject of |
| `options?` | [`IntegerOptions`](../wiki/IntegerOptions) | constraints the value has to fulfill |

#### Returns

[`IntegerString`](../wiki/IntegerString)

the created ValueObject

#### Overrides

[Integer](../wiki/Integer).[create](../wiki/Integer#create)

#### Defined in

[valueObjects/numeric/IntegerString.ts:73](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/IntegerString.ts#L73)

___

### fromList

▸ `Static` **fromList**(`values`, `options?`): [`IntegerString`](../wiki/IntegerString)[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | `undefined` \| (`string` \| `number`)[] | an array of primitives to map to an array of ValueObjects |
| `options?` | [`IntegerOptions`](../wiki/IntegerOptions) & [`ListCreationOptions`](../wiki/ListCreationOptions) | constraints the values / list has to fulfill |

#### Returns

[`IntegerString`](../wiki/IntegerString)[]

the array of ValueObjects

#### Overrides

[Integer](../wiki/Integer).[fromList](../wiki/Integer#fromlist)

#### Defined in

[valueObjects/numeric/IntegerString.ts:82](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/IntegerString.ts#L82)

___

### listEquals

▸ `Static` **listEquals**<`ValueType`\>(`a`, `b`): `boolean`

compares 2 Lists of ValueObjects / values on equality

#### Type parameters

| Name |
| :------ |
| `ValueType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | [`ValueObject`](../wiki/ValueObject)<`ValueType`\>[] | the list of ValueObjects to compare with |
| `b` | [`ValueObject`](../wiki/ValueObject)<`ValueType`\>[] \| `ValueType`[] | a list of ValueObjects / values for comparison |

#### Returns

`boolean`

true if the lists are equal

#### Inherited from

[Integer](../wiki/Integer).[listEquals](../wiki/Integer#listequals)

#### Defined in

[valueObjects/ValueObject.ts:29](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L29)

___

### parse

▸ `Static` **parse**(`value`): `number`

parses the given string to an integer (number).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | to parse (unchecked) |

#### Returns

`number`

the parsed number **OR** `NaN` if not parsable

#### Defined in

[valueObjects/numeric/IntegerString.ts:62](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/IntegerString.ts#L62)

___

### prefix

▸ `Static` `Protected` **prefix**(`options`, `addition?`): `string`

constructs a prefix for possible error messages based on the ValueObjects name and an additional string:
- example for NonEmptyString with `name='Person'`:
```typescript
"Person > NonEmptyString"
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `options` | `undefined` \| [`CreationOptions`](../wiki/CreationOptions) | `undefined` | the `CreationOptions` where the optional `name: string` is taken from |
| `addition` | `string` | `''` | An additional name which will be added as `"name.addition"` |

#### Returns

`string`

the name of the ValueObject

#### Inherited from

[Integer](../wiki/Integer).[prefix](../wiki/Integer#prefix)

#### Defined in

[valueObjects/ValueObject.ts:77](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L77)

___

### toList

▸ `Static` **toList**(`values`): `number`[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | [`IntegerString`](../wiki/IntegerString)[] | an array of ValueObjects to map to an array of their values |

#### Returns

`number`[]

the array of values

#### Overrides

[Integer](../wiki/Integer).[toList](../wiki/Integer#tolist)

#### Defined in

[valueObjects/numeric/IntegerString.ts:93](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/IntegerString.ts#L93)

___

### validate

▸ `Static` **validate**(`value`, `options?`): `number`

**`Throws`**

TypeError if not a valid integer

**`Throws`**

RangeError if the value has not allowed decimal digits

**`Throws`**

RangeError if the value is not inside the interval

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` \| `number` | to be validated as an integer with the corresponding constraints (options) |
| `options?` | [`IntegerOptions`](../wiki/IntegerOptions) | constraints the value has to fulfill |

#### Returns

`number`

the value if the validation was successful

#### Overrides

[Integer](../wiki/Integer).[validate](../wiki/Integer#validate)

#### Defined in

[valueObjects/numeric/IntegerString.ts:27](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/IntegerString.ts#L27)

___

### validateInteger

▸ `Static` `Protected` **validateInteger**(`value`, `options?`): `number`

If defined in the options the number will possibly be rounded.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | to be validated as a valid integer |
| `options?` | [`IntegerOptions`](../wiki/IntegerOptions) | constraints the value has to fulfill |

#### Returns

`number`

the (possibly rounded) integer

#### Inherited from

[Integer](../wiki/Integer).[validateInteger](../wiki/Integer#validateinteger)

#### Defined in

[valueObjects/numeric/Integer.ts:55](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/Integer.ts#L55)

___

### validateIntegerString

▸ `Static` `Protected` **validateIntegerString**(`value`, `options?`): `number`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` \| `number` | to be validated as a valid integer / string representation of an integer |
| `options?` | [`IntegerOptions`](../wiki/IntegerOptions) | constraints the value has to fulfill |

#### Returns

`number`

the (possibly parsed) integer (number)

#### Defined in

[valueObjects/numeric/IntegerString.ts:38](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/IntegerString.ts#L38)

___

### validateInterval

▸ `Static` `Protected` **validateInterval**(`value`, `options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `number` |
| `options` | [`IntervalCreationOptions`](../wiki/IntervalCreationOptions) |

#### Returns

`void`

#### Inherited from

[Integer](../wiki/Integer).[validateInterval](../wiki/Integer#validateinterval)

#### Defined in

[valueObjects/ValueObject.ts:86](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L86)

___

### validateList

▸ `Static` `Protected` **validateList**<`Primitive`\>(`list`, `options?`): list is Primitive[]

#### Type parameters

| Name |
| :------ |
| `Primitive` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | `undefined` \| `Primitive`[] |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) & [`ListCreationOptions`](../wiki/ListCreationOptions) |

#### Returns

list is Primitive[]

#### Inherited from

[Integer](../wiki/Integer).[validateList](../wiki/Integer#validatelist)

#### Defined in

[valueObjects/ValueObject.ts:101](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L101)

___

### validateNumber

▸ `Static` `Protected` **validateNumber**(`value`, `options?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | to be validated as a valid number (not NaN) |
| `options?` | [`IntervalCreationOptions`](../wiki/IntervalCreationOptions) | constraints the value has to fulfill |

#### Returns

`void`

#### Inherited from

[Integer](../wiki/Integer).[validateNumber](../wiki/Integer#validatenumber)

#### Defined in

[valueObjects/numeric/Float.ts:35](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/Float.ts#L35)
