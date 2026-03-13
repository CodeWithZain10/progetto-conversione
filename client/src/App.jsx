import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SwiperVideoSlider from './components/SwiperVideoSlider';
import VideoGrid from './components/VideoGrid';
import LandingModal from './components/LandingModal';
import { filmsData, seriesData, flattenSeriesData } from './data/clientData';
import './App.css';
import Hero from './components/Hero';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFilms, setFilteredFilms] = useState(filmsData);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]); // Videos user has clicked "play" on
  const [videoToRemove, setVideoToRemove] = useState(null); // For the first Yes/No modal
  const [pendingRemoveVideo, setPendingRemoveVideo] = useState(null); // For the top-right toast
  const [landingVideo, setLandingVideo] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    // Add to history if not recently watched
    setHistory((prev) => {
      const filtered = prev.filter(v => v.id !== video.id);
      return [video, ...filtered];
    });
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
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.error(err));
    }
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    const container = document.querySelector('.split-view-container');
    if (!container) return;
    
    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
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
        onWatchagainFilm={() => setCurrentView('watchagainFilm')}
        onContinueWatchingMovies={() => setCurrentView('continueWatchingFilm')}
        onWatchagainSeries={() => setCurrentView('watchagainSeries')}
        onContinueWatchingSeries={() => setCurrentView('continueWatchingSeries')}
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
          const isFav = favorites.some((fav) => fav.id === selectedVideo.id);

          return (
            <div className={`video-player-overlay ${isFullscreen ? 'fullscreen-mode' : ''}`}>
              <button className="close-player-btn" onClick={closePlayer} title="Close Player">&times;</button>
              
              <div className="split-view-container" style={{ backgroundColor: isFullscreen ? '#040619' : '' }}>
                {/* Left Section: Video Player & Main Info */}
                <div className="player-left-panel">
                  <div className="video-wrapper">
                    <video
                      className="main-video-player"
                      src={selectedVideo.videoSrc}
                      autoPlay
                      controls
                      poster={selectedVideo.imgSrc}
                    />
                    <button className="custom-fullscreen-btn" onClick={toggleFullscreen}>
                      {isFullscreen ? (
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                      )}
                    </button>
                  </div>
                  
                  <div className="player-metadata">
                    <div className="title-row">
                      <h2>{selectedVideo.series_title || selectedVideo.episodeTitle}</h2>
                      <button
                        className="player-fav-btn"
                        onClick={() => handleToggleFavorite(selectedVideo)}
                        title={isFav ? "Rimuovi da Preferiti" : "Aggiungi ai Preferiti"}
                      >
                        {isFav ? (
                          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M19 13H5v-2h14v2z" /></svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
                        )}
                      </button>
                    </div>
                    <p className="player-description">{selectedVideo.desc}</p>
                  </div>
                </div>

                {/* Right Section: Playlist Side Column */}
                <div className="player-right-panel">
                  <h3 className="playlist-header">
                    {selectedVideo.category === 'series' ? 'Rest of the Season' : 'Related Video'}
                  </h3>
                  <div className="playlist-scroll-area">
                    {relatedVideos.map(vid => (
                      <div 
                        className={`playlist-item ${vid.id === selectedVideo.id ? 'active' : ''}`} 
                        key={vid.id} 
                        onClick={() => setSelectedVideo(vid)}
                      >
                        <div className="playlist-thumb">
                          <img src={getImgUrl(vid.imgSrc)} alt={vid.episodeTitle} />
                          {vid.id === selectedVideo.id && <div className="playing-indicator">▶</div>}
                        </div>
                        <div className="playlist-info">
                          <h4>{vid.episodeTitle}</h4>
                          <span className="info-meta">
                            {vid.episodeTime || vid.year || '2:00 min'}
                          </span>
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
          <div className="sliders-container" style={{ paddingTop: '80px' }}>
            <SwiperVideoSlider id="HomeScreen" title="Favorite" data={filmsData} onVideoClick={handleVideoClick} onToggleFavorite={handleToggleFavorite} onRemoveFavoriteRequest={requestRemoveFavorite} onLandingClick={handleLandingClick} favorites={favorites} />
            <SwiperVideoSlider id="completedSection" title="Watch again Film" data={filmsData} onVideoClick={handleVideoClick} onToggleFavorite={handleToggleFavorite} onRemoveFavoriteRequest={requestRemoveFavorite} onLandingClick={handleLandingClick} favorites={favorites} />
            <SwiperVideoSlider id="historySection" title="Continue Watching Film" data={history.filter(v => v.category !== 'series')} onVideoClick={handleVideoClick} onToggleFavorite={handleToggleFavorite} onRemoveFavoriteRequest={requestRemoveFavorite} onLandingClick={handleLandingClick} favorites={favorites} />
            <SwiperVideoSlider id="completedSectionSeries" title="Watch again Serie-TV" data={flattenSeriesData(seriesData)} onVideoClick={handleVideoClick} onToggleFavorite={handleToggleFavorite} onRemoveFavoriteRequest={requestRemoveFavorite} onLandingClick={handleLandingClick} favorites={favorites} />
            <SwiperVideoSlider id="historySectionSeries" title="Continue Watching Serie-TV" data={history.filter(v => v.category === 'series')} onVideoClick={handleVideoClick} onToggleFavorite={handleToggleFavorite} onRemoveFavoriteRequest={requestRemoveFavorite} onLandingClick={handleLandingClick} favorites={favorites} />
          </div>
        )}


        {currentView === 'films' && (
          <div className="sliders-container" style={{ paddingTop: '50px' }}>
            <SwiperVideoSlider id="films-watch-again" title="Watch again Film >" data={filmsData} onVideoClick={handleVideoClick} onToggleFavorite={handleToggleFavorite} onRemoveFavoriteRequest={requestRemoveFavorite} onLandingClick={handleLandingClick} favorites={favorites} />
            <SwiperVideoSlider id="films-continue-watching" title="Continue Watching Film >" data={history.filter(v => v.category !== 'series')} onVideoClick={handleVideoClick} onToggleFavorite={handleToggleFavorite} onRemoveFavoriteRequest={requestRemoveFavorite} onLandingClick={handleLandingClick} favorites={favorites} />
            <div className="grid-container" style={{ paddingTop: '20px' }}>
              <h1 className="view-title">All Films</h1>
              <VideoGrid data={filmsData} onVideoClick={handleVideoClick} onToggleFavorite={handleToggleFavorite} onRemoveFavoriteRequest={requestRemoveFavorite} onLandingClick={handleLandingClick} favorites={favorites} />
            </div>
          </div>
        )}

        {currentView === 'series' && (
          <div className="sliders-container" style={{ paddingTop: '50px' }}>
             <SwiperVideoSlider id="series-watch-again" title="Watch again Serie-TV >" data={flattenSeriesData(seriesData)} onVideoClick={handleVideoClick} onToggleFavorite={handleToggleFavorite} onRemoveFavoriteRequest={requestRemoveFavorite} onLandingClick={handleLandingClick} favorites={favorites} />
             <SwiperVideoSlider id="series-continue-watching" title="Continue Watching Serie-TV >" data={history.filter(v => v.category === 'series')} onVideoClick={handleVideoClick} onToggleFavorite={handleToggleFavorite} onRemoveFavoriteRequest={requestRemoveFavorite} onLandingClick={handleLandingClick} favorites={favorites} />
            
             <div className="grid-container" style={{ paddingTop: '20px' }}>
               <h1 className="view-title" style={{ paddingLeft: '4%', marginBottom: '10px' }}>TV Series</h1>
             </div>
            {(() => {
              // Group flat series data into a single "All Episodes" season if it's not nested
              let formattedSeasons = seriesData;
              if (seriesData.length > 0 && !seriesData[0].season_videos) {
                 formattedSeasons = [{
                   season_id: 'all',
                   season_name: 'All Episodes',
                   season_videos: seriesData.map(v => ({
                     video_id: v.id,
                     video_url: v.videoSrc,
                     video_poster: v.imgSrc,
                     video_name: v.episodeTitle,
                     video_duration: v.episodeTime,
                     video_description: v.desc
                   }))
                 }];
              }

              return formattedSeasons.map((season) => {
                // Format the videos for this season
                const seasonVideos = (season.season_videos || []).map((video) => ({
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
                  <div key={`season-${season.season_id}`} style={{ marginBottom: '40px' }}>
                    <h2 className="view-title" style={{ paddingLeft: '4%', fontSize: '1.2rem', margin: '0 0 -30px 0', zIndex: 10, position: 'relative' }}>
                      {season.season_name}
                    </h2>
                    <SwiperVideoSlider
                      id={`seasonSlider-${season.season_id}`}
                      title={""}
                      data={seasonVideos}
                      onVideoClick={handleVideoClick}
                      onToggleFavorite={handleToggleFavorite}
                      onRemoveFavoriteRequest={requestRemoveFavorite}
                      onLandingClick={handleLandingClick}
                      favorites={favorites}
                    />
                  </div>
                );
              });
            })()}
          </div>
        )}

        {currentView === 'watchagainFilm' && (
          <div className="sliders-container" style={{ paddingTop: '80px', minHeight: '100vh', display: 'block' }}>
            <SwiperVideoSlider id="films-watch-again-view" title="Watch again Film" data={filmsData} onVideoClick={handleVideoClick} onToggleFavorite={handleToggleFavorite} onRemoveFavoriteRequest={requestRemoveFavorite} onLandingClick={handleLandingClick} favorites={favorites} />
          </div>
        )}

        {currentView === 'continueWatchingFilm' && (
          <div className="sliders-container" style={{ paddingTop: '80px', minHeight: '100vh', display: 'block' }}>
            <SwiperVideoSlider id="films-continue-watching-view" title="Continue Watching Film" data={history.filter(v => v.category !== 'series')} onVideoClick={handleVideoClick} onToggleFavorite={handleToggleFavorite} onRemoveFavoriteRequest={requestRemoveFavorite} onLandingClick={handleLandingClick} favorites={favorites} />
          </div>
        )}

        {currentView === 'watchagainSeries' && (
          <div className="sliders-container" style={{ paddingTop: '80px', minHeight: '100vh', display: 'block' }}>
            <SwiperVideoSlider id="series-watch-again-view" title="Watch again Serie-TV" data={flattenSeriesData(seriesData)} onVideoClick={handleVideoClick} onToggleFavorite={handleToggleFavorite} onRemoveFavoriteRequest={requestRemoveFavorite} onLandingClick={handleLandingClick} favorites={favorites} />
          </div>
        )}

        {currentView === 'continueWatchingSeries' && (
          <div className="sliders-container" style={{ paddingTop: '80px', minHeight: '100vh', display: 'block' }}>
            <SwiperVideoSlider id="series-continue-watching-view" title="Continue Watching Serie-TV" data={history.filter(v => v.category === 'series')} onVideoClick={handleVideoClick} onToggleFavorite={handleToggleFavorite} onRemoveFavoriteRequest={requestRemoveFavorite} onLandingClick={handleLandingClick} favorites={favorites} />
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
