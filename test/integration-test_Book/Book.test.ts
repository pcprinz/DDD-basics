import { Book } from './Book';

test('creation', () => {
  const book = Book.create('a1b2c3d4', 'MyTitle', { firstName: 'My', lastName: 'Self' });
  expect(book.isSuccess()).toBeTruthy();
});
