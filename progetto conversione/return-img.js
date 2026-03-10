var allVideos = document.querySelectorAll("video");
allVideos.forEach((vidElement) => {
  vidElement.addEventListener("ended", (event) => {
    vidElement.classList.add("mpp-hidden");
    console.log("jkio");
  });
});

// jQuery(function ($) {
//   let allVideos = document.querySelectorAll("video");
//   allVideos.forEach((vidElement) => {
//     vidElement.addEventListener(
//       "ended",
//       (event) => {
//         vidElement.classList.add("mpp-hidden1");
//       },
//       false
//     );
//   });

//   let colsebackall = document.querySelectorAll(".plyyer");
//   colsebackall.forEach((vidElement) => {
//     vidElement.addEventListener(
//       "ended",
//       (event) => {
//         vidElement.classList.add("mpp-hidden");
//         $(vidElement).parents(".slick-slide").addClass("pupo");
//         $(vidElement)
//           .parents(".favi")
//           .find(".mpp-playlist-item-ready")
//           .removeClass("mpp-playlist-item-active");
//       },
//       false
//     );
//   });
//   document.querySelectorAll(".flickfeed .slick-slide").forEach((aaaaaoo) => {
//     aaaaaoo.addEventListener("mouseenter", () => {
//       if ($(aaaaaoo).hasClass("pupo")) {
//         $(aaaaaoo).removeClass("pupo");
//       }
//     });
//   });
// });
