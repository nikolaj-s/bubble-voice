import React from 'react'

import "./SocialFilterMenu.css";
import { useDispatch, useSelector } from 'react-redux';
import { selectGlassColor, selectGlassPrimaryColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { clearFilteredResults, fetchFilteredMessages, selectFilterMenuOpen, selectFilteredMessageResults, selectLoadingFilteredMessages, toggleFilterMenu } from '../../features/server/SocialSlice';
import {FilterIcon} from '../Icons/FilterIcon/FilterIcon';
import { InputTitle } from '../titles/inputTitle/InputTitle';
import { RadioButton } from '../buttons/RadioButton/RadioButton';
import { TextButton } from '../buttons/textButton/TextButton';
import { CalenderIcon } from '../Icons/CalenderIcon/CalenderIcon';
import { selectChannelSocialId, selectCurrentChannelId, selectCurrentlyViewChannelSocial, selectServerMembers } from '../../features/server/ServerSlice';
import { Loading } from '../LoadingComponents/Loading/Loading';
import { Message } from '../Message/Message';
import { ProfileIcon } from '../Icons/ProfileIcon/ProfileIcon';
import { TextInput } from '../inputs/TextInput/TextInput';

export const SocialFilterMenu = () => {

    const dispatch = useDispatch();

    const [date, setDate] = React.useState('Default');

    const [mediaType, setMediaType] = React.useState('all');

    const [user, setUser] = React.useState({display_name: "Anyone", username: '*'});

    const [currentChannel, setCurrentChannel] = React.useState("");

    const [selectUserMenu, toggleSelectUserMenu] = React.useState(false);

    const [query, setQuery] = React.useState("");

    const glassColor = useSelector(selectGlassColor);

    const primaryColor = useSelector(selectGlassPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const filterMenuOpen = useSelector(selectFilterMenuOpen);

    const textColor = useSelector(selectTextColor);

    const socialId = useSelector(selectChannelSocialId);

    const inChannel = useSelector(selectCurrentChannelId);

    const loading = useSelector(selectLoadingFilteredMessages);

    const results = useSelector(selectFilteredMessageResults);

    const users = useSelector(selectServerMembers);

    const socialChannel= useSelector(selectCurrentlyViewChannelSocial);

    const handleCloseFilterMenu = () => {
        dispatch(toggleFilterMenu(false));
    }

    const openDatePicker = () => {
        document.getElementById('social-filter-date-picker').showPicker();
    }

    const newDate = (e) => {
        console.log(e.target.value)
        if (!e.target.value) {
            return setDate("Default");
        }

        setDate(e.target.value);
    }

    React.useEffect(() => {

        if (socialId !== currentChannel && inChannel !== currentChannel) {
            clearState();
        }

        if (socialId) {
            setCurrentChannel(socialId) 
        } else {
            setCurrentChannel(inChannel)
        }

    }, [inChannel, socialId, filterMenuOpen])

    const handleSearch = () => {
        if (loading) return;

        if (!currentChannel) return;

        const filterData = {
            date: date === 'default' ? null : date,
            mediaType: mediaType,
            username: user.username,
            query: query
        }
        
        dispatch(fetchFilteredMessages({channel_id: currentChannel, filter: filterData}));
    }

    const pinMessage = () => {

    }

    const pinToProfile = () => {

    }

    const handleSelectUser = (state) => {
        setUser(state);
        toggleSelectUserMenu(false);
    }

    const clearState = () => {
        setMediaType("all");
        setUser({display_name: "Anyone", username: "*"});
        setDate("Default");
        dispatch(clearFilteredResults());
        setQuery("");
    }

    return (
        <>
        {filterMenuOpen ?
        <div 
        onKeyDown={(e) => {e.stopPropagation()}}
        onClick={handleCloseFilterMenu}
        className='social-filter-outer-container'>
            <div 
            onClick={(e) => {e?.stopPropagation()}}
            style={{backgroundColor: secondaryColor}}
            className='social-filter-container'>
                
                <InputTitle title={'From:'} />
                <TextButton action={openDatePicker} name={date} icon={<CalenderIcon width={20} height={16} />} />
                <input value={date === 'Default' ? "" : date}  onChange={newDate} style={{height: 0, width: 0, opacity: 0}} id={'social-filter-date-picker'} type='date' max={new Date().toISOString().split("T")[0]} />
                <InputTitle title={"Includes Text:"} />
                <TextInput inputValue={query} action={(v) => {setQuery(v)}} placeholder={"Keywords"} />
                {socialChannel?.type === 'mediahistory' ? null :
                <>
                <InputTitle title={"Media Type:"} />
                <RadioButton action={() => {setMediaType('all')}} state={mediaType === 'all'} name="All" />
                <RadioButton action={() => {setMediaType('image')}} state={mediaType === 'image'} name="Image" />
                <RadioButton action={() => {setMediaType("link")}} state={mediaType === 'link'} name="Link" />
                <RadioButton action={() => {setMediaType('screenshot')}} state={mediaType === 'screenshot'} name="Screenshot" />
                <RadioButton action={() => {setMediaType('video')}} state={mediaType === 'video'} name="Video" />
                </>
                }
                <InputTitle title={"Posted By:"} />
                <TextButton action={() => {toggleSelectUserMenu(!selectUserMenu)}} name={user.display_name} icon={user.username !== '*' ? 
                <div style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginLeft: 10
                }}>
                    <img style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                       
                    }} src={user?.user_image} />
                </div>
                : <ProfileIcon width={20} height={16} />} />
                <div className='social-filter-confirmation'>
                    <h3 onClick={clearState} style={{color: textColor}}>Clear</h3>
                    <TextButton action={handleSearch} textAlign='center' width={85} name={'Confirm'} />
                </div>
                <InputTitle title={"Results:"} />
                <div 
                style={{backgroundColor: primaryColor}}
                className='filtered-results-container'>
                    {results.length === 0 ?
                    <div className='no-filterd-results-container'>
                        <h3
                        style={{color: textColor}}
                        >No Results</h3>
                    </div>
                    : 
                    results.map((message, key) => {
                        return (
                            <Message activity_feed={true} pin_to_profile={pinToProfile} dashboard={true} direct_message={false} persist={true} current_message={message} previous_message={key === results?.length - 1 ? null : results[key - 1]} pinned={message?.pinned} pinMessage={() => {pinMessage(message)}} perm={false} channel_id={message?.channel_id} id={message._id} message={message.content} key={message._id || message.content.local_id} />
                        )
                    })
                    }
                </div>
                {selectUserMenu ? 
                <div 
                style={{backgroundColor: secondaryColor}}
                className='select-filter-state-menu-container'>
                    <RadioButton name={'Anyone'} state={user.username === '*'} action={() => {handleSelectUser({display_name: "Anyone", username: "*"})}} />
                    {users.map(u => {
                        console.log(u)
                        return <RadioButton image={u.user_image} name={u.display_name} state={u.username === user.username} action={() => {handleSelectUser(u)}} />
                    })}
                </div>
                : null}
                <Loading loading={loading} />
            </div>
        </div>
        : null}
        </>
    )
}
