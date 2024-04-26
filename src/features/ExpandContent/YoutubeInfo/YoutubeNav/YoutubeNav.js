import React from 'react'
import { CopyButton } from '../../../../components/buttons/CopyButton/CopyButton'
import { OpenLinkButton } from '../../../../components/buttons/OpenLinkButton/OpenLinkButton'
import { AddButton } from '../../../../components/buttons/AddButton/AddButton'
import { Image } from '../../../../components/Image/Image'
import { useDispatch, useSelector } from 'react-redux'
import { selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { selectCurrentChannelId } from '../../../server/ServerSlice'
import { handleAddingMedia, selectLoadingMusicState } from '../../../server/ChannelRoom/Room/Music/MusicSlice'

export const YoutubeNav = ({thumbnail, artist, song}) => {

    const dispatch = useDispatch();

    const textColor = useSelector(selectTextColor);
    
    const inChannel = useSelector(selectCurrentChannelId);

    const loading = useSelector(selectLoadingMusicState);

    const addToQueue = () => {
        if (loading) return;

        if (!song) return;

        dispatch(handleAddingMedia({query: false, song: song}));
    }

    const copy = () => {
        try {

            const { clipboard } = window.require('electron');

            clipboard.writeText(song.url);

        } catch (error) {
            console.log(error);
        }
    }
    
    const openVideo = (e) => {
        e.preventDefault();

        try {

            const ipcRenderer = window.require('electron').ipcRenderer;

            ipcRenderer.send("open-link", {url: song.url});

        } catch (err) {
            window.open(song.url)
        }
    }

    const openChannel = (e) => {
        e.preventDefault();

        if (!song.channel) return;

        try {

            const ipcRenderer = window.require('electron').ipcRenderer;

            ipcRenderer.send("open-link", {url: song.url});

        } catch (err) {
            window.open(song.url)
        }
    }

    return (
        <div className='youtube-nav-wrapper'>
            <div className='youtube-nav-author'>
                <div className='youtube-nav-thumbnail'>
                    <Image cursor='pointer' objectFit='cover' image={thumbnail} />
                </div>
                <h1 onClick={openChannel} style={{color: textColor}}>{artist}</h1>
            </div>
            <div className='youtube-nav-controls-wrapper'>
                <CopyButton action={copy} description={"Copy"} padding={6} width={16} height={16} />
                <OpenLinkButton action={openVideo} desc_width={80} description={"Open In Browser"} padding={6} width={16} height={16} />
                {inChannel && song?.url?.includes('youtu') ? <AddButton action={addToQueue} description={"Play In Channel"} padding={8} width={12} height={12} /> : null}
            </div>
        </div>
    )
}
