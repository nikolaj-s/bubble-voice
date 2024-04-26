import React from 'react'
import { TextInput } from '../../../components/inputs/TextInput/TextInput'
import { useDispatch, useSelector } from 'react-redux';

import "./YoutubeSearch.css";
import { fetchRecentSongs, searchMedia, selectLoadingMusicState, selectLoadingRecentSongs, selectRecentSongs, selectSearchResults } from '../../server/ChannelRoom/Room/Music/MusicSlice';
import { Song } from '../../../components/widgets/Widgets/MusicWIdget/Song/Song';
import { Loading } from '../../../components/LoadingComponents/Loading/Loading';

import { SearchIcon } from '../../../components/Icons/SearchIcon/SearchIcon'

export const YoutubeSearch = () => {

    const [query, setQuery] = React.useState("");

    const dispatch = useDispatch();

    const recentMedia = useSelector(selectRecentSongs);

    const results = useSelector(selectSearchResults);

    const loading = useSelector(selectLoadingMusicState);

    const loadingRecentSongs = useSelector(selectLoadingRecentSongs);
    
    React.useEffect(() => {

        if (recentMedia.length > 0) return;

        if (loadingRecentSongs) return;
        
        dispatch(fetchRecentSongs());

    }, [loadingRecentSongs, recentMedia])

    const handleSearch = () => {
        if (loading || loadingRecentSongs) return;

        if (query.length < 1) return;

        dispatch(searchMedia(query));

    }

    const handleEnter = (code) => {
        if (code === 13) {
            handleSearch();
        }
    }
console.log(results)
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
                        return <Song author={song.author} url={song.id} altSong={true} data={song} duration={song.duration} name={song.title} image={song.thumbnail}  />
                    })
                : 
                recentMedia.map(song => {
                    return <Song author={song.author} url={song.id} altSong={true} data={song} duration={song.duration} name={song.title} image={song.thumbnail}  />
                })
                }
                <Loading loading={loading || loadingRecentSongs} />
            </div>
        </div>
    )
}
