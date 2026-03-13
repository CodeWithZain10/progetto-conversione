import json

films = [
    {
        "percentage": 0,
        "progress": 0,
        "checked": False,
        "id": "film-1",
        "category": "action",
        "authors": "Sylvester Stallone",
        "studios": "Warner Bros",
        "videoSrc": "/03.mp4",
        "imgSrc": "/066.jpg",
        "episodeTitle": "Rocky IV",
        "episodeTime": "1:00min",
        "desc": "Rocky Balboa si rivolge al pubblico sovietico dopo lincontro di apollo",
        "trailerSrc": "/03.mp4",
        "year": "1985",
        "qualityVideo": "4k",
        "classificationItem": "+13"
    },
    {
        "percentage": 0,
        "progress": 0,
        "checked": False,
        "id": "film-2",
        "category": "action",
        "authors": "Sylvester Stallone",
        "studios": "Warner Bros",
        "videoSrc": "/02.mp4",
        "imgSrc": "/02.jpg",
        "episodeTitle": "Rocky II",
        "episodeTime": "1:59min",
        "desc": "Rocky Balboa returns for a rematch.",
        "trailerSrc": "/02.mp4",
        "year": "1979",
        "qualityVideo": "HD",
        "classificationItem": "+13"
    },
    {
        "percentage": 0,
        "progress": 0,
        "checked": False,
        "id": "film-3",
        "category": "action",
        "authors": "Sylvester Stallone",
        "studios": "Warner Bros",
        "videoSrc": "/03.mp4",
        "imgSrc": "/03.jpg",
        "episodeTitle": "Rocky III",
        "episodeTime": "1:39min",
        "desc": "Rocky faces a new challenger.",
        "trailerSrc": "/03.mp4",
        "year": "1982",
        "qualityVideo": "HD",
        "classificationItem": "+13"
    }
]

series = [
    {
        "percentage": 0,
        "progress": 0,
        "checked": False,
        "id": "series-s1-e1",
        "category": "anime",
        "authors": "Hajime Isayama",
        "studios": "MAPPA",
        "videoSrc": "./media/S1-1.mp4",
        "imgSrc": "./media/S1-1.png",
        "episodeTitle": "Attack on Titan - Ep 1",
        "episodeTime": "24:00min",
        "desc": "April 5, 2022 - Attack on Titan is set in a world where humanity is forced to live in cities",
        "trailerSrc": "./media/S1-1.mp4",
        "year": "2013",
        "qualityVideo": "HD",
        "classificationItem": "+16"
    },
    {
        "percentage": 0,
        "progress": 0,
        "checked": False,
        "id": "series-s1-e2",
        "category": "anime",
        "authors": "Hajime Isayama",
        "studios": "MAPPA",
        "videoSrc": "./media/S1-2.mp4",
        "imgSrc": "./media/S1-2.png",
        "episodeTitle": "Attack on Titan - Ep 2",
        "episodeTime": "24:00min",
        "desc": "Attack on Titan continues.",
        "trailerSrc": "./media/S1-2.mp4",
        "year": "2013",
        "qualityVideo": "HD",
        "classificationItem": "+16"
    },
    {
        "percentage": 0,
        "progress": 0,
        "checked": False,
        "id": "series-s2-e1",
        "category": "anime",
        "authors": "Hajime Isayama",
        "studios": "MAPPA",
        "videoSrc": "./media/S2-2.mp4",
        "imgSrc": "./media/S1-3.png",
        "episodeTitle": "Attack on Titan S2 - Ep 1",
        "episodeTime": "24:00min",
        "desc": "Season 2 begins.",
        "trailerSrc": "./media/S2-2.mp4",
        "year": "2017",
        "qualityVideo": "HD",
        "classificationItem": "+16"
    }
]

clientData = f"""
export const filmsData = {json.dumps(films, indent=2)};

export const seriesData = {json.dumps(series, indent=2)};

export const flattenSeriesData = (data) => data; // Already flat

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
  {{ id: 'home', label: 'Home', path: '/' }},
  {{ id: 'film', label: 'Film', path: '/films' }},
  {{ id: 'series', label: 'series', path: '/series' }},
  {{ id: 'children', label: 'Children', path: '/children' }},
  {{ id: 'children-series', label: 'Children series', path: '/children-series' }},
  {{ id: 'favorite', label: 'Favorite', path: '/favorites' }}
];

export const clientData = {{
  filmsData,
  seriesData,
  categories,
  followerOptions,
  navigationItems
}};

export default clientData;
"""

with open(r"c:\\Users\\ZA BAWANI\\Downloads\\progetto conversione\\client\\src\\data\\clientData.js", "w") as f:
    f.write(clientData)
