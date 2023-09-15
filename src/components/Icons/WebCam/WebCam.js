import React from 'react'
import { useSelector } from 'react-redux';

import {selectTextColor} from "../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice";

export const WebCam = () => {

  const color = useSelector(selectTextColor);

  return (
    <div className='extra-media-icon' >
        <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M31 15.25C31 13.5924 30.3415 12.0027 29.1694 10.8306C27.9973 9.65848 26.4076 9 24.75 9H10.25C8.5924 9 7.00268 9.65848 5.83058 10.8306C4.65848 12.0027 4 13.5924 4 15.25V32.75C4 34.4076 4.65848 35.9973 5.83058 37.1694C7.00268 38.3415 8.5924 39 10.25 39H24.75C26.4076 39 27.9973 38.3415 29.1694 37.1694C30.3415 35.9973 31 34.4076 31 32.75V15.25ZM33 29.532L39.961 34.968C41.603 36.25 44 35.08 44 32.998V15.003C44 12.92 41.603 11.751 39.961 13.033L33 18.468V29.532Z" fill={color}/>
        </svg>
    </div>
  )
}
