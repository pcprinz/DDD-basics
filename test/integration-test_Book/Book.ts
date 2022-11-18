import { Entity, Identifier, Result } from '../../src';
import { Author, BookTitle, SoldBooksAmount } from './Book.ValueObjects';

type BookProps = {
  author: Author;
  title: BookTitle;
  soldBooksAmount: SoldBooksAmount;
};

// @ts-ignor
export class Book extends Entity<BookProps> {
  public static create(
    isbn: string,
    title: string,
    authorName: { firstName: string; lastName: string },
    amount: number = 0
  ): Result<Book> {
    return Result.combine({
      id: Identifier.create(isbn, { name: 'Book.isbn [ID]' }),
      author: Author.create(authorName.firstName, authorName.lastName),
      title: BookTitle.create(title),
      soldBooksAmount: SoldBooksAmount.create(amount),
    }).convertTo((validProps) => new this(validProps));
  }

  get title() {
    return this.props.title.value;
  }

  get soldBooksAmount() {
    return this.props.soldBooksAmount.value;
  }

  increaseSoldBooksAmount() {
    SoldBooksAmount.create(this.soldBooksAmount + 1)
      .onSuccess((newAmout) => (this.props.soldBooksAmount = newAmout))
      .onFail((error) => console.log('something strange happened: ' + error));
  }
}
