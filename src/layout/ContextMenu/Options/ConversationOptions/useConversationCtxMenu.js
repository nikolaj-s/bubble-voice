import { Trash2 } from "lucide-react";
import { useCallback } from "react"
import { useDispatch } from "react-redux";
import { deleteConversation } from "../../../../features/Conversations/Thunks/deleteConversation";
import { BoolIndicator } from "../../../../components/ui/BoolIndicator/BoolIndicator";

export const useConversationCtxMenu = () => {

    const dispatch = useDispatch();

    const getConversationOptions = useCallback((options, conversation) => {

        options.push({
            label: 'Mute Conversation',
            icon: <BoolIndicator />,
            type: 'button',
            onClick: () => {
                
            }
        })

        options.push({
            label: 'Delete Conversation',
            icon: <Trash2 color="var(--error-color)" />,
            type: 'button',
            color: 'var(--error-color)',
            onClick: () => {
                dispatch(deleteConversation(conversation._id));
            }
        })

    }, [])

    return {getConversationOptions};

}