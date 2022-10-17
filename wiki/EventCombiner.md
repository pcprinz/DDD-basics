# Class: EventCombiner

Combines multiple events to let Subscribers listen to any combination of the events. There are 6
different combinations that can be achieved by the following chaining of the EventCombiners methods.

| method | first call on | subsequent calls on | provided payloads of |
|---|---|---|---|
| .all() | all events | every event | every events last received |
| .some() | any event | every event | every events last (received or not) |
| .once().all() | all events | never again | every events last received |
| .once().some() | any event | never again | only the first received |
| .consume().all() | all events | again all events | every events freshly received |
| .consume().some() | any event | every event | only the last received |

## Detailed overview

Consider having `new EventCombiner('myCombiner')` as a prefix for the following method chains:

### `.all(HANDLERS).then(CALLBACK)`
- Calls the given CALLBACK once **all** of the given HANDLERS have fired.
- After that, every time one of the HANDLERS fires, the CALLBACK is called again.
- *use this if you want to react to multiple events, that all* **must** *be fired once*

### `.some(HANDLERS).then(CALLBACK)`
- Calls the given CALLBACK once **one** of the given HANDLERS has fired.
- After that, every time one of the HANDLERS fires, the CALLBACK is called again.
- *use this to react to multiple events without any restriction*

### `.once().all(HANDLERS).then(CALLBACK)`
- Calls the given CALLBACK once **all** of the given HANDLERS have fired.
- After that, the CALLBACK is never called again, when one of the HANDLERS is fired.
- *use this if you want to react when a whole set of events has fired once*

### `.once().some(HANDLERS).then(CALLBACK)`
- Calls the given CALLBACK once **one** of the given HANDLERS has fired.
- After that, the CALLBACK is never called again, when one of the HANDLERS is fired.
- *use this if you want to react if a random event fires once*

### `.consume().all(HANDLERS).then(CALLBACK)`
- Calls the given CALLBACK once **all** of the given HANDLERS have fired.
- After that **all** of the given HANDLERS have to be fired once **again** for another CALLBACK call.
- *Use this if you want to react to a synchronously repeated occurrence of a whole set of events*

### `.consume().some(HANDLERS).then(CALLBACK)`
- Calls the given CALLBACK once **one** of the given HANDLERS has fired.
- After that, every time one of the HANDLERS fires, the CALLBACK is called again.
- *use this to react to multiple events with the restriction, that only the last occurred event
  has a payload in the CALLBACK*

## `consume()` behavior
"consume" can be understood as a consumption of the fired events when the callback is called, so
`consume()` resets the received events. This means that the payloads provided in the CALLBACK will
only be the ones that have been delivered since the last call of the CALLBACK. Therefore `all()`
will have all "*fresh*" payloads and `some()` will have only one (the last) payload.

Without `consume()` the CALLBACKS will always receive the respectively last payload that has been
delivered for every corresponding event - even if the event has fired in a previous iteration
of the CALLBACK.

## HANDLERS
HANDLERS is a list of `EventHandler`s that one would normally subscribe separately to.

## CALLBACK
The CALLBACK is a function that provides the fired `DomainEvent`s from the given HANDLERS as an array. The order of the DomainEvents
in the array correlates to the order of the given HANDLERS from the `all(HANDLERS)` or `some(HANDLERS)` method.
The DomainEvents including their payloads are also correctly typed corresponding to their HANDLERS.

### ATTENTION:
Since `some()` means that not all of the HANDLERS have to fire, not all of the provided
DomainEvents may exist. Therefore the type is `DomainEvent<any> | 'pending'`, where 'pending' means,
that the EVENT has not yet been fired. This has to be catched when working with the `.some(HANDLERS)` payloads.

## Table of contents

### Constructors

