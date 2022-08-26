import React from 'react'
import { useSelector } from 'react-redux'
import { TextButton } from '../../../components/buttons/textButton/TextButton';
import { TextInput } from '../../../components/inputs/TextInput/TextInput';
import { OptionSpacer } from '../../../components/Spacers/OptionSpacer/OptionSpacer';
import { selectSecondaryColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const Verification = () => {

    // application color's
    const secondaryColor = useSelector(selectSecondaryColor);

    return (
        <div className='sign-in-outer-container'>
            <div style={{
                backgroundColor: secondaryColor
            }} className='sign-in-inner-container'>
                <div className='content-wrapper'>
                    <h2 style={{marginTop: 0, paddingTop: 0}} className='sign-in-header'>Verification</h2>
                    <TextInput marginBottom='2%' placeholder={"Verification Code"} />
                    <TextButton name={"Verify"} />
                    <OptionSpacer />
                    <TextButton name={"Re Send"} />
                </div>
            </div>
        </div>
    )
}
