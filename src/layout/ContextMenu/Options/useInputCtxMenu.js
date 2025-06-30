import { useCallback } from 'react'
import { getClipboardText } from '../../../lib/services/getClipboardText'
import { ClipboardPaste } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { triggerAlert } from '../../../features/Alerts/alertsSlice'
import { setTextForTextChannel } from '../../../features/Channel/TextChannel/textChannelSlice'
import { setQuery } from '../../../features/Search/searchSlice'

export const useInputCtxMenu = () => {

    const dispatch = useDispatch(); 

    const getInputOptions = useCallback((options, data) => {
        
        options.push({
            label: "Paste",
            icon: <ClipboardPaste color="var(--text-color)" />,
            type: "button",
            onClick: () => {

                let res;

                if (window?.electron) {

                    res  = window.electron.pasteText();

                } else {
                    res = getClipboardText().then(res => {

                        return res;
                        
                    }).catch(err => {})
                } 

                if (res?.error) return dispatch(triggerAlert("Not able to paste", 'error'));
                        
                if (data.input.id === 'chat-input') {
                    dispatch(setTextForTextChannel(res));
                }

                if (data.input.id === 'search') {
                    dispatch(setQuery(res));
                }
            }
        })
    }, [dispatch])
  
    return {getInputOptions};
}
