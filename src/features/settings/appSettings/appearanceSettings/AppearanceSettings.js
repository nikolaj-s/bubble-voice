// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from 'react-router'

// components
import { TextInput } from '../../../../components/inputs/TextInput/TextInput';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { ToggleButton } from '../../../../components/buttons/ToggleButton/ToggleButton';
import { SettingsSpacer } from '../../../../components/Spacers/SettingsSpacer/SettingsSpacer';

// state
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { selectAccentColor, selectDarkModeEnabledState, selectPrimaryColor, selectSecondaryColor, selectTextColor, toggleDarkMode, updateColorValue } from './appearanceSettingsSlice';
import { SettingsHeader } from '../../../../components/titles/SettingsHeader/SettingsHeader';

const Settings = () => {

    const dispatch = useDispatch();

    React.useEffect(() => {

        dispatch(setHeaderTitle('Appearance Settings'))
    // eslint-disable-next-line
    }, [])

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const darkModeState = useSelector(selectDarkModeEnabledState)

    const handleInput = (value, type) => {
        dispatch(updateColorValue({value, type}))
    }

    const handleToggleAppearanceModes = () => {
        if (darkModeState) {
            dispatch(toggleDarkMode({darkMode: false, type: 'light'}))
        } else {
            dispatch(toggleDarkMode({darkMode: true, type: 'dark'}))
        }
    }
    return (
        <div className='settings-wrapper'>
            <SettingsHeader title={"Custom Color Scheme"} />
            <InputTitle title={"Primary Color"} />
            <TextInput stateSelector='primaryColor' action={handleInput} inputValue={primaryColor} />
            <InputTitle title={"Secondary Color"} />
            <TextInput stateSelector='secondaryColor' action={handleInput} inputValue={secondaryColor} />
            <InputTitle  title={"Accent Color"} />
            <TextInput stateSelector='accentColor' action={handleInput}  inputValue={accentColor} />
            <InputTitle  title={"Text Color"} />
            <TextInput stateSelector='textColor' action={handleInput}  inputValue={textColor} />
            <SettingsHeader title={"Presets"} />
            <InputTitle title={"Enable Dark Mode"} />
            <ToggleButton action={handleToggleAppearanceModes} state={darkModeState} />
            <SettingsSpacer />
        </div>
    )
}

export const AppearanceSettings = () => useRoutes([
    { path: "appearance", element: <Settings /> }
])
