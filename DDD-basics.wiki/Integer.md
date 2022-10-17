# Class: Integer

An Integer (number without decimal digits)

**`Example`**

```ts
// create a correct Integer
const mi = Integer.create(42, { name: 'MyInteger' }); // a.value === 42
const mi = Integer.create(42.3, { name: 'MyRounded', round: 'floor' }); // a.value === 42

const mi2 = Integer.create('aw', { name: 'MyInteger2' });
// throws "TypeError: MyInteger2 > Integer: the given value (aw: string) must be a number!"

const mi3 = Integer.create(42, { name: 'MyInteger3', min: 12, max: 41 });
// throws "RangeError: MyInteger3 > Integer: the given number (42) must be in the interval [12, 41]!"

const mi4 = Integer.create(6.9, { name: 'MyInteger4', round: 'deny'});
// throws "RangeError: MyInteger4 > Integer: the given value (6.9) must be an integer but has decimal places!"
```

## Hierarchy

- [`Float`](../wiki/Float)

  ↳ **`Integer`**

  ↳↳ [`IntegerString`](../wiki/IntegerString)

  ↳↳ [`NumericId`](../wiki/NumericId)

## Table of contents

### Constructors

- [constructor](../wiki/Integer#constructor)

### Properties

- [\_value](../wiki/Integer#_value)

### Accessors

- [value](../wiki/Integer#value)

### Methods

- [equals](../wiki/Integer#equals)
- [toJSON](../wiki/Integer#tojson)
- [create](../wiki/Integer#create)
- [fromList](../wiki/Integer#fromlist)
- [listEquals](../wiki/Integer#listequals)
- [prefix](../wiki/Integer#prefix)
- [toList](../wiki/Integer#tolist)
- [validate](../wiki/Integer#validate)
- [validateInteger](../wiki/Integer#validateinteger)
- [validateInterval](../wiki/Integer#validateinterval)
- [validateList](../wiki/Integer#validatelist)
- [validateNumber](../wiki/Integer#validatenumber)

## Constructors

### constructor

• `Protected` **new Integer**(`value`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Overrides

[Float](../wiki/Float).[constructor](../wiki/Float#constructor)

#### Defined in

[valueObjects/numeric/Integer.ts:22](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/numeric/Integer.ts#L22)

## Properties

### \_value

• `Protected` `Readonly` **\_value**: `number`

the actual value of the ValueObject

#### Inherited from

[Float](../wiki/Float).[_value](../wiki/Float#_value)

#### Defined in

[valueObjects/ValueObject.ts:4](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/ValueObject.ts#L4)

## Accessors

### value

• `get` **value**(): `T`

the actual value of this ValueObject

#### Returns

`T`

#### Inherited from

Float.value

#### Defined in

[valueObjects/ValueObject.ts:13](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/ValueObject.ts#L13)

## Methods

### equals

▸ **equals**(`obj`): `boolean`

compares if the given value is either an equal ValueObject, or an equal value which would create an equal ValueObject

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `number` \| [`Integer`](../wiki/Integer) | to compare of equality |

#### Returns

`boolean`

#### Overrides

[Float](../wiki/Float).[equals](../wiki/Float#equals)

#### Defined in

[valueObjects/numeric/Integer.ts:26](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/numeric/Integer.ts#L26)

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

[valueObjects/ValueObject.ts:61](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/ValueObject.ts#L61)

___

### create

▸ `Static` **create**(`value`, `options?`): [`Integer`](../wiki/Integer)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | to create the ValueObject of |
| `options?` | [`IntegerOptions`](../wiki/IntegerOptions) | constraints the value has to fulfill |

#### Returns

[`Integer`](../wiki/Integer)

the created ValueObject

#### Overrides

[Float](../wiki/Float).[create](../wiki/Float#create)

#### Defined in

[valueObjects/numeric/Integer.ts:95](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/numeric/Integer.ts#L95)

___

### fromList

▸ `Static` **fromList**(`values`, `options?`): [`Integer`](../wiki/Integer)[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | `undefined` \| `number`[] | an array of primitives to map to an array of ValueObjects |
| `options?` | [`IntegerOptions`](../wiki/IntegerOptions) & [`ListCreationOptions`](../wiki/ListCreationOptions) | constraints the values / list has to fulfill |

#### Returns

[`Integer`](../wiki/Integer)[]

the array of ValueObjects

#### Overrides

[Float](../wiki/Float).[fromList](../wiki/Float#fromlist)

#### Defined in

[valueObjects/numeric/Integer.ts:104](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/numeric/Integer.ts#L104)

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

[Float](../wiki/Float).[prefix](../wiki/Float#prefix)

#### Defined in

[valueObjects/ValueObject.ts:77](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/ValueObject.ts#L77)

___

### toList

▸ `Static` **toList**(`values`): `number`[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | [`Integer`](../wiki/Integer)[] | an array of ValueObjects to map to an array of their values |

#### Returns

`number`[]

the array of values

#### Overrides

[Float](../wiki/Float).[toList](../wiki/Float#tolist)

#### Defined in

[valueObjects/numeric/Integer.ts:115](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/numeric/Integer.ts#L115)

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
| `value` | `number` | to be validated as an integer with the corresponding constraints (options) |
| `options?` | [`IntegerOptions`](../wiki/IntegerOptions) | constraints the value has to fulfill |

#### Returns

`number`

the value if the validation was successful

#### Overrides

[Float](../wiki/Float).[validate](../wiki/Float#validate)

#### Defined in

[valueObjects/numeric/Integer.ts:40](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/numeric/Integer.ts#L40)

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

#### Defined in

[valueObjects/numeric/Integer.ts:55](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/numeric/Integer.ts#L55)

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

[Float](../wiki/Float).[validateList](../wiki/Float#validatelist)

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

#### Inherited from

[Float](../wiki/Float).[validateNumber](../wiki/Float#validatenumber)

#### Defined in

[valueObjects/numeric/Float.ts:35](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/numeric/Float.ts#L35)
