// app/components/PageViewer.tsx
import React from 'react';

interface Page {
  id: number;
  page_index: number;
  image: {
    id: number;
    file: string;
  };
}

interface PageViewerProps {
  pages: Page[];
  currentPageIndex: number;
  goToPage: (index: number) => void; // New prop for page navigation
  totalPages: number; // Total pages to display for pagination
  onImageClick: (direction: 'next' | 'prev') => void; // New prop for image click navigation
}

const PageViewer: React.FC<PageViewerProps> = ({ pages, currentPageIndex, goToPage, totalPages, onImageClick }) => {
  return (
    <div>
      {pages.length > 0 && (
        <img
          src={pages[currentPageIndex].image.file}
          alt={`Page ${currentPageIndex + 1}`}
          className='flex m-auto justify-center'
          style={{ maxWidth: '100%', height:'600px', cursor: 'pointer' }}
          onClick={() => onImageClick(currentPageIndex === totalPages - 1 ? 'prev' : 'next')}
        />
      )}
      <div style={{ margin: '-9px 0', textAlign: 'center' }}>
        
        <span>{`${currentPageIndex + 1} / ${totalPages}`}</span>
        
      </div>
    </div>
  );
};

export default PageViewer;
