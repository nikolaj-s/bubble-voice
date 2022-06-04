// library's
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useRoutes } from 'react-router';

// component's
import { InputTitle } from '../../../components/titles/inputTitle/InputTitle';
import { TextInput } from '../../../components/inputs/TextInput/TextInput';
import { ImageDropInput } from '../../../components/inputs/ImageDropInput/ImageDropInput';
import { ApplyCancelButton } from '../../../components/buttons/ApplyCancelButton/ApplyCancelButton';

// state
import { selectSecondaryColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { setHeaderTitle } from '../../contentScreen/contentScreenSlice';


// style's
import "./CreateServerMenu.css";


export const Menu = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const animation = useAnimation();

    const secondaryColor = useSelector(selectSecondaryColor);

    const closeCreateServerMenu = () => {
        animation.start({
            left: "100%"
        }).then(() => {
            navigate("/dashboard")
        })
    }

    React.useEffect(() => {

        dispatch(setHeaderTitle("Create Server"))

        animation.start({
            left: "0%"
        })

        return () => {
            dispatch(setHeaderTitle("Select Server"))
        }

    }, [])

    return (
        <motion.div
        style={{
            backgroundColor: secondaryColor
        }}
        initial={{left: '100%'}}
        animate={animation}

        className='create-server-menu-container'>
            <div className='inner-create-server-menu-container'>
                <InputTitle title={"Server Name"} />
                <TextInput />
                <InputTitle title={"Server Banner"} />
                <div className='create-server-banner-container'>
                    <ImageDropInput center={true} />
                </div>
                <InputTitle title={"Enter Server Password"} />
                <TextInput type='password' placeholder={"Password"} />
                <TextInput type='password' placeholder={'Confirm Password'} />
                <ApplyCancelButton cancel={closeCreateServerMenu} name={"Create"} />
            </div>
            
        </motion.div> 
    )
}

export const CreateServerMenu = () => useRoutes([
    {path: "/createserver", element: <Menu /> }
])
