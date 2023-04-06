import React from 'react'
import { useSelector } from 'react-redux'

import {selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { TextButton } from '../../buttons/textButton/TextButton';

import "./DropImageIcon.css";

export const DropImageIcon = ({action}) => {

    const color = useSelector(selectTextColor);

    const cancel = (e) => {
        e.stopPropagation();
        action();
    }

    return (
        <div className='image-drop-icon'>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M45.8334 24.9998C45.8334 23.8492 44.9007 22.9165 43.7501 22.9165C42.5995 22.9165 41.6667 23.8492 41.6667 24.9998H45.8334ZM25.0001 8.33317C26.1507 8.33317 27.0834 7.40043 27.0834 6.24984C27.0834 5.09924 26.1507 4.1665 25.0001 4.1665V8.33317ZM40.6251 41.6665H9.37508V45.8332H40.6251V41.6665ZM8.33341 40.6248V9.37484H4.16675V40.6248H8.33341ZM41.6667 24.9998V40.6248H45.8334V24.9998H41.6667ZM9.37508 8.33317H25.0001V4.1665H9.37508V8.33317ZM9.37508 41.6665C8.79979 41.6665 8.33341 41.2001 8.33341 40.6248H4.16675C4.16675 43.5013 6.49859 45.8332 9.37508 45.8332V41.6665ZM40.6251 45.8332C43.5015 45.8332 45.8334 43.5013 45.8334 40.6248H41.6667C41.6667 41.2001 41.2004 41.6665 40.6251 41.6665V45.8332ZM8.33341 9.37484C8.33341 8.79955 8.79978 8.33317 9.37508 8.33317V4.1665C6.4986 4.1665 4.16675 6.49835 4.16675 9.37484H8.33341Z" fill={color}/>
            <path d="M6.25 36.4582L17.3886 26.2478C18.1655 25.5356 19.352 25.5158 20.1522 26.2018L33.3333 37.4999" stroke={color} strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M29.1667 32.2915L34.1391 27.3191C34.8722 26.5861 36.0328 26.5036 36.8623 27.1257L43.7501 32.2915" stroke={color} strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M38.5417 18.75V6.25" stroke={color} strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M33.3335 11.4583L38.5418 6.25L43.7502 11.4583" stroke={color} strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 style={{color: color}}>Drop Media</h1>
            <TextButton name={"Cancel"} action={cancel} />
        </div>
    )
}
