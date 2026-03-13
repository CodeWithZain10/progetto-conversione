import React, { useEffect, useState } from 'react';
import './LandingModal.css';

import { seriesData } from '../data/clientData';

const LandingModal = ({ video, onClose, onPlay }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState(video?.category === 'series' || video?.category === 'anime' ? 'playlist' : 'film'); 

  useEffect(() => {
    // Prevent background scrolling when overlay is active
    if (video) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [video]);

  if (!video) return null;

  // Handle Play Video click to trigger video player
  const handlePlayVideo = () => {
    if (onPlay) {
      onPlay(video);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="landing-modal-overlay">
      <div className="landing-modal-content">
        <button className="landing-close-btn" onClick={onClose} title="Close">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="landing-header-section">
          <div className="landing-hero-bg">
            <img
              src={video.imgSrc.startsWith('/') ? video.imgSrc : `/${video.imgSrc}`}
              alt={video.episodeTitle || video.series_title}
              className="landing-bg-img"
            />
            <div className="landing-bg-gradient"></div>
          </div>

          <div className="landing-details-container">
            <div className="landing-title-area">
                {/* <h1 className="landing-title">{video.episodeTitle || video.series_title}</h1> */}
            </div>

            <div className="landing-actions">
              <button className="landing-play-btn" onClick={handlePlayVideo}>
                <i className="fas fa-play"></i> Play Video
              </button>
              {(video.category === 'series' || video.category === 'anime') && (
                <div className="landing-season-select">
                  <select defaultValue="Season 1">
                    <option value="Season 1">Season 1</option>
                  </select>
                </div>
              )}
            </div>
            
            <div className="landing-metadata">
              {video.category && (
                <div className="studios">
                  <span className="studios__title">Categories:</span>
                  <span className="studios__text">{video.category}</span>
                </div>
              )}
              {video.authors && (
                <div className="studios">
                  <span className="studios__title">Actors:</span>
                  <span className="studios__text">{video.authors}</span>
                </div>
              )}
              {video.studios && (
                <div className="studios">
                  <span className="studios__title">Studios:</span>
                  <span className="studios__text">{video.studios}</span>
                </div>
              )}
            </div>
            
            <div className="landing-bottom-nav">
                <ul>
                  <li><a href="#" className={activeTab === 'film' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('film'); }}>Film</a></li>
                  <li><a href="#" className={activeTab === 'playlist' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('playlist'); }}>Playlist</a></li>
                  <li><a href="#" className={activeTab === 'descrizione' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('descrizione'); }}>Descrizione</a></li>
                  <li><a href="#" className={activeTab === 'related' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('related'); }}>Related Video</a></li>
                </ul>
                <button className="landing-sound-btn" onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
                    <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor">
                      {isMuted ? (
                        <path d="M11.5 11l-4.5 4.5v3l4.5 4.5h4.5v-12h-4.5zm8.5 0v12c3.5-1.5 6-5 6-9s-2.5-7.5-6-9v3c2 1 3.5 3 3.5 6s-1.5 5-3.5 6v3z" />
                      ) : (
                        <path d="M11.5 11l-4.5 4.5v3l4.5 4.5h4.5v-12h-4.5zm8.5-5v3c2.5 1 4.5 3.5 4.5 6.5s-2 5.5-4.5 6.5v3c4-1.5 7.5-5 7.5-9.5s-3.5-8-7.5-9.5z" />
                      )}
                    </svg>
                </button>
            </div>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="landing-tab-content-area">
           {activeTab === 'descrizione' && (
             <div className="landing-tab-pane">
               <h2 className="landing-tab-title">Descrizione</h2>
               <p className="landing-tab-text">{video.desc || "L'Unione Sovietica lancia la sfida al pugilato statunitense presentando l'imponente e glaciale Ivan Drago, detentore della medaglia d'oro olimpica. L'intenzione dei suoi manager è quella di organizzare un incontro con Rocky Balboa, il campione mondiale dei pesi massimi in carica..."}</p>
             </div>
           )}
           {activeTab === 'related' && (
             <div className="landing-tab-pane">
               <h2 className="landing-tab-title">Related Video</h2>
               <div className="landing-related-grid">
                  {[1, 2, 3, 4].map((num) => (
                    <div className="landing-related-card" key={num}>
                      <div className="landing-related-number">{num}</div>
                      <div className="landing-related-thumbnail">
                        <img src={video.imgSrc.startsWith('/') ? video.imgSrc : `/${video.imgSrc}`} alt="Related thumbnail" />
                        <span className="landing-related-duration">2:31</span>
                      </div>
                      <div className="landing-related-info">
                        <h4>title Season 1 series {num}</h4>
                        <p>Lorem Ipsum data text long one</p>
                      </div>
                    </div>
                  ))}
               </div>
             </div>
           )}
           {activeTab === 'playlist' && (
             <div className="landing-tab-pane">
               <h2 className="landing-tab-title">Episodes</h2>
               <div className="landing-playlist-row">
                 {seriesData.map((ep, idx) => (
                   <div 
                     className={`landing-playlist-card ${video.id === ep.id ? 'active' : ''}`} 
                     key={ep.id}
                     onClick={() => {
                        if (onPlay) onPlay(ep);
                     }}
                   >
                     <div className="landing-playlist-thumbnail">
                       <img src={ep.imgSrc.startsWith('/') ? ep.imgSrc : `/${ep.imgSrc}`} alt={ep.episodeTitle} />
                       <i className="fas fa-play play-icon"></i>
                     </div>
                     <div className="landing-playlist-info">
                       <div className="landing-playlist-header">
                         <h4>{idx + 1}. {ep.episodeTitle}</h4>
                         <span>{ep.episodeTime || '24m'}</span>
                       </div>
                       <p>{ep.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}
           {/* Fallback for empty tabs */}
           {(activeTab === 'film') && (
               <div className="landing-tab-pane empty">
                  <h2 className="landing-tab-title" style={{textTransform: 'capitalize'}}>{activeTab}</h2>
               </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default LandingModal;
