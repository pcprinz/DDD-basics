# Class: PlainTime

This is a more simplified, but also flexible version of a `Date` which specifically represents just the time.
Related to `PlainDate` for dates and `PlaneDateTime` for a combination of both.

## Hierarchy

- [`ValueObject`](../wiki/ValueObject)<`void`\>

  ↳ **`PlainTime`**

## Table of contents

### Constructors

- [constructor](../wiki/PlainTime#constructor)

### Properties

- [\_value](../wiki/PlainTime#_value)
- [hours](../wiki/PlainTime#hours)
- [milliseconds](../wiki/PlainTime#milliseconds)
- [minutes](../wiki/PlainTime#minutes)
- [seconds](../wiki/PlainTime#seconds)

### Accessors

- [value](../wiki/PlainTime#value)

### Methods

- [compare](../wiki/PlainTime#compare)
- [createOffset](../wiki/PlainTime#createoffset)
- [createSet](../wiki/PlainTime#createset)
- [distance](../wiki/PlainTime#distance)
- [equals](../wiki/PlainTime#equals)
- [getTime](../wiki/PlainTime#gettime)
- [toJSON](../wiki/PlainTime#tojson)
- [toString](../wiki/PlainTime#tostring)
- [create](../wiki/PlainTime#create)
- [fromList](../wiki/PlainTime#fromlist)
- [listEquals](../wiki/PlainTime#listequals)
- [now](../wiki/PlainTime#now)
- [parseString](../wiki/PlainTime#parsestring)
- [prefix](../wiki/PlainTime#prefix)
- [validate](../wiki/PlainTime#validate)
- [validateInterval](../wiki/PlainTime#validateinterval)
- [validateList](../wiki/PlainTime#validatelist)
- [validatePlainTimeable](../wiki/PlainTime#validateplaintimeable)

## Constructors

### constructor

• `Private` **new PlainTime**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Required`<[`PlainTimeProps`](../wiki/PlainTimeProps)\> |

#### Overrides

[ValueObject](../wiki/ValueObject).[constructor](../wiki/ValueObject#constructor)

#### Defined in

[valueObjects/composed/PlainTime.ts:34](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainTime.ts#L34)

## Properties

### \_value

• `Protected` `Readonly` **\_value**: `void`

the actual value of the ValueObject

#### Inherited from

[ValueObject](../wiki/ValueObject).[_value](../wiki/ValueObject#_value)

#### Defined in

[valueObjects/ValueObject.ts:4](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L4)

___

### hours

• `Readonly` **hours**: `number`

#### Defined in

[valueObjects/composed/PlainTime.ts:19](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainTime.ts#L19)

___

### milliseconds

• `Readonly` **milliseconds**: `number`

#### Defined in

[valueObjects/composed/PlainTime.ts:22](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainTime.ts#L22)

___

### minutes

• `Readonly` **minutes**: `number`

#### Defined in

[valueObjects/composed/PlainTime.ts:20](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainTime.ts#L20)

___

### seconds

• `Readonly` **seconds**: `number`

#### Defined in

[valueObjects/composed/PlainTime.ts:21](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainTime.ts#L21)

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

### compare

▸ **compare**(`other`, `density?`): ``0`` \| ``1`` \| ``-1``

compares this time with a given other `PlainTime` or `'now'` to compare it with the current time.
- returns `-1` if this time is earlier than the other one
- returns `0` if the times are equal
- returns `1` if this time is sooner than the other one

##### Examples
```typescript
'05:24:57'.compare('08:15:30') => -1
'05:24:57'.compare('01:00:00') => 1
'05:24:57'.compare('05:00:01', 'H') => 0 (with density)
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `other` | ``"now"`` \| [`PlainTime`](../wiki/PlainTime) | `undefined` | the PlainTime to compare to / 'now' to use the current time |
| `density` | [`PlainTimeDensity`](../wiki/Exports#plaintimedensity) | `'HMSs'` | the density the comparison has to have |

#### Returns

``0`` \| ``1`` \| ``-1``

`-1 | 0 | 1` indicating which time is more recent

#### Defined in

[valueObjects/composed/PlainTime.ts:277](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainTime.ts#L277)

___

### createOffset

▸ **createOffset**(`offset`, `options?`): [`PlainTime`](../wiki/PlainTime)

creates a new `PlainTime` derived from the existing time, with a given offset

#### Parameters

| Name | Type |
| :------ | :------ |
| `offset` | `Partial`<[`PlainTimeProps`](../wiki/PlainTimeProps)\> |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) |

#### Returns

[`PlainTime`](../wiki/PlainTime)

#### Defined in

[valueObjects/composed/PlainTime.ts:119](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainTime.ts#L119)

___

### createSet

▸ **createSet**(`newData`, `options?`): [`PlainTime`](../wiki/PlainTime)

creates a new `PlainTime` derived from the existing time, where the given `newData`
partial replaces the old data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `newData` | `Partial`<[`PlainTimeProps`](../wiki/PlainTimeProps)\> |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) |

#### Returns

[`PlainTime`](../wiki/PlainTime)

#### Defined in

[valueObjects/composed/PlainTime.ts:106](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainTime.ts#L106)

___

### distance

▸ **distance**(`toOther`, `density?`): `number`

compares this time with a given other `PlainTime` or `'now'` to compare it with the current time
and returns the distance between both.
- distance = other - this
  - positive result = other time was later
  - negative result = other time was earlier
- units depending on density:
  - "H" = hours
  - "HM" = minutes
  - "HMS" = seconds
  - "HMSs" = milliseconds (default)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `toOther` | ``"now"`` \| [`PlainTime`](../wiki/PlainTime) | `undefined` | - |
| `density` | [`PlainTimeDensity`](../wiki/Exports#plaintimedensity) | `'HMSs'` | the density the comparison has to have |

#### Returns

`number`

the distance whereas the unit correlates to the given density (defaults to `ms`)

#### Defined in

[valueObjects/composed/PlainTime.ts:313](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainTime.ts#L313)

___

### equals

▸ **equals**(`obj`, `density?`): `boolean`

compares if the given value is either an equal ValueObject, or an equal value which would create an equal ValueObject

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `obj` | `PlainTimeable` \| [`PlainTime`](../wiki/PlainTime) | `undefined` | to compare of equality |
| `density` | [`PlainTimeDensity`](../wiki/Exports#plaintimedensity) | `'HMSs'` | - |

#### Returns

`boolean`

#### Overrides

[ValueObject](../wiki/ValueObject).[equals](../wiki/ValueObject#equals)

#### Defined in

[valueObjects/composed/PlainTime.ts:245](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainTime.ts#L245)

___

### getTime

▸ **getTime**(`density`): `number`

returns the time in `ms` since 1970 similar to `Date.getTime()`

#### Parameters

| Name | Type |
| :------ | :------ |
| `density` | [`PlainTimeDensity`](../wiki/Exports#plaintimedensity) |

#### Returns

`number`

#### Defined in

[valueObjects/composed/PlainTime.ts:25](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainTime.ts#L25)

___

### toJSON

▸ **toJSON**(): `Object`

this function is invoked by `JSON.stringify()` and converts the inner `"_propertyKey"` to `"propertyKey"`

#### Returns

`Object`

the value

| Name | Type |
| :------ | :------ |
| `hours` | `number` |
| `milliseconds` | `number` |
| `minutes` | `number` |
| `seconds` | `number` |

#### Overrides

[ValueObject](../wiki/ValueObject).[toJSON](../wiki/ValueObject#tojson)

#### Defined in

[valueObjects/composed/PlainTime.ts:334](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainTime.ts#L334)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[valueObjects/composed/PlainTime.ts:330](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainTime.ts#L330)

___

### create

▸ `Static` **create**(`value`, `options?`): [`PlainTime`](../wiki/PlainTime)

### `PlainTimeable`
can be either `PlainTimeProps`:
```typescript
{
 hours?: number;
 minutes?: number;
 seconds?: number;
 milliseconds?: number;
}
```

or `HMSs_Array`:
```typescript
[hours?: number, minutes?: number, seconds?: number, milliseconds?: number]
```

or a `string` representation:
- `"HH"`
- `"HH:MM"`
- `"HH:MM:SS"`
- `"HH:MM:SS.sss+hh:mm"` (with offset)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `PlainTimeable` | to create the ValueObject of |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) | constraints the value has to fulfill |

#### Returns

[`PlainTime`](../wiki/PlainTime)

the created ValueObject

#### Defined in

[valueObjects/composed/PlainTime.ts:71](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainTime.ts#L71)

___

### fromList

▸ `Static` **fromList**(`values`, `options?`): [`PlainTime`](../wiki/PlainTime)[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | `undefined` \| `PlainTimeable`[] | an array of primitives to map to an array of ValueObjects |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) & [`ListCreationOptions`](../wiki/ListCreationOptions) | constraints the values / list has to fulfill |

#### Returns

[`PlainTime`](../wiki/PlainTime)[]

the array of ValueObjects

#### Defined in

[valueObjects/composed/PlainTime.ts:80](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainTime.ts#L80)

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

### now

▸ `Static` **now**(`options?`): [`PlainTime`](../wiki/PlainTime)

creates a `PlainTime` from the current time. Similar to `new Date()`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) & [`PlainTimeNowOptions`](../wiki/PlainTimeNowOptions) |

#### Returns

[`PlainTime`](../wiki/PlainTime)

#### Defined in

[valueObjects/composed/PlainTime.ts:88](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainTime.ts#L88)

___

### parseString

▸ `Static` `Private` **parseString**(`value`, `options?`): [`PlainTimeProps`](../wiki/PlainTimeProps) \| `HMSs_Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `PlainTimeable` |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) |

#### Returns

[`PlainTimeProps`](../wiki/PlainTimeProps) \| `HMSs_Array`

#### Defined in

[valueObjects/composed/PlainTime.ts:198](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainTime.ts#L198)

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

### validate

▸ `Static` **validate**(`value`, `options?`): `Required`<[`PlainTimeProps`](../wiki/PlainTimeProps)\>

**`Throws`**

various errors if not correct

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `PlainTimeable` | to be validated as a valid time with the corresponding constraints (options) |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) | constraints the value has to fulfill |

#### Returns

`Required`<[`PlainTimeProps`](../wiki/PlainTimeProps)\>

the value if the validation was successful

#### Defined in

[valueObjects/composed/PlainTime.ts:151](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainTime.ts#L151)

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

### validatePlainTimeable

▸ `Static` **validatePlainTimeable**(`value`, `options`): `PlainTimeable`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `PlainTimeable` | to be validated as a string, array or object representation of time |
| `options` | `undefined` \| [`CreationOptions`](../wiki/CreationOptions) | constraints the value has to fulfill |

#### Returns

`PlainTimeable`

the valid time

#### Defined in

[valueObjects/composed/PlainTime.ts:178](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainTime.ts#L178)
