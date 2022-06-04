// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {motion} from 'framer-motion';

// components
import { TextButton } from '../../../components/buttons/textButton/TextButton';
import { TextInput } from '../../../components/inputs/TextInput/TextInput';
import { selectSecondaryColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { SlidingVariant } from '../../../pageVariants/SlidingVariant';

// state
import { handleSignIn } from './signInSlice';

// styles
import "./signIn.css";
import { useNavigate } from 'react-router';

export const SignIn = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const secondaryColor = useSelector(selectSecondaryColor);

    const handleSignInAction = () => {
        dispatch(handleSignIn());
        navigate("/dashboard")
    }

    const navigateToSignUp = () => {
        navigate("/signup")
    }

    return (
        <motion.div variants={SlidingVariant} initial="initial" animate="in" exit="out" className='sign-in-outer-container'>
            <div style={{backgroundColor: secondaryColor}} className='sign-in-inner-container'>
                <div className='content-wrapper'>
                    <h2 style={{marginTop: 0, paddingTop: 0}} className='sign-in-header'>Sign In</h2>
                    <TextInput placeholder={"E Mail"} />
                    <TextInput placeholder={"Password"} type="password" />
                    <TextButton action={handleSignInAction} name="Sign In" />
                    <div className='sign-spacer-container'>
                        <div className='line-spacer'></div>
                        <h3>Or</h3>
                        <div className='line-spacer'></div>
                    </div>
                    <h2>Sign Up</h2>
                    <TextButton action={navigateToSignUp} name={"Create A Bubble Account"}/>
                </div>
            </div>
        </motion.div>
    )
}
