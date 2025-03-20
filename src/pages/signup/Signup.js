import { useDispatch, useSelector } from 'react-redux';
import TextButton from '../../components/Buttons/TextButton/TextButton';
import TextInput from '../../components/Inputs/TextInput/TextInput';
import TextNavButton from '../../components/NavButtons/TextNavButton/TextNavButton';
import { FormWrapper } from '../../components/ui/Wrappers/FormWrapper/FormWrapper';
import styles from './Signup.module.css';

import React from 'react'
import {  selectAuthLoading, selectConfirmPasswordError, selectEmailError, selectGeneralAuthError, selectPasswordError, selectUsernameError } from '../../features/Auth/AuthSlice';
import { signupThunk } from '../../features/Auth/Thunks/SignupThunk';
import { IsAuthenticated } from '../../components/Auth/IsAuthenticated/IsAuthenticated';
import Label from '../../components/Titles/Label/Label';

const Signup = () => {

    const dispatch = useDispatch();

    const [username, setUsername] = React.useState("");

    const [email, setEmail] = React.useState("");

    const [password, setPassword] = React.useState("");

    const [confirmPassword, setConfirmPassword] = React.useState("");

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

    return (
        <IsAuthenticated>
            <div className={styles.wrapper}>
                <FormWrapper onSubmit={handleSignUp}  header="BUBBLE" loading={loading} error={error}>
                    <Label label="Create a Bubble Account" />
                    <TextInput autoComplete="username" error={usernameError} onChange={(v) => {setUsername(v)}} value={username} placeholder={"Username"} />
                    <TextInput autoComplete="email" error={emailError} onChange={(v) => {setEmail(v)}} value={email} placeholder={"Email"} />
                    <TextInput autoComplete="new-password" error={passwordError} onChange={(v) => {setPassword(v)}} value={password} placeholder={"Password"} type='password' /> 
                    <TextInput autoComplete="new-password" error={confirmPasswordError} onChange={(v) => {setConfirmPassword(v)}} placeholder={"Confirm password"} value={confirmPassword} type='password' />
                    <TextButton title='Create Account' />
                    <TextNavButton text='Log In' to='/login' />
                </FormWrapper>
            </div>
        </IsAuthenticated>
    )
}

export default Signup;
