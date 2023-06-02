// library's
import React from 'react';
import { useNavigate, useRoutes } from 'react-router';
import { AnimatePresence, motion, useAnimation} from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

// state
import { createChannel, selectCreateChannelMenuState, selectServerMembers, selectServerOwner, toggleCreateChannelMenu } from '../../ServerSlice';
import { selectPrimaryColor, selectSecondaryColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// components
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { TextInput } from '../../../../components/inputs/TextInput/TextInput';
import { ApplyCancelButton } from '../../../../components/buttons/ApplyCancelButton/ApplyCancelButton';
import { ToggleButton } from '../../../../components/buttons/ToggleButton/ToggleButton';
import { BoolButton } from '../../../../components/buttons/BoolButton/BoolButton';
import { RadioButton } from '../../../../components/buttons/RadioButton/RadioButton'

// style
import "./CreateChannelMenu.css";
import { SettingsHeader } from '../../../../components/titles/SettingsHeader/SettingsHeader';
import { selectDisableTransparancyEffects } from '../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { selectUsername } from '../../../settings/appSettings/accountSettings/accountSettingsSlice';



export const CreateChannelMenu = () => {

    const [channelName, setChannelName] = React.useState("");

    const [persist, togglePersist] = React.useState(false);

    const [lock, toggleLock] = React.useState(false);

    const [authUsers, setAuthUsers] = React.useState([]);

    const [type, setChannelType] = React.useState('voice');

    const username = useSelector(selectUsername);

    const serverOwner = useSelector(selectServerOwner);

    const dispatch = useDispatch();

    const animation = useAnimation();

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const open = useSelector(selectCreateChannelMenuState);

    const disableTransparancyEffects = useSelector(selectDisableTransparancyEffects);

    const members = useSelector(selectServerMembers);

    React.useEffect(() => {
        animation.start({
            left: 0
        })
    // eslint-disable-next-line
    }, [])

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

        setChannelName("");

        dispatch(createChannel({channel_name: channelName, persist_social: type === 'text' ? true : persist, locked_channel: lock, auth_users: authUsers, text_only: type === 'text'}));
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
        setChannelType(type);
    }

    return (
        <AnimatePresence>
            {open ? 
            <motion.div 
            onClick={handleCancel}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            key="create-channel-menu"
            style={{
                backgroundColor: disableTransparancyEffects ? primaryColor : `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0.8)`
            }}
             className='create-channel-menu-container'>
                <motion.div 
                onClick={(e) => {e.stopPropagation()}}
                initial={{scale: 0}}
                animate={{scale: 1}}
                exit={{scale: 0}}
                style={{backgroundColor: secondaryColor}} className='create-channel-inner-menu-container'>
                    <SettingsHeader title={"Create Channel"} />
                    <InputTitle title={"Channel Name"} />
                    <TextInput marginBottom='3px' inputValue={channelName} action={handleChannelNameInput} placeholder={"Name"} />
                    <RadioButton action={() => {toggleChannelType('voice')}} state={type === 'voice'} name={'Voice'} />
                    <RadioButton action={() => {toggleChannelType('text')}} state={type === 'text'} name={'Text'} />
                    {type === 'voice' ?
                    <>
                    <InputTitle title={"Persist Channel's Text Messages"} />
                    <ToggleButton state={persist} action={handleTogglePersist} />
                    </>
                    : null}
                    <InputTitle title={"Lock Channel"} />
                    <ToggleButton action={handleLockChannel} state={lock} />
                    {lock ?
                    <>
                    <InputTitle title={"Add Authorized Users"} />
                    <div className='auth-users-container'>
                       {members.filter(m => (m.username !== username && m.username !== serverOwner)).map((member, i) => {
                            return <BoolButton action={() => {addAuthUser(member._id)}} state={authUsers.findIndex(i => i === member._id) !== -1} name={member.display_name} />
                       })}
                    </div>
                    </>
                    : null}
                    <div className='create-channel-apply-cancel-wrapper'>
                        <ApplyCancelButton toggled={channelName.length < 3 ? true : null} apply={create} cancel={handleCancel} name='Create' />
                    </div>   
                </motion.div>
            </motion.div> : null}
        </AnimatePresence>
        
    )
}

