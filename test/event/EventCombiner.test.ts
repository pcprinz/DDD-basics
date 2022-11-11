import { DomainEvent, EventCombiner, EventHandler } from '../../src';

let result = 'EventCombiners:\n';
// afterAll(() => result.length > 0 && console.log(ANSIFormat.fgSuccess(result)));

function getPayload(es: (DomainEvent<any> | 'pending')[]) {
  return JSON.stringify(es.map((e) => (e === 'pending' ? 'pending' : e.payload)));
}

test('all methods', () => {
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

  expect(result).toStrictEqual(expectedResult);

  let error = 'no error';
  cs.all(E1).then((_) => (error = `There schould be no 'then' called after destruction`));
  expect(error).toStrictEqual('no error');
});

const expectedResult = `EventCombiners:

|> a
some: ["a","pending"]
onceSome: ["a","pending"]
consumeSome: ["a","pending"]

|> b
some: ["b","pending"]
consumeSome: ["b","pending"]

|> 1
all: ["b",1]
onceAll: ["b",1]
consumeAll: ["b",1]
some: ["b",1]
consumeSome: ["pending",1]

|> c
all: ["c",1]
some: ["c",1]
consumeSome: ["c","pending"]

|> 2
all: ["c",2]
consumeAll: ["c",2]
some: ["c",2]
consumeSome: ["pending",2]

|> 3
all: ["c",3]
some: ["c",3]
consumeSome: ["pending",3]

|> d
all: ["d",3]
consumeAll: ["d",3]
some: ["d",3]
consumeSome: ["d","pending"]

|> 4
all: ["d",4]
some: ["d",4]
consumeSome: ["pending",4]

|> e
all: ["e",4]
consumeAll: ["e",4]
some: ["e",4]
consumeSome: ["e","pending"]

|> f
all: ["f",4]
some: ["f",4]
consumeSome: ["f","pending"]

|> 5
all: ["f",5]
consumeAll: ["f",5]
some: ["f",5]
consumeSome: ["pending",5]

|> 6
all: ["f",6]
some: ["f",6]
consumeSome: ["pending",6]

|> g
all: ["g",6]
consumeAll: ["g",6]
some: ["g",6]
consumeSome: ["g","pending"]

|> 7
all: ["g",7]
some: ["g",7]
consumeSome: ["pending",7]

|> h
all: ["h",7]
consumeAll: ["h",7]
some: ["h",7]
`;
