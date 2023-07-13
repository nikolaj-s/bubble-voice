// library's
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion';

// component's
import { TextButton } from '../../../components/buttons/textButton/TextButton'
import { TextInput } from '../../../components/inputs/TextInput/TextInput'
import { InputTitle } from '../../../components/titles/inputTitle/InputTitle'
import { Error } from '../../../components/Error/Error';
import { Loading } from '../../../components/LoadingComponents/Loading/Loading';

// state
import { selectSecondaryColor, selectTextColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { closeSignUpError, handleSignUp, handleSignUpInput, selectSignUpConfirmPassword, selectSignUpEmail, selectSignUpErrorMessage, selectSignUpErrorState, selectSignUpLoading, selectSignUpPassword, selectSignUpUserName } from './signUpSlice'

// style's
// note using styles from signIn.css

export const SignUp = () => {
    // main func
    const navigate = useNavigate();

    const dispatch = useDispatch();
    // extra state
    const loading = useSelector(selectSignUpLoading);

    const error = useSelector(selectSignUpErrorState);

    const errorMessage = useSelector(selectSignUpErrorMessage);

    // input values
    const username = useSelector(selectSignUpUserName);

    const email = useSelector(selectSignUpEmail);

    const password = useSelector(selectSignUpPassword);

    const confirmPassword = useSelector(selectSignUpConfirmPassword);

    // application colors
    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);

    // functions
    const navigateToSignIn = () => {
        navigate('/signin')
    }

    const handleSignUpFunc = () => {
        dispatch(handleSignUp())
    }

    const handleInput = (value, state) => {
        dispatch(handleSignUpInput({value: value, state: state}))
    }

    const handleError = () => {
        dispatch(closeSignUpError());
    }

    return (
        <div 
        className='sign-in-outer-container' >
            <div 
            style={{
                backgroundColor: secondaryColor
            }} className='sign-in-inner-container'>
                <motion.div 
                animate={{opacity: 1}}
                initial={{opacity: 0}}
                exit={{opacity: 0}}
                className='content-wrapper'>
                    <h2 style={{color: textColor}}>Sign Up</h2>
                    <TextInput value={username} action={handleInput} stateSelector="username" marginBottom='2%' placeholder={"Username"} />
                    <TextInput value={email} action={handleInput} stateSelector="email" marginBottom='2%' placeholder={"E Mail"} />
                    <TextInput value={password} action={handleInput} stateSelector="password" marginBottom='2%' placeholder={"Password"} type={"password"} />
                    <TextInput value={confirmPassword} action={handleInput} stateSelector="confirmPassword" marginBottom='2%' placeholder={"Confirm Password"} type={"password"} />
                    <TextButton action={handleSignUpFunc} name={"Create Account"} />
                    <InputTitle title={"Already have an account?"} />
                    <TextButton action={navigateToSignIn} name={"Sign In"} />
                </motion.div>
                <AnimatePresence>
                    {error ? <Error position='absolute' action={handleError} errorMessage={errorMessage} buttonLabel={"Ok"} /> : null}
                    <Loading loading={loading} error={error} />
                </AnimatePresence>
            </div>
        </div>
    )
}
