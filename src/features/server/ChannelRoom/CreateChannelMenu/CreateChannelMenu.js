// library's
import React from 'react';
import { useNavigate, useRoutes } from 'react-router';
import { AnimatePresence, motion, useAnimation} from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

// state
import { createChannel, selectCreateChannelMenuState, toggleCreateChannelMenu } from '../../ServerSlice';
import { selectPrimaryColor, selectSecondaryColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// components
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { TextInput } from '../../../../components/inputs/TextInput/TextInput';
import { ApplyCancelButton } from '../../../../components/buttons/ApplyCancelButton/ApplyCancelButton';
import { ToggleButton } from '../../../../components/buttons/ToggleButton/ToggleButton';

// style
import "./CreateChannelMenu.css";
import { SettingsHeader } from '../../../../components/titles/SettingsHeader/SettingsHeader';



export const CreateChannelMenu = () => {

    const [channelName, setChannelName] = React.useState("")

    const [persist, togglePersist] = React.useState(false)

    const dispatch = useDispatch();

    const animation = useAnimation();

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const open = useSelector(selectCreateChannelMenuState);

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

    const create = () => {
        dispatch(createChannel({channel_name: channelName, persist_social: persist}));
    }

    return (
        <AnimatePresence>
            {open ? 
            <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            key="create-channel-menu"
            style={{
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0.8)`
            }}
             className='create-channel-menu-container'>
                <motion.div 
                initial={{scale: 0}}
                animate={{scale: 1}}
                exit={{scale: 0}}
                style={{backgroundColor: secondaryColor}} className='create-channel-inner-menu-container'>
                    <SettingsHeader title={"Create Channel"} />
                    <InputTitle title={"Channel Name"} />
                    <TextInput inputValue={channelName} action={handleChannelNameInput} placeholder={"Name"} />
                    <InputTitle title={"Persist Channel's Text Messages"} />
                    <ToggleButton state={persist} action={handleTogglePersist} />
                    <ApplyCancelButton apply={create} cancel={handleCancel} name='Create' />
                </motion.div>
            </motion.div> : null}
        </AnimatePresence>
        
    )
}

