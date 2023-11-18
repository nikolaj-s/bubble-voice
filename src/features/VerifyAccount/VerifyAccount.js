import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import "./VerifyAccount.css";
import { FixedBubbleLogo } from '../../components/FixedBubbleLogo/FixedBubbleLogo';
import { selectAccountSettingsErrorMessage, selectAccountSettingsErrorState, selectAccountSettingsLoading, selectEmail, updateAccountInputState, verifyAccount } from '../settings/appSettings/accountSettings/accountSettingsSlice';
import { EmailIcon } from '../../components/Icons/EmailIcon/EmailIcon';
import { InputTitle } from '../../components/titles/inputTitle/InputTitle';
import { TextInput } from '../../components/inputs/TextInput/TextInput';
import { TextButton } from '../../components/buttons/textButton/TextButton';
import { Loading } from '../../components/LoadingComponents/Loading/Loading';
import { Error } from '../../components/Error/Error';

export const VerifyAccount = () => {

    const dispatch = useDispatch();

    const [key, setKey] = React.useState("");

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);

    const email = useSelector(selectEmail);

    const loading = useSelector(selectAccountSettingsLoading);

    const error = useSelector(selectAccountSettingsErrorState);

    const errorMessage = useSelector(selectAccountSettingsErrorMessage);

    const handleInput = (v) => {
        setKey(v);
    }

    const closeErrorMessage = () => {
        dispatch(updateAccountInputState({state: 'error', value: false}))
    }

    const handleVerify = () => {

        if (key.length === 0 || loading) return;

        dispatch(verifyAccount(key))
    }

    return (
        <div 
        style={{backgroundColor: primaryColor}}
        className='account-verification-outer-container'>
            <FixedBubbleLogo />
            <div 
            style={{backgroundColor: secondaryColor}}
            className='account-verification-inner-container'>
                <EmailIcon />
                <h2
                style={{color: textColor}}
                >Email Verification Required</h2>
                <h4 style={{color: textColor}}>A verification code was sent to the address: {email}</h4>
                <InputTitle title={"Verification Code"} />
                <TextInput action={handleInput} inputValue={key}  placeholder={'Code'} />
                <TextButton action={handleVerify} marginBottom={20} width={'auto'} textAlign='center' marginTop={20} name={'VERIFY'} />
                <p className='log-out-option' style={{color: textColor}}>Re-Send Verification Code</p>
                <p className='log-out-option' style={{color: textColor}}>Log Out</p>
                <Loading loading={loading} error={error} />
                {error ? <Error action={closeErrorMessage} errorMessage={errorMessage} /> : null}
            </div>
        </div>
    )
}
