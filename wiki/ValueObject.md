# Class: ValueObject<T\>

A basic ValueObject that wraps a primitive value immutably and does validation on creation

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- **`ValueObject`**

  ↳ [`PlainDate`](../wiki/PlainDate)

  ↳ [`PlainDateTime`](../wiki/PlainDateTime)

  ↳ [`PlainTime`](../wiki/PlainTime)

  ↳ [`Float`](../wiki/Float)

  ↳ [`SafeBoolean`](../wiki/SafeBoolean)

  ↳ [`SafeDate`](../wiki/SafeDate)

  ↳ [`OptionalString`](../wiki/OptionalString)

## Table of contents

### Constructors

- [constructor](../wiki/ValueObject#constructor)

### Properties

- [\_value](../wiki/ValueObject#_value)

### Accessors

- [value](../wiki/ValueObject#value)

### Methods

- [equals](../wiki/ValueObject#equals)
- [toJSON](../wiki/ValueObject#tojson)
- [listEquals](../wiki/ValueObject#listequals)
- [prefix](../wiki/ValueObject#prefix)
- [validateInterval](../wiki/ValueObject#validateinterval)
- [validateList](../wiki/ValueObject#validatelist)

## Constructors

### constructor

• `Protected` **new ValueObject**<`T`\>(`value`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Defined in

[valueObjects/ValueObject.ts:6](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L6)

## Properties

### \_value

• `Protected` `Readonly` **\_value**: `T`

the actual value of the ValueObject

#### Defined in

[valueObjects/ValueObject.ts:4](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L4)

## Accessors

### value

• `get` **value**(): `T`

the actual value of this ValueObject

#### Returns

`T`

#### Defined in

[valueObjects/ValueObject.ts:13](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L13)

## Methods

### equals

▸ `Abstract` **equals**(`obj`): `boolean`

compares if the given value is either an equal ValueObject, or an equal value which would create an equal ValueObject

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `unknown` | to compare of equality |

#### Returns

`boolean`

#### Defined in

[valueObjects/ValueObject.ts:21](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L21)

___

### toJSON

▸ **toJSON**(): `T`

this function is invoked by `JSON.stringify()` and converts the inner `"_propertyKey"` to `"propertyKey"`

#### Returns

`T`

the value

#### Defined in

[valueObjects/ValueObject.ts:61](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L61)

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

#### Defined in

[valueObjects/ValueObject.ts:77](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L77)

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

#### Defined in

[valueObjects/ValueObject.ts:101](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L101)
