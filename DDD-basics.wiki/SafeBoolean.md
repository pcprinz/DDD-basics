# Class: SafeBoolean

A Boolean that is definitely a Boolean that (with options) can be undefined or a string

## Hierarchy

- [`ValueObject`](../wiki/ValueObject)<`boolean`\>

  ↳ **`SafeBoolean`**

## Table of contents

### Constructors

- [constructor](../wiki/SafeBoolean#constructor)

### Properties

- [\_value](../wiki/SafeBoolean#_value)

### Accessors

- [value](../wiki/SafeBoolean#value)

### Methods

- [equals](../wiki/SafeBoolean#equals)
- [toJSON](../wiki/SafeBoolean#tojson)
- [create](../wiki/SafeBoolean#create)
- [fromList](../wiki/SafeBoolean#fromlist)
- [listEquals](../wiki/SafeBoolean#listequals)
- [prefix](../wiki/SafeBoolean#prefix)
- [toList](../wiki/SafeBoolean#tolist)
- [validate](../wiki/SafeBoolean#validate)
- [validateInterval](../wiki/SafeBoolean#validateinterval)
- [validateList](../wiki/SafeBoolean#validatelist)

## Constructors

### constructor

• `Protected` **new SafeBoolean**(`value`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Overrides

[ValueObject](../wiki/ValueObject).[constructor](../wiki/ValueObject#constructor)

#### Defined in

[valueObjects/SafeBoolean.ts:5](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/SafeBoolean.ts#L5)

## Properties

### \_value

• `Protected` `Readonly` **\_value**: `boolean`

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
| `obj` | `string` \| `boolean` \| [`SafeBoolean`](../wiki/SafeBoolean) | to compare of equality |

#### Returns

`boolean`

#### Overrides

[ValueObject](../wiki/ValueObject).[equals](../wiki/ValueObject#equals)

#### Defined in

[valueObjects/SafeBoolean.ts:9](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/SafeBoolean.ts#L9)

___

### toJSON

▸ **toJSON**(): `boolean`

this function is invoked by `JSON.stringify()` and converts the inner `"_propertyKey"` to `"propertyKey"`

#### Returns

`boolean`

the value

#### Inherited from

[ValueObject](../wiki/ValueObject).[toJSON](../wiki/ValueObject#tojson)

#### Defined in

[valueObjects/ValueObject.ts:61](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/ValueObject.ts#L61)

___

### create

▸ `Static` **create**(`value`, `options?`): [`SafeBoolean`](../wiki/SafeBoolean)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `undefined` \| `string` \| `boolean` | to create the ValueObject of |
| `options?` | [`SafeBooleanOptions`](../wiki/SafeBooleanOptions) | constraints the value has to fulfill |

#### Returns

[`SafeBoolean`](../wiki/SafeBoolean)

the created ValueObject

#### Defined in

[valueObjects/SafeBoolean.ts:62](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/SafeBoolean.ts#L62)

___

### fromList

▸ `Static` **fromList**(`values`, `options?`): [`SafeBoolean`](../wiki/SafeBoolean)[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | `undefined` \| `boolean`[] | an array of primitives to map to an array of ValueObjects |
| `options?` | [`SafeBooleanOptions`](../wiki/SafeBooleanOptions) & [`ListCreationOptions`](../wiki/ListCreationOptions) | constraints the values / list has to fulfill |

#### Returns

[`SafeBoolean`](../wiki/SafeBoolean)[]

the array of ValueObjects

#### Defined in

[valueObjects/SafeBoolean.ts:74](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/SafeBoolean.ts#L74)

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

▸ `Static` **toList**(`values`): `boolean`[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | [`SafeBoolean`](../wiki/SafeBoolean)[] | an array of ValueObjects to map to an array of their values |

#### Returns

`boolean`[]

the array of values

#### Defined in

[valueObjects/SafeBoolean.ts:85](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/SafeBoolean.ts#L85)

___

### validate

▸ `Static` **validate**(`value`, `options?`): `boolean`

**`Throws`**

TypeError if undefined (and not allowed to)

**`Throws`**

TypeError if not a boolean

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `undefined` \| `string` \| `boolean` | to be validated as a valid boolean / string representation of a boolean |
| `options?` | [`SafeBooleanOptions`](../wiki/SafeBooleanOptions) | constraints the value has to fulfill |

#### Returns

`boolean`

the value if the validation was successful

#### Defined in

[valueObjects/SafeBoolean.ts:27](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/SafeBoolean.ts#L27)

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
