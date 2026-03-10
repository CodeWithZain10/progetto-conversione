import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SwiperVideoSlider from './components/SwiperVideoSlider';
import VideoGrid from './components/VideoGrid';
import { filmsData, seriesData, childrenFilmsData, childrenSeriesData, flattenSeriesData } from './data/clientData';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFilms, setFilteredFilms] = useState(filmsData);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
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

  return (
    <div className="app-container">
      <Navbar
        onHomeClick={() => setCurrentView('home')}
        onFilmClick={() => setCurrentView('films')}
        onSerieClick={() => setCurrentView('series')}
        onChildrClick={() => setCurrentView('children')}
        onChildrseriesClick={() => setCurrentView('childrenSeries')}
        onFavoriteClick={() => setCurrentView('favorites')}
      />

      <main className="main-content">
        {selectedVideo && (
          <div className="video-player-overlay">
            <div className="player-container">
              <button className="close-player" onClick={closePlayer}>&times;</button>
              <video
                src={selectedVideo.videoSrc}
                controls
                autoPlay
                className="main-video-player"
                poster={selectedVideo.imgSrc}
              />
              <div className="player-info">
                <h2>{selectedVideo.episodeTitle}</h2>
                <p>{selectedVideo.desc}</p>
              </div>
            </div>
          </div>
        )}

        {currentView === 'home' && (
          <div className="sliders-container">
            <SwiperVideoSlider id="HomeScreen" title="Favorite" data={filmsData} onVideoClick={handleVideoClick} />
            <SwiperVideoSlider id="completedSection" title="Watch again Film" data={filmsData} onVideoClick={handleVideoClick} />
            <SwiperVideoSlider id="historySection" title="Continue Watching Film" data={filmsData} onVideoClick={handleVideoClick} />
            <SwiperVideoSlider id="completedSectionSeries" title="Watch again Serie-TV" data={flattenSeriesData(seriesData)} onVideoClick={handleVideoClick} />
            <SwiperVideoSlider id="historySectionSeries" title="Continue Watching Serie-TV" data={flattenSeriesData(seriesData)} onVideoClick={handleVideoClick} />
          </div>
        )}


        {currentView === 'films' && (
          <div className="grid-container">
            <h1 className="view-title">All Films</h1>
            <VideoGrid data={filmsData} onVideoClick={handleVideoClick} />
          </div>
        )}

        {currentView === 'series' && (
          <div className="grid-container">
            <h1 className="view-title">All Series</h1>
            <VideoGrid data={seriesData} onVideoClick={handleVideoClick} />
          </div>
        )}

        {currentView === 'search' && (
          <div className="grid-container">
            <h1 className="view-title">Search Results for "{searchQuery}"</h1>
            <VideoGrid data={filteredFilms} onVideoClick={handleVideoClick} />
          </div>
        )}

        {/* Other views handled similarly */}
      </main>
    </div>
  );
}

export default App;
