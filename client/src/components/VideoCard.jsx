import React, { useState } from 'react';
import './VideoCard.css';

const VideoCard = ({ video, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    if (onClick) onClick(video);
  };

  return (
    <div 
      className={`video-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="video-thumbnail">
        <img 
          src={video.imgSrc} 
          alt={video.episodeTitle}
          className="thumbnail-image"
        />
        {isHovered && video.trailerSrc && (
          <video 
            className="hover-video"
            autoPlay 
            muted 
            loop
            playsInline
          >
            <source src={video.trailerSrc} type="video/mp4" />
          </video>
        )}
        
        {/* Video Controls Overlay */}
        {isHovered && (
          <div className="video-controls-overlay">
            <div className="video-title-section">
              <h3 className="video-series-title">S 'Season 3'</h3>
            </div>
            
            <div className="video-control-buttons">
              <button className="control-btn play-btn" onClick={(e) => { e.stopPropagation(); handleClick(); }}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
              <button className="control-btn add-btn" onClick={(e) => e.stopPropagation()}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              </button>
              <button className="control-btn share-btn" onClick={(e) => e.stopPropagation()}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                </svg>
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="video-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '35%' }}></div>
              </div>
            </div>
            
            {/* Mute Button */}
            <button className="mute-btn" onClick={(e) => e.stopPropagation()}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            </button>
          </div>
        )}
        
        {/* Default overlay for non-hovered state */}
        {!isHovered && (
          <div className="video-overlay">
            <div className="play-button">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <div className="video-info">
              <span className="video-duration">{video.episodeTime}</span>
              <span className="video-quality">{video.qualityVideo}</span>
            </div>
          </div>
        )}
      </div>
      <div className="video-details">
        <h3 className="video-title">{video.episodeTitle}</h3>
        <p className="video-description">{video.desc}</p>
        <div className="video-meta">
          <span className="video-year">{video.year}</span>
          <span className="video-category">{video.category}</span>
          <span className="video-rating">{video.classificationVideo}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
