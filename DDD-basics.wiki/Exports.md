# DDD basics - v0.0.1

## Table of contents

### Classes

- [DomainEvent](../wiki/DomainEvent)
- [Entity](../wiki/Entity)
- [EventCombiner](../wiki/EventCombiner)
- [EventHandler](../wiki/EventHandler)
- [Float](../wiki/Float)
- [FloatString](../wiki/FloatString)
- [Integer](../wiki/Integer)
- [IntegerString](../wiki/IntegerString)
- [NonEmptyString](../wiki/NonEmptyString)
- [NumericId](../wiki/NumericId)
- [OptionalString](../wiki/OptionalString)
- [PlainDate](../wiki/PlainDate)
- [PlainDateTime](../wiki/PlainDateTime)
- [PlainTime](../wiki/PlainTime)
- [SafeBoolean](../wiki/SafeBoolean)
- [SafeDate](../wiki/SafeDate)
- [SemVersion](../wiki/SemVersion)
- [Serializable](../wiki/Serializable)
- [Timestamp](../wiki/Timestamp)
- [ValueObject](../wiki/ValueObject)

### Interfaces

- [CreationOptions](../wiki/CreationOptions)
- [IntegerOptions](../wiki/IntegerOptions)
- [IntervalCreationOptions](../wiki/IntervalCreationOptions)
- [ListCreationOptions](../wiki/ListCreationOptions)
- [NonEmptyStringOptions](../wiki/NonEmptyStringOptions)
- [OptionalStringOptions](../wiki/OptionalStringOptions)
- [PlainDateNowOptions](../wiki/PlainDateNowOptions)
- [PlainDateProps](../wiki/PlainDateProps)
- [PlainDateTimeNowOptions](../wiki/PlainDateTimeNowOptions)
- [PlainDateTimeProps](../wiki/PlainDateTimeProps)
- [PlainTimeNowOptions](../wiki/PlainTimeNowOptions)
- [PlainTimeProps](../wiki/PlainTimeProps)
- [SafeBooleanOptions](../wiki/SafeBooleanOptions)
- [SafeDateOptions](../wiki/SafeDateOptions)
- [Subscription](../wiki/Subscription)

### Type Aliases

