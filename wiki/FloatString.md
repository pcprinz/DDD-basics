# Class: FloatString

ValueObjects! a floating point number that can also be created from a string representation of a floating point number

## Hierarchy

- [`Float`](../wiki/Float)

  ↳ **`FloatString`**

## Table of contents

### Constructors

- [constructor](../wiki/FloatString#constructor)

### Properties

- [\_value](../wiki/FloatString#_value)

### Accessors

- [value](../wiki/FloatString#value)

### Methods

- [equals](../wiki/FloatString#equals)
- [toJSON](../wiki/FloatString#tojson)
- [create](../wiki/FloatString#create)
- [fromList](../wiki/FloatString#fromlist)
- [listEquals](../wiki/FloatString#listequals)
- [parse](../wiki/FloatString#parse)
- [prefix](../wiki/FloatString#prefix)
- [toList](../wiki/FloatString#tolist)
- [validate](../wiki/FloatString#validate)
- [validateFloatString](../wiki/FloatString#validatefloatstring)
- [validateInterval](../wiki/FloatString#validateinterval)
- [validateList](../wiki/FloatString#validatelist)
- [validateNumber](../wiki/FloatString#validatenumber)

## Constructors

### constructor

• `Protected` **new FloatString**(`value`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Overrides

[Float](../wiki/Float).[constructor](../wiki/Float#constructor)

#### Defined in

[valueObjects/numeric/FloatString.ts:6](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/FloatString.ts#L6)

## Properties

### \_value

• `Protected` `Readonly` **\_value**: `number`

the actual value of the ValueObject

#### Inherited from

[Float](../wiki/Float).[_value](../wiki/Float#_value)

#### Defined in

[valueObjects/ValueObject.ts:4](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L4)

## Accessors

### value

• `get` **value**(): `T`

the actual value of this ValueObject

#### Returns

`T`

#### Inherited from

Float.value

#### Defined in

[valueObjects/ValueObject.ts:13](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L13)

## Methods

### equals

▸ **equals**(`obj`): `boolean`

compares if the given value is either an equal ValueObject, or an equal value which would create an equal ValueObject

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `string` \| `number` \| [`FloatString`](../wiki/FloatString) | to compare of equality |

#### Returns

`boolean`

#### Overrides

[Float](../wiki/Float).[equals](../wiki/Float#equals)

#### Defined in

[valueObjects/numeric/FloatString.ts:10](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/FloatString.ts#L10)

___

### toJSON

▸ **toJSON**(): `number`

this function is invoked by `JSON.stringify()` and converts the inner `"_propertyKey"` to `"propertyKey"`

#### Returns

`number`

the value

#### Inherited from

[Float](../wiki/Float).[toJSON](../wiki/Float#tojson)

#### Defined in

[valueObjects/ValueObject.ts:61](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L61)

___

### create

▸ `Static` **create**(`value`, `options?`): [`FloatString`](../wiki/FloatString)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` \| `number` | to create the ValueObject of |
| `options?` | [`IntervalCreationOptions`](../wiki/IntervalCreationOptions) | constraints the value has to fulfill |

#### Returns

[`FloatString`](../wiki/FloatString)

the created ValueObject

#### Overrides

[Float](../wiki/Float).[create](../wiki/Float#create)

#### Defined in

[valueObjects/numeric/FloatString.ts:72](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/FloatString.ts#L72)

___

### fromList

▸ `Static` **fromList**(`values`, `options?`): [`FloatString`](../wiki/FloatString)[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | `undefined` \| (`string` \| `number`)[] | an array of primitives to map to an array of ValueObjects |
| `options?` | [`IntervalCreationOptions`](../wiki/IntervalCreationOptions) & [`ListCreationOptions`](../wiki/ListCreationOptions) | constraints the values / list has to fulfill |

#### Returns

[`FloatString`](../wiki/FloatString)[]

the array of ValueObjects

#### Overrides

[Float](../wiki/Float).[fromList](../wiki/Float#fromlist)

#### Defined in

[valueObjects/numeric/FloatString.ts:81](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/FloatString.ts#L81)

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

[Float](../wiki/Float).[listEquals](../wiki/Float#listequals)

#### Defined in

[valueObjects/ValueObject.ts:29](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L29)

___

### parse

▸ `Static` **parse**(`value`): `number`

parses the given string to a (float) number where a possible `,` will be correctly replaced by a `.`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | to parse (unchecked) |

#### Returns

`number`

the parsed number **OR** `NaN` if not parsable

#### Defined in

[valueObjects/numeric/FloatString.ts:61](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/FloatString.ts#L61)

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

[Float](../wiki/Float).[prefix](../wiki/Float#prefix)

#### Defined in

[valueObjects/ValueObject.ts:77](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L77)

___

### toList

▸ `Static` **toList**(`values`): `number`[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | [`FloatString`](../wiki/FloatString)[] | an array of ValueObjects to map to an array of their values |

#### Returns

`number`[]

the array of values

#### Overrides

[Float](../wiki/Float).[toList](../wiki/Float#tolist)

#### Defined in

[valueObjects/numeric/FloatString.ts:92](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/FloatString.ts#L92)

___

### validate

▸ `Static` **validate**(`value`, `options?`): `number`

**`Throws`**

TypeError if not a positive number

**`Throws`**

RangeError if the value is not inside the interval

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` \| `number` | to be validated as a float with the corresponding constraints (options) |
| `options?` | [`IntervalCreationOptions`](../wiki/IntervalCreationOptions) | constraints the value has to fulfill |

#### Returns

`number`

the value if the validation was successful

#### Overrides

[Float](../wiki/Float).[validate](../wiki/Float#validate)

#### Defined in

[valueObjects/numeric/FloatString.ts:26](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/FloatString.ts#L26)

___

### validateFloatString

▸ `Static` `Protected` **validateFloatString**(`value`, `options?`): `number`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` \| `number` | to be validated as a valid number / string representation of a valid number |
| `options?` | [`IntervalCreationOptions`](../wiki/IntervalCreationOptions) | constraints the value has to fulfill |

#### Returns

`number`

the (possibly parsed) number

#### Defined in

[valueObjects/numeric/FloatString.ts:37](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/FloatString.ts#L37)

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

[Float](../wiki/Float).[validateInterval](../wiki/Float#validateinterval)

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

[Float](../wiki/Float).[validateList](../wiki/Float#validatelist)

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

[Float](../wiki/Float).[validateNumber](../wiki/Float#validatenumber)

#### Defined in

[valueObjects/numeric/Float.ts:35](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/numeric/Float.ts#L35)
