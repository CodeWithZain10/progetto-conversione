import React, { useState, useRef, useEffect } from 'react';
import VideoCard from './VideoCard';
import './VideoSlider.css';

const VideoSlider = ({ title, videos, showBrowseAll = false, onBrowseAll, onVideoClick }) => {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const checkScrollPosition = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, [videos]);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = direction === 'left' 
        ? sliderRef.current.scrollLeft - scrollAmount
        : sliderRef.current.scrollLeft + scrollAmount;
      
      sliderRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    sliderRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab';
    }
    checkScrollPosition();
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab';
    }
  };

  return (
    <section className="video-slider-section">
      <div className="video-slider-header">
        <h4 className="video-slider-title">
          {title} <span>&nbsp;&nbsp;</span>
          {showBrowseAll && (
            <>
              <span
                className="video-slider-browse"
                onClick={onBrowseAll}
              >
                Browse All
              </span>
              <span className="video-slider-cursor">{'>'}</span>
            </>
          )}
        </h4>
      </div>
      
      <div className="video-slider-container">
        {canScrollLeft && (
          <button 
            className="slider-nav-btn slider-nav-left"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
        )}
        
        <div 
          className="video-slider"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onScroll={checkScrollPosition}
        >
          <div className="video-slider-track">
            {videos.map((video) => (
              <div key={video.id} className="video-slider-item">
                <VideoCard video={video} onClick={onVideoClick} />
              </div>
            ))}
          </div>
        </div>
        
        {canScrollRight && (
          <button 
            className="slider-nav-btn slider-nav-right"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        )}
      </div>
    </section>
  );
};

export default VideoSlider;
