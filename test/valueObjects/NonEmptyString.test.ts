import {NonEmptyString} from '../../src/valueObjects/string/NonEmptyString';

test('create and validate', () => {
  NonEmptyString.create('foo', {range: ['foo', 'bar']})
  enum num {foo, bar};
  NonEmptyString.create('foo', {range: num})
  enum str {foo = 'foo', bar = 'bar'};
  NonEmptyString.create('bar', {range: str})
  enum het {foo = 0, bar = 'bar'};
  NonEmptyString.create('bar', {range: het})
  NonEmptyString.create('bar', {regex: /ba/})
});
