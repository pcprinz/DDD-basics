# Class: NonEmptyString

A String that is definitely a String that is not empty

## Hierarchy

- [`OptionalString`](../wiki/OptionalString)

  ↳ **`NonEmptyString`**

## Table of contents

### Constructors

- [constructor](../wiki/NonEmptyString#constructor)

### Properties

- [\_value](../wiki/NonEmptyString#_value)

### Accessors

- [value](../wiki/NonEmptyString#value)

### Methods

- [equals](../wiki/NonEmptyString#equals)
- [toJSON](../wiki/NonEmptyString#tojson)
- [create](../wiki/NonEmptyString#create)
- [format](../wiki/NonEmptyString#format)
- [fromList](../wiki/NonEmptyString#fromlist)
- [listEquals](../wiki/NonEmptyString#listequals)
- [prefix](../wiki/NonEmptyString#prefix)
- [toList](../wiki/NonEmptyString#tolist)
- [validate](../wiki/NonEmptyString#validate)
- [validateInterval](../wiki/NonEmptyString#validateinterval)
- [validateList](../wiki/NonEmptyString#validatelist)
- [validateNonEmptyString](../wiki/NonEmptyString#validatenonemptystring)
- [validateRange](../wiki/NonEmptyString#validaterange)
- [validateRegex](../wiki/NonEmptyString#validateregex)
- [validateString](../wiki/NonEmptyString#validatestring)

## Constructors

### constructor

• `Protected` **new NonEmptyString**(`value`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Overrides

[OptionalString](../wiki/OptionalString).[constructor](../wiki/OptionalString#constructor)

#### Defined in

[valueObjects/string/NonEmptyString.ts:6](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/string/NonEmptyString.ts#L6)

## Properties

### \_value

• `Protected` `Readonly` **\_value**: `string`

the actual value of the ValueObject

#### Inherited from

[OptionalString](../wiki/OptionalString).[_value](../wiki/OptionalString#_value)

#### Defined in

[valueObjects/ValueObject.ts:4](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L4)

## Accessors

### value

• `get` **value**(): `T`

the actual value of this ValueObject

#### Returns

`T`

#### Inherited from

OptionalString.value

#### Defined in

[valueObjects/ValueObject.ts:13](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L13)

## Methods

### equals

▸ **equals**(`obj`): `boolean`

compares if the given value is either an equal ValueObject, or an equal value which would create an equal ValueObject

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `string` \| [`NonEmptyString`](../wiki/NonEmptyString) | to compare of equality |

#### Returns

`boolean`

#### Overrides

[OptionalString](../wiki/OptionalString).[equals](../wiki/OptionalString#equals)

#### Defined in

[valueObjects/string/NonEmptyString.ts:10](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/string/NonEmptyString.ts#L10)

___

### toJSON

▸ **toJSON**(): `string`

this function is invoked by `JSON.stringify()` and converts the inner `"_propertyKey"` to `"propertyKey"`

#### Returns

`string`

the value

#### Inherited from

[OptionalString](../wiki/OptionalString).[toJSON](../wiki/OptionalString#tojson)

#### Defined in

[valueObjects/ValueObject.ts:61](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L61)

___

### create

▸ `Static` **create**(`value`, `options?`): [`NonEmptyString`](../wiki/NonEmptyString)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | to create the ValueObject of |
| `options?` | [`NonEmptyStringOptions`](../wiki/NonEmptyStringOptions) | constraints the value has to fulfill |

#### Returns

[`NonEmptyString`](../wiki/NonEmptyString)

the created ValueObject

#### Overrides

[OptionalString](../wiki/OptionalString).[create](../wiki/OptionalString#create)

#### Defined in

[valueObjects/string/NonEmptyString.ts:89](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/string/NonEmptyString.ts#L89)

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

#### Inherited from

[OptionalString](../wiki/OptionalString).[format](../wiki/OptionalString#format)

#### Defined in

[valueObjects/string/OptionalString.ts:70](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/string/OptionalString.ts#L70)

___

### fromList

▸ `Static` **fromList**(`values`, `options?`): [`NonEmptyString`](../wiki/NonEmptyString)[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | `undefined` \| `string`[] | an array of primitives to map to an array of ValueObjects |
| `options?` | [`NonEmptyStringOptions`](../wiki/NonEmptyStringOptions) & [`ListCreationOptions`](../wiki/ListCreationOptions) | constraints the values / list has to fulfill |

#### Returns

[`NonEmptyString`](../wiki/NonEmptyString)[]

the array of ValueObjects

#### Overrides

[OptionalString](../wiki/OptionalString).[fromList](../wiki/OptionalString#fromlist)

#### Defined in

[valueObjects/string/NonEmptyString.ts:98](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/string/NonEmptyString.ts#L98)

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

[OptionalString](../wiki/OptionalString).[listEquals](../wiki/OptionalString#listequals)

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

[OptionalString](../wiki/OptionalString).[prefix](../wiki/OptionalString#prefix)

#### Defined in

[valueObjects/ValueObject.ts:77](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L77)

___

### toList

▸ `Static` **toList**(`values`): `string`[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | [`NonEmptyString`](../wiki/NonEmptyString)[] | an array of ValueObjects to map to an array of their values |

#### Returns

`string`[]

the array of values

#### Overrides

[OptionalString](../wiki/OptionalString).[toList](../wiki/OptionalString#tolist)

#### Defined in

[valueObjects/string/NonEmptyString.ts:109](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/string/NonEmptyString.ts#L109)

___

### validate

▸ `Static` **validate**(`value`, `options?`): `string`

**`Throws`**

TypeError if not a string or empty

**`Throws`**

TypeError if the value doesn't fit the given enum

**`Throws`**

RangeError if the value is not matching the regex

**`Throws`**

RangeError if the value's length is not inside the interval

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | to be validated as a not empty string with the corresponding constraints (options) |
| `options?` | [`NonEmptyStringOptions`](../wiki/NonEmptyStringOptions) | constraints the value has to fulfill |

#### Returns

`string`

the value if the validation was successful

#### Overrides

[OptionalString](../wiki/OptionalString).[validate](../wiki/OptionalString#validate)

#### Defined in

[valueObjects/string/NonEmptyString.ts:25](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/string/NonEmptyString.ts#L25)

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

[OptionalString](../wiki/OptionalString).[validateInterval](../wiki/OptionalString#validateinterval)

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

[OptionalString](../wiki/OptionalString).[validateList](../wiki/OptionalString#validatelist)

#### Defined in

[valueObjects/ValueObject.ts:101](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L101)

___

### validateNonEmptyString

▸ `Static` `Private` **validateNonEmptyString**(`value`, `options`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | to be validated as a valid string that is not the empty string (`""`) |
| `options` | `undefined` \| [`NonEmptyStringOptions`](../wiki/NonEmptyStringOptions) | constraints the value has to fulfill |

#### Returns

`void`

#### Defined in

[valueObjects/string/NonEmptyString.ts:43](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/string/NonEmptyString.ts#L43)

___

### validateRange

▸ `Static` `Private` **validateRange**(`value`, `options`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | to be validated to match a given range (enum / string[]) |
| `options` | [`NonEmptyStringOptions`](../wiki/NonEmptyStringOptions) | constraints the value has to fulfill |

#### Returns

`void`

#### Defined in

[valueObjects/string/NonEmptyString.ts:61](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/string/NonEmptyString.ts#L61)

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

#### Inherited from

[OptionalString](../wiki/OptionalString).[validateRegex](../wiki/OptionalString#validateregex)

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

#### Inherited from

[OptionalString](../wiki/OptionalString).[validateString](../wiki/OptionalString#validatestring)

#### Defined in

[valueObjects/string/OptionalString.ts:55](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/string/OptionalString.ts#L55)