- [Dateable](../wiki/Exports#dateable)
- [FloatOptions](../wiki/Exports#floatoptions)
- [FloatStringOptions](../wiki/Exports#floatstringoptions)
- [FormatOption](../wiki/Exports#formatoption)
- [FormatOptions](../wiki/Exports#formatoptions)
- [IntegerStringOptions](../wiki/Exports#integerstringoptions)
- [NumericIdOptions](../wiki/Exports#numericidoptions)
- [PlainDateDensity](../wiki/Exports#plaindatedensity)
- [PlainDateOptions](../wiki/Exports#plaindateoptions)
- [PlainDateTimeDensity](../wiki/Exports#plaindatetimedensity)
- [PlainDateTimeOptions](../wiki/Exports#plaindatetimeoptions)
- [PlainDateTimeable](../wiki/Exports#plaindatetimeable)
- [PlainDateable](../wiki/Exports#plaindateable)
- [PlainTimeDensity](../wiki/Exports#plaintimedensity)
- [PlainTimeOptions](../wiki/Exports#plaintimeoptions)
- [YMDHMSs\_Array](../wiki/Exports#ymdhmss_array)

### Functions

- [format](../wiki/Exports#format)

## Type Aliases

### Dateable

Ƭ **Dateable**: `Date` \| `string` \| `number`

#### Defined in

[valueObjects/SafeDate.ts:136](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/SafeDate.ts#L136)

___

### FloatOptions

Ƭ **FloatOptions**: [`IntervalCreationOptions`](../wiki/IntervalCreationOptions)

#### Defined in

[valueObjects/numeric/Float.ts:81](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/numeric/Float.ts#L81)

___

### FloatStringOptions

Ƭ **FloatStringOptions**: [`FloatOptions`](../wiki/Exports#floatoptions)

#### Defined in

[valueObjects/numeric/FloatString.ts:97](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/numeric/FloatString.ts#L97)

___

### FormatOption

Ƭ **FormatOption**: ``"umlauts"`` \| ``"singleSpace"`` \| ``"stripHTML"``

#### Defined in

[valueObjects/string/OptionalString.ts:129](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/string/OptionalString.ts#L129)

___

### FormatOptions

Ƭ **FormatOptions**: [`FormatOption`](../wiki/Exports#formatoption)[]

#### Defined in

[valueObjects/string/OptionalString.ts:128](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/string/OptionalString.ts#L128)

___

### IntegerStringOptions

Ƭ **IntegerStringOptions**: [`IntegerOptions`](../wiki/IntegerOptions)

#### Defined in

[valueObjects/numeric/IntegerString.ts:98](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/numeric/IntegerString.ts#L98)

___

### NumericIdOptions

Ƭ **NumericIdOptions**: `Omit`<[`IntervalCreationOptions`](../wiki/IntervalCreationOptions), ``"min"``\>

the options for a numeric identifier, which are basically the [IntervalCreationOptions](../wiki/IntervalCreationOptions)
without the `min` property, because this is fixed to `0`.

#### Defined in

[valueObjects/numeric/NumericId.ts:65](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/numeric/NumericId.ts#L65)

___

### PlainDateDensity

Ƭ **PlainDateDensity**: ``"Y"`` \| ``"YM"`` \| ``"YMD"``

the density / accuracy to compare and create dates
- "Y" - years
- "YM" - months
- "YMD" - days

#### Defined in

[valueObjects/composed/PlainDate.ts:309](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDate.ts#L309)

___

### PlainDateOptions

Ƭ **PlainDateOptions**: [`CreationOptions`](../wiki/CreationOptions)

#### Defined in

[valueObjects/composed/PlainDate.ts:311](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDate.ts#L311)

___

### PlainDateTimeDensity

Ƭ **PlainDateTimeDensity**: ``"Y"`` \| ``"YM"`` \| ``"YMD"`` \| ``"YMDH"`` \| ``"YMDHM"`` \| ``"YMDHMS"`` \| ``"YMDHMSs"``

the density / accuracy to compare and create dateTimes
- "Y" - years
- "YM" - months
- "YMD" - days
- "YMDH" = hours
- "YMDHM" = minutes
- "YMDHMS" = seconds
- "YMDHMSs" = milliseconds

#### Defined in

[valueObjects/composed/PlainDateTime.ts:470](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L470)

___

### PlainDateTimeOptions

Ƭ **PlainDateTimeOptions**: [`CreationOptions`](../wiki/CreationOptions)

#### Defined in

[valueObjects/composed/PlainDateTime.ts:472](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L472)

___

### PlainDateTimeable

Ƭ **PlainDateTimeable**: [`PlainDateTimeProps`](../wiki/PlainDateTimeProps) \| [`YMDHMSs_Array`](../wiki/Exports#ymdhmss_array) \| `string` \| `number`

everything that might be parsable to a valid `PlainDateTime`

#### Defined in

[valueObjects/composed/PlainDateTime.ts:25](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L25)

___

### PlainDateable

Ƭ **PlainDateable**: [`PlainDateProps`](../wiki/PlainDateProps) \| `YMD_Array` \| `string`

everything that might be parsable to a valid `PlainDate`

#### Defined in

[valueObjects/composed/PlainDate.ts:12](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDate.ts#L12)

___

### PlainTimeDensity

Ƭ **PlainTimeDensity**: ``"H"`` \| ``"HM"`` \| ``"HMS"`` \| ``"HMSs"``

the density / accuracy to compare and create times
- "H" = hours
- "HM" = minutes
- "HMS" = seconds
- "HMSs" = milliseconds

#### Defined in

[valueObjects/composed/PlainTime.ts:351](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainTime.ts#L351)

___

### PlainTimeOptions

Ƭ **PlainTimeOptions**: [`CreationOptions`](../wiki/CreationOptions)

#### Defined in

[valueObjects/composed/PlainTime.ts:353](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainTime.ts#L353)

___

### YMDHMSs\_Array

Ƭ **YMDHMSs\_Array**: [year: number, month?: number, date?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number]

an array representation of `PlainDateTimeProps`

#### Defined in

[valueObjects/composed/PlainDateTime.ts:15](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/composed/PlainDateTime.ts#L15)

## Functions

### format

▸ **format**(`text`, `options`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |
| `options` | [`FormatOptions`](../wiki/Exports#formatoptions) |

#### Returns

`string`

#### Defined in

[valueObjects/string/OptionalString.ts:130](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/valueObjects/string/OptionalString.ts#L130)
