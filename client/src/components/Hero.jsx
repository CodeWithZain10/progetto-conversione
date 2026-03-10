import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './Hero.css';

const Hero = ({ data, onVideoClick }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(true);
    const [isEnded, setIsEnded] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [showOverlays, setShowOverlays] = useState(false);

    const videoRef = useRef(null);
    const swiperRef = useRef(null);
    const playTimeoutRef = useRef(null);

    const posterDuration = 3500; // 3.5 seconds matching legacy spec

    useEffect(() => {
        if (!data || data.length === 0) return;

        // Initial setup for the first slide
        handleSlideChange(0);

        return () => {
            if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);
        };
    }, [data]);

    const handleSlideChange = (index) => {
        const videoData = data[index];
        if (!videoData) return;

        setActiveIndex(index);
        setIsPaused(true);
        setIsEnded(false);
        setProgress(0);
        setShowOverlays(false);

        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }

        if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);

        playTimeoutRef.current = setTimeout(() => {
            if (videoRef.current) {
                // In a real app, we'd use videoData.videoSrc
                // Matching the legacy logic of loading the video after the poster duration
                setIsPaused(false);
                videoRef.current.play().catch(err => console.log("Autoplay blocked or interrupted", err));
            }
        }, posterDuration);
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(currentProgress);
        }
    };

    const handleVideoEnded = () => {
        setIsPaused(true);
        setIsEnded(true);
        setShowOverlays(true);
    };

    const toggleMute = (e) => {
        e.stopPropagation();
        setIsMuted(!isMuted);
    };

    const handleReplay = (e) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            setProgress(0);
            setIsEnded(false);
            setIsPaused(false);
            setShowOverlays(false);
            videoRef.current.play();
        }
    };

    if (!data || data.length === 0) return null;

    return (
        <section className="second land_second">
            <div className="modal-header1 modal-header-top" id="homee">
                <div className="modal__title">
                    <h1 className="modal__label" style={{ fontSize: '30px', fontWeight: 700 }}>
                        {data[activeIndex]?.series_title || data[activeIndex]?.episodeTitle}
                    </h1>

                    <div className="share_land_video">
                        <span id="land_myOverlay1" className="land_overlay">
                            <div id="video-background" className={`video-swiper ${isPaused ? 'video-swiper--paused' : ''} ${isEnded ? 'video-swiper--ended' : ''}`}>

                                <div className="video-swiper-progress" style={{ width: `${progress}%`, transition: 'width 0.3s linear' }}></div>

                                <Swiper
                                    modules={[Autoplay, EffectFade]}
                                    effect="fade"
                                    fadeEffect={{ crossFade: true }}
                                    autoplay={{ delay: 3600000 }} // Very long delay, manual control preferred
                                    onSwiper={(swiper) => swiperRef.current = swiper}
                                    onSlideChange={(swiper) => handleSlideChange(swiper.realIndex)}
                                    className="swiper-container"
                                    allowTouchMove={false}
                                >
                                    {data.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={item.imgSrc}
                                                className="video-swiper-poster"
                                                alt="poster"
                                                style={{ opacity: (activeIndex === index && isPaused) ? 1 : 0 }}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                <video
                                    ref={videoRef}
                                    className="video-swiper-video"
                                    src={data[activeIndex]?.videoSrc}
                                    muted={isMuted}
                                    onTimeUpdate={handleTimeUpdate}
                                    onEnded={handleVideoEnded}
                                    playsInline
                                />

                                <span className="video-swiper-sound" title="Volume On/Off" onClick={toggleMute}>
                                    <svg viewBox="0 0 32 32">
                                        <use xlinkHref={isMuted ? "#bv-sound-off" : "#bv-sound-on"}></use>
                                    </svg>
                                </span>

                                <a className="video-swiper-replay" title="Replay" onClick={handleReplay}>
                                    <svg viewBox="0 0 64 64">
                                        <use xlinkHref="#bv-replay"></use>
                                    </svg>
                                </a>

                                <ul className="nav-main">
                                    <li><a href="#homee" className="jmplino">Film</a></li>
                                    <li><a href="#ply" className="jmplino jmpl">Playlist</a></li>
                                    <li><a href="#about" className="jmplino">Descrizione</a></li>
                                    <li><a href="#clients" className="jmplino">Related Video</a></li>
                                    <li><a href="#contact" className="jmplino">info</a></li>
                                </ul>
                            </div>
                        </span>
                    </div>
                </div>

                <div className="playlist__dropdown" style={{ display: showOverlays ? 'block' : 'none' }}>
                    <select className="select selectSeasons1">
                        <option>Season 1</option>
                    </select>
                </div>

                <div className="modal__view modal-view" style={{ display: showOverlays ? 'block' : 'none' }}>
                    <button className="modal-view__button" onClick={() => onVideoClick(data[activeIndex])}>
                        <span>
                            <i id="PlayButtonIcon" className="fas fa-play"></i> Play Video
                        </span>
                    </button>
                </div>
            </div>

            {/* SVG Definitions for Icons */}
            <svg className="hidden" style={{ display: 'none' }}>
                <symbol id="bv-sound-off" viewBox="0 0 32 32">
                    <path d="M11.5 11l-4.5 4.5v3l4.5 4.5h4.5v-12h-4.5zm8.5 0v12c3.5-1.5 6-5 6-9s-2.5-7.5-6-9v3c2 1 3.5 3 3.5 6s-1.5 5-3.5 6v3z" />
                </symbol>
                <symbol id="bv-sound-on" viewBox="0 0 32 32">
                    <path d="M11.5 11l-4.5 4.5v3l4.5 4.5h4.5v-12h-4.5zm8.5-5v3c2.5 1 4.5 3.5 4.5 6.5s-2 5.5-4.5 6.5v3c4-1.5 7.5-5 7.5-9.5s-3.5-8-7.5-9.5z" />
                </symbol>
                <symbol id="bv-replay" viewBox="0 0 1280 1266">
                    <path d="M613 .7C499.4 5.4 387.7 40.4 293 100.9c-116.3 74.4-204.8 183-252.5 309.6-43.3 115-52 240.6-24.9 359.5 16.9 74 46.3 143 88 206.3 76.5 116.1 187.4 203.4 318.9 250.9 97.7 35.4 204.4 46.7 308 32.8 138.8-18.6 269.4-82.9 367.5-181 12.9-12.9 120.1-131.8 120.7-133.9.2-.8-195.1-174.6-196.4-174.6-.5 0-20 21.4-43.3 47.5-59.6 66.8-65.5 73.2-78.2 84.7-59.9 53.9-128.4 85.7-208.3 96.4-29.2 3.9-72.6 3.6-102.5-.7-106.9-15.3-199.6-71.9-260.5-158.9-74.6-106.6-86.3-245.7-30.5-363.2 35.9-75.5 97.9-137.5 174.5-174.4 38.7-18.6 72.8-28.7 118-35.1 21.3-2.9 71.2-3.3 92.7-.5 64.9 8.2 120.6 28.8 172.3 63.8 26.9 18.2 48.1 37.2 78.1 70.4 15.3 16.8 16.2 18.1 14.6 19.6-.9.9-28.7 25.4-61.7 54.4-33 29.1-60.1 53.2-60.3 53.7-.2.4.4.8 1.3.8.8 0 30.5 6.8 65.8 15 35.3 8.3 85.1 20 110.7 26 25.6 6 72.6 17 104.5 24.5 31.9 7.5 83.1 19.5 113.8 26.7 30.7 7.1 56 12.8 56.2 12.6.3-.2-4.7-96-11-212.9-6.3-116.8-11.9-222.1-12.6-233.9-.6-11.8-1.4-24.5-1.7-28.2l-.7-6.7-52 45.9c-28.6 25.2-52.2 45.9-52.5 45.9-.3.1-6.6-6.7-14-15-19.4-21.9-42.5-45.8-57.5-59.5C952.5 54.7 784.1-6.5 613 .7z" />
                </symbol>
            </svg>
        </section>
    );
};

export default Hero;
