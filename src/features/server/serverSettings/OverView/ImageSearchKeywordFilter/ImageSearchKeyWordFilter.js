import React from 'react'
import { InputTitle } from '../../../../../components/titles/inputTitle/InputTitle'
import { TextInput } from '../../../../../components/inputs/TextInput/TextInput'
import { AddMediaButton } from '../../../../../components/buttons/AddMediaButton/AddMediaButton'
import { CloseIcon } from '../../../../../components/Icons/CloseIcon/CloseIcon';

import "./ImageSearchKeywordFilter.css";
import { useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const ImageSearchKeywordFilter = ({keywords = [], addKeyword, removeKeyword}) => {

    const [inputValue, setInputValue] = React.useState("");

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const handleInputValue = (value) => {

        if (value.length > 50) return;

        setInputValue(value.toLowerCase());
        
    }

    const handleAddKeyword = () => {

        if (inputValue.length === 0 || inputValue.length > 60) return;

        addKeyword(inputValue);

        setInputValue("");
    }
    
    return (
        <>
        <InputTitle title={"Add Banned Keywords For Image Search"} />
        <div className='image-search-keyword-filter-container'>
            {keywords.map(word => {
                return (
                    <div 
                    key={word}
                    style={{backgroundColor: primaryColor}}
                    className='filter-word-container'>
                        <div 
                        onClick={() => {removeKeyword(word)}}
                        style={{backgroundColor: accentColor}}
                        className='remove-filter-word-button'>
                            <CloseIcon />
                        </div>
                        <p
                        style={{color: textColor}}
                        >{word}</p>
                    </div>
                )
            })}
        </div>
        <div className='image-keyword-filter-input-wrapper'>
            <TextInput keyCode={(code) => code === 13 ? handleAddKeyword() : null}  inputValue={inputValue} action={handleInputValue} placeholder={"Add Keyword To Ban"} />
            <AddMediaButton action={handleAddKeyword} left="101%" top="6px" position="absolute" width={20} height={20} padding={4} id="add-keyword-filter" />
        </div>
        </>
    )
}
