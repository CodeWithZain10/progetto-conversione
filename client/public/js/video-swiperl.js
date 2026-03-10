/**
 * The `VideoSwiper` class provides a video-based carousel functionality for a web page.
 *
 * It takes an HTML element and options to initialize the carousel, and provides methods to control the video playback and interaction.
 *
 * The class sets up the necessary HTML elements, event listeners, and Swiper.js integration to create a responsive and interactive video carousel.
 *
 * @class VideoSwiper
 * @param {HTMLElement|string} element - The HTML element or selector for the carousel container.
 * @param {object} options - The options object for configuring the carousel.
 * @param {object} swiperOptions - The options object for configuring the Swiper.js instance.
 * @constructor
 */
/**
 * The `VideoSwiper` class provides a video-based carousel functionality for a web page.
 *
 * It takes an HTML element and options to initialize the carousel, and provides methods to control the video playback and interaction.
 *
 * The class sets up the necessary HTML elements, event listeners, and Swiper.js integration to create a responsive and interactive video carousel.
 *
 * @class VideoSwiper
 * @param {HTMLElement|string} element - The HTML element or selector for the carousel container.
 * @param {object} options - The options object for configuring the carousel.
 * @param {object} swiperOptions - The options object for configuring the Swiper.js instance.
 * @constructor
 */
/**
 * The `VideoSwiper` class provides a video-based carousel functionality for a web page.
 *
 * It takes an HTML element and options to initialize the carousel, and provides methods to control the video playback and interaction.
 *
 * The class sets up the necessary HTML elements, event listeners, and Swiper.js integration to create a responsive and interactive video carousel.
 *
 * @class VideoSwiper
 * @param {HTMLElement|string} element - The HTML element or selector for the carousel container.
 * @param {object} options - The options object for configuring the carousel.
 * @param {object} swiperOptions - The options object for configuring the Swiper.js instance.
 * @constructor
 */
class VideoSwiper {
  //swiper: Swiper
  //element: HTMLElement
  //video: HTMLVideoElement
  //videoProgress: HTMLDivElement;
  //videoSound: HTMLElement;
  //videoReplay: HTMLElement;
  //previousTime: int;
  //options: object;
  //playTimeout: int;

  constructor(element, options, swiperOptions) {
    const defaults = {
      videos: [],
    };
    const swiperDefaults = {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    };
    this.options = Object.assign({}, defaults, options);
    swiperOptions = Object.assign({}, swiperDefaults, swiperOptions);

    if (typeof element == "string") {
      element = document.querySelector(element);
    }
    this.element = element;
    this.element.classList.add("video-swiper");

    //Video poster for every slide
    this.element.querySelectorAll(".swiper-slide").forEach((slide, index) => {
      const videoData = this.options.videos[index];
      if (videoData && videoData.poster) {
        const poster = document.createElement("img");
        poster.classList.add("video-swiper-poster");
        poster.src = videoData.poster;
        slide.appendChild(poster);
      }
    });

    //Video duration display
    this.videoProgress = document.createElement("div");
    this.videoProgress.classList.add("video-swiper-progress");
    this.element.appendChild(this.videoProgress);

    //Video sound on/off
    this.videoSound = document.createElement("a");
    this.videoSound.classList.add("video-swiper-sound");
    this.videoSound.setAttribute("title", "Volume On/Off");
    this.videoSound.setAttribute("href", "#");
    this.videoSound.innerHTML =
      '<svg viewBox="0 0 32 32"><use xlink:href="#bv-sound-off"></use></svg>';
    this.element.appendChild(this.videoSound);
    this.videoSound.addEventListener("click", () => this.onVideoSoundClicked());

    // Video sound off click x
    this.soundoff = document.getElementById("#closebtn");
    this.soundoff.addEventListener("click", () => this.onVideoSoundClicked());

    //Video replay
    this.videoReplay = document.createElement("a");
    this.videoReplay.classList.add("video-swiper-replay");
    this.videoReplay.setAttribute("title", "Replay");
    this.videoReplay.setAttribute("href", "#");
    this.videoReplay.innerHTML =
      '<svg viewBox="0 0 64 64"><use xlink:href="#bv-replay"></use></svg>';
    this.element.appendChild(this.videoReplay);
    this.videoReplay.addEventListener("click", () =>
      this.onVideoReplayClicked()
    );

    this.videoSkip = document.getElementById("#skipVideo");
    // this.videoSkip.style.display = 'none';
    this.videoSkip.addEventListener("click", () => this.onVideoSkip());

    this.videoStart = document.getElementById("#start");
    // this.videoSkip.style.display = 'none';
    this.videoStart.addEventListener("click", () => this.onVideoStart());

    //One video element for all slides
    this.video = document.createElement("video");
    this.video.classList.add("video-swiper-video");

    this.video.muted = true;
    this.video.loop = !!this.options.loop;
    this.video.setAttribute("playsinline", "");

    this.previousTime = 0;
    this.video.addEventListener("timeupdate", () => this.onVideoTimeUpdate(), {
      passive: true,
    });
    this.video.addEventListener("pause", () => this.onVideoPaused(), {
      passive: true,
    });
    this.video.addEventListener("ended", () => this.onVideoEnded(), {
      passive: true,
    });
    this.element.appendChild(this.video);

    this.swiper = new Swiper(element, swiperOptions);
    this.swiper.on("slideChangeTransitionEnd", () =>
      this.onSlideChangeTransitionEnd()
    );

    console.log(document.getElementById("video1-btn"), "Slide transition");

    document
      .querySelector("#myOverlay4s #video1-btn")
      .addEventListener("click", () => this.changeVideo(1));
    document
      .querySelector("#myOverlay4s #video2-btn")
      .addEventListener("click", () => this.changeVideo(2));
    document
      .querySelector("#myOverlay4s #video3-btn")
      .addEventListener("click", () => this.changeVideo(3));
    document
      .querySelector("#myOverlay4s #video4-btn")
      .addEventListener("click", () => this.changeVideo(4));
    document
      .querySelector("#myOverlay4s #video5-btn")
      .addEventListener("click", () => this.changeVideo(5));
    document
      .querySelector("#myOverlay4s #video6-btn")
      .addEventListener("click", () => this.changeVideo(0));

    this.nextVideo();
  }

