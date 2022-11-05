// library's
import React from 'react'
import { useSelector } from 'react-redux';
import { selectAccentColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./ColorInput.css";

export const ColorInput = ({rgb, action, selector}) => {

    const [hex, setHex] = React.useState("#");

    const accentColor = useSelector(selectAccentColor);

    const toHex = (c, i = 0, hex_l = "#") => {

        let h = Number(c[i]).toString(16);

        hex_l += h.length === 1 ? "0" + h : h;

        if (i < c.length - 1) {
            return toHex(c, i+=1, hex_l)
        } else {
            return hex_l;
        }
    }
    
    React.useEffect(() => {

        let rgb_arr;

        try {

            rgb_arr = rgb.split('(')[1].split(')')[0].split(', ');

            setHex(toHex(rgb_arr));

        } catch (error) {
            return;
        }
        
    // eslint-disable-next-line
    }, [rgb])

    const handleChange = (e) => {

        let calc = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e.target.value);
        
        let l_rgb = `rgb(${parseInt(calc[1], 16)}, ${parseInt(calc[2], 16)}, ${parseInt(calc[3], 16)})`;
        
        action(l_rgb, selector)
    
    }

    return (
        <div 
        style={{
            border: `solid ${accentColor} 4px`,
            backgroundColor: rgb
        }}
        className='color-picker-input-container'>
            <input 
            className='color-picker-input' onChange={handleChange} type="color" value={hex}  />
        </div>
    )
}
