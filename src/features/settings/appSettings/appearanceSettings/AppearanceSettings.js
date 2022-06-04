import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from 'react-router'
import { TextInput } from '../../../../components/inputs/TextInput/TextInput';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor, updateColorValue } from './appearanceSettingsSlice';

const Settings = () => {

    const dispatch = useDispatch();

    React.useEffect(() => {

        dispatch(setHeaderTitle('Appearance Settings'))

    }, [])

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const handleInput = (value, type) => {
        dispatch(updateColorValue({value, type}))
    }

    return (
        <>
        <InputTitle title={"Primary Color"} />
        <TextInput stateSelector='primaryColor' action={handleInput} inputValue={primaryColor} />
        <InputTitle title={"Secondary Color"} />
        <TextInput stateSelector='secondaryColor' action={handleInput} inputValue={secondaryColor} />
        <InputTitle  title={"Accent Color"} />
        <TextInput stateSelector='accentColor' action={handleInput}  inputValue={accentColor} />
        <InputTitle  title={"Text Color"} />
        <TextInput stateSelector='textColor' action={handleInput}  inputValue={textColor} />
        <InputTitle title={"Presets"} />

        </>
    )
}

export const AppearanceSettings = () => useRoutes([
    { path: "appearance", element: <Settings /> }
])
