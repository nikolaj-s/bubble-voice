import React from 'react'
import { TextInput } from '../../../components/inputs/TextInput/TextInput'
import { useDispatch, useSelector } from 'react-redux';

import "./YoutubeSearch.css";
import { fetchRecentSongs, searchMedia, selectLoadingMusicState, selectLoadingRecentSongs, selectRecentSongs, selectSearchResults } from '../../server/ChannelRoom/Room/Music/MusicSlice';
import { Song } from '../../../components/widgets/Widgets/MusicWIdget/Song/Song';
import { Loading } from '../../../components/LoadingComponents/Loading/Loading';

import { SearchIcon } from '../../../components/Icons/SearchIcon/SearchIcon'
import { selectVideoResults, setVideos } from '../../server/ChannelRoom/ServerDashBoard/ServerMedia/ServerMediaSlice';
import { VideoSearch } from '../../../util/VideoSearch';
import { selectServerId, throwServerError } from '../../server/ServerSlice';

export const YoutubeSearch = () => {

    const [query, setQuery] = React.useState("");

    const [loading, toggleLoading] = React.useState(false);

    const dispatch = useDispatch();

    const recentMedia = useSelector(selectRecentSongs);

    const results = useSelector(selectVideoResults);

    const serverId = useSelector(selectServerId);

    const handleSearch = async () => {
        if (loading) return;

        if (query.length < 1) return;

        toggleLoading(true);

        const videos = await VideoSearch(query, serverId);

        if (videos.error) return dispatch(throwServerError({errorMessage: videos.errorMessage}));

        dispatch(setVideos(videos.media));

        toggleLoading(false);

    }

    const handleEnter = (code) => {
        if (code === 13) {
            handleSearch();
        }
    }

    return (
        <div className='youtube-search-container'>
            <div className='youtube-search-navigation'>
                <TextInput keyCode={handleEnter} inputValue={query} action={(v) => {setQuery(v)}} invert={true} placeholder={"Search"} />
                <div style={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    opacity: 0.5,
                    pointerEvents: 'none'
                }}>
                    <SearchIcon />
                </div>
            </div>
            <div className='youtube-search-results-container'>
                {results.length > 0 ?
                    results.map(song => {
                        return <Song key={song.url} author={song.author} url={song.url} altSong={true} data={song} duration={song.duration} name={song.title} image={song.thumbnail}  />
                    })
                : 
                recentMedia.map(song => {
                    return <Song key={song.url} author={song.author} url={song.url} altSong={true} data={song} duration={song.duration} name={song.title} image={song.thumbnail}  />
                })
                }
                <Loading loading={loading} />
            </div>
        </div>
    )
}