  changeVideo(index) {
    if (index >= 0 && index < this.options.videos.length) {
      this.swiper.slideTo(index);
      this.nextVideo();
    }
  }

  onVideoTimeUpdate() {
    const timeGap = this.video.currentTime - this.previousTime;
    this.previousTime = this.video.currentTime;
    const percentage = (this.video.currentTime / this.video.duration) * 100;
    this.videoProgress.style.transition = "width " + timeGap + "s linear 0s";
    this.videoProgress.style.width = percentage + "%";
  }

  onSlideChangeTransitionEnd() {
    this.nextVideo();
  }

  onVideoPaused() {
    this.element.classList.add("video-swiper--paused");
  }

  onVideoEnded() {
    this.videoSkip.style.display = "none";
    this.element.classList.add("video-swiper--paused", "video-swiper--ended");
  }

  onVideoSoundClicked() {
    this.video.muted = !this.video.muted;
    this.videoSound
      .querySelector("use")
      .setAttribute(
        "xlink:href",
        this.video.muted ? "#bv-sound-off" : "#bv-sound-on"
      );
  }

  onVideoReplayClicked() {
    this.video.pause();
    this.previousTime = 0;
    this.videoProgress.style.transition = "none";
    this.videoProgress.style.width = "0";
    this.video.currentTime = 0;
    this.playVideo();
  }

  nextVideo() {
    const videoData = this.options.videos[this.swiper.realIndex];

    this.element.classList.remove("video-swiper--ended");
    this.video.pause();
    this.onVideoPaused();
    this.video.innerHTML = "";
    this.previousTime = 0;
    this.videoProgress.style.transition = "none";
    this.videoProgress.style.width = "0";
    clearTimeout(this.playTimeout);

    if (videoData) {
      ["mp4", "ogg", "wemb"].forEach((ext) => {
        if (!videoData[ext]) return;

        const source = document.createElement("source");
        source.setAttribute("src", videoData[ext]);
        source.setAttribute("type", videoData[ext + "-type"] ?? "video/" + ext);
        this.video.appendChild(source);
      });
      this.video.load();
      this.playTimeout = setTimeout(
        () => this.playVideo(),
        videoData.posterDuration ?? this.options.posterDuration
      );
    }

    // Update button states
    this.updateButtonStates();
  }

  updateButtonStates() {
    const buttons = document.querySelectorAll(".video-buttons button");
    buttons.forEach((button, index) => {
      if (index === this.swiper.realIndex) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  playVideo() {
    this.videoSkip.style.display = "initial";
    this.element.classList.remove(
      "video-swiper--paused",
      "video-swiper--ended"
    );
    this.video.play();
  }

  onVideoSkip() {
    this.videoSkip.style.display = "none";
    this.element.classList.add("video-swiper--paused", "video-swiper--ended");
    const duration = this.video.duration;
    this.video.pause();
    this.video.currentTime = duration;
  }

  onVideoStart() {
    // this.video.pause();
    this.previousTime = 0;
    this.videoProgress.style.transition = "none";
    this.videoProgress.style.width = "0";
    this.video.currentTime = 0;
    this.playVideo();
  }
}
