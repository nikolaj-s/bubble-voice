
import Label from '../../../../../components/ui/Titles/Label/Label'
import TextButton from '../../../../../components/ui/Buttons/TextButton/TextButton'
import { LineSpacer } from '../../../../../components/ui/Spacers/LineSpacer/LineSpacer'
import { Link } from 'lucide-react'
import { Description } from '../../../../../components/ui/Description/Description'
import { LinkDisplay } from '../../../../../components/ui/LinkDisplay/LinkDisplay'
import { useDispatch, useSelector } from 'react-redux'
import { generateInviteLink } from '../../../../../features/Invites/ServerInvites/Thunks/generateInviteLink'

export const InviteFormHome = ({permissions, setSearchParams}) => {

    const dispatch = useDispatch();

    const { inviteLink, loading } = useSelector(state => state.serverInvitesSlice);

    const handleGenerateInviteLink = () => {
        if (loading) return;

        dispatch(generateInviteLink());
    }

    return (
        <>
        <Label label='Generate a One-Time Invite Link' />
        <LinkDisplay value={inviteLink} />
        <Description description={'Create a secure, single-use invite link to share with someone you trust. Once used, the link will expire and cannot be reused.'} />
        <TextButton action={handleGenerateInviteLink} title='Generate Link' icon={Link} maxWidth={170} />
        <LineSpacer />
        <Label label='Invite A User' />
        <TextButton title='Invite' action={() => {setSearchParams({section: 'invites', invites: 'inviteUser'})}} maxWidth={170} />
        <Label label='View Pending Invites' />
        <TextButton title='Pending Invites' action={() => {setSearchParams({section: 'invites', invites: 'pendingInvites'})}} maxWidth={170} />
        </>
    )
}
