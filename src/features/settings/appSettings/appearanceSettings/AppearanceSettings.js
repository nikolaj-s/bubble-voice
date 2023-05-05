// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from 'react-router'

// components
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { SettingsSpacer } from '../../../../components/Spacers/SettingsSpacer/SettingsSpacer';
import { DropDownList } from '../../../../components/DropDownList/DropDownList'
import { ToggleButton } from '../../../../components/buttons/ToggleButton/ToggleButton';
// state
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { changeTheme, saveTheme, selectAccentColor, selectActivationColor, selectAppearanceChangeMade, selectCurrentTheme, selectGlassState, selectGradient, selectGradients, selectPrimaryColor, selectRgbBackGround, selectSecondaryColor, selectServerAmbiance, selectTextColor, selectThemeOptions, toggleDisableServerAmbiance, toggleRgbBackGround, updateColorValue, updateGlassState, updateGradient } from './appearanceSettingsSlice';
import { SettingsHeader } from '../../../../components/titles/SettingsHeader/SettingsHeader';
import { ColorInput } from '../../../../components/inputs/ColorInput/ColorInput';
import { TextButton } from '../../../../components/buttons/textButton/TextButton';
import { Gradients } from './Gradients/Gradients';

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

    const activationColor = useSelector(selectActivationColor);

    const currentTheme = useSelector(selectCurrentTheme);

    const themeOptions = useSelector(selectThemeOptions);

    const changeMade = useSelector(selectAppearanceChangeMade);

    const rgbBackground = useSelector(selectRgbBackGround);

    const disableServerAmbiance = useSelector(selectServerAmbiance);

    const gradients = useSelector(selectGradients);

    const gradient = useSelector(selectGradient);

    const glass = useSelector(selectGlassState);

    const handleInput = (value, type) => {
        dispatch(updateColorValue({value, type}))
    }

    const handleToggleAppearanceModes = (selector, state) => {
        dispatch(changeTheme(state));

        dispatch(saveTheme());
    }

    const handleSaveAppearanceChanges = () => {

        dispatch(saveTheme());
    
    }

    const handleUpdateGradient = (grad) => {
        dispatch(updateGradient(grad));

        dispatch(saveTheme());
    }

    const handleGlassUi = () => {
        dispatch(updateGlassState());

        dispatch(saveTheme());
    }

    const handleServerAmbiance = () => {
        dispatch(toggleDisableServerAmbiance());

        dispatch(saveTheme())
    }
    
    return (
        <div className='settings-wrapper'>
            <SettingsHeader title={"Presets"} />
            <InputTitle title={"Change Preset"} />
            <DropDownList action={handleToggleAppearanceModes} selectedItem={currentTheme.label} list={themeOptions} />
            <SettingsHeader title={"Choose An Accent Gradient"} />
            <InputTitle title={"Gradients"} />
            <Gradients action={handleUpdateGradient} gradients={gradients} current_gradient={gradient} />
            <SettingsHeader title={"Custom Color Scheme"} />
            <InputTitle title={"Primary Color"} />
            <ColorInput rgb={primaryColor} selector='primaryColor' action={handleInput} />
            <InputTitle title={"Secondary Color"} />
            <ColorInput rgb={secondaryColor} selector='secondaryColor' action={handleInput} />
            <InputTitle  title={"Accent Color"} />
            <ColorInput rgb={accentColor} selector='accentColor' action={handleInput} />
            <InputTitle  title={"Text Color"} />
            <ColorInput rgb={textColor} selector='textColor' action={handleInput} />
            <InputTitle title={"Activation Color"} />
            <ColorInput selector="activationColor" action={handleInput} rgb={activationColor} />
            <InputTitle title={"Glass UI"} />
            <ToggleButton action={handleGlassUi} state={glass} />
            <InputTitle title={"Disable Server Ambiance"} />
            <ToggleButton action={handleServerAmbiance} state={disableServerAmbiance} />
            {changeMade ? <TextButton marginTop={"2%"} action={handleSaveAppearanceChanges} name="Save Changes" /> : null}
            <SettingsSpacer />
        </div>
    )
}

export const AppearanceSettings = () => useRoutes([
    { path: "appearance", element: <Settings /> }
])
