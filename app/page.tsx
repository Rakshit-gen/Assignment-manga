'use client'
import React, { useEffect, useState } from 'react';
import BookList from './components/BookList';
import ChapterList from './components/ChapterList';
import PageViewer from './components/PageViewer';
import { Book, Chapter, Page } from '../types';

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('http://52.195.171.228:8080/books/');
      const data = await response.json();
      setBooks(data);
    };

    fetchBooks();
  }, []);

  // Fetch chapters when a book is selected
  useEffect(() => {
    if (currentBook) {
      const fetchChapters = async () => {
        const chapterPromises = currentBook.chapter_ids.map(async (chapterId:any) => {
          const response = await fetch(`http://52.195.171.228:8080/chapters/${chapterId}/`);
          return response.json();
        });
        const chapterData = await Promise.all(chapterPromises);
        setChapters(chapterData);
      };

      fetchChapters();
    }
  }, [currentBook]);

  // Fetch pages when a chapter is selected
  useEffect(() => {
    if (currentChapter) {
      setCurrentPageIndex(0); // Reset to first page on chapter change
      const fetchPages = async () => {
        const response = await fetch(`http://52.195.171.228:8080/chapters/${currentChapter.id}/`);
        const chapterDetail = await response.json();
        setPages(chapterDetail.pages);
      };

      fetchPages();
    }
  }, [currentChapter]);

  const goToPage = (index: number) => {
    setCurrentPageIndex(index);
  };

  const handleImageClick = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      if (currentPageIndex < pages.length - 1) {
        setCurrentPageIndex(currentPageIndex + 1);
      } else if (currentChapter && currentChapter.chapter_index < chapters.length - 1) {
        // Move to next chapter's first page
        const nextChapter = chapters[currentChapter.chapter_index + 1];
        setCurrentChapter(nextChapter);
        setCurrentPageIndex(0);
      }
    } else if (direction === 'prev') {
      if (currentPageIndex > 0) {
        setCurrentPageIndex(currentPageIndex - 1);
      } else if (currentChapter && currentChapter.chapter_index > 0) {
        // Move to previous chapter's last page
        const prevChapter = chapters[currentChapter.chapter_index - 1];
        setCurrentChapter(prevChapter);
        setCurrentPageIndex(prevChapter.pages.length - 1);
      }
    }
  };

  return (
    <div>
      
      {books.length === 0 ? (
        <p className='flex m-auto justify-center'>Loading books...</p>
      ) : (
        <BookList books={books} currentBook={currentBook} setCurrentBook={setCurrentBook} />
      )}
      {currentBook && chapters.length > 0 && (
        <ChapterList chapters={chapters} currentChapter={currentChapter} setCurrentChapter={setCurrentChapter} />
      )}
      <br />
      {pages.length > 0 ? (
        <PageViewer
          pages={pages}
          currentPageIndex={currentPageIndex}
          goToPage={goToPage}
          totalPages={pages.length}
          onImageClick={handleImageClick} 
        />
      ) : (
        <p className='flex m-auto justify-center'></p>
      )}
    </div>
  );
};

export default Home;
