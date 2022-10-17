# Class: SafeDate

a Date that is definitely a Date that can be created from either a Date or a string that
represents a Date or a number that represents the Time in ms

## Hierarchy

- [`ValueObject`](../wiki/ValueObject)<`Date`\>

  ↳ **`SafeDate`**

## Table of contents

### Constructors

- [constructor](../wiki/SafeDate#constructor)

### Properties

- [\_value](../wiki/SafeDate#_value)

### Accessors

- [value](../wiki/SafeDate#value)

### Methods

- [equals](../wiki/SafeDate#equals)
- [toJSON](../wiki/SafeDate#tojson)
- [create](../wiki/SafeDate#create)
- [fromList](../wiki/SafeDate#fromlist)
- [listEquals](../wiki/SafeDate#listequals)
- [now](../wiki/SafeDate#now)
- [parseDottedFormat](../wiki/SafeDate#parsedottedformat)
- [prefix](../wiki/SafeDate#prefix)
- [toList](../wiki/SafeDate#tolist)
- [validate](../wiki/SafeDate#validate)
- [validateDate](../wiki/SafeDate#validatedate)
- [validateInterval](../wiki/SafeDate#validateinterval)
- [validateList](../wiki/SafeDate#validatelist)

## Constructors

### constructor

• `Protected` **new SafeDate**(`value`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Date` |

#### Overrides

[ValueObject](../wiki/ValueObject).[constructor](../wiki/ValueObject#constructor)

#### Defined in

[valueObjects/SafeDate.ts:6](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/SafeDate.ts#L6)

## Properties

### \_value

• `Protected` `Readonly` **\_value**: `Date`

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
| `obj` | [`SafeDate`](../wiki/SafeDate) \| [`Dateable`](../wiki/Exports#dateable) | to compare of equality |

#### Returns

`boolean`

#### Overrides

[ValueObject](../wiki/ValueObject).[equals](../wiki/ValueObject#equals)

#### Defined in

[valueObjects/SafeDate.ts:10](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/SafeDate.ts#L10)

___

### toJSON

▸ **toJSON**(): `string`

this function is invoked by `JSON.stringify()` and converts the inner `"_propertyKey"` to `"propertyKey"`

#### Returns

`string`

the value

#### Overrides

[ValueObject](../wiki/ValueObject).[toJSON](../wiki/ValueObject#tojson)

#### Defined in

[valueObjects/SafeDate.ts:130](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/SafeDate.ts#L130)

___

### create

▸ `Static` **create**(`value`, `options?`): [`SafeDate`](../wiki/SafeDate)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Dateable`](../wiki/Exports#dateable) | to create a PositiveIntegerString from |
| `options?` | [`SafeDateOptions`](../wiki/SafeDateOptions) | for the creation |

#### Returns

[`SafeDate`](../wiki/SafeDate)

the created ValueObject

#### Defined in

[valueObjects/SafeDate.ts:101](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/SafeDate.ts#L101)

___

### fromList

▸ `Static` **fromList**(`values`, `options?`): [`SafeDate`](../wiki/SafeDate)[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | `undefined` \| [`Dateable`](../wiki/Exports#dateable)[] | an array of strings to map to an array of ValueObjects |
| `options?` | [`SafeDateOptions`](../wiki/SafeDateOptions) & [`ListCreationOptions`](../wiki/ListCreationOptions) | for the **individual** creation |

#### Returns

[`SafeDate`](../wiki/SafeDate)[]

the array of ValueObjects

#### Defined in

[valueObjects/SafeDate.ts:114](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/SafeDate.ts#L114)

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

### now

▸ `Static` **now**(`addMs?`, `options?`): [`SafeDate`](../wiki/SafeDate)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `addMs` | `number` | `0` |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) | `undefined` |

#### Returns

[`SafeDate`](../wiki/SafeDate)

#### Defined in

[valueObjects/SafeDate.ts:105](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/SafeDate.ts#L105)

___

### parseDottedFormat

▸ `Static` **parseDottedFormat**(`value`): [`Dateable`](../wiki/Exports#dateable)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Dateable`](../wiki/Exports#dateable) |

#### Returns

[`Dateable`](../wiki/Exports#dateable)

#### Defined in

[valueObjects/SafeDate.ts:84](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/SafeDate.ts#L84)

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

▸ `Static` **toList**(`values`): `Date`[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | [`SafeDate`](../wiki/SafeDate)[] | an array of ValueObjects to map to an array of their values |

#### Returns

`Date`[]

the array of values

#### Defined in

[valueObjects/SafeDate.ts:125](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/SafeDate.ts#L125)

___

### validate

▸ `Static` **validate**(`value`, `options?`): `Date`

{@inheritDoc SafeDate!}

**`Throws`**

TypeError if not parsable to a valid Date

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Dateable`](../wiki/Exports#dateable) | to be validated as a valid Date |
| `options?` | [`SafeDateOptions`](../wiki/SafeDateOptions) | constraints the value has to fulfill |

#### Returns

`Date`

the value if the validation was successful

#### Defined in

[valueObjects/SafeDate.ts:35](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/SafeDate.ts#L35)

___

### validateDate

▸ `Static` `Private` **validateDate**(`value`, `options?`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Dateable`](../wiki/Exports#dateable) |
| `options?` | [`SafeDateOptions`](../wiki/SafeDateOptions) |

#### Returns

`Date`

#### Defined in

[valueObjects/SafeDate.ts:64](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/SafeDate.ts#L64)

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
