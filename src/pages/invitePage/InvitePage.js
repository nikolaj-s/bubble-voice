
import { useEffect } from 'react';
import { FormWrapper } from '../../components/ui/Wrappers/FormWrapper/FormWrapper'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getInviteDetails } from '../../features/Invites/Invite/Thunks/getInviteDetails';
import { ServerDisplay } from '../../components/ServerDisplay/ServerDisplay';
import Header from '../../components/ui/Titles/Header/Header';
import { LineSpacer } from '../../components/ui/Spacers/LineSpacer/LineSpacer';
import TextButton from '../../components/ui/Buttons/TextButton/TextButton';
import { AlertCircle } from 'lucide-react';
import { JoinServer } from '../../features/JoinServer/Thunks/JoinServer';

export const InvitePage = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {token} = useSelector(state => state.authSlice);

    const {loading, server_details, error} = useSelector(state => state.inviteSlice);

    const {loading: joinServerLoading, error: joinServerError} = useSelector(state => state.joinServerSlice);

    const [searchParams] = useSearchParams();

    useEffect(() => {

        if (loading) return;

        const inviteKey = searchParams.get('inviteKey');

        if (!inviteKey || !token) return navigate('/');

        dispatch(getInviteDetails(inviteKey));
    
    // eslint-disable-next-line
    }, [searchParams, token, dispatch]);

    const joinServer = () => {

        const inviteKey = searchParams.get('inviteKey');

        if (joinServerLoading) return;

        dispatch(JoinServer({navigate, inviteKey}));

    }

    return (
        <FormWrapper onSubmit={(e) => {e.preventDefault()}} error={error || joinServerError} loading={loading || joinServerLoading} >
            {server_details?.server_name && (
            <>
            <Header textAlign={'center'} text={`Do You Want To Join:`} />
            <ServerDisplay {...server_details} />
            <LineSpacer />
            <TextButton title='Join' action={joinServer} />
            </>
            )}
            {error && (<AlertCircle style={{margin: "0 auto"}} color='var(--error-color)' size={80} />)}
             <TextButton title='Go Back' action={() => {navigate('/')}} backgroundColor={'var(--error-color)'} />
        </FormWrapper>
    )
}
