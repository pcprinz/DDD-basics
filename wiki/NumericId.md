# Class: NumericId

A special Integer with the predefined interval [0,∞] which will not accept and parse floating point numbers.

## Hierarchy

- [`Integer`](../wiki/Integer)

  ↳ **`NumericId`**

## Table of contents

### Constructors

- [constructor](../wiki/NumericId#constructor)

### Properties

- [\_value](../wiki/NumericId#_value)

### Accessors

- [value](../wiki/NumericId#value)

### Methods

- [equals](../wiki/NumericId#equals)
- [toJSON](../wiki/NumericId#tojson)
- [create](../wiki/NumericId#create)
- [fromList](../wiki/NumericId#fromlist)
- [listEquals](../wiki/NumericId#listequals)
- [prefix](../wiki/NumericId#prefix)
- [toList](../wiki/NumericId#tolist)
- [validate](../wiki/NumericId#validate)
- [validateInteger](../wiki/NumericId#validateinteger)
- [validateInterval](../wiki/NumericId#validateinterval)
- [validateList](../wiki/NumericId#validatelist)
- [validateNumber](../wiki/NumericId#validatenumber)

## Constructors

### constructor

• `Protected` **new NumericId**(`value`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Overrides

[Integer](../wiki/Integer).[constructor](../wiki/Integer#constructor)

#### Defined in

[valueObjects/numeric/NumericId.ts:6](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/NumericId.ts#L6)

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
| `obj` | `number` \| [`NumericId`](../wiki/NumericId) | to compare of equality |

#### Returns

`boolean`

#### Overrides

[Integer](../wiki/Integer).[equals](../wiki/Integer#equals)

#### Defined in

[valueObjects/numeric/NumericId.ts:10](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/NumericId.ts#L10)

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

▸ `Static` **create**(`value`, `options?`): [`NumericId`](../wiki/NumericId)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | to create the ValueObject of |
| `options?` | [`NumericIdOptions`](../wiki/Exports#numericidoptions) | constraints the value has to fulfill |

#### Returns

[`NumericId`](../wiki/NumericId)

the created ValueObject

#### Overrides

[Integer](../wiki/Integer).[create](../wiki/Integer#create)

#### Defined in

[valueObjects/numeric/NumericId.ts:38](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/NumericId.ts#L38)

___

### fromList

▸ `Static` **fromList**(`values`, `options?`): [`NumericId`](../wiki/NumericId)[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | `undefined` \| `number`[] | an array of primitives to map to an array of ValueObjects |
| `options?` | [`NumericIdOptions`](../wiki/Exports#numericidoptions) & [`ListCreationOptions`](../wiki/ListCreationOptions) | constraints the values / list has to fulfill |

#### Returns

[`NumericId`](../wiki/NumericId)[]

the array of ValueObjects

#### Overrides

[Integer](../wiki/Integer).[fromList](../wiki/Integer#fromlist)

#### Defined in

[valueObjects/numeric/NumericId.ts:47](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/NumericId.ts#L47)

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
| `values` | [`NumericId`](../wiki/NumericId)[] | an array of ValueObjects to map to an array of their values |

#### Returns

`number`[]

the array of values

#### Overrides

[Integer](../wiki/Integer).[toList](../wiki/Integer#tolist)

#### Defined in

[valueObjects/numeric/NumericId.ts:58](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/NumericId.ts#L58)

___

### validate

▸ `Static` **validate**(`value`, `options?`): `number`

**`Throws`**

TypeError if not a valid integer

**`Throws`**

RangeError if the value has decimal digits

**`Throws`**

RangeError if the value is not inside the interval

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | to be validated as an integer with the corresponding constraints (options) |
| `options?` | [`NumericIdOptions`](../wiki/Exports#numericidoptions) | constraints the value has to fulfill |

#### Returns

`number`

the value if the validation was successful

#### Overrides

[Integer](../wiki/Integer).[validate](../wiki/Integer#validate)

#### Defined in

[valueObjects/numeric/NumericId.ts:24](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/NumericId.ts#L24)

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
