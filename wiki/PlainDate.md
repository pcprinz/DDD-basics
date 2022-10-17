# Class: PlainDate

This is a more simplified, but also flexible version of a `Date` which specifically represents
just the date (without the time).
Related to `PlainTime` for the time and `PlaneDateTime` for a combination of both.

## Hierarchy

- [`ValueObject`](../wiki/ValueObject)<`void`\>

  ↳ **`PlainDate`**

## Table of contents

### Constructors

- [constructor](../wiki/PlainDate#constructor)

### Properties

- [\_value](../wiki/PlainDate#_value)
- [date](../wiki/PlainDate#date)
- [month](../wiki/PlainDate#month)
- [weekday](../wiki/PlainDate#weekday)
- [year](../wiki/PlainDate#year)

### Accessors

- [value](../wiki/PlainDate#value)

### Methods

- [compare](../wiki/PlainDate#compare)
- [createOffset](../wiki/PlainDate#createoffset)
- [createSet](../wiki/PlainDate#createset)
- [distance](../wiki/PlainDate#distance)
- [equals](../wiki/PlainDate#equals)
- [toDate](../wiki/PlainDate#todate)
- [toJSON](../wiki/PlainDate#tojson)
- [toString](../wiki/PlainDate#tostring)
- [create](../wiki/PlainDate#create)
- [fromList](../wiki/PlainDate#fromlist)
- [listEquals](../wiki/PlainDate#listequals)
- [now](../wiki/PlainDate#now)
- [parseString](../wiki/PlainDate#parsestring)
- [prefix](../wiki/PlainDate#prefix)
- [validate](../wiki/PlainDate#validate)
- [validateInterval](../wiki/PlainDate#validateinterval)
- [validateList](../wiki/PlainDate#validatelist)
- [validatePlainDateable](../wiki/PlainDate#validateplaindateable)

## Constructors

### constructor

• `Private` **new PlainDate**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Required`<[`PlainDateProps`](../wiki/PlainDateProps)\> |

#### Overrides

[ValueObject](../wiki/ValueObject).[constructor](../wiki/ValueObject#constructor)

#### Defined in

[valueObjects/composed/PlainDate.ts:24](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDate.ts#L24)

## Properties

### \_value

• `Protected` `Readonly` **\_value**: `void`

the actual value of the ValueObject

#### Inherited from

[ValueObject](../wiki/ValueObject).[_value](../wiki/ValueObject#_value)

#### Defined in

[valueObjects/ValueObject.ts:4](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/ValueObject.ts#L4)

___

### date

• `Readonly` **date**: `number`

#### Defined in

[valueObjects/composed/PlainDate.ts:21](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDate.ts#L21)

___

### month

• `Readonly` **month**: `number`

#### Defined in

[valueObjects/composed/PlainDate.ts:20](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDate.ts#L20)

___

### weekday

• `Readonly` **weekday**: `number`

#### Defined in

[valueObjects/composed/PlainDate.ts:22](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDate.ts#L22)

___

### year

• `Readonly` **year**: `number`

#### Defined in

[valueObjects/composed/PlainDate.ts:19](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDate.ts#L19)

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

compares this date with a given other `PlainDate` or `'now'` to compare it with the current date.
- returns `-1` if this date is older than the other one
- returns `0` if the dates are equal
- returns `1` if this date is more recent than the other one

##### Examples
```typescript
'2020-05-25'.compare('2020-09-18') => -1
'2020-05-25'.compare('2020-01-01') => 1
'2020-05-25'.compare('2020-05-06', 'YM') => 0 (with density)
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `other` | [`PlainDate`](../wiki/PlainDate) \| ``"now"`` | `undefined` | the PlainDate to compare to / 'now' to use the current date |
| `density` | [`PlainDateDensity`](../wiki/Exports#plaindatedensity) | `'YMD'` | the density the comparison has to have |

#### Returns

``0`` \| ``1`` \| ``-1``

`-1 | 0 | 1` indicating which date is more recent

#### Defined in

[valueObjects/composed/PlainDate.ts:248](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDate.ts#L248)

___

### createOffset

▸ **createOffset**(`offset`, `options?`): [`PlainDate`](../wiki/PlainDate)

creates a new `PlainDate` derived from the existing date, with a given offset

#### Parameters

| Name | Type |
| :------ | :------ |
| `offset` | `Partial`<[`PlainDateProps`](../wiki/PlainDateProps)\> |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) |

#### Returns

[`PlainDate`](../wiki/PlainDate)

#### Defined in

[valueObjects/composed/PlainDate.ts:110](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDate.ts#L110)

___

### createSet

▸ **createSet**(`newData`, `options?`): [`PlainDate`](../wiki/PlainDate)

creates a new `PlainDate` derived from the existing date, where the given `newData`
partial replaces the old data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `newData` | `Partial`<[`PlainDateProps`](../wiki/PlainDateProps)\> |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) |

#### Returns

[`PlainDate`](../wiki/PlainDate)

#### Defined in

[valueObjects/composed/PlainDate.ts:98](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDate.ts#L98)

___

### distance

▸ **distance**(`toOther`, `density?`): `number`

compares this date with a given other `PlainDate` or `'now'` to compare it with the current date
and returns the distance between both.
- distance = other - this
  - positive result = other date was later
  - negative result = other date was earlier
- always returns the distance in days (independent from the density)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `toOther` | [`PlainDate`](../wiki/PlainDate) \| ``"now"`` | `undefined` | - |
| `density` | [`PlainDateDensity`](../wiki/Exports#plaindatedensity) | `'YMD'` | the density the comparison has to have |

#### Returns

`number`

the distance in days

#### Defined in

[valueObjects/composed/PlainDate.ts:274](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDate.ts#L274)

___

### equals

▸ **equals**(`obj`, `density?`): `boolean`

compares if the given value is either an equal ValueObject, or an equal value which would create an equal ValueObject

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `obj` | [`PlainDateable`](../wiki/Exports#plaindateable) \| [`PlainDate`](../wiki/PlainDate) | `undefined` | to compare of equality |
| `density` | [`PlainDateDensity`](../wiki/Exports#plaindatedensity) | `'YMD'` | - |

#### Returns

`boolean`

#### Overrides

[ValueObject](../wiki/ValueObject).[equals](../wiki/ValueObject#equals)

#### Defined in

[valueObjects/composed/PlainDate.ts:217](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDate.ts#L217)

___

### toDate

▸ **toDate**(`density?`): `Date`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `density` | [`PlainDateDensity`](../wiki/Exports#plaindatedensity) | `'YMD'` |

#### Returns

`Date`

#### Defined in

[valueObjects/composed/PlainDate.ts:296](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDate.ts#L296)

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
| `month` | `number` |
| `weekday` | `number` |
| `year` | `number` |

#### Overrides

[ValueObject](../wiki/ValueObject).[toJSON](../wiki/ValueObject#tojson)

#### Defined in

[valueObjects/composed/PlainDate.ts:287](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDate.ts#L287)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[valueObjects/composed/PlainDate.ts:283](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDate.ts#L283)

___

### create

▸ `Static` **create**(`value`, `options?`): [`PlainDate`](../wiki/PlainDate)

### `PlainDateable`
can be either `PlainDateProps`:
```typescript
{
 year: number;
 month?: number;
 date?: number;
}
```

or `YMD_Array`:
```typescript
[year: number, month?: number, date?: number]
```

or a `string` representation:
- `"DD.MM.YYYY"`
- `"DD.M.YYYY"`
- `"D.MM.YYYY"`
- `"D.M.YYYY"`
- `"YYYY-MM-DD"`
- `"YYYY-MM-D"`
- `"YYYY-M-DD"`
- `"YYYY-M-D"`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`PlainDateable`](../wiki/Exports#plaindateable) | to create the ValueObject of |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) | constraints the value has to fulfill |

#### Returns

[`PlainDate`](../wiki/PlainDate)

the created ValueObject

#### Defined in

[valueObjects/composed/PlainDate.ts:64](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDate.ts#L64)

___

### fromList

▸ `Static` **fromList**(`values`, `options?`): [`PlainDate`](../wiki/PlainDate)[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | `undefined` \| [`PlainDateable`](../wiki/Exports#plaindateable)[] | an array of primitives to map to an array of ValueObjects |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) & [`ListCreationOptions`](../wiki/ListCreationOptions) | constraints the values / list has to fulfill |

#### Returns

[`PlainDate`](../wiki/PlainDate)[]

the array of ValueObjects

#### Defined in

[valueObjects/composed/PlainDate.ts:73](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDate.ts#L73)

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

▸ `Static` **now**(`options?`): [`PlainDate`](../wiki/PlainDate)

creates a `PlainDate` from the current date. Similar to `new Date()`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) & [`PlainDateNowOptions`](../wiki/PlainDateNowOptions) |

#### Returns

[`PlainDate`](../wiki/PlainDate)

#### Defined in

[valueObjects/composed/PlainDate.ts:81](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDate.ts#L81)

___

### parseString

▸ `Static` `Private` **parseString**(`value`, `options?`): [`PlainDateProps`](../wiki/PlainDateProps) \| `YMD_Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`PlainDateable`](../wiki/Exports#plaindateable) |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) |

#### Returns

[`PlainDateProps`](../wiki/PlainDateProps) \| `YMD_Array`

#### Defined in

[valueObjects/composed/PlainDate.ts:192](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDate.ts#L192)

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

▸ `Static` **validate**(`value`, `options?`): `Required`<[`PlainDateProps`](../wiki/PlainDateProps)\>

**`Throws`**

various errors if not correct

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`PlainDateable`](../wiki/Exports#plaindateable) | to be validated as a valid date with the corresponding constraints (options) |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) | constraints the value has to fulfill |

#### Returns

`Required`<[`PlainDateProps`](../wiki/PlainDateProps)\>

the value if the validation was successful

#### Defined in

[valueObjects/composed/PlainDate.ts:137](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDate.ts#L137)

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

### validatePlainDateable

▸ `Static` **validatePlainDateable**(`value`, `options?`): [`PlainDateable`](../wiki/Exports#plaindateable)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`PlainDateable`](../wiki/Exports#plaindateable) | to be validated as a string, array or object representation of a date |
| `options?` | [`CreationOptions`](../wiki/CreationOptions) | constraints the value has to fulfill |

#### Returns

[`PlainDateable`](../wiki/Exports#plaindateable)

the valid date

#### Defined in

[valueObjects/composed/PlainDate.ts:179](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/valueObjects/composed/PlainDate.ts#L179)
