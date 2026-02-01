
import React from 'react'
import { Card } from '../../../../components/ui/Wrappers/Card/Card'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label'
import { MicroUserDisplay } from '../../../../components/ui/MicroUserDisplay/MicroUserDisplay'
import { useDispatch, useSelector } from 'react-redux'
import TextLabelError from '../../../../components/Error/TextLabelError/TextLabelError'
import TextArea from '../../../../components/ui/Inputs/TextArea/TextArea'
import SpinnerLoading from '../../../../components/ui/Loading/Spinner/SpinnerLoading'
import DurationPicker from '../../../../components/ui/Inputs/DurationPicker/DurationPicker'
import { ToolBar } from '../../../../components/ui/Wrappers/ToolBar/ToolBar'
import TextButton from '../../../../components/ui/Buttons/TextButton/TextButton'
import { closeOverlay } from '../../../../features/Overlay/overlaySlice'
import { addMessagingTimeout } from '../../../../features/Moderation/Thunks/addMessagingTimeout'

export const MessagingTimeout = () => {

    const dispatch = useDispatch();

    const {loading, error, userToModerate} = useSelector(state => state.moderationSlice);

    const [reason, setReason] = React.useState("");

    const [timeoutDuration, setTimeoutDuration] = React.useState(0.5);

    const timeoutUser = () => {
        dispatch(addMessagingTimeout({targetUser: userToModerate, reason, duration: timeoutDuration}));
        dispatch(closeOverlay());
    }

    const cancel = () => {
        dispatch(closeOverlay());
    }

    return (
        <Card>
            {error && (<TextLabelError error={error} />)}
            {loading && (<SpinnerLoading />)}
            <Header level={2} text='Messaging Timeout' />
            <Label label='You are about to timeout' />
            <MicroUserDisplay user_id={userToModerate} />
            <Label label='Reason' />
            <TextArea text={reason} setText={setReason} placeholder='type your reason...' />
            <Label label='Duration' />
            <DurationPicker onChangeMinutes={setTimeoutDuration} valueMinutes={timeoutDuration}  />
            <ToolBar style={{justifyContent: 'flex-end'}} >
                <TextButton title='cancel' action={cancel} backgroundColor={'transparent'} />
                <TextButton title='Timeout User' action={timeoutUser} />
            </ToolBar>
        </Card>
    )
}
