import { ANSIFormat } from 'loxer';
import { EventCombiner, DomainEvent, EventHandler } from '../src';

let result = 'EventCombiners:\n';
afterAll(() => result.length > 0 && console.log(ANSIFormat.fgSuccess(result)));

function getPayload(es: (DomainEvent<any> | 'pending')[]) {
  return JSON.stringify(es.map((e) => (e === 'pending' ? 'pending' : e.payload)));
}

test('EventHandler', () => {
  const handler = new EventHandler<string>('testHandler');

  expect(handler.name).toEqual('testHandler');
  expect(handler.occurred).toBeFalsy();

  const event = new DomainEvent<string>('plainEvent', 'plainPayload');

  expect(event.id).toBeDefined();
  expect(event.timestamp).toBeDefined();
  expect(event.name).toEqual('plainEvent');
  expect(event.payload).toEqual('plainPayload');

  handler.subscribe('testSubscription', (dispatchedEvent) => {
    expect(dispatchedEvent.name).toEqual('testHandler');
    expect(dispatchedEvent.payload).toEqual('testPayload');
  });

  handler.dispatch('testPayload');

  expect(handler.occurred).toBeTruthy();

  handler.unsubscribe('testSubscription');
  // now this event will not be handled, though the expected payload will not fail
  handler.dispatch('failing payload');
});

// TODO write expectations
test('EventCombiner', () => {
  const E1 = new EventHandler<string>('E1');
  const E2 = new EventHandler<number>('E2');

  new EventCombiner('all').all(E1, E2).then((es) => (result += `all: ${getPayload(es)}\n`));
  new EventCombiner('onceAll')
    .once()
    .all(E1, E2)
    .then((es) => (result += `onceAll: ${getPayload(es)}\n`));
  new EventCombiner('consumeAll')
    .consume()
    .all(E1, E2)
    .then((es) => (result += `consumeAll: ${getPayload(es)}\n`));

  new EventCombiner('some').some(E1, E2).then((es) => (result += `some: ${getPayload(es)}\n`));
  new EventCombiner('onceSome')
    .once()
    .some(E1, E2)
    .then((es) => (result += `onceSome: ${getPayload(es)}\n`));
  const cs = new EventCombiner('consumeSome');
  cs.consume()
    .some(E1, E2)
    .then((es) => (result += `consumeSome: ${getPayload(es)}\n`));

  result += '\n|> a\n';
  E1.dispatch('a');
  result += '\n|> b\n';
  E1.dispatch('b');
  result += '\n|> 1\n';
  E2.dispatch(1);
  result += '\n|> c\n';
  E1.dispatch('c');
  result += '\n|> 2\n';
  E2.dispatch(2);
  result += '\n|> 3\n';
  E2.dispatch(3);
  result += '\n|> d\n';
  E1.dispatch('d');
  result += '\n|> 4\n';
  E2.dispatch(4);
  result += '\n|> e\n';
  E1.dispatch('e');
  result += '\n|> f\n';
  E1.dispatch('f');
  result += '\n|> 5\n';
  E2.dispatch(5);
  result += '\n|> 6\n';
  E2.dispatch(6);
  result += '\n|> g\n';
  E1.dispatch('g');
  result += '\n|> 7\n';
  E2.dispatch(7);
  cs.destroy();
  result += '\n|> h\n';
  E1.dispatch('h');
  result += '\n';
});
