import React, { useState } from 'react'
import { FormWrapper } from '../../components/ui/Wrappers/FormWrapper/FormWrapper';
import { useDispatch, useSelector } from 'react-redux';
import Label from '../../components/ui/Titles/Label/Label';
import TextInput from '../../components/ui/Inputs/TextInput/TextInput';
import TextButton from '../../components/ui/Buttons/TextButton/TextButton';
import { useNavigate } from 'react-router';
import ContentPlaceholder from '../../components/ui/Placeholders/ContentPlaceholder/ContentPlaceholder';
import { CircleCheck, Send } from 'lucide-react';
import { sendRecoveryEmail } from '../../features/AccountRecovery/Thunks/sendRecoveryEmail';
import { useSearchParams } from 'react-router-dom';
import { validateResetToken } from '../../features/AccountRecovery/Thunks/validateResetToken';
import PasswordRequirements from '../../components/ui/PasswordRequirements/PasswordRequirements';
import { resetPassword } from '../../features/AccountRecovery/Thunks/resetPassword';

export const ResetPassword = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [email, setEmail] = useState("");

    const [newPassword, setnewPassword] = useState("");

    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [valid, setIsValid] = useState(false);

    const {loading, error, success, validated, passwordReset } = useSelector(state => state.accountRecoverySlice);

    React.useEffect(() => {

        if (loading || !searchParams.get('token')) return;

        dispatch(validateResetToken(searchParams.get('token')));

    }, [dispatch])

    const handleSendRecoveryEmail = (e) => {

        e.preventDefault();

        if (loading) return;

        dispatch(sendRecoveryEmail(email));
    }

    const handleResetPassword = (e) => {

        e.preventDefault();

        if (loading) return;

        dispatch(resetPassword({newPassword, confirmNewPassword, token: searchParams.get('token')}))

    }

    return (
        <div style={{height: '100svh', display: 'flex'}}>
        <FormWrapper onSubmit={() => {validated ? handleResetPassword() : handleSendRecoveryEmail()}} header="Reset Password" error={error} loading={loading} >
            {passwordReset ?
            <>
            <ContentPlaceholder icon={CircleCheck} title={'Password Reset'} message={'You can now login with your new password'} />
            <TextButton title='Login' action={() => {navigate('/login')}} />
            </>
            :
            validated ?
            <>
            <PasswordRequirements password={newPassword} isValid={setIsValid} />
            <TextInput type='password' value={newPassword} onChange={setnewPassword} placeholder={'new password'} />
            <TextInput type='password' placeholder={'confirm new password'} onChange={setConfirmNewPassword} value={confirmNewPassword} />
            <TextButton action={handleResetPassword} title='Reset Password' disabled={!valid || newPassword !== confirmNewPassword} />
            </>
            :
            success ?
            <ContentPlaceholder icon={Send} title={'Email Sent'} message={`A recovery email has been sent to ${email} if there is an existing account`} />
            :
            <>
            <Label label='Enter Email To Send Recovery Link To' />
            <TextInput placeholder={'email'} value={email} onChange={setEmail} />
            <TextButton title='Send Recovery Email' disabled={!emailRegex.test(email)} action={handleSendRecoveryEmail} />
            </>}
            <TextButton title='Go Back' action={() => {navigate('/login')}} />
        </FormWrapper>
        </div>
    )
}
