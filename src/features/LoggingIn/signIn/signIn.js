// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

// components
import { TextButton } from '../../../components/buttons/textButton/TextButton';
import { TextInput } from '../../../components/inputs/TextInput/TextInput';
import { selectSecondaryColor, selectTextColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { LoadingErrorComponent } from '../../../components/LoadingErrorComponent/LoadingErrorComponent'
import { OptionSpacer } from '../../../components/Spacers/OptionSpacer/OptionSpacer';

// state
import { closeSignInError, handleSignIn, handleSignInInput, selectEmail, selectPassword, selectSignInErrorMessage, selectSignInErrorState, selectSignInLoading } from './signInSlice';

// styles
import "../LogInStyle.css";

export const SignIn = () => {

    // main
    const navigate = useNavigate();

    const dispatch = useDispatch();

    // state
    const loading = useSelector(selectSignInLoading);

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);

    const error = useSelector(selectSignInErrorState);

    const errorMessage = useSelector(selectSignInErrorMessage);

    const email = useSelector(selectEmail);

    const password = useSelector(selectPassword);

    // functions
    const handleSignInAction = () => {
        dispatch(handleSignIn());
    }

    const navigateToSignUp = () => {
        navigate("/signup")
    }

    const handleError = () => {
        dispatch(closeSignInError());
    }

    const handleInput = (value, state) => {
        dispatch(handleSignInInput({value: value, state: state}))
    }

    const handleEnter = (keyCode) => {
        if (keyCode === 13) {
            handleSignInAction();
        }
    }

    return (
        <div key={'sign-in-screen'} className='sign-in-outer-container'>
            <motion.div 
            style={{backgroundColor: secondaryColor}} className='sign-in-inner-container'>
                <motion.div 
                animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity: 0}}
                className='content-wrapper'>
                    <h2 style={{marginTop: 0, paddingTop: 0, color: textColor}} className='sign-in-header'>Sign In</h2>
                    <TextInput action={handleInput} stateSelector={"email"} inputValue={email} marginBottom='2%' placeholder={"E Mail"} />
                    <TextInput keyCode={handleEnter} action={handleInput} stateSelector={"password"} inputValue={password} marginBottom='2%' placeholder={"Password"} type="password" />
                    <TextButton action={handleSignInAction} name="Sign In" />
                    <OptionSpacer />
                    <h2 style={{color: textColor}}>Sign Up</h2>
                    <TextButton action={navigateToSignUp} name={"Create A Bubble Account"}/>
                </motion.div>
                <LoadingErrorComponent error={error} loading={loading} errorMessage={errorMessage} label={"Ok"} action={handleError} />
            </motion.div>
        </div>
    )
}
