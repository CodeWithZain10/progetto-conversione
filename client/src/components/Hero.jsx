import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import './Hero.css';

const Hero = ({ data, onVideoClick, onLandingClick }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!data || data.length === 0) return null;

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.realIndex);
    };

    return (
        <section className="second land_second hero-carousel-section">
            <h2 className="hero-main-title">Featured Highlights</h2>
            <div className="hero-swiper-container">
                <Swiper
                    modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={7}
                    spaceBetween={10}
                    loop={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: true,
                    }}
                    navigation={true}
                    pagination={{ clickable: true }}
                    onSlideChange={handleSlideChange}
                    breakpoints={{
                        320: { slidesPerView: 2 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5 },
                        1400: { slidesPerView: 7 }
                    }}
                    className="hero-swiper"
                >
                    {data.map((item, index) => (
                        <SwiperSlide key={item.id || index} className="hero-slide">
                            {({ isActive }) => (
                                <div className={`hero-card-inner ${isActive ? 'is-active' : ''}`} onClick={() => onVideoClick(item)}>
                                    <img src={item.imgSrc?.startsWith('/') ? item.imgSrc : `/${item.imgSrc?.replace('./', '')}`} alt={item.episodeTitle} className="hero-poster" />
                                    {isActive && (
                                        <div className="hero-overlay-content">
                                            <span className="hero-category-label">{item.category || "Film"}</span>
                                            <h3 className="hero-title">{item.series_title || item.episodeTitle}</h3>
                                            <p className="hero-desc">{item.desc}</p>
                                            <div className="hero-actions">
                                                <button className="hero-play-btn" onClick={(e) => { e.stopPropagation(); onVideoClick(item); }}>
                                                    <i className="fas fa-play"></i> Play
                                                </button>
                                                <button className="hero-info-btn" onClick={(e) => { e.stopPropagation(); onLandingClick && onLandingClick(item); }}>
                                                    <i className="fas fa-info-circle"></i> More Info
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Hero;
