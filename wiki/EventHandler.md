# Class: EventHandler<Payload\>

A Handler that allows Subscribers (any caller) to subscribe to a specific event.
All Subscribers will be notified if the event dispatcher dispatched the event

## Type parameters

| Name |
| :------ |
| `Payload` |

## Table of contents

### Constructors

- [constructor](../wiki/EventHandler#constructor)

### Properties

- [\_name](../wiki/EventHandler#_name)
- [\_occurred](../wiki/EventHandler#_occurred)
- [\_subscriptions](../wiki/EventHandler#_subscriptions)

### Accessors

- [name](../wiki/EventHandler#name)
- [occurred](../wiki/EventHandler#occurred)

### Methods

- [dispatch](../wiki/EventHandler#dispatch)
- [logDispatch](../wiki/EventHandler#logdispatch)
- [logDispatchedSubscription](../wiki/EventHandler#logdispatchedsubscription)
- [logSubscribe](../wiki/EventHandler#logsubscribe)
- [logUnsubscribe](../wiki/EventHandler#logunsubscribe)
- [subscribe](../wiki/EventHandler#subscribe)
- [unsubscribe](../wiki/EventHandler#unsubscribe)

## Constructors

### constructor

• **new EventHandler**<`Payload`\>(`name`)

#### Type parameters

| Name |
| :------ |
| `Payload` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Defined in

[event/EventHandler.ts:17](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventHandler.ts#L17)

## Properties

### \_name

• `Protected` **\_name**: `string`

#### Defined in

[event/EventHandler.ts:13](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventHandler.ts#L13)

___

### \_occurred

• `Protected` **\_occurred**: `boolean` = `false`

#### Defined in

[event/EventHandler.ts:15](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventHandler.ts#L15)

___

### \_subscriptions

• `Protected` **\_subscriptions**: `Map`<`string`, [`Subscription`](../wiki/Subscription)<`Payload`\>\>

#### Defined in

[event/EventHandler.ts:14](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventHandler.ts#L14)

## Accessors

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[event/EventHandler.ts:21](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventHandler.ts#L21)

___

### occurred

• `get` **occurred**(): `boolean`

indicates if a `DomainEvent` has at least once been fired

#### Returns

`boolean`

#### Defined in

[event/EventHandler.ts:26](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventHandler.ts#L26)

## Methods

### dispatch

▸ **dispatch**(`payload`): `void`

Dispatches that the handled event has been fired. Therefore, all Subscribers callbacks are called
with the given optional payload.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Payload` | (optional) payload to broadcast to all Subscribers |

#### Returns

`void`

#### Defined in

[event/EventHandler.ts:58](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventHandler.ts#L58)

___

### logDispatch

▸ `Protected` **logDispatch**(): `void`

#### Returns

`void`

#### Defined in

[event/EventHandler.ts:78](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventHandler.ts#L78)

___

### logDispatchedSubscription

▸ `Protected` **logDispatchedSubscription**(`subscription`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `subscription` | [`Subscription`](../wiki/Subscription)<`Payload`\> |

#### Returns

`void`

#### Defined in

[event/EventHandler.ts:82](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventHandler.ts#L82)

___

### logSubscribe

▸ `Protected` **logSubscribe**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

#### Defined in

[event/EventHandler.ts:70](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventHandler.ts#L70)

___

### logUnsubscribe

▸ `Protected` **logUnsubscribe**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

#### Defined in

[event/EventHandler.ts:74](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventHandler.ts#L74)

___

### subscribe

▸ **subscribe**(`name`, `callback`, `suppressLogging?`): `void`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | of the calling Subscriber |
| `callback` | (`event`: [`DomainEvent`](../wiki/DomainEvent)<`Payload`\>) => `void` | `undefined` | to call if the event has been dispatched |
| `suppressLogging` | `boolean` | `false` | suppresses the usage of the extendable logging functionality of this handler |

#### Returns

`void`

#### Defined in

[event/EventHandler.ts:35](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventHandler.ts#L35)

___

### unsubscribe

▸ **unsubscribe**(`name`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | of the Subscriber that has to match the name, the subscription was made with |

#### Returns

`void`

#### Defined in

[event/EventHandler.ts:47](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventHandler.ts#L47)
