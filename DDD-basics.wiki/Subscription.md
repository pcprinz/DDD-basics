# Interface: Subscription<Payload\>

## Type parameters

| Name |
| :------ |
| `Payload` |

## Table of contents

### Properties

- [callback](../wiki/Subscription#callback)
- [name](../wiki/Subscription#name)
- [suppressLogging](../wiki/Subscription#suppresslogging)

## Properties

### callback

• **callback**: (`event`: [`DomainEvent`](../wiki/DomainEvent)<`Payload`\>) => `void`

#### Type declaration

▸ (`event`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`DomainEvent`](../wiki/DomainEvent)<`Payload`\> |

##### Returns

`void`

#### Defined in

[event/EventHandler.ts:5](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/event/EventHandler.ts#L5)

___

### name

• **name**: `string`

#### Defined in

[event/EventHandler.ts:4](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/event/EventHandler.ts#L4)

___

### suppressLogging

• `Optional` **suppressLogging**: `boolean`

#### Defined in

[event/EventHandler.ts:6](https://github.com/pcprinz/DDD-basics/blob/f16da81/src/event/EventHandler.ts#L6)
