import React, { useState, useRef, useEffect } from 'react';
import './VideoCard.css';

const VideoCard = ({ video, onClick, onToggleFavorite, onRemoveFavoriteRequest, onLandingClick, favorites = [] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isRemoveHovered, setIsRemoveHovered] = useState(false);
  const videoRef = useRef(null);

  // Use useEffect to handle play/pause reliably
  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log("Hover video play blocked:", err);
      });
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const handleActionClick = (e, action) => {
    e.stopPropagation();
    console.log(`Action: ${action} for ${video.episodeTitle}`);
    if (action === 'play' && onClick) {
      onClick(video);
    } else if (action === 'add') {
      const isFav = favorites.some((fav) => fav.id === video.id);
      if (isFav && onRemoveFavoriteRequest) {
        // Request confirmation modal to remove
        onRemoveFavoriteRequest(video);
      } else if (!isFav && onToggleFavorite) {
        // Direct add
        onToggleFavorite(video);
      }
    } else if (action === 'landing' && onLandingClick) {
      onLandingClick(video);
    }
  };

  const isFavorite = favorites.some((fav) => fav.id === video.id);

  // Correctly handle assets from public folder
  const getAssetPath = (path) => {
    if (!path) return '';
    return path.startsWith('/') ? path : `/${path}`;
  };

  const imgSrc = getAssetPath(video.imgSrc);
  const videoSrc = getAssetPath(video.videoSrc || video.trailerSrc);
  const progress = video.percentage || 0;

  return (
    <div
      className={`video-card-container ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Media Section */}
      <div className="media-section">
        <img className="video-poster" src={imgSrc} alt={video.episodeTitle} />

        {videoSrc && (
          <video
            ref={videoRef}
            className={`hover-video ${isHovered ? 'visible' : ''}`}
            src={videoSrc}
            muted={isMuted}
            loop
            playsInline
          />
        )}

        <button className="mute-toggle" onClick={toggleMute}>
          {isMuted ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
      </div>

      {/* Bottom Info Section */}
      <div className="info-section">
        <div className="info-top">
          <span className="video-title">{video.episodeTitle}</span>
          <div className="action-buttons">
            <div className="tooltip-container">
              <button className="action-btn" onClick={(e) => handleActionClick(e, 'play')}>
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </button>
              <span className="tooltip-text">Play now</span>
            </div>
            <div className="tooltip-container">
              <button
                className="action-btn"
                onClick={(e) => handleActionClick(e, 'add')}
                style={{ color: isFavorite ? '#fff' : 'inherit', borderColor: isFavorite ? '#fff' : '' }}
                onMouseEnter={() => isFavorite && setIsRemoveHovered(true)}
                onMouseLeave={() => isFavorite && setIsRemoveHovered(false)}
              >
                {isFavorite ? (
                  // Minus icon when in favorites
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z" /></svg>
                ) : (
                  // The original plus icon
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
                )}
              </button>
              <span className="tooltip-text">{isFavorite ? "Remove it" : "Add it"}</span>
            </div>
            {/* Landing Action Button */}
            <div className="tooltip-container">
              <button className="action-btn action-btn-share" onClick={(e) => handleActionClick(e, 'landing')}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  {/* ... SVG path ... */}
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                </svg>
              </button>
              <span className="tooltip-text">Landing</span>
            </div>
          </div>
        </div>

        {/* Progress Bar at the very bottom */}
        <div className="progress-container">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
