import { useCallback } from 'react'
import { getClipboardText } from '../../../lib/services/getClipboardText'
import { ClipboardPaste } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { triggerAlert } from '../../../features/Alerts/alertsSlice'
import { setTextForTextChannel } from '../../../features/Channel/TextChannel/textChannelSlice'
import { setQuery } from '../../../features/Search/searchSlice'
import { pasteIntoInputById } from '../../../lib/services/pasteIntoInput'
import { setConversationText } from '../../../features/Conversations/conversationSlice'

export const useInputCtxMenu = () => {

    const dispatch = useDispatch(); 

    const {currentTextChannel} = useSelector(state => state.textChannelSlice);

    const {selectedConversation} = useSelector(state => state.conversationSlice);

    const getInputOptions = useCallback((options, data) => {
        
        options.push({
            label: "Paste",
            icon: <ClipboardPaste color="var(--text-color)" />,
            type: "button",
            onClick: async () => {

                let res;

                if (window?.electron) {

                    res  = await window?.electron?.readText();

                } else {
                    res = await getClipboardText().then(res => {

                        return res;
                        
                    }).catch(err => {})
                } 

                if (res?.error) return dispatch(triggerAlert("Not able to paste", 'error'));
                        
                if (data.input.id === `chat-input-${currentTextChannel}`) {
                    dispatch(setTextForTextChannel(res));
                }

                if (data.input.id === `chat-input-${selectedConversation?._id}`) {
                    dispatch(setConversationText(res));
                }

                if (data.input.id === 'search') {
                    dispatch(setQuery(res));
                }
            }
        })
    }, [dispatch, currentTextChannel, selectedConversation])
  
    return {getInputOptions};
}
