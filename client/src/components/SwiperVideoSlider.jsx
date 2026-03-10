import React, { useRef, useEffect } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import VideoCard from './VideoCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SwiperVideoSlider.css';

const SwiperVideoSlider = ({ title, videos, showBrowseAll = false, onBrowseAll, onVideoClick }) => {
  const swiperRef = useRef(null);

  const swiperParams = {
    modules: [Navigation, Pagination],
    spaceBetween: 20,
    slidesPerView: 1,
    slidesPerGroup: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 18,
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 20,
      },
    },
    loop: false,
    grabCursor: true,
    resistance: true,
    resistanceRatio: 0.85,
    preventClicks: false,
    preventClicksPropagation: false,
  };

  return (
    <section className="swiper-video-slider-section">
      <div className="swiper-video-slider-header">
        <h4 className="swiper-video-slider-title">
          {title} <span>&nbsp;&nbsp;</span>
          {showBrowseAll && (
            <>
              <span
                className="swiper-video-slider-browse"
                onClick={onBrowseAll}
              >
                Browse All
              </span>
              <span className="swiper-video-slider-cursor">{'>'}</span>
            </>
          )}
        </h4>
      </div>
      
      <div className="swiper-video-slider-container">
        <Swiper {...swiperParams} className="mySwiper">
          {videos.map((video) => (
            <SwiperSlide key={video.id}>
              <div className="swiper-video-slide">
                <VideoCard video={video} onClick={onVideoClick} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom Navigation Arrows */}
        <div className="swiper-button-prev">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </div>
        <div className="swiper-button-next">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </div>
        
        {/* Pagination Dots */}
        <div className="swiper-pagination"></div>
      </div>
    </section>
  );
};

export default SwiperVideoSlider;
