import { Serializable } from '../../src';

test('toJSON', () => {
  const ser = new TestSerializable();
  const jsoned = JSON.parse(JSON.stringify(ser));
  expect(jsoned.id).toBeUndefined();
  expect(jsoned.name).toStrictEqual('should');
  expect(jsoned.age).toStrictEqual(98);
});

class TestSerializable extends Serializable {
  id = '234907';
  _name = 'should';
  _age = 98;

  constructor() {
    super();
  }
}
