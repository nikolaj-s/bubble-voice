import React from 'react'

import { BoolButton } from '../../../buttons/BoolButton/BoolButton'

import "./InputEditor.css";
import { ColorInput } from '../../ColorInput/ColorInput';
import { useSelector } from 'react-redux';
import { selectAccentColor, selectGlassColor, selectSecondaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { BoldButton } from '../../../buttons/BoldButton/BoldButton';
import { ButtonAnimationWrapper } from '../../../buttons/ButtonAnimationWrapper/ButtonAnimationWrapper';
import { UnderLineButton } from '../../../buttons/UnderLineButton/UnderLineButton';
import { MinusButton } from '../../../buttons/MinusButton/MinusButton';
import { PlusButton } from '../../../buttons/PlusButton/PlusButton';
import { EmojiButton } from '../../../buttons/EmojiButton/EmojiButton';
import { EmojiMenu } from '../../../EmojiPicker/EmojiMenu';
import { CtxButton } from '../../../buttons/ctxButton/CtxButton';
import { AltDownIcon } from '../../../Icons/AltDownIcon/AltDownIcon';

export const InputEditor = ({handleEmoji, handleNsfw, nsfw, state = {fontSize: 15, textDecoration: false, bold: false, color: null}, updateState = () => {}}) => {
    
    const glassColor = useSelector(selectGlassColor);

    const textColor = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const fontFamily = ['Inter', 'Comic Neue', 'cursive', 'Dancing Script', 'Vina Sans', 'sans-serif']

    const [emojiMenuOpen, toggleEmojiMenuOpen] = React.useState(false);

    const [fontFamilyMenu, toggleFontFamilyMenu] = React.useState(false);

    const updateColor = (color) => {

        updateState({...state, color: color});

    }

    const toggleBold = () => {
        updateState({...state, bold: !state.bold})
    }

    const toggleDecoration = () => {
        updateState({...state, textDecoration: !state.textDecoration})
    }

    const handleFontSize = (add) => {

        if ((state.fontSize > 80 && add === true) || (state.fontSize < 10 && add === false)) return;

        updateState({
            ...state,
            fontSize: add ? state.fontSize+=1 : state.fontSize-=1
        })
    }

    const selectFont = (v) => {
        updateState({
            ...state,
            fontFamily: v
        })

        toggleFontFamilyMenu(false);
    }

    const handleManualFont = (e) => {

        e.stopPropagation();

        const number = Number(e.target.value);

        if ((number > 80) || (number < 10)) return;

        updateState({
            ...state,
            fontSize: number
        })

    }

    return (
    <>
        
        <div className='input-editor-container'>
            {emojiMenuOpen ?
            <div 
            style={{backgroundColor: secondaryColor}}
            className='alt-input-editor-emoji-menu'>
                <EmojiMenu action={handleEmoji} />
            </div>
            : null}  
            {fontFamilyMenu ?
            <div 
            style={{backgroundColor: secondaryColor}}
            className='alt-input-editor-emoji-menu'>
                {fontFamily.map(item => {
                    return <BoolButton key={item} fontFamily={item} action={() => {selectFont(item)}} name={item} state={item === state.fontFamily} />
                })}
            </div>
            : null}
            <BoolButton action={() => {handleNsfw(!nsfw)}} width={80} state={nsfw} name={"NSFW"} />
            <div style={{backgroundColor: glassColor, flexShrink: 0, width: 2, borderRadius: 4, height: 15, margin: '0px 5px'}} />
            <ButtonAnimationWrapper margin={'0px 2px 0px 0px'} desc_space={18} description={'Color'} borderRadius='8px' padding={'4px 8px'} height={27}>
                <ColorInput action={updateColor} rgb={(state.color || textColor)} hideIcon={true} width={50} height={18} />
            </ButtonAnimationWrapper>
            <BoldButton margin={'0px 2px 0px 0px'} action={toggleBold} background={state.bold ? accentColor : null} borderRadius='8px' desc_space={18} description={'Bold'} width={27} height={27} padding={4} />
            <UnderLineButton action={toggleDecoration} background={state.textDecoration ? accentColor : null} margin={'0px 2px 0px 0px'} desc_width={60} borderRadius='8px' desc_space={18} description={'Underline'} width={27} height={27} padding={4} />
            <div style={{backgroundColor: glassColor, flexShrink: 0, width: 2, borderRadius: 4, height: 15, margin: '0px 5px'}} />
            <div className='font-size-wrapper'>
                <MinusButton action={() => {handleFontSize(false)}} desc_width={60} borderRadius='8px' desc_space={18} description={'Decrease Font Size'} width={27} height={27} padding={4} />
                <div className='font-size-display'>
                    <input
                    onKeyUp={(e) => {e.stopPropagation()}}
                    value={state.fontSize}
                    type='number'
                    onChange={handleManualFont}
                    style={{color: textColor, cursor: 'default', backgroundColor: accentColor}}
                    />
                </div>
                <PlusButton action={() => {handleFontSize(true)}} desc_width={60} borderRadius='8px' desc_space={18} description={'Increase Font Size'} width={27} height={27} padding={4} />
            </div> 
            <div style={{backgroundColor: glassColor, flexShrink: 0, width: 2, borderRadius: 4, height: 15, margin: '0px 5px'}} />
            <EmojiButton action={() => {toggleEmojiMenuOpen(!emojiMenuOpen); toggleFontFamilyMenu(false)}} background={emojiMenuOpen ? accentColor : null} description={'Emojis'} width={27} height={27} padding={4} borderRadius={8} desc_space={18} />
            <div style={{backgroundColor: glassColor, flexShrink: 0, width: 2, borderRadius: 4, height: 15, margin: '0px 5px'}} />
            <CtxButton icon={<AltDownIcon flip={fontFamilyMenu} />} action={() => {toggleFontFamilyMenu(!fontFamilyMenu); toggleEmojiMenuOpen(false)}} name={state.fontFamily} width={100} />
        </div>
        <div style={{width: 'calc(100% - 10px)', height: 2, borderRadius: 4, backgroundColor: glassColor}} />
    </>
  )
}
