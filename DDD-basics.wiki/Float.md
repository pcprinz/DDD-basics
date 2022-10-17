# Class: Float

A floating point number.

## Hierarchy

- [`ValueObject`](../wiki/ValueObject)<`number`\>

  ↳ **`Float`**

  ↳↳ [`FloatString`](../wiki/FloatString)

  ↳↳ [`Integer`](../wiki/Integer)

## Table of contents

### Constructors

- [constructor](../wiki/Float#constructor)

### Properties

- [\_value](../wiki/Float#_value)

### Accessors

- [value](../wiki/Float#value)

### Methods

- [equals](../wiki/Float#equals)
- [toJSON](../wiki/Float#tojson)
- [create](../wiki/Float#create)
- [fromList](../wiki/Float#fromlist)
- [listEquals](../wiki/Float#listequals)
- [prefix](../wiki/Float#prefix)
- [toList](../wiki/Float#tolist)
- [validate](../wiki/Float#validate)
- [validateInterval](../wiki/Float#validateinterval)
- [validateList](../wiki/Float#validatelist)
- [validateNumber](../wiki/Float#validatenumber)

## Constructors

### constructor

• **new Float**(`value`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Overrides

[ValueObject](../wiki/ValueObject).[constructor](../wiki/ValueObject#constructor)

#### Defined in

[valueObjects/numeric/Float.ts:5](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/numeric/Float.ts#L5)

## Properties

### \_value

• `Protected` `Readonly` **\_value**: `number`

the actual value of the ValueObject

#### Inherited from

[ValueObject](../wiki/ValueObject).[_value](../wiki/ValueObject#_value)

#### Defined in

[valueObjects/ValueObject.ts:4](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/ValueObject.ts#L4)

## Accessors

### value

• `get` **value**(): `T`

the actual value of this ValueObject

#### Returns

`T`

#### Inherited from

ValueObject.value

#### Defined in

[valueObjects/ValueObject.ts:13](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/ValueObject.ts#L13)

## Methods

### equals

▸ **equals**(`obj`): `boolean`

compares if the given value is either an equal ValueObject, or an equal value which would create an equal ValueObject

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `number` \| [`Float`](../wiki/Float) | to compare of equality |

#### Returns

`boolean`

#### Overrides

[ValueObject](../wiki/ValueObject).[equals](../wiki/ValueObject#equals)

#### Defined in

[valueObjects/numeric/Float.ts:9](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/numeric/Float.ts#L9)

___

### toJSON

▸ **toJSON**(): `number`

this function is invoked by `JSON.stringify()` and converts the inner `"_propertyKey"` to `"propertyKey"`

#### Returns

`number`

the value

#### Inherited from

[ValueObject](../wiki/ValueObject).[toJSON](../wiki/ValueObject#tojson)

#### Defined in

[valueObjects/ValueObject.ts:61](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/ValueObject.ts#L61)

___

### create

▸ `Static` **create**(`value`, `options?`): [`Float`](../wiki/Float)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | to create the ValueObject of |
| `options?` | [`IntervalCreationOptions`](../wiki/IntervalCreationOptions) | constraints the value has to fulfill |

#### Returns

[`Float`](../wiki/Float)

the created ValueObject

#### Defined in

[valueObjects/numeric/Float.ts:56](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/numeric/Float.ts#L56)

___

### fromList

▸ `Static` **fromList**(`values`, `options?`): [`Float`](../wiki/Float)[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | `undefined` \| `number`[] | an array of primitives to map to an array of ValueObjects |
| `options?` | [`IntervalCreationOptions`](../wiki/IntervalCreationOptions) & [`ListCreationOptions`](../wiki/ListCreationOptions) | constraints the values / list has to fulfill |

#### Returns

[`Float`](../wiki/Float)[]

the array of ValueObjects

#### Defined in

[valueObjects/numeric/Float.ts:65](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/numeric/Float.ts#L65)

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

[ValueObject](../wiki/ValueObject).[listEquals](../wiki/ValueObject#listequals)

#### Defined in

[valueObjects/ValueObject.ts:29](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/ValueObject.ts#L29)

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

[ValueObject](../wiki/ValueObject).[prefix](../wiki/ValueObject#prefix)

#### Defined in

[valueObjects/ValueObject.ts:77](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/ValueObject.ts#L77)

___

### toList

▸ `Static` **toList**(`values`): `number`[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | [`Float`](../wiki/Float)[] | an array of ValueObjects to map to an array of their values |

#### Returns

`number`[]

the array of values

#### Defined in

[valueObjects/numeric/Float.ts:76](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/numeric/Float.ts#L76)

___

### validate

▸ `Static` **validate**(`value`, `options?`): `number`

**`Throws`**

TypeError if not a valid number

**`Throws`**

RangeError if the value is not inside the interval

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | to be validated as a float with the corresponding constraints (options) |
| `options?` | [`IntervalCreationOptions`](../wiki/IntervalCreationOptions) | constraints the value has to fulfill |

#### Returns

`number`

the value if the validation was successful

#### Defined in

[valueObjects/numeric/Float.ts:22](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/numeric/Float.ts#L22)

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

[ValueObject](../wiki/ValueObject).[validateInterval](../wiki/ValueObject#validateinterval)

#### Defined in

[valueObjects/ValueObject.ts:86](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/ValueObject.ts#L86)

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

[ValueObject](../wiki/ValueObject).[validateList](../wiki/ValueObject#validatelist)

#### Defined in

[valueObjects/ValueObject.ts:101](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/ValueObject.ts#L101)

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

#### Defined in

[valueObjects/numeric/Float.ts:35](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/numeric/Float.ts#L35)
