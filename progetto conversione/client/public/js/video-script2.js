window.onload = function () {
  var vidWrapper = document.querySelectorAll(".video-wrapper");
  let isPlayVideo = false;

  vidWrapper.forEach((vidItem) => {
    // Play on hover
    // var vid = vidItem.childNodes.find("video")
    var vidElement = vidItem.getElementsByTagName("video")[0];
    var muteBtn = vidItem.getElementsByClassName("audio-mute-btn")[0];

    vidItem.addEventListener("mouseover", (event) => {
      // console.log(vidItem, muteBtn)
      vidElement.play();
    });
    // Pause on hover
    vidItem.addEventListener("mouseout", (event) => {
      if (isPlayVideo == true) {
        vidElement.play();
      } else {
        vidElement.pause();
      }
    });

    vidElement.addEventListener("ended", (event) => {
      vidItem.classList.remove("video-playing");
    });

    // Script for Poster Image hide and show
    vidElement.addEventListener("pause", (event) => {
      vidItem.classList.remove("video-playing");
    });

    vidElement.addEventListener("play", (event) => {
      vidItem.classList.add("video-playing");
    });

    // Mute/Unmute
    vidElement.muted = true;
    muteBtn.addEventListener("click", function () {
      if (vidElement.muted == true) {
        this.querySelector(".mute-icon").classList.add("hide");
        this.querySelector(".unmute-icon").classList.remove("hide");
        vidElement.muted = false;
      } else {
        this.querySelector(".unmute-icon").classList.add("hide");
        this.querySelector(".mute-icon").classList.remove("hide");
        vidElement.muted = true;
      }
    });
  });
};
