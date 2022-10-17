# Class: Timestamp

a special version of a `PlainDateTime` which offers expire calculations

## Hierarchy

- [`PlainDateTime`](../wiki/PlainDateTime)

  ↳ **`Timestamp`**

## Table of contents

### Constructors

- [constructor](../wiki/Timestamp#constructor)

### Properties

- [\_value](../wiki/Timestamp#_value)
- [date](../wiki/Timestamp#date)
- [hours](../wiki/Timestamp#hours)
- [milliseconds](../wiki/Timestamp#milliseconds)
- [minutes](../wiki/Timestamp#minutes)
- [month](../wiki/Timestamp#month)
- [seconds](../wiki/Timestamp#seconds)
- [weekday](../wiki/Timestamp#weekday)
- [year](../wiki/Timestamp#year)

### Accessors

- [dayMinutes](../wiki/Timestamp#dayminutes)
- [value](../wiki/Timestamp#value)

### Methods

- [compare](../wiki/Timestamp#compare)
- [createOffset](../wiki/Timestamp#createoffset)
- [createSet](../wiki/Timestamp#createset)
- [createTimezoneOffset](../wiki/Timestamp#createtimezoneoffset)
- [distance](../wiki/Timestamp#distance)
- [equals](../wiki/Timestamp#equals)
- [expiresIn](../wiki/Timestamp#expiresin)
- [getTime](../wiki/Timestamp#gettime)
- [isExpired](../wiki/Timestamp#isexpired)
- [isSummerTime](../wiki/Timestamp#issummertime)
- [isToday](../wiki/Timestamp#istoday)
- [toDate](../wiki/Timestamp#todate)
- [toJSON](../wiki/Timestamp#tojson)
- [toString](../wiki/Timestamp#tostring)
- [create](../wiki/Timestamp#create)
- [fromList](../wiki/Timestamp#fromlist)
- [in](../wiki/Timestamp#in)
- [listEquals](../wiki/Timestamp#listequals)
- [now](../wiki/Timestamp#now)
- [prefix](../wiki/Timestamp#prefix)
- [validate](../wiki/Timestamp#validate)
- [validateInterval](../wiki/Timestamp#validateinterval)
- [validateList](../wiki/Timestamp#validatelist)

## Constructors

### constructor

• `Protected` **new Timestamp**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Required`<[`PlainDateTimeProps`](../wiki/PlainDateTimeProps)\> |

#### Inherited from

[PlainDateTime](../wiki/PlainDateTime).[constructor](../wiki/PlainDateTime#constructor)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:79](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDateTime.ts#L79)

## Properties

### \_value

• `Protected` `Readonly` **\_value**: `void`

the actual value of the ValueObject

#### Inherited from

[PlainDateTime](../wiki/PlainDateTime).[_value](../wiki/PlainDateTime#_value)

#### Defined in

[valueObjects/ValueObject.ts:4](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L4)

___

### date

• `Readonly` **date**: `number`

#### Inherited from

[PlainDateTime](../wiki/PlainDateTime).[date](../wiki/PlainDateTime#date)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:33](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDateTime.ts#L33)

___

### hours

• `Readonly` **hours**: `number`

#### Inherited from

[PlainDateTime](../wiki/PlainDateTime).[hours](../wiki/PlainDateTime#hours)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:36](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDateTime.ts#L36)

___

### milliseconds

• `Readonly` **milliseconds**: `number`

#### Inherited from

[PlainDateTime](../wiki/PlainDateTime).[milliseconds](../wiki/PlainDateTime#milliseconds)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:39](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDateTime.ts#L39)

___

### minutes

• `Readonly` **minutes**: `number`

#### Inherited from

[PlainDateTime](../wiki/PlainDateTime).[minutes](../wiki/PlainDateTime#minutes)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:37](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDateTime.ts#L37)

___

### month

• `Readonly` **month**: `number`

#### Inherited from

[PlainDateTime](../wiki/PlainDateTime).[month](../wiki/PlainDateTime#month)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:32](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDateTime.ts#L32)

___

### seconds

• `Readonly` **seconds**: `number`

#### Inherited from

[PlainDateTime](../wiki/PlainDateTime).[seconds](../wiki/PlainDateTime#seconds)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:38](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDateTime.ts#L38)

___

### weekday

• `Readonly` **weekday**: `number`

#### Inherited from

[PlainDateTime](../wiki/PlainDateTime).[weekday](../wiki/PlainDateTime#weekday)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:34](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDateTime.ts#L34)

___

### year

• `Readonly` **year**: `number`

#### Inherited from

[PlainDateTime](../wiki/PlainDateTime).[year](../wiki/PlainDateTime#year)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:31](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDateTime.ts#L31)

## Accessors

### dayMinutes

• `get` **dayMinutes**(): `number`

returns the total amount of minutes that have passed on this day

#### Returns

`number`

#### Inherited from

PlainDateTime.dayMinutes

#### Defined in

[valueObjects/composed/PlainDateTime.ts:42](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDateTime.ts#L42)

___

### value

• `get` **value**(): `T`

the actual value of this ValueObject

#### Returns

`T`

#### Inherited from

PlainDateTime.value

#### Defined in

[valueObjects/ValueObject.ts:13](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L13)

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

#### Inherited from

[PlainDateTime](../wiki/PlainDateTime).[compare](../wiki/PlainDateTime#compare)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:348](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDateTime.ts#L348)

___

### createOffset

▸ **createOffset**(`offset`, `options?`): [`Timestamp`](../wiki/Timestamp)

creates a new `PlainDateTime` derived from the existing dateTime, with a given offset

#### Parameters

| Name | Type |
| :------ | :------ |
| `offset` | `Partial`<[`PlainDateTimeProps`](../wiki/PlainDateTimeProps)\> |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) |

#### Returns

[`Timestamp`](../wiki/Timestamp)

#### Overrides

[PlainDateTime](../wiki/PlainDateTime).[createOffset](../wiki/PlainDateTime#createoffset)

#### Defined in

[valueObjects/composed/Timestamp.ts:59](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/Timestamp.ts#L59)

___

### createSet

▸ **createSet**(`newData`, `options?`): [`Timestamp`](../wiki/Timestamp)

creates a new `PlainDateTime` derived from the existing dateTime, where the given `newData`
partial replaces the old data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `newData` | `Partial`<[`PlainDateTimeProps`](../wiki/PlainDateTimeProps)\> |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) |

#### Returns

[`Timestamp`](../wiki/Timestamp)

#### Overrides

[PlainDateTime](../wiki/PlainDateTime).[createSet](../wiki/PlainDateTime#createset)

#### Defined in

[valueObjects/composed/Timestamp.ts:55](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/Timestamp.ts#L55)

___

### createTimezoneOffset

▸ **createTimezoneOffset**(`timezone`, `hasSummertime?`, `options?`): [`Timestamp`](../wiki/Timestamp)

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

[`Timestamp`](../wiki/Timestamp)

#### Overrides

[PlainDateTime](../wiki/PlainDateTime).[createTimezoneOffset](../wiki/PlainDateTime#createtimezoneoffset)

#### Defined in

[valueObjects/composed/Timestamp.ts:63](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/Timestamp.ts#L63)

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

#### Inherited from

[PlainDateTime](../wiki/PlainDateTime).[distance](../wiki/PlainDateTime#distance)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:398](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDateTime.ts#L398)

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

#### Inherited from

[PlainDateTime](../wiki/PlainDateTime).[equals](../wiki/PlainDateTime#equals)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:310](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDateTime.ts#L310)

___

### expiresIn

▸ **expiresIn**(`density?`): `number`

returns the (negative) distance from the timestamp to "now"

#### Parameters

| Name | Type |
| :------ | :------ |
| `density?` | [`PlainDateTimeDensity`](../wiki/Exports#plaindatetimedensity) |

#### Returns

`number`

#### Defined in

[valueObjects/composed/Timestamp.ts:22](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/Timestamp.ts#L22)

___

### getTime

▸ **getTime**(): `number`

returns the time in `ms` since 1970 similar to `Date.getTime()`

#### Returns

`number`

#### Inherited from

[PlainDateTime](../wiki/PlainDateTime).[getTime](../wiki/PlainDateTime#gettime)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:47](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDateTime.ts#L47)

___

### isExpired

▸ **isExpired**(`range?`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `range?` | `Partial`<[`PlainDateTime`](../wiki/PlainDateTime)\> | to add to the existing Timestamp |

#### Returns

`boolean`

if the timestamp (incl. range) is expired

#### Defined in

[valueObjects/composed/Timestamp.ts:17](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/Timestamp.ts#L17)

___

### isSummerTime

▸ **isSummerTime**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[PlainDateTime](../wiki/PlainDateTime).[isSummerTime](../wiki/PlainDateTime#issummertime)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:72](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDateTime.ts#L72)

___

### isToday

▸ **isToday**(): `boolean`

returns `true` if this date matches with the date of today (without time)

#### Returns

`boolean`

#### Inherited from

[PlainDateTime](../wiki/PlainDateTime).[isToday](../wiki/PlainDateTime#istoday)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:62](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDateTime.ts#L62)

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

#### Inherited from

[PlainDateTime](../wiki/PlainDateTime).[toDate](../wiki/PlainDateTime#todate)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:442](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDateTime.ts#L442)

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

#### Inherited from

[PlainDateTime](../wiki/PlainDateTime).[toJSON](../wiki/PlainDateTime#tojson)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:429](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDateTime.ts#L429)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Inherited from

[PlainDateTime](../wiki/PlainDateTime).[toString](../wiki/PlainDateTime#tostring)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:419](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDateTime.ts#L419)

___

### create

▸ `Static` **create**(`value`, `options?`): [`Timestamp`](../wiki/Timestamp)

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

[`Timestamp`](../wiki/Timestamp)

the created ValueObject

#### Overrides

[PlainDateTime](../wiki/PlainDateTime).[create](../wiki/PlainDateTime#create)

#### Defined in

[valueObjects/composed/Timestamp.ts:40](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/Timestamp.ts#L40)

___

### fromList

▸ `Static` **fromList**(`values`, `options?`): [`Timestamp`](../wiki/Timestamp)[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | `undefined` \| [`PlainDateTimeable`](../wiki/Exports#plaindatetimeable)[] | an array of primitives to map to an array of ValueObjects |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) & [`ListCreationOptions`](../wiki/ListCreationOptions) | constraints the values / list has to fulfill |

#### Returns

[`Timestamp`](../wiki/Timestamp)[]

the array of ValueObjects

#### Overrides

[PlainDateTime](../wiki/PlainDateTime).[fromList](../wiki/PlainDateTime#fromlist)

#### Defined in

[valueObjects/composed/Timestamp.ts:44](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/Timestamp.ts#L44)

___

### in

▸ `Static` **in**(`offset`, `options?`): [`Timestamp`](../wiki/Timestamp)

creates a timestamp with an offset to "now" e.g. 1h in the future:
```typescript
const soon = Timestamp.in({hours: 1});
soon.expiresIn('YMDH');  // 1
soon.isExpired();        // false
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `offset` | `Partial`<[`PlainDateTimeProps`](../wiki/PlainDateTimeProps)\> |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) |

#### Returns

[`Timestamp`](../wiki/Timestamp)

#### Defined in

[valueObjects/composed/Timestamp.ts:34](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/Timestamp.ts#L34)

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

[PlainDateTime](../wiki/PlainDateTime).[listEquals](../wiki/PlainDateTime#listequals)

#### Defined in

[valueObjects/ValueObject.ts:29](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L29)

___

### now

▸ `Static` **now**(`options?`): [`Timestamp`](../wiki/Timestamp)

creates a `PlainDateTime` from the current dateTime. Similar to `new Date()`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) & [`PlainDateTimeNowOptions`](../wiki/PlainDateTimeNowOptions) |

#### Returns

[`Timestamp`](../wiki/Timestamp)

#### Overrides

[PlainDateTime](../wiki/PlainDateTime).[now](../wiki/PlainDateTime#now)

#### Defined in

[valueObjects/composed/Timestamp.ts:51](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/Timestamp.ts#L51)

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

[PlainDateTime](../wiki/PlainDateTime).[prefix](../wiki/PlainDateTime#prefix)

#### Defined in

[valueObjects/ValueObject.ts:77](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L77)

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

#### Inherited from

[PlainDateTime](../wiki/PlainDateTime).[validate](../wiki/PlainDateTime#validate)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:234](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDateTime.ts#L234)

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

[PlainDateTime](../wiki/PlainDateTime).[validateInterval](../wiki/PlainDateTime#validateinterval)

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

[PlainDateTime](../wiki/PlainDateTime).[validateList](../wiki/PlainDateTime#validatelist)

#### Defined in

[valueObjects/ValueObject.ts:101](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L101)
