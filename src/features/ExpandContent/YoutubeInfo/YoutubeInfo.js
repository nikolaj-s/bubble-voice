import React from 'react'

import "./YoutubeInfo.css";
import { TextInput } from '../../../components/inputs/TextInput/TextInput';
import { useSelector } from 'react-redux';
import { selectPrimaryColor, selectTextColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { YoutubeNav } from './YoutubeNav/YoutubeNav';
import { selectCurrentChannelId } from '../../server/ServerSlice';

export const YoutubeInfo = ({data}) => {

    const [meta, setMeta] = React.useState({});

    React.useEffect(() => {
        if (data) {
            setMeta(data);
        }
    }, [data])

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    return (
        <div 
        style={{backgroundColor: primaryColor}}
        className='youtube-info-container'>
            <YoutubeNav song={meta} artist={meta.channel ? meta.channel.name : meta.author} thumbnail={meta.channel ? meta.channel.thumbnail : meta.thumbnail} />
            {meta.title ?
            <>
            <div className='youtube-info-nav-wrapper'>
            <h2 style={{color: textColor}}>{meta.title}</h2>
            </div>
            <p style={{color: textColor}}>{meta.description}</p>
            </>
            : null}
        </div>
    )
}
