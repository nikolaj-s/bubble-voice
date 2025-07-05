

import React from 'react'
import { Card } from '../../../components/ui/Wrappers/Card/Card'
import { LoadingErrorFormWrapper } from '../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper'
import { useDispatch, useSelector } from 'react-redux'
import ContentHeader from '../../../components/Headers/ContentHeader/ContentHeader'
import { LogOut } from 'lucide-react'
import { Text } from '../../../components/ui/Text/Text'
import { Description } from '../../../components/ui/Description/Description'
import { ToolBar } from '../../../components/ui/Wrappers/ToolBar/ToolBar'
import TextButton from '../../../components/ui/Buttons/TextButton/TextButton'
import { useNavigate } from 'react-router'
import { setOverlay } from '../../../features/Overlay/overlaySlice'
import { setServerToLeave } from '../../../features/LeaveServer/leaveServerSlice'
import { leaveServer } from '../../../features/LeaveServer/Thunks/leaveServer'

export const LeaveServer = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {server_id} = useSelector(state => state.serverDetailsSlice);

    const {leavingServer} = useSelector(state => state.leaveServerSlice);

    const handleCancel = () => {

        dispatch(setOverlay(null));

        dispatch(setServerToLeave(null));
    }

    const handleLeave = () => {

        if (server_id === leavingServer?._id) navigate('/dashboard');

        dispatch(leaveServer());

    }

    if (!leavingServer) return null;

    return (
        <Card style={{maxWidth: 500, margin: '0 auto'}}>
            <LoadingErrorFormWrapper sliceName='leaveServerSlice'>
                <ContentHeader Icon={LogOut} title={`Confirm Bubble Exit`} />
                <Text>Are you sure you want to leave {leavingServer?.server_name}?</Text>
                <Description description={'leaving will permanently delete all of your data linked to this bubble'} />
                <ToolBar style={{justifyContent: 'flex-end'}}>
                    <TextButton title='Cancel' action={handleCancel} />
                    <TextButton title='Leave' backgroundColor={'var(--error-color)'} icon={LogOut} action={handleLeave} />
                </ToolBar>
            </LoadingErrorFormWrapper>
        </Card>
    )
}
