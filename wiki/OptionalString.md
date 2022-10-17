# Class: OptionalString

A String that can be also created from  either `"" | undefined | null` (falsy values) => ends up being converted to `""`

## Hierarchy

- [`ValueObject`](../wiki/ValueObject)<`string`\>

  ↳ **`OptionalString`**

  ↳↳ [`NonEmptyString`](../wiki/NonEmptyString)

## Table of contents

### Constructors

- [constructor](../wiki/OptionalString#constructor)

### Properties

- [\_value](../wiki/OptionalString#_value)

### Accessors

- [value](../wiki/OptionalString#value)

### Methods

- [equals](../wiki/OptionalString#equals)
- [toJSON](../wiki/OptionalString#tojson)
- [create](../wiki/OptionalString#create)
- [format](../wiki/OptionalString#format)
- [fromList](../wiki/OptionalString#fromlist)
- [listEquals](../wiki/OptionalString#listequals)
- [prefix](../wiki/OptionalString#prefix)
- [toList](../wiki/OptionalString#tolist)
- [validate](../wiki/OptionalString#validate)
- [validateInterval](../wiki/OptionalString#validateinterval)
- [validateList](../wiki/OptionalString#validatelist)
- [validateRegex](../wiki/OptionalString#validateregex)
- [validateString](../wiki/OptionalString#validatestring)

## Constructors

### constructor

• `Protected` **new OptionalString**(`value`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Overrides

[ValueObject](../wiki/ValueObject).[constructor](../wiki/ValueObject#constructor)

#### Defined in

[valueObjects/string/OptionalString.ts:5](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/string/OptionalString.ts#L5)

## Properties

### \_value

• `Protected` `Readonly` **\_value**: `string`

the actual value of the ValueObject

#### Inherited from

[ValueObject](../wiki/ValueObject).[_value](../wiki/ValueObject#_value)

#### Defined in

[valueObjects/ValueObject.ts:4](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L4)

## Accessors

### value

• `get` **value**(): `T`

the actual value of this ValueObject

#### Returns

`T`

#### Inherited from

ValueObject.value

#### Defined in

[valueObjects/ValueObject.ts:13](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L13)

## Methods

### equals

▸ **equals**(`obj`): `boolean`

compares if the given value is either an equal ValueObject, or an equal value which would create an equal ValueObject

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `undefined` \| `string` \| [`OptionalString`](../wiki/OptionalString) | to compare of equality |

#### Returns

`boolean`

#### Overrides

[ValueObject](../wiki/ValueObject).[equals](../wiki/ValueObject#equals)

#### Defined in

[valueObjects/string/OptionalString.ts:9](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/string/OptionalString.ts#L9)

___

### toJSON

▸ **toJSON**(): `string`

this function is invoked by `JSON.stringify()` and converts the inner `"_propertyKey"` to `"propertyKey"`

#### Returns

`string`

the value

#### Inherited from

[ValueObject](../wiki/ValueObject).[toJSON](../wiki/ValueObject#tojson)

#### Defined in

[valueObjects/ValueObject.ts:61](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L61)

___

### create

▸ `Static` **create**(`value`, `options?`): [`OptionalString`](../wiki/OptionalString)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `undefined` \| `string` | to create the ValueObject of |
| `options?` | [`OptionalStringOptions`](../wiki/OptionalStringOptions) | constraints the value has to fulfill |

#### Returns

[`OptionalString`](../wiki/OptionalString)

the created ValueObject

#### Defined in

[valueObjects/string/OptionalString.ts:87](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/string/OptionalString.ts#L87)

___

### format

▸ `Static` `Protected` **format**(`value`, `options?`): `string`

**`Throws`**

Error if the formatting failed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | to be formatted with the given formatting options |
| `options?` | [`OptionalStringOptions`](../wiki/OptionalStringOptions) | constraints the value has to fulfill |

#### Returns

`string`

the formatted string

#### Defined in

[valueObjects/string/OptionalString.ts:70](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/string/OptionalString.ts#L70)

___

### fromList

▸ `Static` **fromList**(`values`, `options?`): [`OptionalString`](../wiki/OptionalString)[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | `undefined` \| `string`[] | an array of primitives to map to an array of ValueObjects |
| `options?` | [`OptionalStringOptions`](../wiki/OptionalStringOptions) & [`ListCreationOptions`](../wiki/ListCreationOptions) | constraints the values / list has to fulfill |

#### Returns

[`OptionalString`](../wiki/OptionalString)[]

the array of ValueObjects

#### Defined in

[valueObjects/string/OptionalString.ts:96](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/string/OptionalString.ts#L96)

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

[ValueObject](../wiki/ValueObject).[prefix](../wiki/ValueObject#prefix)

#### Defined in

[valueObjects/ValueObject.ts:77](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L77)

___

### toList

▸ `Static` **toList**(`values`): `string`[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | [`OptionalString`](../wiki/OptionalString)[] | an array of ValueObjects to map to an array of their values |

#### Returns

`string`[]

the array of values

#### Defined in

[valueObjects/string/OptionalString.ts:107](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/string/OptionalString.ts#L107)

___

### validate

▸ `Static` **validate**(`value`, `options?`): `string`

**`Throws`**

TypeError if not a string (when defined)

**`Throws`**

TypeError if doesn't fit the given enum (when defined)

**`Throws`**

RangeError if the value is not matching the regex (when defined)

**`Throws`**

RangeError if the value is not inside the interval (when defined)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | to be validated as a string with the corresponding constraints (options) |
| `options?` | [`OptionalStringOptions`](../wiki/OptionalStringOptions) | - |

#### Returns

`string`

the value if the validation was successful

#### Defined in

[valueObjects/string/OptionalString.ts:23](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/string/OptionalString.ts#L23)

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

[ValueObject](../wiki/ValueObject).[validateList](../wiki/ValueObject#validatelist)

#### Defined in

[valueObjects/ValueObject.ts:101](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L101)

___

### validateRegex

▸ `Static` `Protected` **validateRegex**(`value`, `options`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | to be validated to match the given regular expression |
| `options` | [`OptionalStringOptions`](../wiki/OptionalStringOptions) | constraints the value has to fulfill |

#### Returns

`void`

#### Defined in

[valueObjects/string/OptionalString.ts:39](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/string/OptionalString.ts#L39)

___

### validateString

▸ `Static` `Protected` **validateString**(`value`, `options?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | to be validated as a valid string |
| `options?` | [`OptionalStringOptions`](../wiki/OptionalStringOptions) | constraints the value has to fulfill |

#### Returns

`void`

#### Defined in

[valueObjects/string/OptionalString.ts:55](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/string/OptionalString.ts#L55)
