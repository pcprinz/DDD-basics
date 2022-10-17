# Class: DomainEvent<Payload\>

An event passed from an EventHandler to a Subscriber.
Usually this will not be created manually but automatically
while `dispatch`ing events at the `EventHandler`

## Type parameters

| Name |
| :------ |
| `Payload` |

## Hierarchy

- [`Serializable`](../wiki/Serializable)

  ↳ **`DomainEvent`**

## Table of contents

### Constructors

- [constructor](../wiki/DomainEvent#constructor)

### Properties

- [\_id](../wiki/DomainEvent#_id)
- [\_name](../wiki/DomainEvent#_name)
- [\_payload](../wiki/DomainEvent#_payload)
- [\_timestamp](../wiki/DomainEvent#_timestamp)

### Accessors

- [id](../wiki/DomainEvent#id)
- [name](../wiki/DomainEvent#name)
- [payload](../wiki/DomainEvent#payload)
- [timestamp](../wiki/DomainEvent#timestamp)

### Methods

- [toJSON](../wiki/DomainEvent#tojson)

## Constructors

### constructor

• **new DomainEvent**<`Payload`\>(`name`, `payload`)

#### Type parameters

| Name |
| :------ |
| `Payload` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `payload` | `Payload` |

#### Overrides

[Serializable](../wiki/Serializable).[constructor](../wiki/Serializable#constructor)

#### Defined in

[event/DomainEvent.ts:31](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/DomainEvent.ts#L31)

## Properties

### \_id

• `Private` **\_id**: `string`

#### Defined in

[event/DomainEvent.ts:8](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/DomainEvent.ts#L8)

___

### \_name

• `Private` **\_name**: `string`

#### Defined in

[event/DomainEvent.ts:13](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/DomainEvent.ts#L13)

___

### \_payload

• `Private` **\_payload**: `Payload`

#### Defined in

[event/DomainEvent.ts:25](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/DomainEvent.ts#L25)

___

### \_timestamp

• `Private` **\_timestamp**: `Date`

#### Defined in

[event/DomainEvent.ts:19](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/DomainEvent.ts#L19)

## Accessors

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Defined in

[event/DomainEvent.ts:9](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/DomainEvent.ts#L9)

___

### name

• `get` **name**(): `string`

The name of the `EventHandler` which dispatched this event

#### Returns

`string`

#### Defined in

[event/DomainEvent.ts:15](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/DomainEvent.ts#L15)

___

### payload

• `get` **payload**(): `Payload`

the payload which was given while dispatching the event

#### Returns

`Payload`

#### Defined in

[event/DomainEvent.ts:27](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/DomainEvent.ts#L27)

___

### timestamp

• `get` **timestamp**(): `Date`

the `Date` this event was dispatched at the `EventHandler`

#### Returns

`Date`

#### Defined in

[event/DomainEvent.ts:21](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/DomainEvent.ts#L21)

## Methods

### toJSON

▸ **toJSON**(): `Record`<`any`, `any`\>

reduces the Serializable to its private ("underscored") attributes.
All non-underscored attributes and methods will be omitted.

**This method overrides the built-in `toJSON()` which is primarily used in `JSON.stringify()`**

#### Returns

`Record`<`any`, `any`\>

an object containing all private attributes

#### Inherited from

[Serializable](../wiki/Serializable).[toJSON](../wiki/Serializable#tojson)

#### Defined in

[Serializable.ts:10](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/Serializable.ts#L10)
