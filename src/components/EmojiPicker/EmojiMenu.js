import EmojiPicker, {EmojiStyle, Theme} from 'emoji-picker-react'
import React from 'react'

import "./EmojiMenu.css"
import { useSelector } from 'react-redux'
import { selectSecondaryColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const EmojiMenu = ({action, close, direct_message, textArea}) => {

    const secondaryColor = useSelector(selectSecondaryColor);

    React.useEffect(() => {
        const el = document.getElementsByClassName('EmojiPickerReact')[0];

        if (el) {
            el.style.backgroundColor = secondaryColor;
        }
    }, [])

    return (
        <div style={{position: textArea ? 'absolute' : null}} onClick={close} className='emoji-picker-container'>
            <div style={{left: direct_message ? 200 : null, right: !direct_message ? 20 : null}}  onClick={(e) => {e.stopPropagation()}} className='emoji-picker-inner-container'>
                <EmojiPicker categories={false} lazyLoadEmojis={true} onEmojiClick={action} theme={Theme.DARK} emojiStyle={EmojiStyle.NATIVE} skinTonesDisabled={true} searchDisabled={true} />
            </div>
        </div>
    )
}
