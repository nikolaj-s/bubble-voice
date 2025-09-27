import { Trash2 } from "lucide-react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteConversationMessage } from "../../../../features/Conversations/Thunks/deleteConversationMessage";


export const useConversationMessageCtxMenu = () => {
    
    const dispatch = useDispatch();

    const {_id: user_id} = useSelector(state => state.accountSlice.account)

    const getConversationMessageOptions = useCallback((options, message) => {

        if (user_id === message.user_id) {

            options.push({
                label: "Delete Message",
                icon: <Trash2 color="var(--error-color)" />,
                type: 'button',
                color: 'var(--error-color)',
                onClick: () => {
                    dispatch(deleteConversationMessage(message))
                }
            })
            
        }

    }, [dispatch, user_id])

    return {getConversationMessageOptions}
}