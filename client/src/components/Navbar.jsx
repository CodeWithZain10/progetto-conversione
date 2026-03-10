import React, { useState, useEffect } from "react";
import "./Navbar.css";
import SearchOverlay from "./SearchOverlay";

const Navbar = ({
    onHomeClick,
    onFilmClick,
    onSerieClick,
    onChildrClick,
    onChildrseriesClick,
    onFavoriteClick,
    onWatchagainFilm,
    onContinueWatchingMovies,
    onWatchagainSeries,
    onContinueWatchingSeries
}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isFollowerOpen, setIsFollowerOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleCategories = () => {
        setIsCategoriesOpen(!isCategoriesOpen);
    };

    const toggleFollower = () => {
        setIsFollowerOpen(!isFollowerOpen);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.trim().length > 0) {
            setIsSearchOverlayOpen(true);
        } else {
            setIsSearchOverlayOpen(false);
        }
    };

    const handleTagClick = (tag) => {
        setSearchTerm(tag);
        setIsSearchOverlayOpen(true);
    };

    const closeSearchOverlay = () => {
        setIsSearchOverlayOpen(false);
        setSearchTerm("");
    };

    return (
        <>
            <header className="header" id="header">
                {/* ... existing sidebar code ... */}
                <div
                    className="burger2"
                    id="burger2"
                    style={{ cursor: "pointer" }}
                    onClick={toggleSidebar}
                >
                    <span className="burger-line"></span>
                    <span className="burger-line"></span>
                    <span className="burger-line"></span>
                </div>

                <div
                    className={`sidebar ${isSidebarOpen ? "open" : ""}`}
                    style={{ position: "absolute", top: "68px" }}
                >
                    <div className="h_shorts">
                        <div className="meun_sidebar">
                            <span className="meun_sidebar_n"> Menu </span>
                            <li className="menu-item">
                                <div className="dropdown dropdowncat">
                                    <div
                                        className="btn dropdown-toggle"
                                        type="button"
                                        onClick={toggleCategories}
                                    >
                                        <img className="i230" src="/menu-icon.png" alt="menu" />
                                        <p className="i231">Categories</p>
                                    </div>
                                    <div className={`dropdown-menu dropdownMenu5 ${isCategoriesOpen ? "show" : ""}`}>
                                        <span className="dropdown-item" onClick={() => handleTagClick("Horror")}>Horror</span>
                                        <span className="dropdown-item" onClick={() => handleTagClick("Documentary")}>Documentary</span>
                                        <span className="dropdown-item" onClick={() => handleTagClick("Dramatic")}>Dramatic</span>
                                        <span className="dropdown-item" onClick={() => handleTagClick("War")}>War</span>
                                        <span className="dropdown-item" onClick={() => handleTagClick("catastrophic")}>catastrophic</span>
                                        <span className="dropdown-item" onClick={() => handleTagClick("adventure")}>adventure</span>
                                        <span className="dropdown-item" onClick={() => handleTagClick("comics")}>comics</span>
                                        <span className="dropdown-item" onClick={() => handleTagClick("actions")}>actions</span>
                                    </div>
                                </div>
                            </li>
                            <li className="menu-item">
                                <div className="dropdown dropdownFollower">
                                    <div
                                        className="btn dropdown-toggle"
                                        type="button"
                                        onClick={toggleFollower}
                                    >
                                        <img className="i230" src="/heart.png" alt="heart" />
                                        <p className="i231">Follower</p>
                                    </div>
                                    <div className={`dropdown-menu dropdownMenu2 ${isFollowerOpen ? "show" : ""}`}>
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
                                <span className="menu-link" onClick={onWatchagainFilm}>Watch again Film</span>
                            </li>
                            <li className="menu-item">
                                <span className="menu-link Serie" onClick={onContinueWatchingMovies}>Continue Watching Film</span>
                            </li>
                            <li className="menu-item">
                                <span className="menu-link" onClick={onWatchagainSeries}>Watch again Series-TV</span>
                            </li>
                            <li className="menu-item">
                                <span className="menu-link" onClick={onContinueWatchingSeries}>Continue Watching Series-TV</span>
                            </li>
                            <li className="menu-item"><span className="menu-link">Classifiche Like Film</span></li>
                            <li className="menu-item"><span className="menu-link">Classifiche Views Film</span></li>
                            <li className="menu-item"><span className="menu-link">Classifiche Like Series-TV</span></li>
                            <li className="menu-item"><span className="menu-link">Classifiche Views Series-TV</span></li>
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
                                    <div className="microSearch" style={{ display: "flex", alignItems: "center" }}>
                                        <div className="search__icon-container">
                                            <label htmlFor="searchInput" className="search__label" aria-label="Search">
                                            </label>
                                            <button className="search__submit" aria-label="Search">
                                                <svg viewBox="0 0 1000 1000" title="Search">
                                                    <path fill="currentColor" d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div>
                                            <input
                                                className="search__input"
                                                type="search"
                                                placeholder="Search"
                                                id="searchInput"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
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
                            <span className="menu-item menu-link y320" style={{ cursor: "pointer" }}>Login</span>
                        </nav>
                    </div>
                </nav>
            </header>

            <SearchOverlay
                isOpen={isSearchOverlayOpen}
                onClose={closeSearchOverlay}
                searchTerm={searchTerm}
                onTagClick={handleTagClick}
            />


            {/* Categories Overlay (Example of myOverlay3s) */}
            {/* This could be another component or state controlled div as needed */}

            {/* SVG Definitions */}
            <svg style={{ display: "none" }}>
                <symbol id="svg-link" viewBox="0 0 24 24">
                    <path d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" />
                </symbol>
                <symbol id="svg-zoom" viewBox="0 0 24 24">
                    <path d="M15.5,14L20.5,19L19,20.5L14,15.5V14.71L13.73,14.43C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.43,13.73L14.71,14H15.5M9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14Z" />
                </symbol>
                <symbol id="svg-share" viewBox="0 0 24 24">
                    <path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z" />
                </symbol>
            </svg>
        </>
    );
};

export default Navbar;
