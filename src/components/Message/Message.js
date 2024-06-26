// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

// components
import { Image } from '../Image/Image'
import { Video } from '../Video/Video'
import { Song } from '../widgets/Widgets/MusicWIdget/Song/Song';

// state
import {  selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor, selectTransparentPrimaryColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./Message.css";
import { setExpandedContent, setMetaData } from '../../features/ExpandContent/ExpandContentSlice';
import { Iframe } from '../Iframe/Iframe';
import { MessageLink } from './MessageLink/MessageLink';
import { MessageText } from './MessageText/MessageText';
import { SenderInfo } from './SenderInfo/SenderInfo';
import { setPanelPosition, setSelectedMember } from '../../features/server/ChannelRoom/MemberPanel/MemberPanelSlice';
import { selectCurrentChannelId, selectServerMembers } from '../../features/server/ServerSlice';
import { DateSpacer } from './DateSpacer/DateSpacer';
import { ProfileImage } from './ProfileImage/ProfileImage';
import { selectDisableNsfwBlur, selectMaximizeMedia } from '../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

import { MessageGallery } from './MessageGallery/MessageGallery';
import { ProcessingIndicator } from './ProcessingIndicator/ProcessingIndicator';
import { UploadedFileShare } from './UploadedFileShare/UploadeFileShare';
import { LinkPreview } from './LinkPreview/LinkPreview';
import { ConvertTime } from '../../util/ConvertTime';
import { RedditPost } from '../RedditPost/RedditPost';
import { handleAddingMedia, selectLoadingMusicState } from '../../features/server/ChannelRoom/Room/Music/MusicSlice';

import { VideoCard } from '../VideoCard/VideoCard';

export const Message = ({pinned_to_profile_state, activity_feed = false,dashboard = false, direct_message, message, overlay = false, id, channel_id, perm, pinMessage, pinned, index, previous_message, current_message, persist, pin_to_profile}) => {

    const dispatch = useDispatch();

    const [hoverState, toggleHoverState] = React.useState(false);

    const [user, setUser] = React.useState({});

    const [timeStamp, setTimeStamp] = React.useState("");

    const [date, setDate] = React.useState(new Date());

    const [prevDate, setPrevDate] = React.useState(new Date());

    const textColor = useSelector(selectTextColor);

    const disableNsfwBlur = useSelector(selectDisableNsfwBlur);

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const transparentColor = useSelector(selectTransparentPrimaryColor);

    const members = useSelector(selectServerMembers);

    const maximizeMediaSize = useSelector(selectMaximizeMedia);

    const currentChannelId = useSelector(selectCurrentChannelId);

    const glassPrimary = useSelector(selectSecondaryColor);

    const loadingAddingSong = useSelector(selectLoadingMusicState);

    React.useEffect(() => {
        setUser(members.find(member => member.username === current_message.username));

        const local_date = new Date(current_message?.content?.date);

        const prev_local_date = new Date(previous_message?.content?.date);

        setTimeStamp(ConvertTime(local_date));
        
        setDate(local_date);

        setPrevDate(prev_local_date);

    }, [previous_message, current_message])

    const expandContent = (source) => {
        dispatch(setExpandedContent(source));

        if (current_message?.content?.media_meta_data) {
            dispatch(setMetaData(current_message?.content?.media_meta_data))
        }

        
    }

    const hoverEffect = (e, bool) => {

        toggleHoverState(bool);

    }

    const handleAddToQueue = () => {
        if (!message.song) return;

        if (loadingAddingSong) return;

        dispatch(handleAddingMedia({query: false, song: message.song}))
    }

    const openUserPanel = (e) => {
    
        dispatch(setSelectedMember(current_message.username));

        dispatch(setPanelPosition({y: (e.view.innerHeight - 600) < 0 ? 30 : e.pageY, x: e.pageX, origin: e.view.innerHeight - 600 < 0 ? false : (e.view.innerHeight - e.pageY) < 500 ? true : false, left: 330}));
    
    }

    return (
        <>
            <div onMouseOut={(e) => {hoverEffect(e, false)}} onMouseOver={(e) => {hoverEffect(e, true)}}
            style={{
                padding: overlay ? null : '0px 5px 0px 0px',
                backgroundColor: hoverState ? glassPrimary : transparentColor
            }}
            id={`${id}/${channel_id}`}
            className={`message-container ${direct_message ? 'direct-message-container' : null}`}>
               
                <ProfileImage gifFrame={user?.user_image_gif_frame} decoration={user?.decoration} pinned_to_profile_state={pinned_to_profile_state} hover={hoverState} timeStamp={timeStamp} prevDate={prevDate} date={date} activity={activity_feed} previous_message={previous_message} color={user?.color} current_message={current_message} profile_picture_shape={user?.profile_picture_shape} primaryColor={primaryColor} user_image={user?.user_image} action={openUserPanel} />
                <div className='message-inner-container' style={{width: pinned_to_profile_state ? '100%' : null}}>
                    <div id={`${id}-ctx-message-overlay`} className={'ctx-message-overlay'} />
                    <SenderInfo date={date} prevDate={prevDate} submenuId={`${id}/${channel_id}-sub-menu`} activity={activity_feed} timeStamp={timeStamp} direct_message={direct_message} pin_to_profile={pin_to_profile} link={message?.link} color={user?.color} profile_picture_shape={user?.profile_picture_shape} primaryColor={primaryColor} display_name={user?.display_name} user_image={user?.user_image} action={openUserPanel} persist={persist} id={id} accentColor={accentColor} hover={hoverState} textColor={textColor} perm={perm} index={index}  message={message} current_message={current_message} previous_message={previous_message} pinMessage={pinMessage} pinned={pinned} overlay={overlay} />
                    {message?.emoji ?
                    <h2 className='emoji-reaction-mesage'>{message.emoji}</h2>
                    : null}
                    {(current_message?.song && pinned_to_profile_state) ? null :
                    (previous_message?.username === current_message?.username) && (previous_message?.song && current_message?.song) && (prevDate?.getDate() === date?.getDate()) ? null :
                    <MessageText loading={message.loading} style={message.textStyle} color={textColor} text={message.text} />
                    }
                    {(message.image || message.video || message.iFrame || message.reddit) || message.gallery ? null : <MessageLink link={message.link} />
                    }
                    {message.link_preview && !message.media_video ?
                    <LinkPreview expand={expandContent} data={message.link_preview} />
                    : null}
                    <div className='message-content-wrapper'>
                            {message?.media_video?.url ?
                            <VideoCard message={true} data={message.media_video}  />
                            : null}
                            {message.song ?
                            <Song data={message.song} profile_pin={pinned_to_profile_state} url={message?.song?.id} addToQueue={handleAddToQueue} in_channel={currentChannelId} in_social={true} name={message.song.title} duration={message.song.duration} image={message.song.thumbnail} author={message.song.author}  />
                            : null}
                            {message.reddit ?
                            <RedditPost action={expandContent} inSocial={true} data={message.reddit} />
                            : null}
                            {message.media_video ? null : <Iframe maxWidth={550} marginRight={5}  link={message.iFrame} />}
                            <MessageGallery gallery={message.gallery} expand={expandContent} />
                            {message.video_upload ?
                            <UploadedFileShare video={message.video_upload} />
                            : null}
                            {message.image && message.loading ?
                            <ProcessingIndicator />
                            :
                            message.image && !message.gallery ? 
                            <div 
                            style={{maxHeight: maximizeMediaSize ? '100%' : 350,
                            marginTop: message.link ? 4 : null,
                            width: (activity_feed && message?.text?.includes('channel')) ? 40 : null,
                            height: (activity_feed && message?.text?.includes('channel')) ? 40 : null,
                            borderRadius: (activity_feed && message?.text?.includes('channel')) ? '50%' : null 
                            }}
                            className='message-image-container'>
                               
                                <Image alt_image={message?.fall_back_image} loadingState='eager' nsfw={current_message.nsfw} borderRadius={20} minLoadHeight={'50px'} altHeight={
                                    maximizeMediaSize ? '100%' : 350}  expandContent={expandContent} imgHeight={!activity_feed && !maximizeMediaSize ? 'auto' : 'auto'} cursor='pointer' width={null} altWidth={'100%'} objectFit='contain' image={message.image} />
                                
                            </div>
                            : null}
                            {message.video ? 
                            <div 
                            style={{maxHeight: maximizeMediaSize ? '100%' : 350}}
                            className='message-outer-video-container'>
                                <Video maxHeight={maximizeMediaSize ? '100%' : 350} id={message.local_id} video={message.video} />
                            </div>
                            : null}
                    </div>
                </div> 
            </div>
            {(prevDate?.getDate() !== date?.getDate()) && dashboard === false && current_message?.content?.date?.split("T")[0] ?
            <DateSpacer d={date} />
            : null}
        </>
    )
}
