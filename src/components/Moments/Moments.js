import React, { useState } from 'react'
import ScrollLoadWrapper from '../ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { getMoments } from '../../features/Moments/Thunks/getMoments';
import { MomentsItem } from './MomentsItem/MomentsItem';
import ContentPlaceholder from '../ui/Placeholders/ContentPlaceholder/ContentPlaceholder';
import { setSelectedMoment } from '../../features/Moments/momentsSlice';
import { setOverlay } from '../../features/Overlay/overlaySlice';
import { Ban } from 'lucide-react';
import TextLabelError from '../Error/TextLabelError/TextLabelError';

export const Moments = ({channel_id}) => {

    const dispatch = useDispatch();

    const {loading, error, moments, noMoreItems} = useSelector(state => state.momentsSlice);

    const {server_id} = useSelector(state => state.serverDetailsSlice);

    const {currentTextChannel} = useSelector(state => state.textChannelSlice);

    const [page, setPage] = useState(1);

    React.useEffect(() => {
        if (loading) return;
        dispatch(getMoments({channel_id, page, server_id}));
    }, [channel_id, page, server_id])
   
    const openMoment = (moment) => {
        dispatch(setSelectedMoment(moment));

        dispatch(setOverlay('moment'));
    }

    return (
        <ScrollLoadWrapper  loading={loading} noMoreItems={noMoreItems}  >
            {error && (<TextLabelError error={error} />)}
            {moments?.length === 0 && !loading ?
            <ContentPlaceholder icon={Ban} title={currentTextChannel ? 'No Moments Found In This Channel' : 'No Moments Found'}  />
            :
            moments.map(moment => {
                return <MomentsItem onClick={openMoment} moment={moment} key={moment._id} />
            })
            }
        </ScrollLoadWrapper>
    )
}
