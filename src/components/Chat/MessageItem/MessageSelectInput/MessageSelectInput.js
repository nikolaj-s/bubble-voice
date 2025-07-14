import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '../../../ui/Buttons/IconButton/IconButton';
import { BoolIndicator } from '../../../ui/BoolIndicator/BoolIndicator';
import { addMessageToMoment, removeMessageFromMoment } from '../../../../features/Moments/momentsSlice';

export const MessageSelectInput = ({message = {}}) => {

    const dispatch = useDispatch();

    const {isSelecting, selectedMessages} = useSelector(state => state.momentsSlice);

    const handleSelectingMessage = () => {
        selectedMessages[message._id] ? dispatch(removeMessageFromMoment(message)) : dispatch(addMessageToMoment(message))
    }

    if (!isSelecting) return null;

    return (
        <div style={{position: 'absolute', top: 5, left: 5, zIndex: 15}}>
            <IconButton 
            title={Object.values(selectedMessages).length === 10 ? 'Max Reached' : selectedMessages[message._id] ? "Unselect" : "Select"} 
            Icon={<BoolIndicator active={selectedMessages[message._id]} />}
            onClick={handleSelectingMessage}
            />
        </div>
    )
}
