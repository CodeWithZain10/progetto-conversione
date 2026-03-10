import React from 'react';
import VideoCard from './VideoCard';
import './VideoGrid.css';

const VideoGrid = ({ title, videos, showBrowseAll = false, onBrowseAll, onVideoClick }) => {
  return (
    <section className="video-grid-section">
      <div className="video-grid-header">
        <h4 className="video-grid-title">
          {title} <span>&nbsp;&nbsp;</span>
          {showBrowseAll && (
            <>
              <span
                className="video-grid-browse"
                onClick={onBrowseAll}
              >
                Browse All
              </span>
              <span className="video-grid-cursor">></span>
            </>
          )}
        </h4>
      </div>
      
      <div className="video-grid-container">
        <div className="video-grid">
          {videos.map((video) => (
            <div key={video.id} className="video-grid-item">
              <VideoCard video={video} onClick={onVideoClick} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGrid;
