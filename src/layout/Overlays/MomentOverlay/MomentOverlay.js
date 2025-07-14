
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ScrollLoadWrapper from '../../../components/ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper';
import ContentHeader from '../../../components/Headers/ContentHeader/ContentHeader';
import { BookmarkPlus, X } from 'lucide-react';
import ContentPlaceholder from '../../../components/ui/Placeholders/ContentPlaceholder/ContentPlaceholder';
import { MessageItem } from '../../../components/Chat/MessageItem/MessageItem';
import { getMoment } from '../../../features/Moments/Thunks/getMoment';
import TextLabelError from '../../../components/Error/TextLabelError/TextLabelError';

export const MomentOverlay = () => {

    const dispatch = useDispatch();

    const {loading, error, messages, selectedMoment} = useSelector(state => state.momentSlice);

    const users = useSelector(state => state.serverUsersSlice.users);

    React.useEffect(() => {

        if (selectedMoment?.messages) {
            dispatch(getMoment(selectedMoment?._id));
        }

    }, [selectedMoment])

    if (!selectedMoment) return <ContentPlaceholder title={'No Moment Selected'} icon={X} />

    return (
        <ScrollLoadWrapper contentGap={0} loading={loading}  >
            <ContentHeader Icon={BookmarkPlus} title={selectedMoment?.name} subTitle={selectedMoment?.description} />
            {error && (<TextLabelError error={error} />)}
            {messages.map((message, key) => {
                return <MessageItem inSearch={true}  key={message._id} message={message} users={users} prevMessage={key === 0 ? {} : messages[key - 1]} />
            })}
        </ScrollLoadWrapper>
    )
}
