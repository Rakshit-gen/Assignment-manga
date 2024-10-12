// app/components/BookList.tsx
import { Book } from '../../types';

interface BookListProps {
  books: Book[];
  currentBook: Book | null; // Add currentBook to props
  setCurrentBook: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, currentBook, setCurrentBook }) => (
  <div className='flex m-auto justify-center'>
    {books.map(book => (
      <button
        key={book.id}
        onClick={() => setCurrentBook(book)}
        className='border p-1 bg-slate-200'
        style={{
          backgroundColor: currentBook?.id === book.id ? 'teal' : 'transparent', 
          color: currentBook?.id === book.id ? 'white' : 'black'
        }}
      >
        {book.title}
      </button>
    ))}
  </div>
);

export default BookList;