- [constructor](../wiki/EventCombiner#constructor)

### Properties

- [\_all](../wiki/EventCombiner#_all)
- [\_consume](../wiki/EventCombiner#_consume)
- [\_eventHandlers](../wiki/EventCombiner#_eventhandlers)
- [\_name](../wiki/EventCombiner#_name)
- [\_once](../wiki/EventCombiner#_once)
- [\_receivedEvents](../wiki/EventCombiner#_receivedevents)

### Methods

- [all](../wiki/EventCombiner#all)
- [consume](../wiki/EventCombiner#consume)
- [logDispatch](../wiki/EventCombiner#logdispatch)
- [once](../wiki/EventCombiner#once)
- [resetReceivedEvents](../wiki/EventCombiner#resetreceivedevents)
- [some](../wiki/EventCombiner#some)
- [then](../wiki/EventCombiner#then)
- [thenIsFulfilled](../wiki/EventCombiner#thenisfulfilled)
- [unsubscribeEventHandlers](../wiki/EventCombiner#unsubscribeeventhandlers)

## Constructors

### constructor

• **new EventCombiner**(`name`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Defined in

[event/EventCombiner.ts:80](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventCombiner.ts#L80)

## Properties

### \_all

• `Private` **\_all**: `Partial`<`boolean`\> = `true`

#### Defined in

[event/EventCombiner.ts:84](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventCombiner.ts#L84)

___

### \_consume

• `Private` **\_consume**: `boolean` = `false`

#### Defined in

[event/EventCombiner.ts:110](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventCombiner.ts#L110)

___

### \_eventHandlers

• `Protected` **\_eventHandlers**: [`EventHandler`](../wiki/EventHandler)<`any`\>[] = `[]`

#### Defined in

[event/EventCombiner.ts:77](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventCombiner.ts#L77)

___

### \_name

• `Protected` **\_name**: `string`

#### Defined in

[event/EventCombiner.ts:76](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventCombiner.ts#L76)

___

### \_once

• `Private` **\_once**: `boolean` = `false`

#### Defined in

[event/EventCombiner.ts:102](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventCombiner.ts#L102)

___

### \_receivedEvents

• `Protected` **\_receivedEvents**: `Map`<`string`, [`DomainEvent`](../wiki/DomainEvent)<`any`\> \| ``"pending"``\>

#### Defined in

[event/EventCombiner.ts:78](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventCombiner.ts#L78)

## Methods

### all

▸ **all**<`EH`\>(...`eventHandler`): `AllThenType`<`EH`\>

When all given events occur ...

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EH` | extends [`EventHandler`](../wiki/EventHandler)<`any`\>[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...eventHandler` | [...EH[]] |

#### Returns

`AllThenType`<`EH`\>

#### Defined in

[event/EventCombiner.ts:86](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventCombiner.ts#L86)

___

### consume

▸ **consume**(): `Object`

Every time ...

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `all` | <EH\>(...`eventHandler`: [...EH[]]) => `AllThenType`<`EH`\> |
| `some` | <EH\>(...`eventHandler`: [...EH[]]) => `SomeThenType`<`EH`\> |

#### Defined in

[event/EventCombiner.ts:112](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventCombiner.ts#L112)

___

### logDispatch

▸ `Protected` **logDispatch**(): `void`

#### Returns

`void`

#### Defined in

[event/EventCombiner.ts:144](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventCombiner.ts#L144)

___

### once

▸ **once**(): `Object`

Just the first time ...

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `all` | <EH\>(...`eventHandler`: [...EH[]]) => `AllThenType`<`EH`\> |
| `some` | <EH\>(...`eventHandler`: [...EH[]]) => `SomeThenType`<`EH`\> |

#### Defined in

[event/EventCombiner.ts:104](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventCombiner.ts#L104)

___

### resetReceivedEvents

▸ `Private` **resetReceivedEvents**(): `void`

#### Returns

`void`

#### Defined in

[event/EventCombiner.ts:165](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventCombiner.ts#L165)

___

### some

▸ **some**<`EH`\>(...`eventHandler`): `SomeThenType`<`EH`\>

When one of the given events occurs ...

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EH` | extends [`EventHandler`](../wiki/EventHandler)<`any`\>[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...eventHandler` | [...EH[]] |

#### Returns

`SomeThenType`<`EH`\>

#### Defined in

[event/EventCombiner.ts:94](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventCombiner.ts#L94)

___

### then

▸ `Private` **then**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`events`: ([`DomainEvent`](../wiki/DomainEvent)<`any`\> \| ``"pending"``)[]) => `void` |

#### Returns

`void`

#### Defined in

[event/EventCombiner.ts:118](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventCombiner.ts#L118)

___

### thenIsFulfilled

▸ `Private` **thenIsFulfilled**(`all`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `all` | `boolean` |

#### Returns

`boolean`

#### Defined in

[event/EventCombiner.ts:148](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventCombiner.ts#L148)

___

### unsubscribeEventHandlers

▸ `Private` **unsubscribeEventHandlers**(): `void`

#### Returns

`void`

#### Defined in

[event/EventCombiner.ts:161](https://github.com/pcprinz/DDD-basics/blob/347e30e/src/event/EventCombiner.ts#L161)
