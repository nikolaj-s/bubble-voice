// library's
import React from 'react';
import { AnimatePresence, motion, useAnimation} from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

// state
import { createCategory, createChannel, selectCreateChannelMenuState, selectServerChannels, selectServerMembers, selectServerOwner, toggleCreateChannelMenu } from '../../ServerSlice';
import { selectGlassColor, selectPrimaryColor, selectSecondaryColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// components
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { TextInput } from '../../../../components/inputs/TextInput/TextInput';
import { ApplyCancelButton } from '../../../../components/buttons/ApplyCancelButton/ApplyCancelButton';
import { ToggleButton } from '../../../../components/buttons/ToggleButton/ToggleButton';
import { RadioButton } from '../../../../components/buttons/RadioButton/RadioButton'
import { InputPlaceHolder } from '../../../../components/titles/InputPlaceHolder/InputPlaceHolder';
// style
import "./CreateChannelMenu.css";
import { SettingsHeader } from '../../../../components/titles/SettingsHeader/SettingsHeader';
import { selectUsername } from '../../../settings/appSettings/accountSettings/accountSettingsSlice';
import { AddSubRedditMenu } from '../../serverSettings/OverView/AddSubRedditMenu/AddSubRedditMenu';

export const CreateChannelMenu = () => {

    const [channelName, setChannelName] = React.useState("");

    const [persist, togglePersist] = React.useState(false);

    const [lock, toggleLock] = React.useState(false);

    const [authUsers, setAuthUsers] = React.useState([]);

    const [type, setChannelType] = React.useState('voice');

    const [mediaState, setMediaState] = React.useState('');

    const [screenShotChannelExists, toggleScreenShotChannel] = React.useState(false);

    const [mediahistoryExists, toggleMediaHistoryExists] = React.useState(false);

    const username = useSelector(selectUsername);

    const serverOwner = useSelector(selectServerOwner);

    const channels = useSelector(selectServerChannels);

    const dispatch = useDispatch();

    const animation = useAnimation();

    const primaryColor = useSelector(selectPrimaryColor);

    const glassColor = useSelector(selectGlassColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const open = useSelector(selectCreateChannelMenuState);

    const members = useSelector(selectServerMembers);

    React.useEffect(() => {

        for (const c of channels) {
            if (c.type === 'screenshots') {
                toggleScreenShotChannel(true);
            }
            if (c.type === 'mediahistory') {
                toggleMediaHistoryExists(true);
            }
        }

    // eslint-disable-next-line
    }, [open])

    const handleTogglePersist = () => {
        togglePersist(!persist);
    }

    const handleChannelNameInput = (value) => {
        if (value.includes('/')) return;

        setChannelName(value);
    }

    const handleCancel = () => {
        dispatch(toggleCreateChannelMenu(false));
    }

    const handleLockChannel = () => {

        toggleLock(!lock);
    
    }

    const create = () => {

        if (type === "category") {
            dispatch(createCategory({category_name: channelName}));
        } else {
            dispatch(createChannel({channel_name: channelName, persist_social: type === 'text' ? true : persist, locked_channel: lock, auth_users: authUsers, text_only: type !== 'voice', type: type, mediaState: mediaState}));
        }

        setChannelName("");

        setChannelType("voice");
        
    }

    const addAuthUser = (id) => {

        let currentAuthUsers = [...authUsers];

        if (currentAuthUsers.findIndex(i => i === id) !== -1) {
            currentAuthUsers = currentAuthUsers.filter(u => u !== id);
        } else {
            currentAuthUsers.push(id);
        }

        setAuthUsers(currentAuthUsers);

    }

    const toggleChannelType = (type) => {
        
        if (type === 'screenshots') {
            setChannelName("Screenshots");
        }

        if (type === 'mediahistory') {
            setChannelName("Media Player History")
        }

        setChannelType(type);
    }

    const handleSetRedditState = (value) => {
        setChannelName(value.title.split('/')[1]);
        setMediaState(value.url);
    }

    return (
        <AnimatePresence>
            {open ? 
            <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={handleCancel}
            key="create-channel-menu"
            style={{backgroundColor: glassColor}}
             className='create-channel-menu-container'>
                <motion.div 
                onClick={(e) => {e.stopPropagation()}}
                initial={{scale: 0.2}}
                animate={{scale: 1}}
                exit={{scale: 0.2}}
                style={{backgroundColor: secondaryColor,}} className='create-channel-inner-menu-container'>
                    <SettingsHeader title={type === 'category' ? "Create Category" : "Create Channel"} />
                    <InputTitle title={type === 'category' ? "Category Name" : type === "subreddit" ? "Set Subreddit" : "Channel Name"} />
                    {type === 'mediahistory' ?
                    <InputPlaceHolder value={channelName} /> :
                    type === "screenshots" ?
                    <InputPlaceHolder value={"Screenshots"} />
                    : type === 'subreddit' ?
                    <>
                    {channelName ? <InputPlaceHolder value={channelName} /> : null}
                    <AddSubRedditMenu add={handleSetRedditState} />
                    </>
                    :
                    <TextInput marginBottom='3px' inputValue={channelName} action={handleChannelNameInput} placeholder={"Name"} />
                    }
                    <InputTitle title={"Type"} />
                    <RadioButton action={() => {toggleChannelType('voice')}} state={type === 'voice'} name={'Voice'} />
                    <RadioButton action={() => {toggleChannelType('text')}} state={type === 'text'} name={'Text'} />
                    {screenShotChannelExists ? null : <RadioButton action={() => {toggleChannelType('screenshots')}} state={type === 'screenshots'} name={"Screenshots"} />}
                    {mediahistoryExists ? null : <RadioButton name={"Media Player History"} state={type === 'mediahistory'} action={() => {toggleChannelType('mediahistory')}} />}
                    <RadioButton action={() => {toggleChannelType('subreddit')}} state={type === 'subreddit'} name={'Subreddit'} />
                    <RadioButton name={'Category'} action={() => {toggleChannelType('category')}} state={type === 'category'}  />
                    
                    {type === 'category' || type === 'mediahistory' ? null :
                    <>
                    <InputTitle title={"Lock Channel"} />
                    <ToggleButton action={handleLockChannel} state={lock} />
                    </>
                    }
                    {lock ?
                    <>
                    <InputTitle title={"Add Authorized Users"} />
                    <div className='auth-users-container'>
                       {members.filter(m => (m.username !== username && m.username !== serverOwner)).map((member, i) => {
                            return <RadioButton action={() => {addAuthUser(member._id)}} state={authUsers.findIndex(i => i === member._id) !== -1} name={member.display_name} />
                       })}
                    </div>
                    </>
                    : null}
                    <div className='create-channel-apply-cancel-wrapper'>
                        <ApplyCancelButton position='relative' toggled={channelName.length < 3 ? true : null} apply={create} cancel={handleCancel} name='Create' />
                    </div>   
                </motion.div>
            </motion.div> : null}
        </AnimatePresence>
        
    )
}

