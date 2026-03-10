import React, { useMemo } from 'react';
import './SearchOverlay.css';
import VideoCard from './VideoCard';
import sourceData from '../data/source.json';

const SearchOverlay = ({ isOpen, onClose, searchTerm, onTagClick }) => {
    // Flatten data for global search
    const allContent = useMemo(() => {
        const flattened = [];

        // Add films
        if (sourceData.films) {
            sourceData.films.forEach(item => flattened.push({ ...item, type: 'film' }));
        }

        // Add series episodes
        if (sourceData.series) {
            sourceData.series.forEach(season => {
                season.season_videos.forEach(video => {
                    flattened.push({
                        ...video,
                        id: `series-${video.video_id}`,
                        episodeTitle: video.video_name,
                        desc: video.video_description,
                        imgSrc: video.video_poster,
                        videoSrc: video.video_url,
                        type: 'series'
                    });
                });
            });
        }

        // Add children films
        if (sourceData.childrenFilms) {
            sourceData.childrenFilms.forEach(item => flattened.push({ ...item, type: 'children' }));
        }

        // Add children series
        if (sourceData.childrenSeries) {
            sourceData.childrenSeries.forEach(season => {
                season.season_videos.forEach(video => {
                    flattened.push({
                        ...video,
                        id: `child-series-${video.video_id}`,
                        episodeTitle: video.video_name,
                        desc: video.video_description,
                        imgSrc: video.video_poster,
                        videoSrc: video.video_url,
                        type: 'children-series'
                    });
                });
            });
        }

        return flattened;
    }, []);

    // Filter content based on search term
    const results = useMemo(() => {
        if (!searchTerm) return [];
        const term = searchTerm.toUpperCase();
        return allContent.filter(item =>
            (item.episodeTitle && item.episodeTitle.toUpperCase().includes(term)) ||
            (item.category && item.category.toUpperCase().includes(term)) ||
            (item.actors && item.actors.toUpperCase().includes(term)) ||
            (item.desc && item.desc.toUpperCase().includes(term))
        );
    }, [searchTerm, allContent]);

    // Unique tags for "Other Title To Discover"
    const tags = useMemo(() => {
        const allTags = new Set();
        allContent.forEach(item => {
            if (item.category) allTags.add(item.category);
            if (item.actors) {
                item.actors.split(',').forEach(actor => allTags.add(actor.trim()));
            }
        });
        return Array.from(allTags).slice(0, 20); // Limit to top 20
    }, [allContent]);

    if (!isOpen) return null;

    return (
        <div id="myOverlay2" className={`overlay search-overlay ${isOpen ? 'open' : ''}`}>
            <div className="search-overlay-container">
                <div className="discover-section">
                    <span className="discover-label">Other Title To Discover:</span>
                    <div className="related_title">
                        {tags.map((tag, index) => (
                            <React.Fragment key={index}>
                                <span
                                    className="related_title_bakr"
                                    onClick={() => onTagClick(tag)}
                                >
                                    {tag}
                                </span>
                                {index < tags.length - 1 && " | "}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="close-btn-container">
                    <span className="closebtn" onClick={onClose} title="Close Overlay">&times;</span>
                </div>

                <div className="search_vidoes grid-results">
                    {results.length > 0 ? (
                        results.map((video) => (
                            <div key={video.id} className="search-result-item">
                                <VideoCard video={video} />
                            </div>
                        ))
                    ) : searchTerm ? (
                        <div className="no-results">No results found for "{searchTerm}"</div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default SearchOverlay;
