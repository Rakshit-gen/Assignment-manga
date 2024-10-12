// app/components/ChapterList.tsx
import { Chapter } from '../../types';

interface ChapterListProps {
  chapters: Chapter[];
  currentChapter: Chapter | null; // Add currentChapter to props
  setCurrentChapter: (chapter: Chapter) => void;
}

const ChapterList: React.FC<ChapterListProps> = ({ chapters, currentChapter, setCurrentChapter }) => (
  <div className='flex m-auto justify-center'>
    {chapters.map(chapter => (
      <button
        key={chapter.id}
        onClick={() => setCurrentChapter(chapter)}
        className='px-[9px] py-[4px]'
        style={{
          backgroundColor: currentChapter?.id === chapter.id ? 'teal' : 'transparent', // Change background color based on selection
          color: currentChapter?.id === chapter.id ? 'white' : 'black', // Change text color based on selection
          cursor: 'pointer',
        }}
      >
        {chapter.chapter_index + 1}
      </button>
    ))}
  </div>
);

export default ChapterList;
