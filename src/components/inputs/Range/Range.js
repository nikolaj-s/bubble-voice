// library
import React from 'react'
import { useSelector } from 'react-redux';

//state
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

//style
import "./Range.css";

export const Range = ({min = 0, max = 1, action, step = 0.001, value = 0, fill = false}) => {

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const handleAction = (e) => {

        let target = e.target;

        const local_min = target.min;

        const local_max = target.max;

        const local_value = target.value;

        target.style.backgroundSize = (local_value - local_min) * 100 / (local_max - local_min) + '% 100%'
    
        action(target.value);

    }
    
    React.useEffect(() => {
        
        document.getElementById("root").style.setProperty('--range-main-background', textColor);

        document.getElementById("root").style.setProperty('--range-main-thumb', accentColor);

        document.getElementById('range-input').style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%'
    
        // eslint-disable-next-line
    }, [])

    return (
        <div 
        style={{backgroundColor: fill ? primaryColor : null}}
        className='range-container'>
            <input id="range-input"
            onChange={handleAction} type={"range"} min={min} max={max} step={step} value={value} />
        </div>
    )
}
