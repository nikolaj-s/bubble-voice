import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const AltImageIcon = ({width = '100%', height = '100%'}) => {

    const color = useSelector(selectTextColor);

    return (
        <svg width={width} height={height} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40.625 6.25H9.375C7.71795 6.25181 6.12929 6.91087 4.95758 8.08258C3.78587 9.25429 3.12681 10.843 3.125 12.5V37.5C3.12681 39.157 3.78587 40.7457 4.95758 41.9174C6.12929 43.0891 7.71795 43.7482 9.375 43.75H40.625C42.282 43.7482 43.8707 43.0891 45.0424 41.9174C46.2141 40.7457 46.8732 39.157 46.875 37.5V12.5C46.8732 10.843 46.2141 9.25429 45.0424 8.08258C43.8707 6.91087 42.282 6.25181 40.625 6.25ZM32.8125 12.5C33.7396 12.5 34.6459 12.7749 35.4167 13.29C36.1876 13.8051 36.7884 14.5371 37.1432 15.3937C37.498 16.2502 37.5908 17.1927 37.4099 18.102C37.2291 19.0113 36.7826 19.8465 36.1271 20.5021C35.4715 21.1576 34.6363 21.6041 33.727 21.7849C32.8177 21.9658 31.8752 21.873 31.0187 21.5182C30.1621 21.1634 29.4301 20.5626 28.915 19.7917C28.3999 19.0209 28.125 18.1146 28.125 17.1875C28.1263 15.9447 28.6206 14.7532 29.4994 13.8744C30.3782 12.9956 31.5697 12.5013 32.8125 12.5ZM9.375 40.625C8.5462 40.625 7.75134 40.2958 7.16529 39.7097C6.57924 39.1237 6.25 38.3288 6.25 37.5V30.8955L15.5117 22.6631C16.4053 21.8706 17.5675 21.4485 18.7614 21.483C19.9553 21.5175 21.0911 22.0059 21.9375 22.8486L28.2803 29.1777L16.833 40.625H9.375ZM43.75 37.5C43.75 38.3288 43.4208 39.1237 42.8347 39.7097C42.2487 40.2958 41.4538 40.625 40.625 40.625H21.2529L33.1104 28.7676C33.9499 28.0536 35.0152 27.6603 36.1173 27.6575C37.2193 27.6546 38.2867 28.0424 39.1299 28.752L43.75 32.6016V37.5Z" fill={color} />
        </svg>
    )
}
