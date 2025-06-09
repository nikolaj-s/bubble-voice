import React from 'react'
import { useHandleConsumers } from '../../hooks/useHandleConsumers'
import { useSelector } from 'react-redux';

export const UserStreamStateProvider = ({consumers}) => {

    const {pauseConsumer, resumeConsumer} = useHandleConsumers();

    const userStreamState = useSelector(state => state.userStreamStateSlice.streams);

    React.useEffect(() => {
      
        for (const [, value] of consumers) {
           
            if (userStreamState[`${value?.user_id}-${value?.appData?.type}`]?.disabled && !value.paused) {
                pauseConsumer(value.id);
                value.pause();
            } else if (!userStreamState[`${value?.user_id}-${value?.appData?.type}`]?.disabled && value.paused) {
                resumeConsumer(value.id);
                value.resume();
            }
        }
    // eslint-disable-next-line
    }, [consumers, userStreamState]);

    return (
        <></>
    )
}
