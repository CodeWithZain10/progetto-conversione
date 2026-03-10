import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ onHomeClick, onFilmClick, onSerieClick, onChildrClick, onChildrseriesClick, onFavoriteClick, onSearch }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 769);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 769);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <>
      <header className="header" id="header">
        <div className="burger2" id="burger2" style={{ cursor: 'pointer' }} onClick={toggleSidebar}>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </div>

        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} style={{ position: 'absolute', top: '68px' }}>
          <div className="h_shorts">
            <div className="meun_sidebar">
              <span className="meun_sidebar_n"> Menu </span>
              <li className="menu-item">
                <div className="dropdown dropdowncat">
                  <div
                    className="btn dropdown-toggle"
                    type="button"
                    onClick={() => toggleDropdown('categories')}
                  >
                    <img className="i230" src="/menu-icon.png" alt="Categories" />
                    <p className="i231">Categories</p>
                  </div>
                  <div className={`dropdown-menu ${openDropdown === 'categories' ? 'show' : ''}`}>
                    <span className="dropdown-item">Horror</span>
                    <span className="dropdown-item">Documentary</span>
                    <span className="dropdown-item">Dramatic</span>
                    <span className="dropdown-item">War</span>
                    <span className="dropdown-item">catastrophic</span>
                    <span className="dropdown-item">adventure</span>
                    <span className="dropdown-item">comics</span>
                    <span className="dropdown-item">actions</span>
                  </div>
                </div>
              </li>
              <li className="menu-item">
                <div className="dropdown dropdownFollower">
                  <div
                    className="btn dropdown-toggle"
                    type="button"
                    onClick={() => toggleDropdown('follower')}
                  >
                    <img className="i230" src="/heart.png" alt="Follower" />
                    <p className="i231">Follower</p>
                  </div>
                  <div className={`dropdown-menu ${openDropdown === 'follower' ? 'show' : ''}`}>
                    <span className="dropdown-item">Most liked</span>
                    <span className="dropdown-item">Most views</span>
                  </div>
                </div>
              </li>
            </div>
          </div>

          <div className="h_shorts h_shorts2">
            <div className="meun_sidebar">
              <span className="meun_sidebar_n">Esplora</span>
              <li className="menu-item">
                <span className="menu-link" onClick={onFavoriteClick}>Favorite</span>
              </li>
              <li className="menu-item">
                <span className="menu-link" onClick={() => console.log('Watch again Film')}>Watch again Film</span>
              </li>
              <li className="menu-item">
                <span className="menu-link Serie" onClick={() => console.log('Continue Watching Film')}>Continue Watching Film</span>
              </li>
              <li className="menu-item">
                <span className="menu-link" onClick={() => console.log('Watch again Series-TV')}>Watch again Series-TV</span>
              </li>
              <li className="menu-item">
                <span className="menu-link" onClick={() => console.log('Continue Watching Series-TV')}>Continue Watching Series-TV</span>
              </li>
              <li className="menu-item">
                <span className="menu-link"> Classifiche Like Film</span>
              </li>
              <li className="menu-item">
                <span className="menu-link">Classifiche Views Film</span>
              </li>
              <li className="menu-item">
                <span className="menu-link">Classifiche Like Series-TV</span>
              </li>
              <li className="menu-item">
                <span className="menu-link">Classifiche Views Series-TV</span>
              </li>
            </div>
          </div>
        </div>

        <nav className="navbar container">
          <li className="menu-item menu-link" onClick={onHomeClick}>Home</li>
          <li className="menu-item">
            <span className="menu-link Serie" onClick={onFilmClick}>Film</span>
          </li>
          <li className="menu-item">
            <span className="menu-link" onClick={onSerieClick}>series</span>
          </li>
          <li className="menu-item" onClick={onChildrClick}>Children</li>
          <li className="menu-item menu-link y320" onClick={onChildrseriesClick}>Children series</li>
          <li className="menu-item menu-link" onClick={onFavoriteClick}>Favorite</li>

          <div className="menu" id="menu">
            <div className="menu-inner">
              <div className="container">
                <div className="search">
                  <div className="microSearch" style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="search__icon-container">
                      <label htmlFor="searchInput" className="search__label" aria-label="Search" onClick={toggleSearch}>
                        <svg viewBox="0 0 1000 1000" title="Search">
                          <path fill="currentColor" d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z" />
                        </svg>
                      </label>
                    </div>
                    <div>
                      <input
                        className="search__input"
                        type="search"
                        placeholder="Search"
                        id="searchInput"
                        onChange={(e) => onSearch && onSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <span className="micro">
                    <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32">
                      <path d="M480 633q-43 0-72-30.917-29-30.916-29-75.083V276q0-41.667 29.441-70.833Q437.882 176 479.941 176t71.559 29.167Q581 234.333 581 276v251q0 44.167-29 75.083Q523 633 480 633Zm0-228Zm-30 531V800q-106-11-178-89t-72-184h60q0 91 64.288 153t155.5 62Q571 742 635.5 680 700 618 700 527h60q0 106-72 184t-178 89v136h-60Zm30-363q18 0 29.5-13.5T521 527V276q0-17-11.788-28.5Q497.425 236 480 236q-17.425 0-29.212 11.5Q439 259 439 276v251q0 19 11.5 32.5T480 573Z" fill="#777" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <nav className="navbar container">
              <span className="menu-item menu-link y320" style={{ cursor: 'pointer' }}>Login</span>
            </nav>
          </div>
        </nav>
      </header>

      {/* Search Overlay */}
      <div id="myOverlay2" className={`overlay ${searchOpen ? 'open' : ''}`}>
        <span style={{ display: 'inline-block', padding: '20px 0 0 20px' }}>Other Title To Discover:</span>
        <div style={{ padding: '8px 20px 0 20px' }} className="related_title"></div>
        <div style={{ textAlign: 'end' }}>
          <span className="closebtn" onClick={toggleSearch} title="Close Overlay">&times;</span>
        </div>
        <div id="wrap32" className="wrap32 mpp-dot mpp-skin-sirius-trans mpp-controls-tr mpp-no-grid search_vidoes" style={{ backgroundColor: 'black' }}></div>
      </div>
    </>
  );
};

export default Header;
