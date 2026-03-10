import sourceData from './source.json';

export const filmsData = sourceData.films;
export const seriesData = sourceData.series;
export const childrenFilmsData = sourceData.childrenFilms;
export const childrenSeriesData = sourceData.childrenSeries;

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
