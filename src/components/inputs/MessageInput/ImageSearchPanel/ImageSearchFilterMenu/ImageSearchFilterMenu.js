import React from 'react'
import { ButtonAnimationWrapper } from '../../../../buttons/ButtonAnimationWrapper/ButtonAnimationWrapper'
import { useSelector } from 'react-redux'
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import "./ImageSearchFilterMenu.css";
import { BoolButton } from '../../../../buttons/BoolButton/BoolButton';
import { TextInput } from '../../../TextInput/TextInput';
import { LinkInput } from './LinkInput/LinkInput';

export const ImageSearchFilterMenu = ({format, updateFormat, mediaLocation, setMediaLocation}) => {

    const [formatMenuState, toggleFormatMenuState] = React.useState(false);
    
    const [locationMenu, toggleLocationMenu] = React.useState(false);

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const handleFormatChange = (v) => {
        toggleFormatMenuState(false);

        updateFormat(v);
    }

    const handleSetMediaLocation = (v) => {
        setMediaLocation(v);
    }

    const onEnter = (code) => {
       
        if (code === 13) {
            toggleLocationMenu(false);
        }
    }

    return (
        <>
        <div className='image-search-filter-menu'>
            <ButtonAnimationWrapper
            action={() => {toggleFormatMenuState(!formatMenuState); toggleLocationMenu(false)}}
            invert={true}
            background={accentColor}
            borderRadius='8px'
            padding={'4px 6px'} width={'auto'} height={20} >
                <p style={{
                    color: textColor,
                    textTransform: 'capitalize',
                    opacity: 0.8,
                    fontSize: '0.8rem'
                }}>Format: {format}</p>
            </ButtonAnimationWrapper>
            <ButtonAnimationWrapper
            action={() => {toggleLocationMenu(!locationMenu); toggleFormatMenuState(false)}}
            invert={true}
            background={accentColor}
            borderRadius='8px'
            margin={'0 0 0 5px'}
            padding={'4px 6px'} width={'auto'} height={20} >
                <p style={{
                    color: textColor,
                    opacity: 0.8,
                    fontSize: '0.8rem'
                }}>Find from: {mediaLocation}</p>
            </ButtonAnimationWrapper>
        </div>
        {formatMenuState ?
        <div style={{backgroundColor: primaryColor}} className='format-mini-menu'>
            <BoolButton action={() => {handleFormatChange('images')}} state={format === 'images'} name={"Images"} />
            <BoolButton action={() => {handleFormatChange('gifs')}} state={format === 'gifs'} name={"Gifs"} />
        </div>
        : null}
        {locationMenu ? 
        <div style={{backgroundColor: primaryColor}} className='format-mini-menu input-mini-menu'>
        <LinkInput onEnter={onEnter} mediaLocation={mediaLocation} handleSetMediaLocation={handleSetMediaLocation} />
        </div>
        : null}
        </>
    )
}
