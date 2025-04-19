import React from 'react'
import FullScreenWrapper from '../../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper'
import DrawingCanvas from '../../../components/DrawingCanvas/DrawingCanvas'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../../components/ui/Titles/Header/Header'
import { triggerAlert } from '../../../features/Alerts/alertsSlice'
import { sendMessage } from '../../../features/TextChannel/Thunks/sendMessage'

export const CreateDrawing = ({close}) => {

    const dispatch = useDispatch();

    const { currentTextChannel } = useSelector(state => state.textChannelSlice);

    const {user_id} = useSelector(state => state.accountSlice.account);

    const {users} = useSelector(state => state.serverUsersSlice);

    const {permissions} = useSelector(state => state.serverPermissionsSlice);

    const handleSend = (image) => {

        const permission_id = users[user_id]?.server_group

        if (!permissions[permission_id]?.user_can_post_in_text_channels) return dispatch(triggerAlert("You are not authorized to post in this channel", 'error'));

        dispatch(sendMessage({channel_id: currentTextChannel, user_id, image}));

        close();
    }

    return (
       <FullScreenWrapper onClose={close} >
        <Header level={3} text='"Colors, chaos, and questionable choices await ✏️"' />
        <DrawingCanvas onSubmit={handleSend} />
       </FullScreenWrapper>
    )
}
