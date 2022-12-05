# ddd-basics

![GitHub release (latest by date)](https://img.shields.io/github/v/release/pcprinz/ddd-basics) ![GitHub Release Date](https://img.shields.io/github/release-date/pcprinz/ddd-basics) ![GitHub branch checks state](https://img.shields.io/github/checks-status/pcprinz/ddd-basics/master?label=build) ![npm bundle size](https://img.shields.io/bundlephobia/min/ddd-basics) ![GitHub](https://img.shields.io/github/license/pcprinz/ddd-basics) ![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/pcprinz/329161dbcfd07c60d90c29cc887130fb/raw/ddd-basics__heads_master.json)

<!-- https://shields.io/ -->

THIS PAGE IS STILL UNDER CONSTRUCTION!!

# Documentation

Visit the [Documentation](https://pcprinz.github.io/DDD-basics/modules.html) for detailed information about all parts of this repo

The general approach for this repo is to implement the documentation as ts-doc. That's why full documentation is always on the [Documentation](https://pcprinz.github.io/DDD-basics/modules.html).

# Usage

This library is currently divided into 3 modules:

1. [Basic][basic] - includes general classes like:
   - [`Entity`][entity] - an abstract class with an inbuilt identifier
   - [`Serializable`][serializable] - an abstract class for serializing private properties
   - [`Result`][result] - the result of a validation (e.g. when creating ValueObjects)
2. [Events][events] - Domain Event Synchronization
   - [DomainEvent][domainevent] - an event to be sent from a handler to a subscription callback
   - [EventHandler][eventhandler] - implements classic event handling (typesafe)
   - [EventCombiner][eventcombiner] - combines subscriptions to multiple EventHandlers
3. [ValueObjects][valueobjects] - includes a variety of predefined ValueObjects with inbuilt validation for extendable purposes.

# Installation

### npm:

`npm i --save ddd-basics`

### yarn:

`yarn add ddd-basics`.

# Dependencies

- uuid (v4)

[basic]: https://pcprinz.github.io/DDD-basics/modules/Basic.html
[entity]: https://pcprinz.github.io/DDD-basics/classes/Basic.Entity.html
[serializable]: https://pcprinz.github.io/DDD-basics/classes/Basic.Serializable.html
[result]: https://pcprinz.github.io/DDD-basics/classes/Basic.Result.html
[events]: https://pcprinz.github.io/DDD-basics/modules/Events.html
[domainevent]: https://pcprinz.github.io/DDD-basics/classes/Events.DomainEvent.html
[eventcombiner]: https://pcprinz.github.io/DDD-basics/classes/Events.EventCombiner.html
[eventhandler]: https://pcprinz.github.io/DDD-basics/classes/Events.EventHandler.html
[valueobjects]: https://pcprinz.github.io/DDD-basics/modules/ValueObjects.html
