// Client Website Data - Extracted from original HTML/JS source files
// This file contains all the original data from the client website

// Films Data - Original structure from films_data.js
export const filmsData = [
  {
    season_id: 0,
    series_id: 0,
    series_url: "src/S2-4.mp4",
    series_title: "Title season 1 series 1",
    percentage: 0,
    progress: 0,
    checked: false,
    id: "1",
    category: "action",
    actors: "Sylvester Stallone",
    studios: "Warner Bros",
    videoSrc: "./03.mp4", // entire movie
    imgSrc: "src/066.jpg", // thumbnails
    episodeTitle: "rocky4",
    episodeTime: "1:00min",
    desc: "Rocky Balboa si rivolge al pubblico sovietico dopo lincontro di apollo", // description
    trailerSrc: "./03.mp4", // hover video trailer
    year: "1985",
    qualityVideo: "4k",
    classificationVideo: "+13",
    "logo-video-home": "src/logo.png"
  },
  {
    season_id: 0,
    series_id: 1,
    series_url: "src/S2-5.mp4",
    series_title: "Title season 1 series 2",
    percentage: 0,
    progress: 0,
    checked: false,
    id: "2",
    category: "action",
    actors: "Sylvester Stallone",
    studios: "Warner Bros",
    videoSrc: "./02.mp4",
    imgSrc: "src/067.jpg",
    episodeTitle: "rocky5",
    episodeTime: "1:30min",
    desc: "Rocky Balboa si allena per il suo prossimo incontro",
    trailerSrc: "./02.mp4",
    year: "1990",
    qualityVideo: "4k",
    classificationVideo: "+13",
    "logo-video-home": "src/logo.png"
  },
  {
    season_id: 0,
    series_id: 2,
    series_url: "src/S2-6.mp4",
    series_title: "Title season 1 series 3",
    percentage: 0,
    progress: 0,
    checked: false,
    id: "3",
    category: "action",
    actors: "Sylvester Stallone",
    studios: "Warner Bros",
    videoSrc: "./03.mp4",
    imgSrc: "src/068.jpg",
    episodeTitle: "rocky6",
    episodeTime: "1:45min",
    desc: "Rocky Balboa affronta la sua più grande sfida",
    trailerSrc: "./03.mp4",
    year: "2006",
    qualityVideo: "4k",
    classificationVideo: "+13",
    "logo-video-home": "src/logo.png"
  }
  // Add more films as needed from original data
];

// Series Data - Original structure from series_data.js
export const seriesData = [
  {
    season_id: 0,
    season_name: "Season 1",
    season_videos: [
      {
        video_id: 0,
        video_name: "title prova",
        video_description: "April 5, 2022 - Attack on Titan (Japanese: 進撃の巨人, Hepburn: Shingeki no Kyojin, lit. 'The Advancing Giants') is a Japanese manga series written and illustrated by Hajime Isayama. It is set in a world where humanity is forced to live in cities",
        video_duration: "2:00 min",
        video_poster: "./media/S1-1.png",
        video_url: "./media/S1-1.mp4"
      },
      {
        video_id: 1,
        video_name: "title Season 1 series 2",
        video_description: "Lorem Ipsum data text long one 2",
        video_duration: "3:00 min",
        video_poster: "./media/S1-2.png",
        video_url: "./media/S1-2.mp4"
      },
      {
        video_id: 2,
        video_name: "title Season 1 series 3",
        video_description: "Lorem Ipsum data text long one 3",
        video_duration: "2:30 min",
        video_poster: "./media/S1-3.png",
        video_url: "./media/S1-3.mp4"
      }
    ]
  },
  {
    season_id: 1,
    season_name: "Season 2",
    season_videos: [
      {
        video_id: 3,
        video_name: "title Season 2 series 1",
        video_description: "Season 2 episode 1 description",
        video_duration: "2:15 min",
        video_poster: "./media/S2-1.png",
        video_url: "./media/S2-1.mp4"
      },
      {
        video_id: 4,
        video_name: "title Season 2 series 2",
        video_description: "Season 2 episode 2 description",
        video_duration: "2:45 min",
        video_poster: "./media/S2-2.png",
        video_url: "./media/S2-2.mp4"
      }
    ]
  }
  // Add more seasons as needed
];

