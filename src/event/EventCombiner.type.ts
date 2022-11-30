import { DomainEvent } from './DomainEvent';
import { EventHandler } from './EventHandler';

export type Once = {
  /**
   * ### `... When all given handlers dispatch ...`
   * (every given {@link EventHandler} has dispatched at least one {@link DomainEvent})
   * @chains {@link then} & {@link first}
   */
  all: AllType;
  /** ### `... When one of the given handlers dispatches ...`
   * (just one of the given {@link EventHandler} has dispatched a {@link DomainEvent})
   * @chains {@link then}
   */
  some: SomeType;
};

export type Consume = {
  /**
   * ### `... When all given handlers dispatch ...`
   * (every given {@link EventHandler} has dispatched at least one {@link DomainEvent})
   * @chains {@link then} & {@link first}
   */
  all: AllType;
  /** ### `... When one of the given handlers dispatches ...`
   * (just one of the given {@link EventHandler} has dispatched a {@link DomainEvent})
   * @chains {@link then}
   */
  some: SomeType;
};

type AllType = <Handlers extends EventHandler<any>[]>(
  ...handlers: Handlers
) => FirstThenType<Handlers> & AllThen<Handlers>;

type SomeType = <Handlers extends EventHandler<any>[]>(...handlers: Handlers) => SomeThen<Handlers>;

type FirstThenType<Handlers> = {
  /**
   * ### `... Just take the first occurred events from each and ...`
   * (if an event already occurred, then it will not be overwritten by following events of the same
   * type until the `then()` is called and the events are consumed)
   * @chains {@link then}
   */
  first: () => AllThen<Handlers>;
};

/** ### `... Call the given callback.`
 *
 * A list of all possible {@link DomainEvent}s is passed to the callback,
 * which corresponds to the order of the defined {@link EventHandler}s.
 */
export type AllThen<Handlers> = {
  /** ### `... Call the given callback.`
   *
   * A list of all possible {@link DomainEvent}s is passed to the callback,
   * which corresponds to the order of the defined {@link EventHandler}s.
   */
  then: (
    callback: (events: {
      [Key in keyof Handlers]: Handlers[Key] extends EventHandler<infer Payload>
        ? DomainEvent<Payload>
        : never;
    }) => void
  ) => void;
};

export type SomeThen<Handlers> = {
  /** ### `... Call the given callback.`
   *
   * A list of all possible {@link DomainEvent}s is passed to the callback,
   * which corresponds to the order of the defined {@link EventHandler}s.
   *
   * ### Since this method is chained with a `some(...)` method, the {@link DomainEvent}s may also be `'pending'` for those {@link EventHandler}s which have not dispatched yet.
   */
  then: (
    callback: (events: {
      [Key in keyof Handlers]: Handlers[Key] extends EventHandler<infer Payload>
        ? DomainEvent<Payload> | 'pending'
        : never;
    }) => void
  ) => void;
};
