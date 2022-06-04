import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { TextButton } from '../../../components/buttons/textButton/TextButton'
import { TextInput } from '../../../components/inputs/TextInput/TextInput'
import { InputTitle } from '../../../components/titles/inputTitle/InputTitle'
import { selectSecondaryColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const SignUp = () => {

    const navigate = useNavigate();

    const secondaryColor = useSelector(selectSecondaryColor);

    const navigateToSignIn = () => {
        navigate('/signin')
    }

    return (
        <div className='sign-in-outer-container' >
            <div style={{
                backgroundColor: secondaryColor
            }} className='sign-in-inner-container'>
                <div className='content-wrapper'>
                    <h2>Sign Up</h2>
                    <TextInput placeholder={"Username"} />
                    <TextInput placeholder={"E Mail"} />
                    <TextInput placeholder={"Password"} type={"password"} />
                    <TextInput placeholder={"Confirm Password"} type={"pasword"} />
                    <TextButton name={"Create Account"} />
                    <InputTitle title={"Already have an account?"} />
                    <TextButton action={navigateToSignIn} name={"Sign In"} />
                </div>
            </div>
        </div>
    )
}
