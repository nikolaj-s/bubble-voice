// library's
import React from 'react';
import { useNavigate, useRoutes } from 'react-router';
import { motion, useAnimation} from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

// state
import { createChannel } from '../../ServerSlice';
import { selectSecondaryColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// components
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { TextInput } from '../../../../components/inputs/TextInput/TextInput';
import { ApplyCancelButton } from '../../../../components/buttons/ApplyCancelButton/ApplyCancelButton';
import { ToggleButton } from '../../../../components/buttons/ToggleButton/ToggleButton';

// style
import "./CreateChannelMenu.css";



export const Menu = () => {

    const [channelName, setChannelName] = React.useState("")

    const [persist, togglePersist] = React.useState(false)

    const dispatch = useDispatch();

    const animation = useAnimation();

    const navigate = useNavigate();

    const secondaryColor = useSelector(selectSecondaryColor);

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
        setChannelName(value);
    }

    const handleCancel = () => {
        navigate(window.location.hash.split('/create-channel-menu')[0].split('#')[1])
    }

    const create = () => {
        dispatch(createChannel({channel_name: channelName, persist_social: persist}));
    }

    return (
        <motion.div 
        style={{
            backgroundColor: secondaryColor
        }}
        animate={animation} initial={{left: '100%'}} className='create-channel-menu-container'>
            <div className='create-channel-inner-menu-container'>
                <InputTitle title={"Channel Name"} />
                <TextInput inputValue={channelName} action={handleChannelNameInput} placeholder={"Name"} />
                <InputTitle title={"Persist Channel's Text Messages"} />
                <ToggleButton state={persist} action={handleTogglePersist} />
                <ApplyCancelButton apply={create} cancel={handleCancel} name='Create' />
            </div>
        </motion.div>
    )
}


export const CreateChannelMenu = () => useRoutes([
    { path: "/create-channel-menu", element: <Menu />},
    { path: "/channel/:id/create-channel-menu", element: <Menu />}
])

