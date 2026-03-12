import React from 'react';
import VideoCard from './VideoCard';
import './VideoGrid.css';

const VideoGrid = ({ title, data, onVideoClick, showBrowseAll = false, onBrowseAll, onToggleFavorite, onRemoveFavoriteRequest, onLandingClick, favorites }) => {
  return (
    <section className="video-grid-section">
      <div className="completehome">
        <h4 className="completehome__title">
          {title} <span>&nbsp;&nbsp;</span>
          {showBrowseAll && (
            <>
              <span
                className="completehome__value"
                onClick={onBrowseAll}
                style={{ cursor: 'pointer', color: '#007bff' }}
              >
                Browse All
              </span>
              <span className="completehome__cursor"> &gt; </span>
            </>
          )}
        </h4>
      </div>
      <div className="video-grid-container">
        <div className="video-grid">
          {data.map((video) => (
            <div key={video.id} className="video-grid-item">
              <VideoCard
                video={video}
                onClick={onVideoClick}
                onToggleFavorite={onToggleFavorite}
                onRemoveFavoriteRequest={onRemoveFavoriteRequest}
                onLandingClick={onLandingClick}
                favorites={favorites}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGrid;
