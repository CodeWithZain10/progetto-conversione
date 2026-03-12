import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SwiperVideoSlider from './components/SwiperVideoSlider';
import VideoGrid from './components/VideoGrid';
import LandingModal from './components/LandingModal';
import { filmsData, seriesData, childrenFilmsData, childrenSeriesData, flattenSeriesData } from './data/clientData';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFilms, setFilteredFilms] = useState(filmsData);
  const [favorites, setFavorites] = useState([]);
  const [videoToRemove, setVideoToRemove] = useState(null); // For the first Yes/No modal
  const [pendingRemoveVideo, setPendingRemoveVideo] = useState(null); // For the top-right toast
  const [landingVideo, setLandingVideo] = useState(null);

  // Auto-remove after 3 seconds if the top-right toast is open and not cancelled
  useEffect(() => {
    let timer;
    if (pendingRemoveVideo) {
      timer = setTimeout(() => {
        setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.id !== pendingRemoveVideo.id));
        setPendingRemoveVideo(null);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [pendingRemoveVideo]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const requestRemoveFavorite = (video) => {
    setVideoToRemove(video);
  };

  const confirmInitialRemove = () => {
    if (videoToRemove) {
      setPendingRemoveVideo(videoToRemove);
      setVideoToRemove(null);
    }
  };

  const cancelInitialRemove = () => {
    setVideoToRemove(null);
  };

  const cancelPendingRemove = () => {
    setPendingRemoveVideo(null);
  };

  const handleToggleFavorite = (video) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === video.id);
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.id !== video.id);
      } else {
        return [...prevFavorites, video];
      }
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredFilms(filmsData);
      return;
    }
    const filtered = filmsData.filter(v =>
      v.episodeTitle.toLowerCase().includes(query.toLowerCase()) ||
      (v.series_title && v.series_title.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredFilms(filtered);
    setCurrentView('search');
  };

  const closePlayer = () => {
    setSelectedVideo(null);
  };

  const handleLandingClick = (video) => {
    setLandingVideo(video);
  };

  return (
    <div className="app-container">
      <Navbar
        onHomeClick={() => setCurrentView('home')}
        onFilmClick={() => setCurrentView('films')}
        onSerieClick={() => setCurrentView('series')}
        onChildrClick={() => setCurrentView('children')}
        onChildrseriesClick={() => setCurrentView('childrenSeries')}
        onFavoriteClick={() => setCurrentView('favorites')}
        onVideoClick={handleVideoClick}
        onToggleFavorite={handleToggleFavorite}
        onRemoveFavoriteRequest={requestRemoveFavorite}
        onLandingClick={handleLandingClick}
        favorites={favorites}
      />

      <main className="main-content">
        {selectedVideo && (() => {
          let relatedVideos = [];
          if (selectedVideo.category === 'series') {
            const season = seriesData.find(s => s.season_id === selectedVideo.season_id);
            if (season) {
              relatedVideos = season.season_videos.map(v => ({
                id: `series-${season.season_id}-${v.video_id}`,
                videoSrc: v.video_url,
                imgSrc: v.video_poster,
                episodeTitle: v.video_name,
                episodeTime: v.video_duration,
                desc: v.video_description,
                category: "series",
                season_id: season.season_id,
                video_id: v.video_id,
              }));
            }
          } else {
            relatedVideos = filmsData.slice(0, 10);
          }

          // helper for thumbnail safety
          const getImgUrl = (src) => src ? (src.startsWith('/') ? src : `/${src.replace('./', '')}`) : '';

          return (
            <div className="video-player-overlay split-view-overlay">
              <button className="close-player-btn" onClick={closePlayer} title="Close Player">&times;</button>
              <div className="split-view-container">
                <div className="player-main-section">
                  <div className="video-wrapper">
                    <video
                      src={selectedVideo.videoSrc}
                      controls
                      autoPlay
                      className="main-video-player"
                      poster={getImgUrl(selectedVideo.imgSrc)}
                    />
                  </div>
                  <div className="player-info">
                    <h2>{selectedVideo.episodeTitle}</h2>
                    <p>{selectedVideo.desc}</p>
                  </div>
                </div>

                <div className="player-sidebar-section">
                  <h3 className="sidebar-title">
                    {selectedVideo.category === 'series' ? 'Rest of the Season' : 'More Like This'}
                  </h3>
                  <div className="sidebar-list">
                    {relatedVideos.map(vid => (
                      <div className={`sidebar-video-item ${vid.id === selectedVideo.id ? 'active' : ''}`} key={vid.id} onClick={() => setSelectedVideo(vid)}>
                        <img src={getImgUrl(vid.imgSrc)} alt={vid.episodeTitle} />
                        <div className="sidebar-video-info">
                          <h4>{vid.episodeTitle}</h4>
                          <span>{vid.episodeTime || vid.year || '2:00 min'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {currentView === 'home' && (
          <div className="sliders-container">
            {/* TODO: We need to pass onToggleFavorite down through SwiperVideoSlider */}
            <SwiperVideoSlider id="HomeScreen" title="Favorite" data={filmsData} onVideoClick={handleVideoClick} onToggleFavorite={handleToggleFavorite} onRemoveFavoriteRequest={requestRemoveFavorite} onLandingClick={handleLandingClick} favorites={favorites} />
            <SwiperVideoSlider id="completedSection" title="Watch again Film" data={filmsData} onVideoClick={handleVideoClick} onToggleFavorite={handleToggleFavorite} onRemoveFavoriteRequest={requestRemoveFavorite} onLandingClick={handleLandingClick} favorites={favorites} />
            <SwiperVideoSlider id="historySection" title="Continue Watching Film" data={filmsData} onVideoClick={handleVideoClick} onToggleFavorite={handleToggleFavorite} onRemoveFavoriteRequest={requestRemoveFavorite} onLandingClick={handleLandingClick} favorites={favorites} />
            <SwiperVideoSlider id="completedSectionSeries" title="Watch again Serie-TV" data={flattenSeriesData(seriesData)} onVideoClick={handleVideoClick} onToggleFavorite={handleToggleFavorite} onRemoveFavoriteRequest={requestRemoveFavorite} onLandingClick={handleLandingClick} favorites={favorites} />
            <SwiperVideoSlider id="historySectionSeries" title="Continue Watching Serie-TV" data={flattenSeriesData(seriesData)} onVideoClick={handleVideoClick} onToggleFavorite={handleToggleFavorite} onRemoveFavoriteRequest={requestRemoveFavorite} onLandingClick={handleLandingClick} favorites={favorites} />
          </div>
        )}


        {currentView === 'films' && (
          <div className="grid-container">
            <h1 className="view-title">All Films</h1>
            <VideoGrid data={filmsData} onVideoClick={handleVideoClick} onToggleFavorite={handleToggleFavorite} onRemoveFavoriteRequest={requestRemoveFavorite} onLandingClick={handleLandingClick} favorites={favorites} />
          </div>
        )}

        {currentView === 'series' && (
          <div className="sliders-container" style={{ paddingTop: '50px' }}>
            <h1 className="view-title" style={{ paddingLeft: '4%', marginBottom: '10px' }}>TV Series</h1>
            {seriesData.map((season) => {
              // Format the videos for this season
              const seasonVideos = season.season_videos.map((video) => ({
                id: `series-${season.season_id}-${video.video_id}`,
                videoSrc: video.video_url,
                imgSrc: video.video_poster,
                episodeTitle: video.video_name,
                episodeTime: video.video_duration,
                desc: video.video_description,
                series_title: season.season_name,
                season_id: season.season_id,
                video_id: video.video_id,
                category: "series",
                trailerSrc: video.video_url,
                year: "2022",
                qualityVideo: "HD",
                classificationVideo: "All Ages"
              }));

              return (
                <SwiperVideoSlider
                  key={`season-${season.season_id}`}
                  id={`seasonSlider-${season.season_id}`}
                  title={season.season_name}
                  data={seasonVideos}
                  onVideoClick={handleVideoClick}
                  onToggleFavorite={handleToggleFavorite}
                  onRemoveFavoriteRequest={requestRemoveFavorite}
                  onLandingClick={handleLandingClick}
                  favorites={favorites}
                />
              );
            })}
          </div>
        )}

        {currentView === 'search' && (
          <div className="grid-container">
            <h1 className="view-title">Search Results for "{searchQuery}"</h1>
            <VideoGrid data={filteredFilms} onVideoClick={handleVideoClick} onToggleFavorite={handleToggleFavorite} onRemoveFavoriteRequest={requestRemoveFavorite} onLandingClick={handleLandingClick} favorites={favorites} />
          </div>
        )}

        {currentView === 'favorites' && (
          <div className="grid-container">
            <h1 className="view-title">My Favorites</h1>
            {favorites.length > 0 ? (
              <VideoGrid data={favorites} onVideoClick={handleVideoClick} onToggleFavorite={handleToggleFavorite} onRemoveFavoriteRequest={requestRemoveFavorite} onLandingClick={handleLandingClick} favorites={favorites} />
            ) : (
              <p style={{ color: 'white', padding: '20px' }}>No favorites added yet.</p>
            )}
          </div>
        )}

        {/* 1st Step: Initial Confirmation Modal */}
        {videoToRemove && (
          <div className="confirm-modal-overlay">
            <div className="confirm-modal">
              <h3>Remove from Favorites?</h3>
              <p>Are you sure you want to remove <strong>{videoToRemove.episodeTitle}</strong> from your favorites?</p>
              <div className="modal-actions">
                <button className="btn-cancel" onClick={cancelInitialRemove}>No</button>
                <div className="btn-yes-container" style={{ background: '#e50914' }}>
                  <button className="btn-yes" onClick={confirmInitialRemove}>
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2nd Step: Top-Right Toast Modal with Timer and Thumbnail */}
        {pendingRemoveVideo && (
          <div className="toast-remove-modal new-toast-layout">
            <div className="toast-header">
              <div className="toast-icon">
                {/* SVG Checkmark */}
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <circle cx="12" cy="12" r="10" fill="#3b82f6" />
                  <path d="M8 12.5l3 3 5-6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <div className="toast-header-text">
                <strong>Removed Successfully</strong>
                <span>Your changes has been Saved</span>
              </div>
            </div>

            <div className="toast-body">
              <img
                className="toast-full-thumbnail"
                src={pendingRemoveVideo.imgSrc.startsWith('/') ? pendingRemoveVideo.imgSrc : `/${pendingRemoveVideo.imgSrc}`}
                alt={pendingRemoveVideo.episodeTitle}
              />
              <div className="toast-video-title">
                {pendingRemoveVideo.episodeTitle}
              </div>

              <div className="toast-action-row">
                <button className="toast-full-cancel-btn" onClick={cancelPendingRemove}>
                  Cancel Removal
                </button>
              </div>
            </div>

            <div className="toast-progress-track">
              <div className="toast-timer-line-new"></div>
            </div>
          </div>
        )}

        <LandingModal 
          video={landingVideo} 
          onClose={() => setLandingVideo(null)} 
          onPlay={(video) => {
            setLandingVideo(null);
            handleVideoClick(video);
          }}
        />

        {/* Other views handled similarly */}
      </main>
    </div>
  );
}

export default App;
