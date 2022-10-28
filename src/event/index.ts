/**
 * @module Events
 *
 * @overview
 * This module is about domain event handling.
 * event handling is used to implement communication between different domains of your application.
 * In order to implement a segregation of concerns and to minimize dependencies between the domains,
 * they are only allowed to communicate via event handling. If domain **A** has completed a task,
 * the result of which domain **B** depends on, **A** triggers an event to which **B** reacts.
 *
 * ### Respond to a handler
 * In this case, an `EventHandler` (`handlerA`) is created for **A**. **B** subscribes to this handler
 * so that it will be notified whenever a `DomainEvent` arrives. Now when **A** has completed a task,
 * it sends an event with an (optional) payload via `handlerA.dispatch(payload)`.
 * Now the callback with which **B** subscribed to `handlerA` is triggered and **B** can react to the
 * completion of the task and additionally receives the result of the task from **A** with the payload.
 * The code then looks like this:
 *
 * ```ts
 * // @ domain A
 * const handlerA = new EventHandler<TYPE>(H_NAME);
 *
 * // @ domain B
 * handlerA.subscribe(S_NAME, CALLBACK)
 * 
 * // @ domain A
 * handlerA.dispatch(PAYLOAD)
 * ```
 *
 * - `TYPE` = type of the payload
 * - `H_NAME` = name of the handler
 * - `PAYLOAD` = payload sent with the domain event
 * - `S_NAME` = name of the subscriber
 * - `CALLBACK` = called when the event was dispatched (provides the payload)
 * - further documentation is found on the {@link EventHandler}
 *
 * ### Respond to multiple handlers
 * Suppose domain **C** wants to react to events from domain **A** and **B**.
 * More precisely, when **A** AND **B** have completed their tasks.
 * Therefore `EventHandler` for domain **A** (`handlerA`) and domain **B** (`handlerB`) are created
 * as above. Instead of registering on both handlers with `subscribe()`, an `EventCombiner` is
 * created for **C**, which reacts when both `handlerA` and `handlerB` have dispatched an event.
 * The code then looks like this:
 *
 * ```ts
 * new EventCombiner().all(handlerA, handlerB).then(CALLBACK);
 * ```
 *
 * - here the `CALLBACK` provides a typed, sorted tuple of the last dispatched events from `handlerA` and `handlerB`
 * - there are more combinations available (see {@link EventCombiner})
 */
export * from './DomainEvent';
export * from './EventCombiner';
export * from './EventHandler';
