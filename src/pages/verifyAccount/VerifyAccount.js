import React from 'react'
import { FormWrapper } from '../../components/ui/Wrappers/FormWrapper/FormWrapper';

import { Description } from '../../components/ui/Description/Description';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TextButton from '../../components/ui/Buttons/TextButton/TextButton';
import CodeInput from '../../components/ui/Inputs/CodeInput/CodeInput';
import { LineSpacer } from '../../components/ui/Spacers/LineSpacer/LineSpacer';
import { useDispatch, useSelector } from 'react-redux';
import { sendVerificationCode } from '../../features/AccountVerification/Thunks/sendVerificationCode';
import { TextIndicator } from '../../components/ui/TextIndicator/TextIndicator';
import { validateVerificationCode } from '../../features/AccountVerification/Thunks/validateVerificationCode';
import { clearToken } from '../../lib/services/authService';
import { Send, Undo2 } from 'lucide-react';

export const VerifyAccount = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [email, setEmail] = React.useState("");

    const [searchParams] = useSearchParams();

    const [code, setCode] = React.useState("");

    const {loading, error, verifcation_re_sent} = useSelector(state => state.accountVerificationSlice);

    React.useEffect(() => {

        setEmail(searchParams.get('email'))

    }, [])

    const handleVerifyCode = (e) => {
        e.preventDefault();
        dispatch(validateVerificationCode(code));

    }

    const resendVerifcationCode = (e) => {
        e.preventDefault();
        dispatch(sendVerificationCode());
    }

    const handleReturnToLogin = (e) => {
        e.preventDefault(); 

        clearToken();

        navigate('/login')

    }

    return (
        <div style={{display: 'flex', height: '100svh', overflowY: 'auto'}}>
            <FormWrapper onSubmit={(e) => {e.preventDefault()}} header="Account Verification" loading={loading} error={error} >
                <Description description={`A verification code was sent to the following email ${email}`} />
                <CodeInput value={code} onChange={setCode} />
                <TextButton title='Verify' disabled={code.length < 6} action={handleVerifyCode} />
                <LineSpacer />
                <Description description={"As Bubble is a new application your verification code may end up in your spam folder"}/>
                {verifcation_re_sent && (<TextIndicator backgroundColor='var(--success-color)' title='Verifcation Email Sent' />)}
                <TextButton action={resendVerifcationCode} title='Re-Send Verification Code' icon={Send} />
                <TextButton title='Go Back' action={handleReturnToLogin} icon={Undo2} />
            </FormWrapper>
        </div>
    )
}