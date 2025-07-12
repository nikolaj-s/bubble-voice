import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NotAuthorized } from '../../../../components/Error/NotAuthorized/NotAuthorized';
import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper';
import ContentHeader from '../../../../components/Headers/ContentHeader/ContentHeader';
import { BookmarkPlus } from 'lucide-react';
import Label from '../../../../components/ui/Titles/Label/Label';
import TextInput from '../../../../components/ui/Inputs/TextInput/TextInput';
import TextArea from '../../../../components/ui/Inputs/TextArea/TextArea';
import { Card } from '../../../../components/ui/Wrappers/Card/Card';
import { MessageItem } from '../../../../components/Chat/MessageItem/MessageItem';
import { ApplyChangesPopup } from '../../../../components/ApplyChangesPopup/ApplyChangesPopup';
import { setIsSelecting } from '../../../../features/Moments/momentsSlice';
import { createMoment } from '../../../../features/Moments/Thunks/createMoment';

export const CreateMomentForm = ({permissions}) => {

    const dispatch = useDispatch();

    const [name, setName] = useState("");

    const [description, setDescription] = useState("");

    const {selectedMessages} = useSelector(state => state.momentsSlice);

    const {users} = useSelector(state => state.serverUsersSlice)

    const clearMoment = () => {
        setName("");
        setDescription("")
        dispatch(setIsSelecting(false));
    }

    const handleCreate = () => {

        const messages = Object.values(selectedMessages).map(m => m._id);

        dispatch(createMoment({messages, name, description, channel_id: Object.values(selectedMessages)[0]?.channel_id}));
    }

    return (
        <NotAuthorized permission={permissions.user_can_create_moments}>
            <LoadingErrorFormWrapper sliceName='momentsSlice'>
                <ContentHeader Icon={BookmarkPlus} title={'A Little Bubble'} subTitle={'Bundle up something worth floating above the rest.'}  />
                <Label label='Name your moment' />
                <TextInput value={name} onChange={setName} placeholder='name *required' />
                <Label label='Describe your moment' />
                <TextArea limit={300} placeholder='description *optional' setText={setDescription} text={description} />
                <Label label='Your selected messages' />
                <Card>
                    {Object.values(selectedMessages).map((message, key) => {
                        return <MessageItem key={key} message={message} users={users} notification={true} prevMessage={key > 0 ? Object.values(selectedMessages)[key - 1] : {}} />
                    })}
                </Card>
                <ApplyChangesPopup disabled={name.trim().length < 2 || Object.values(selectedMessages).length === 0} onApply={handleCreate} onClearChanges={clearMoment} name='Create Moment' />
            </LoadingErrorFormWrapper>
        </NotAuthorized>
    )
}
