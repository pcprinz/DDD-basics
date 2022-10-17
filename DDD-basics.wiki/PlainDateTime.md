# Class: PlainDateTime

This is a more simplified, but also flexible version of a `Date`.
Related to `PlainTime` for the time and `PlaneDate` for the date.

## Hierarchy

- [`ValueObject`](../wiki/ValueObject)<`void`\>

  ↳ **`PlainDateTime`**

  ↳↳ [`Timestamp`](../wiki/Timestamp)

## Table of contents

### Constructors

- [constructor](../wiki/PlainDateTime#constructor)

### Properties

- [\_value](../wiki/PlainDateTime#_value)
- [date](../wiki/PlainDateTime#date)
- [hours](../wiki/PlainDateTime#hours)
- [milliseconds](../wiki/PlainDateTime#milliseconds)
- [minutes](../wiki/PlainDateTime#minutes)
- [month](../wiki/PlainDateTime#month)
- [seconds](../wiki/PlainDateTime#seconds)
- [weekday](../wiki/PlainDateTime#weekday)
- [year](../wiki/PlainDateTime#year)

### Accessors

- [dayMinutes](../wiki/PlainDateTime#dayminutes)
- [value](../wiki/PlainDateTime#value)

### Methods

- [compare](../wiki/PlainDateTime#compare)
- [createOffset](../wiki/PlainDateTime#createoffset)
- [createSet](../wiki/PlainDateTime#createset)
- [createTimezoneOffset](../wiki/PlainDateTime#createtimezoneoffset)
- [distance](../wiki/PlainDateTime#distance)
- [equals](../wiki/PlainDateTime#equals)
- [getTime](../wiki/PlainDateTime#gettime)
- [isSummerTime](../wiki/PlainDateTime#issummertime)
- [isToday](../wiki/PlainDateTime#istoday)
- [toDate](../wiki/PlainDateTime#todate)
- [toJSON](../wiki/PlainDateTime#tojson)
- [toString](../wiki/PlainDateTime#tostring)
- [create](../wiki/PlainDateTime#create)
- [fromList](../wiki/PlainDateTime#fromlist)
- [listEquals](../wiki/PlainDateTime#listequals)
- [now](../wiki/PlainDateTime#now)
- [prefix](../wiki/PlainDateTime#prefix)
- [validate](../wiki/PlainDateTime#validate)
- [validateInterval](../wiki/PlainDateTime#validateinterval)
- [validateList](../wiki/PlainDateTime#validatelist)

## Constructors

### constructor

• `Protected` **new PlainDateTime**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Required`<[`PlainDateTimeProps`](../wiki/PlainDateTimeProps)\> |

#### Overrides

[ValueObject](../wiki/ValueObject).[constructor](../wiki/ValueObject#constructor)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:79](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L79)

## Properties

### \_value

• `Protected` `Readonly` **\_value**: `void`

the actual value of the ValueObject

#### Inherited from

[ValueObject](../wiki/ValueObject).[_value](../wiki/ValueObject#_value)

#### Defined in

[valueObjects/ValueObject.ts:4](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/ValueObject.ts#L4)

___

### date

• `Readonly` **date**: `number`

#### Defined in

[valueObjects/composed/PlainDateTime.ts:33](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L33)

___

### hours

• `Readonly` **hours**: `number`

#### Defined in

[valueObjects/composed/PlainDateTime.ts:36](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L36)

___

### milliseconds

• `Readonly` **milliseconds**: `number`

#### Defined in

[valueObjects/composed/PlainDateTime.ts:39](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L39)

___

### minutes

• `Readonly` **minutes**: `number`

#### Defined in

[valueObjects/composed/PlainDateTime.ts:37](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L37)

___

### month

• `Readonly` **month**: `number`

#### Defined in

[valueObjects/composed/PlainDateTime.ts:32](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L32)

___

### seconds

• `Readonly` **seconds**: `number`

#### Defined in

[valueObjects/composed/PlainDateTime.ts:38](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L38)

___

### weekday

• `Readonly` **weekday**: `number`

#### Defined in

[valueObjects/composed/PlainDateTime.ts:34](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L34)

___

### year

• `Readonly` **year**: `number`

#### Defined in

[valueObjects/composed/PlainDateTime.ts:31](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L31)

## Accessors

### dayMinutes

• `get` **dayMinutes**(): `number`

returns the total amount of minutes that have passed on this day

#### Returns

`number`

#### Defined in

[valueObjects/composed/PlainDateTime.ts:42](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L42)

___

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

### compare

▸ **compare**(`other`, `density?`): ``0`` \| ``1`` \| ``-1``

compares this date with a given other `PlainDateTime` or `'now'` to compare it with the current dateTime.
- returns `-1` if this dateTime is earlier than the other one
- returns `0` if the dates are equal
- returns `1` if this dateTime is later than the other one

##### Examples
```typescript
'2020-05-25'.compare('2020-09-18') => -1
'2020-05-25'.compare('2020-01-01') => 1
'2020-05-25'.compare('2020-05-06', 'YM') => 0
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `other` | ``"now"`` \| [`PlainDateTime`](../wiki/PlainDateTime) | `undefined` | the PlainDateTime to compare to / 'now' to use the current dateTime |
| `density` | [`PlainDateTimeDensity`](../wiki/Exports#plaindatetimedensity) | `'YMDHMSs'` | the density the comparison has to have |

#### Returns

``0`` \| ``1`` \| ``-1``

`-1 | 0 | 1` indicating which dateTime is more recent

#### Defined in

[valueObjects/composed/PlainDateTime.ts:348](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L348)

___

### createOffset

▸ **createOffset**(`offset`, `options?`): [`PlainDateTime`](../wiki/PlainDateTime)

creates a new `PlainDateTime` derived from the existing dateTime, with a given offset

#### Parameters

| Name | Type |
| :------ | :------ |
| `offset` | `Partial`<[`PlainDateTimeProps`](../wiki/PlainDateTimeProps)\> |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) |

#### Returns

[`PlainDateTime`](../wiki/PlainDateTime)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:185](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L185)

___

### createSet

▸ **createSet**(`newData`, `options?`): [`PlainDateTime`](../wiki/PlainDateTime)

creates a new `PlainDateTime` derived from the existing dateTime, where the given `newData`
partial replaces the old data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `newData` | `Partial`<[`PlainDateTimeProps`](../wiki/PlainDateTimeProps)\> |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) |

#### Returns

[`PlainDateTime`](../wiki/PlainDateTime)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:169](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L169)

___

### createTimezoneOffset

▸ **createTimezoneOffset**(`timezone`, `hasSummertime?`, `options?`): [`PlainDateTime`](../wiki/PlainDateTime)

creates a new `PlainDateTime` derived from the existing dateTime, with a given timezone offset.
The difference from `createOffset()` is that you only create the hour offset and automatically
have the daylight saving time offset added.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `timezone` | `number` | `undefined` |
| `hasSummertime` | `boolean` | `true` |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) | `undefined` |

#### Returns

[`PlainDateTime`](../wiki/PlainDateTime)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:216](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L216)

___

### distance

▸ **distance**(`toOther`, `density?`): `number`

compares this date with a given other `PlainDateTime` or `'now'` to compare it with the current dateTime
and returns the distance between both.
- distance = other - this
  - positive result = other dateTime was later
  - negative result = other dateTime was earlier
- units depending on density:
  - "Y" / "YM" / "YMD" = days
  - "YMDH" = hours
  - "YMDHM" = minutes
  - "YMDHMS" = seconds
  - "YMDHMSs" = milliseconds (default)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `toOther` | ``"now"`` \| [`PlainDateTime`](../wiki/PlainDateTime) | `undefined` | - |
| `density` | [`PlainDateTimeDensity`](../wiki/Exports#plaindatetimedensity) | `'YMDHMSs'` | the density the comparison has to have |

#### Returns

`number`

the distance in days

#### Defined in

[valueObjects/composed/PlainDateTime.ts:398](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L398)

___

### equals

▸ **equals**(`obj`, `density?`): `boolean`

compares if the given value is either an equal ValueObject, or an equal value which would create an equal ValueObject

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `obj` | [`PlainDateTimeable`](../wiki/Exports#plaindatetimeable) \| [`PlainDateTime`](../wiki/PlainDateTime) | `undefined` | to compare of equality |
| `density` | [`PlainDateTimeDensity`](../wiki/Exports#plaindatetimedensity) | `'YMDHMSs'` | - |

#### Returns

`boolean`

#### Overrides

[ValueObject](../wiki/ValueObject).[equals](../wiki/ValueObject#equals)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:310](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L310)

___

### getTime

▸ **getTime**(): `number`

returns the time in `ms` since 1970 similar to `Date.getTime()`

#### Returns

`number`

#### Defined in

[valueObjects/composed/PlainDateTime.ts:47](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L47)

___

### isSummerTime

▸ **isSummerTime**(): `boolean`

#### Returns

`boolean`

#### Defined in

[valueObjects/composed/PlainDateTime.ts:72](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L72)

___

### isToday

▸ **isToday**(): `boolean`

returns `true` if this date matches with the date of today (without time)

#### Returns

`boolean`

#### Defined in

[valueObjects/composed/PlainDateTime.ts:62](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L62)

___

### toDate

▸ **toDate**(`density?`, `timeZoned?`): `Date`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `density` | [`PlainDateTimeDensity`](../wiki/Exports#plaindatetimedensity) | `'YMDHMSs'` |
| `timeZoned` | `boolean` | `false` |

#### Returns

`Date`

#### Defined in

[valueObjects/composed/PlainDateTime.ts:442](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L442)

___

### toJSON

▸ **toJSON**(): `Object`

this function is invoked by `JSON.stringify()` and converts the inner `"_propertyKey"` to `"propertyKey"`

#### Returns

`Object`

the value

| Name | Type |
| :------ | :------ |
| `date` | `number` |
| `hours` | `number` |
| `milliseconds` | `number` |
| `minutes` | `number` |
| `month` | `number` |
| `seconds` | `number` |
| `weekday` | `number` |
| `year` | `number` |

#### Overrides

[ValueObject](../wiki/ValueObject).[toJSON](../wiki/ValueObject#tojson)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:429](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L429)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[valueObjects/composed/PlainDateTime.ts:419](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L419)

___

### create

▸ `Static` **create**(`value`, `options?`): [`PlainDateTime`](../wiki/PlainDateTime)

### `PlainDateTimeable`
can be either `PlainDateTimeProps`:
```typescript
{
 year: number;
 month?: number;
 date?: number;
 hours?: number;
 minutes?: number;
 seconds?: number;
 milliseconds?: number;
}
```

or `YMDHMSs_Array`:
```typescript
[
  year: number,
  month?: number,
  date?: number,
  hours?: number,
  minutes?: number,
  seconds?: number,
  milliseconds?: number
]
```

or a `string` representation:
- `"DD.MM.YYYY"`
- `"YYYY-MM-DD"`
- `"DD.MM.YYYYTHH:MM:SS.sss+hh:mm"`
- JS dateString (RFC2822 || ISO8601)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`PlainDateTimeable`](../wiki/Exports#plaindatetimeable) | to create the ValueObject of |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) | constraints the value has to fulfill |

#### Returns

[`PlainDateTime`](../wiki/PlainDateTime)

the created ValueObject

#### Defined in

[valueObjects/composed/PlainDateTime.ts:131](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L131)

___

### fromList

▸ `Static` **fromList**(`values`, `options?`): [`PlainDateTime`](../wiki/PlainDateTime)[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | `undefined` \| [`PlainDateTimeable`](../wiki/Exports#plaindatetimeable)[] | an array of primitives to map to an array of ValueObjects |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) & [`ListCreationOptions`](../wiki/ListCreationOptions) | constraints the values / list has to fulfill |

#### Returns

[`PlainDateTime`](../wiki/PlainDateTime)[]

the array of ValueObjects

#### Defined in

[valueObjects/composed/PlainDateTime.ts:140](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L140)

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

▸ `Static` **now**(`options?`): [`PlainDateTime`](../wiki/PlainDateTime)

creates a `PlainDateTime` from the current dateTime. Similar to `new Date()`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) & [`PlainDateTimeNowOptions`](../wiki/PlainDateTimeNowOptions) |

#### Returns

[`PlainDateTime`](../wiki/PlainDateTime)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:148](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L148)

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

### validate

▸ `Static` **validate**(`value`, `options?`): `Required`<[`PlainDateTimeProps`](../wiki/PlainDateTimeProps)\>

**`Throws`**

various errors if not correct

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`PlainDateTimeable`](../wiki/Exports#plaindatetimeable) | to be validated as a valid dateTime with the corresponding constraints (options) |
| `options?` | `Omit`<[`CreationOptions`](../wiki/CreationOptions), ``"offset"``\> | constraints the value has to fulfill |

#### Returns

`Required`<[`PlainDateTimeProps`](../wiki/PlainDateTimeProps)\>

the value if the validation was successful

#### Defined in

[valueObjects/composed/PlainDateTime.ts:234](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L234)

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
