// library
import React from 'react'
import { useSelector } from 'react-redux';

//state
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

//style
import "./Range.css";

export const Range = ({min = 0, max = 1, action, step = 0.001, value = 0, fill = false, save = () => {}, invert}) => {

    const ref = React.createRef();

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const handleAction = (e) => {

        e.preventDefault();

        e.stopPropagation()

        let target = e.target;

        const local_min = target.min;

        const local_max = target.max;

        const local_value = target.value;

        ref.current.style.backgroundSize = (local_value - local_min) * 100 / (local_max - local_min) + '% 100%'
    
        action(target.value);

    }
    
    React.useEffect(() => {
        
        document.getElementById("root").style.setProperty('--range-main-background', textColor);

        document.getElementById("root").style.setProperty('--range-main-thumb', invert ? primaryColor : accentColor);
        
        ref.current.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%'
        
        // eslint-disable-next-line
    }, [value])

    const onMouseMove = (e) => {
        e.stopPropagation();
    }

    return (
        <div 
        style={{backgroundColor: fill ? primaryColor : null}}
        className='range-container'>
            <input onMouseMove={onMouseMove} ref={ref} onMouseUp={save} id="range-input"
            onChange={handleAction} onClick={(e) => {e.stopPropagation()}}  type={"range"} min={min} max={max} step={step} value={value} />
        </div>
    )
}
