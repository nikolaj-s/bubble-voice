// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

// components
import { Image } from '../Image/Image'
import { Video } from '../Video/Video'

// state
import {  selectAccentColor, selectGlassPrimaryColor, selectGlassState, selectPrimaryColor, selectSecondaryColor, selectTextColor, selectTransparentPrimaryColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./Message.css";
import { setExpandedContent } from '../../features/ExpandContent/ExpandContentSlice';
import { Iframe } from '../Iframe/Iframe';
import { MessageLink } from './MessageLink/MessageLink';
import { MessageText } from './MessageText/MessageText';
import { SenderInfo } from './SenderInfo/SenderInfo';
import { setPanelPosition, setSelectedMember } from '../../features/server/ChannelRoom/MemberPanel/MemberPanelSlice';
import { selectServerMembers } from '../../features/server/ServerSlice';
import { DateSpacer } from './DateSpacer/DateSpacer';
import { GetTimeDifference } from '../../util/GetTimeDifference';
import { ProfileImage } from './ProfileImage/ProfileImage';
import { selectDisableNsfwBlur, selectHideLinksOnMedia, selectMaximizeMedia } from '../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

import { MessageGallery } from './MessageGallery/MessageGallery';
import { ProcessingIndicator } from './ProcessingIndicator/ProcessingIndicator';
import { UploadedFileShare } from './UploadedFileShare/UploadeFileShare';
import { LinkPreview } from './LinkPreview/LinkPreview';
import { NsfwImageOverlay } from '../Image/NsfwImageOverlay/NsfwImageOverlay';
import { ConvertTime } from '../../util/ConvertTime';

export const Message = ({activity_feed = false,dashboard = false, direct_message, message, overlay = false, id, channel_id, perm, pinMessage, pinned, index, previous_message, current_message, persist, pin_to_profile}) => {

    const dispatch = useDispatch();

    const [hoverState, setHoverState] = React.useState(false);

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

    const hideLinksOnMedia = useSelector(selectHideLinksOnMedia);

    const glassPrimary = useSelector(selectSecondaryColor);

    React.useEffect(() => {
        setUser(members.find(member => member.username === current_message.username));

        const local_date = new Date(current_message?.content?.date);

        const prev_local_date = new Date(previous_message?.content?.date);

        setTimeStamp(ConvertTime(local_date));
        
        setDate(local_date);

        setPrevDate(prev_local_date);

    }, [])

    const expandContent = (source) => {
        dispatch(setExpandedContent(source))
    }

    const hoverEffect = (e, bool) => {

        const el = document.getElementById(`${id}/${channel_id}`);

        const subMenu = document.getElementById(`${id}/${channel_id}-sub-menu`)

        const alt_time_stamp = document.getElementById(`alt-time-stamp-${id}`)

        if (el) {

            if (bool) {
                el.style.backgroundColor = glassPrimary;
            } else {
                el.style.backgroundColor = transparentColor;
            }
        }

        if (subMenu) {
            if (bool) {
                subMenu.style.opacity = 1;
            } else {
                subMenu.style.opacity = 0;
            }
        }

        if (alt_time_stamp) {
            if (bool) {
                alt_time_stamp.style.opacity = 0.5;
            } else {
                alt_time_stamp.style.opacity = 0;
            }
        }

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
                backgroundColor: transparentColor
            }}
            id={`${id}/${channel_id}`}
            className={`message-container ${direct_message ? 'direct-message-container' : null}`}>
               
                <ProfileImage timeStamp={timeStamp} prevDate={prevDate} date={date} activity={activity_feed} previous_message={previous_message} color={user?.color} current_message={current_message} profile_picture_shape={user?.profile_picture_shape} primaryColor={primaryColor} user_image={user?.user_image} action={openUserPanel} />
                <div className='message-inner-container'>
                    <div id={`${id}-ctx-message-overlay`} className={'ctx-message-overlay'} />
                    <SenderInfo date={date} prevDate={prevDate} submenuId={`${id}/${channel_id}-sub-menu`} activity={activity_feed} timeStamp={timeStamp} direct_message={direct_message} pin_to_profile={pin_to_profile} link={message?.link} color={user?.color} profile_picture_shape={user?.profile_picture_shape} primaryColor={primaryColor} display_name={user?.display_name} user_image={user?.user_image} action={openUserPanel} persist={persist} id={id} accentColor={accentColor} hover={hoverState} textColor={textColor} perm={perm} index={index}  message={message} current_message={current_message} previous_message={previous_message} pinMessage={pinMessage} pinned={pinned} overlay={overlay} />
                    {message?.emoji ?
                    <h2 className='emoji-reaction-mesage'>{message.emoji}</h2>
                    : null}
                    <MessageText loading={message.loading} style={message.textStyle} color={textColor} text={message.text} />
                    {(message.image || message.video || message.iFrame) || message.gallery ? null : <MessageLink link={message.link} />
                    }
                    {message.link_preview ?
                    <LinkPreview expand={expandContent} data={message.link_preview} />
                    : null}
                    <div className='message-content-wrapper'>
                            <Iframe marginRight={5}  link={message.iFrame} />
                            <MessageGallery gallery={message.gallery} expand={expandContent} />
                            {message.video_upload ?
                            <UploadedFileShare video={message.video_upload} />
                            : null}
                            {message.image && message.loading ?
                            <ProcessingIndicator />
                            :
                            message.image && !message.gallery ? 
                            <div 
                            style={{maxHeight: (activity_feed && message?.text?.includes('channel')) ? 40 :  activity_feed && !current_message.screen_shot ? 80 : maximizeMediaSize ? '100%' : 350,
                            marginTop: message.link ? 4 : null,
                            width: (activity_feed && message?.text?.includes('channel')) ? 40 : null,
                            height: (activity_feed && message?.text?.includes('channel')) ? 40 : null,
                            borderRadius: (activity_feed && message?.text?.includes('channel')) ? '50%' : null 
                            }}
                            className='message-image-container'>
                                <Image alt_image={message?.fall_back_image} loadingState='eager' nsfw={current_message.nsfw} borderRadius={(activity_feed && message?.text?.includes('channel')) ? '50%' : 20} minLoadHeight={'50px'} altHeight={activity_feed && !current_message.screen_shot ? 80 :
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
                            {current_message.nsfw && !disableNsfwBlur && !message.image ?
                            <NsfwImageOverlay height='calc(100%)' borderRadius={10} /> :
                            null}
                    </div>
                </div> 
            </div>
            {(prevDate?.getDate() !== date?.getDate()) && dashboard === false && current_message?.content?.date?.split("T")[0] ?
            <DateSpacer d={date} />
            : null}
        </>
    )
}
