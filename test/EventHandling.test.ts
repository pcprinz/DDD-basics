import { ANSIFormat } from 'loxer';
import { EventCombiner, DomainEvent, EventHandler } from '../src/';

let result = 'EventCombiners:\n';
// afterAll(() => result.length > 0 && console.log(ANSIFormat.fgSuccess(result)));

const E1 = new EventHandler<string>('E1');
const E2 = new EventHandler<number>('E2');

function getPayload(es: (DomainEvent<any> | 'pending')[]) {
  return JSON.stringify(es.map((e) => (e === 'pending' ? 'pending' : e.payload)));
}

test('EventCombiner', () => {
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
  new EventCombiner('consumeSome')
    .consume()
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
  result += '\n|> h\n';
  E1.dispatch('h');
  result += '\n';
});
