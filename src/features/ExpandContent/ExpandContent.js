// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// components
import { Image } from '../../components/Image/Image';

// state
import { selectChannelInfoExpanded, selectExpandedContent, selectIframeExpanded, selectRedditExpanded, selectVideoStartTime, selectYouTubeExpand, setExpandedContent } from './ExpandContentSlice'

// style
import "./ExpandContent.css";
import { selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Video } from '../../components/Video/Video';
import { Iframe } from '../../components/Iframe/Iframe';
import { selectDisableTransparancyEffects } from '../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { RedditPost } from '../../components/RedditPost/RedditPost';
import { CopyButton } from '../../components/buttons/CopyButton/CopyButton';
import { DownloadButton } from '../../components/buttons/DownloadButton/DownloadButton';
import { SaveButton } from '../../components/buttons/SaveButton/SaveButton';
import { saveMedia, selectSavedMedia } from '../SavedMedia/SavedMediaSlice';
import YouTube from 'react-youtube';

export const ExpandContent = () => {

    const dispatch = useDispatch();

    const [saved, toggleSaved] = React.useState(false);

    const savedMedia = useSelector(selectSavedMedia);

    const iframe = useSelector(selectIframeExpanded);

    const reddit = useSelector(selectRedditExpanded);

    const expandedContent = useSelector(selectExpandedContent);

    const secondaryColor = useSelector(selectSecondaryColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const disableTransparancyEffects = useSelector(selectDisableTransparancyEffects);

    const videoStartTime = useSelector(selectVideoStartTime);

    const youtube = useSelector(selectYouTubeExpand);

    const channelInfo = useSelector(selectChannelInfoExpanded);

    const closeExpanded = () => {
        dispatch(setExpandedContent(false));
    }

    const excapeExpanded = (e) => {
        if (e.key === 'Escape') {

            closeExpanded();

        }
    }

    const handleCopy = () => {
        try {

            const { clipboard } = window.require('electron');

            clipboard.writeText(expandedContent);

        } catch (e) {
            return;
        }
    }

    const handleDownload = () => {
        try {
            const ipcRenderer = window.require('electron').ipcRenderer;

            ipcRenderer.send("download", {url: expandedContent});
        } catch (error) {
            window.open(expandedContent)
        }
    }

    const handleSave = () => {
        
        dispatch(saveMedia({media: expandedContent, type: expandedContent.includes('.mp4') ? 'video' : 'image'}))
    }

    React.useEffect(() => {

        const s = savedMedia.findIndex(m => m.media === expandedContent);

        toggleSaved(s !== -1);

    }, [expandedContent, savedMedia])

    React.useEffect(() => {

        document.addEventListener('keyup', excapeExpanded);
        
        return () => {
            document.removeEventListener('keyup', excapeExpanded);
        }
    // eslint-disable-next-line
    }, [])

    return (
        <>
        {expandedContent ? 
        <div 
        style={{
            backgroundColor: disableTransparancyEffects ? secondaryColor : `rgba(${secondaryColor.split('(')[1]?.split(')')[0]}, 0.9)`
        }}
        onClick={closeExpanded} className='expanded-content-container'>
            <div 
            style={{
                opacity: 1
            }}
            className='close-settings-container'>
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.7905 25L18.3717 20.5813C18.0871 20.2866 17.9296 19.8919 17.9332 19.4822C17.9367 19.0725 18.1011 18.6806 18.3908 18.3909C18.6805 18.1012 19.0723 17.9369 19.482 17.9333C19.8917 17.9298 20.2864 18.0873 20.5811 18.3719L24.9998 22.7906L29.4186 18.3719C29.5627 18.2226 29.7351 18.1036 29.9258 18.0217C30.1164 17.9398 30.3214 17.8967 30.5289 17.8949C30.7364 17.8931 30.9421 17.9327 31.1341 18.0112C31.3262 18.0898 31.5006 18.2058 31.6473 18.3525C31.794 18.4992 31.9101 18.6737 31.9886 18.8657C32.0672 19.0577 32.1067 19.2635 32.1049 19.4709C32.1031 19.6784 32.06 19.8834 31.9781 20.0741C31.8962 20.2647 31.7772 20.4371 31.628 20.5813L27.2092 25L31.628 29.4188C31.7772 29.5629 31.8962 29.7353 31.9781 29.9259C32.06 30.1166 32.1031 30.3216 32.1049 30.5291C32.1067 30.7365 32.0672 30.9423 31.9886 31.1343C31.9101 31.3263 31.794 31.5008 31.6473 31.6475C31.5006 31.7942 31.3262 31.9102 31.1341 31.9888C30.9421 32.0674 30.7364 32.1069 30.5289 32.1051C30.3214 32.1033 30.1164 32.0602 29.9258 31.9783C29.7351 31.8964 29.5627 31.7774 29.4186 31.6281L24.9998 27.2094L20.5811 31.6281C20.2864 31.9128 19.8917 32.0702 19.482 32.0667C19.0723 32.0631 18.6805 31.8988 18.3908 31.6091C18.1011 31.3194 17.9367 30.9275 17.9332 30.5178C17.9296 30.1081 18.0871 29.7134 18.3717 29.4188L22.7905 25Z" fill={textColor} />
                <path d="M25 43.75C27.4623 43.75 29.9005 43.265 32.1753 42.3227C34.4502 41.3805 36.5172 39.9993 38.2583 38.2583C39.9993 36.5172 41.3805 34.4502 42.3227 32.1753C43.265 29.9005 43.75 27.4623 43.75 25C43.75 22.5377 43.265 20.0995 42.3227 17.8247C41.3805 15.5498 39.9993 13.4828 38.2583 11.7417C36.5172 10.0006 34.4502 8.61953 32.1753 7.67726C29.9005 6.73498 27.4623 6.25 25 6.25C20.0272 6.25 15.2581 8.22544 11.7417 11.7417C8.22544 15.2581 6.25 20.0272 6.25 25C6.25 29.9728 8.22544 34.7419 11.7417 38.2583C15.2581 41.7746 20.0272 43.75 25 43.75V43.75ZM25 46.875C19.1984 46.875 13.6344 44.5703 9.53204 40.468C5.42968 36.3656 3.125 30.8016 3.125 25C3.125 19.1984 5.42968 13.6344 9.53204 9.53204C13.6344 5.42968 19.1984 3.125 25 3.125C30.8016 3.125 36.3656 5.42968 40.468 9.53204C44.5703 13.6344 46.875 19.1984 46.875 25C46.875 30.8016 44.5703 36.3656 40.468 40.468C36.3656 44.5703 30.8016 46.875 25 46.875Z" fill={textColor} />
                </svg>
            <p
            style={{color: textColor}}
            >ESC</p>
            </div>
            <div className='content-expanded-inner-container'>
                {channelInfo ?
                <div 
                style={{backgroundColor: primaryColor}}
                className='channel-info-expanded-container'>
                    <h1 style={{color: textColor}}>#{expandedContent?.channel_name}</h1>
                    <p style={{color: textColor}}>{expandedContent?.guidelines}</p>
                </div>
                 :
                youtube ?
                
                <YouTube 
                opts={{
                    
                    height: 450,
                    width: 800,
                    playerVars: {
                        fs: 0,
                        autoplay: 1,
                        enablejsapi: 1,
                        controls: 1,
                        modestbranding: 1,
                }}}
                style={{
                    width: 800,
                    height: 450,
                    maxHeight: 'calc(100% - 100px)'
                }}
                videoId={expandedContent.split(':')[1]} />
                
                :
                reddit ?
                <RedditPost data={expandedContent} /> :
                iframe ?
                <Iframe maxWidth={"90%"} link={iframe} />
                :
                expandedContent?.includes('.mp4') ?
                <Video height='auto' forceAutoPlay={true} video={expandedContent} currentTime={videoStartTime} /> 
                :        
                <Image altHeight='100vh' objectFit='contain' image={expandedContent} />}
            </div>
            {youtube || channelInfo ? null :
            <div onClick={(e) => {e.stopPropagation()}} style={{backgroundColor: primaryColor}} className='expanded-content-navigation-container'>                
                <CopyButton borderRadius={10} action={handleCopy} description={'Copy Link'} width={18} height={18} />
                <DownloadButton desc_width={60} align_desc_right={true} borderRadius={10} description={"Download"} action={handleDownload} margin={"5px 0"} width={18} height={18} />
                <SaveButton borderRadius={10} width={18} height={18} action={handleSave} description={saved ? "Unsave" : "Save"} />
            </div>}
        </div>
        : null}
        </>
    )
}
