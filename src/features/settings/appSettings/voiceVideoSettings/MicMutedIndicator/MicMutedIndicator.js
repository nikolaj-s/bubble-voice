import React from 'react'
import { useSelector } from 'react-redux'
import { selectAccentColor, selectTextColor } from '../../appearanceSettings/appearanceSettingsSlice'
import "./MicMutedIndicator.css";
import { MicMuted } from '../../../../../components/Icons/MicMuted/MicMuted';
export const MicMutedIndicator = () => {

    const [init, toggleInit] = React.useState(false);

    const textColor = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor);

    React.useEffect(() => {
        setTimeout(() => {
            toggleInit(true);
        }, 1500)
    })

    return (
        <div 
        style={{backgroundColor: accentColor}}
        className='mic-muted-indicator-container'>
            {init ? null :
            <p style={{color: textColor}}>
                Your Mic Is Muted When Editing These Settings
            </p>
            }
            <MicMuted width={30} height={30} />
        </div>
    )
}