// Children Films Data - Original structure from children_films_data.js
export const childrenFilmsData = [
  {
    season_id: 0,
    series_id: 0,
    series_url: "src/child1.mp4",
    series_title: "Children Film 1",
    percentage: 0,
    progress: 0,
    checked: false,
    id: "child1",
    category: "children",
    actors: "Voice Actors",
    studios: "Animation Studio",
    videoSrc: "./child1.mp4",
    imgSrc: "src/child1.jpg",
    episodeTitle: "Kids Adventure",
    episodeTime: "1:00min",
    desc: "Fun adventure for children",
    trailerSrc: "./child1.mp4",
    year: "2020",
    qualityVideo: "HD",
    classificationVideo: "All Ages",
    "logo-video-home": "src/logo.png"
  },
  {
    season_id: 0,
    series_id: 1,
    series_url: "src/child2.mp4",
    series_title: "Children Film 2",
    percentage: 0,
    progress: 0,
    checked: false,
    id: "child2",
    category: "children",
    actors: "Voice Actors",
    studios: "Animation Studio",
    videoSrc: "./child2.mp4",
    imgSrc: "src/child2.jpg",
    episodeTitle: "Kids Comedy",
    episodeTime: "1:15min",
    desc: "Comedy movie for kids",
    trailerSrc: "./child2.mp4",
    year: "2021",
    qualityVideo: "HD",
    classificationVideo: "All Ages",
    "logo-video-home": "src/logo.png"
  }
];

// Children Series Data - Original structure from children_series_data.js
export const childrenSeriesData = [
  {
    season_id: 0,
    season_name: "Kids Season 1",
    season_videos: [
      {
        video_id: 0,
        video_name: "Kids Show Episode 1",
        video_description: "First episode of kids show",
        video_duration: "15 min",
        video_poster: "./media/kids1-1.png",
        video_url: "./media/kids1-1.mp4"
      },
      {
        video_id: 1,
        video_name: "Kids Show Episode 2",
        video_description: "Second episode of kids show",
        video_duration: "15 min",
        video_poster: "./media/kids1-2.png",
        video_url: "./media/kids1-2.mp4"
      }
    ]
  },
  {
    season_id: 1,
    season_name: "Kids Season 2",
    season_videos: [
      {
        video_id: 2,
        video_name: "Kids Show Episode 3",
        video_description: "First episode of season 2",
        video_duration: "15 min",
        video_poster: "./media/kids2-1.png",
        video_url: "./media/kids2-1.mp4"
      }
    ]
  }
];

// Utility function to flatten series data for VideoCard components
export const flattenSeriesData = (seriesData) => {
  const flattenedVideos = [];
  
  seriesData.forEach((season) => {
    season.season_videos.forEach((video) => {
      flattenedVideos.push({
        id: `series-${season.season_id}-${video.video_id}`,
        videoSrc: video.video_url,
        imgSrc: video.video_poster,
        episodeTitle: video.video_name,
        episodeTime: video.video_duration,
        desc: video.video_description,
        series_title: season.season_name,
        season_id: season.season_id,
        video_id: video.video_id,
        category: "series",
        trailerSrc: video.video_url,
        year: "2022",
        qualityVideo: "HD",
        classificationVideo: "All Ages"
      });
    });
  });
  
  return flattenedVideos;
};

// Categories for navigation
export const categories = [
  "Horror",
  "Documentary", 
  "Dramatic",
  "War",
  "catastrophic",
  "adventure",
  "comics",
  "actions"
];

// Follower options
export const followerOptions = [
  "Most liked",
  "Most views"
];

// Navigation menu items
export const navigationItems = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'film', label: 'Film', path: '/films' },
  { id: 'series', label: 'series', path: '/series' },
  { id: 'children', label: 'Children', path: '/children' },
  { id: 'children-series', label: 'Children series', path: '/children-series' },
  { id: 'favorite', label: 'Favorite', path: '/favorites' }
];

// Sidebar menu structure
export const sidebarMenuStructure = {
  menu: {
    title: "Menu",
    items: [
      {
        type: 'dropdown',
        label: 'Categories',
        icon: '/menu-icon.png',
        options: categories
      },
      {
        type: 'dropdown', 
        label: 'Follower',
        icon: '/heart.png',
        options: followerOptions
      }
    ]
  },
  explore: {
    title: "Esplora",
    items: [
      "Favorite",
      "Watch again Film", 
      "Continue Watching Film",
      "Watch again Series-TV",
      "Continue Watching Series-TV",
      "Classifiche Like Film",
      "Classifiche Views Film",
      "Classifiche Like Series-TV", 
      "Classifiche Views Series-TV",
      "1",
      "2", 
      "3",
      "3",
      "3",
      "3"
    ]
  }
};

// Export all data for easy import
export const clientData = {
  filmsData,
  seriesData,
  childrenFilmsData,
  childrenSeriesData,
  categories,
  followerOptions,
  navigationItems,
  sidebarMenuStructure
};

export default clientData;
