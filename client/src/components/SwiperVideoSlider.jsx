import React from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import VideoCard from './VideoCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SwiperVideoSlider.css';

const SwiperVideoSlider = ({ title, data, id, onVideoClick, onToggleFavorite, onRemoveFavoriteRequest, onLandingClick, favorites }) => {
  // Unique navigation and pagination selectors
  const nextEl = `.swiper-button-next-${id}`;
  const prevEl = `.swiper-button-prev-${id}`;
  const paginationEl = `.swiper-pagination-${id}`;

  return (
    <section id={id} className="py-5 flix-parents" style={{ zIndex: 20 }}>
      <div className="filter"></div>
      <h4 className="completehome__title">
        {title} <span className="completehome__cursor">&gt;</span>
      </h4>

      <div className="mpp-dot wraphome mpp-skin-sirius-trans mpp-controls-tr mpp-no-grid">
        <div className="swiper-video-slider-container">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={2}
            slidesPerView={1.5}
            slidesPerGroup={1}
            navigation={{
              nextEl: nextEl,
              prevEl: prevEl,
            }}
            pagination={{
              el: paginationEl,
              clickable: true,
            }}
            breakpoints={{
              320: { slidesPerView: 1.5 },
              480: { slidesPerView: 2.5 },
              768: { slidesPerView: 3.5 },
              1024: { slidesPerView: 4.5 },
              1400: { slidesPerView: 5.5 }, 
              1920: { slidesPerView: 6.5 }
            }}
            watchOverflow={true}
            className="homeSlider"
            slidesOffsetBefore={0}
            slidesOffsetAfter={0}
          >
            {data && data.map((video) => (
              <SwiperSlide key={video.id || Math.random()}>
                <VideoCard video={video} onClick={onVideoClick} onToggleFavorite={onToggleFavorite} onRemoveFavoriteRequest={onRemoveFavoriteRequest} onLandingClick={onLandingClick} favorites={favorites} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <div className={`swiper-button-prev swiper-button-prev-custom ${prevEl.substring(1)}`}></div>
          <div className={`swiper-button-next swiper-button-next-custom ${nextEl.substring(1)}`}></div>

          {/* Pagination */}
          <div className={`swiper-pagination swiper-pagination-custom ${paginationEl.substring(1)}`}></div>
        </div>
      </div>
    </section>
  );
};

export default SwiperVideoSlider;
