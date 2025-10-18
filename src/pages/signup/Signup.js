import { useDispatch, useSelector } from 'react-redux';

import TextButton from '../../components/ui/Buttons/TextButton/TextButton';

import TextInput from '../../components/ui/Inputs/TextInput/TextInput';

import { FormWrapper } from '../../components/ui/Wrappers/FormWrapper/FormWrapper';

import styles from './Signup.module.css';

import React from 'react'

import {  selectAuthLoading, selectConfirmPasswordError, selectEmailError, selectGeneralAuthError, selectPasswordError, selectUsernameError, toggleAcceptedTerms } from '../../features/Auth/authSlice';
import { signupThunk } from '../../features/Auth/Thunks/SignupThunk';
import { IsAuthenticated } from '../../components/Auth/IsAuthenticated/IsAuthenticated';
import Label from '../../components/ui/Titles/Label/Label';
import { useNavigate } from 'react-router';
import PasswordRequirements from '../../components/ui/PasswordRequirements/PasswordRequirements';
import IAgreeCheckbox from '../../components/IAgreeCheckbox/IAgreeCheckbox';

const Signup = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [username, setUsername] = React.useState("");

    const [email, setEmail] = React.useState("");

    const [password, setPassword] = React.useState("");

    const [confirmPassword, setConfirmPassword] = React.useState("");

    const {acceptedTerms} = useSelector(state => state.authSlice);

    const emailError = useSelector(selectEmailError);

    const passwordError = useSelector(selectPasswordError);

    const usernameError = useSelector(selectUsernameError);

    const confirmPasswordError = useSelector(selectConfirmPasswordError);

    const loading = useSelector(selectAuthLoading);

    const error = useSelector(selectGeneralAuthError);

    const handleSignUp = (e) => {
        e.preventDefault();

        dispatch(signupThunk({username, email, password, confirmPassword}));
    }

    const redirect = () => {
        navigate('/login')
    }

    return (
        <IsAuthenticated>
            <div className='application-drag-area-for-desktop'/>
                <FormWrapper onSubmit={handleSignUp}  header="BUBBLE" loading={loading} error={error}>
                    <Label label="Create a Bubble Account" />
                    <TextInput autoComplete="username" error={usernameError} onChange={(v) => {setUsername(v)}} value={username} placeholder={"Username"} />
                    <TextInput autoComplete="email" error={emailError} onChange={(v) => {setEmail(v)}} value={email} placeholder={"Email"} />
                    <PasswordRequirements password={password} />
                    <TextInput autoComplete="new-password" error={passwordError} onChange={(v) => {setPassword(v)}} value={password} placeholder={"Password"} type='password' /> 
                    <TextInput autoComplete="new-password" error={confirmPasswordError} onChange={(v) => {setConfirmPassword(v)}} placeholder={"Confirm password"} value={confirmPassword} type='password' />
                    <IAgreeCheckbox agreed={acceptedTerms} onChange={() => {dispatch(toggleAcceptedTerms())}} />
                    <TextButton title='Create Account' />
                    <TextButton action={redirect} title='Log In' />
                </FormWrapper>
        </IsAuthenticated>
    )
}

export default Signup;
