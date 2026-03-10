import React, { useState } from 'react';
import Header from './components/Header';
import VideoGrid from './components/VideoGrid';
import VideoSlider from './components/VideoSlider';
import SwiperVideoSlider from './components/SwiperVideoSlider';
import { filmsData, seriesData, childrenFilmsData, childrenSeriesData, flattenSeriesData } from './data/originalData';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleHomeClick = () => {
    setCurrentView('home');
    setSelectedVideo(null);
  };

  const handleFilmClick = () => {
    setCurrentView('films');
  };

  const handleSerieClick = () => {
    setCurrentView('series');
  };

  const handleChildrClick = () => {
    setCurrentView('children');
  };

  const handleChildrseriesClick = () => {
    setCurrentView('children-series');
  };

  const handleFavoriteClick = () => {
    setCurrentView('favorites');
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    console.log('Video clicked:', video);
  };

  const handleBrowseAll = (section) => {
    console.log(`Browse all ${section}`);
  };

  const renderContent = () => {
    if (selectedVideo) {
      return (
        <div className="video-player-container">
          <div className="video-player">
            <video 
              controls 
              autoPlay
              style={{ width: '100%', maxHeight: '70vh' }}
            >
              <source src={selectedVideo.videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-player-info">
              <h1>{selectedVideo.episodeTitle}</h1>
              <p>{selectedVideo.desc}</p>
              <div className="video-meta">
                <span>{selectedVideo.year}</span>
                <span>{selectedVideo.category}</span>
                <span>{selectedVideo.qualityVideo}</span>
                <span>{selectedVideo.classificationVideo}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'favorites':
        return (
          <SwiperVideoSlider
            title="Favorite"
            videos={filmsData.slice(0, 6)}
            showBrowseAll={true}
            onBrowseAll={() => handleBrowseAll('favorites')}
            onVideoClick={handleVideoClick}
          />
        );
      case 'films':
        return (
          <SwiperVideoSlider
            title="Films"
            videos={filmsData}
            showBrowseAll={true}
            onBrowseAll={() => handleBrowseAll('films')}
            onVideoClick={handleVideoClick}
          />
        );
      case 'series':
        return (
          <SwiperVideoSlider
            title="Series TV"
            videos={flattenSeriesData(seriesData)}
            showBrowseAll={true}
            onBrowseAll={() => handleBrowseAll('series')}
            onVideoClick={handleVideoClick}
          />
        );
      case 'children':
        return (
          <SwiperVideoSlider
            title="Children Films"
            videos={childrenFilmsData}
            showBrowseAll={true}
            onBrowseAll={() => handleBrowseAll('children')}
            onVideoClick={handleVideoClick}
          />
        );
      case 'children-series':
        return (
          <SwiperVideoSlider
            title="Children Series"
            videos={flattenSeriesData(childrenSeriesData)}
            showBrowseAll={true}
            onBrowseAll={() => handleBrowseAll('children-series')}
            onVideoClick={handleVideoClick}
          />
        );
      default:
        return (
          <>
            <SwiperVideoSlider
              title="Favorite"
              videos={filmsData.slice(0, 6)}
              showBrowseAll={true}
              onBrowseAll={() => handleBrowseAll('favorites')}
              onVideoClick={handleVideoClick}
            />
            <SwiperVideoSlider
              title="Watch again Film"
              videos={filmsData.slice(2, 8)}
              showBrowseAll={true}
              onBrowseAll={() => handleBrowseAll('watch-again')}
              onVideoClick={handleVideoClick}
            />
            <SwiperVideoSlider
              title="Continue Watching Film"
              videos={filmsData.slice(1, 7)}
              showBrowseAll={true}
              onBrowseAll={() => handleBrowseAll('continue-watching')}
              onVideoClick={handleVideoClick}
            />
          </>
        );
    }
  };

  return (
    <div className="App">
      <Header
        onHomeClick={handleHomeClick}
        onFilmClick={handleFilmClick}
        onSerieClick={handleSerieClick}
        onChildrClick={handleChildrClick}
        onChildrseriesClick={handleChildrseriesClick}
        onFavoriteClick={handleFavoriteClick}
      />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
