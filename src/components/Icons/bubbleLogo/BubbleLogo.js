// library
import React from 'react';
import { useSelector } from 'react-redux';
import { selectSecondaryColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./BubbleLogo.css";

export const BubbleLogo = ({action}) => {

    const secondaryColor = useSelector(selectSecondaryColor);

    return (
        <div
        style={{backgroundColor: secondaryColor}}
        onClick={action} className='logo-container'>
            <svg width="20" height="20" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="31.2724" cy="31.2724" r="31" transform="rotate(-98.5676 31.2724 31.2724)" fill="white" fillOpacity="1"/>
            <path d="M26.8031 1.60714C43.1867 -0.861197 58.4693 10.4194 60.9376 26.803C63.4059 43.1867 52.1253 58.4692 35.7417 60.9376C19.358 63.4059 4.07546 52.1253 1.60714 35.7417C-0.861185 19.358 10.4194 4.07547 26.8031 1.60714Z" stroke="black" strokeOpacity="1" strokeWidth="2"/>
            <ellipse rx="1.73655" ry="7.60638" transform="matrix(-0.482555 -0.875866 0.875865 -0.482556 20.4318 10.4413)" fill="black" fillOpacity="1"/>
            <ellipse cx="10.4316" cy="17.6788" rx="1.24479" ry="1.32937" transform="rotate(-98.5676 10.4316 17.6788)" fill="black" fillOpacity="1"/>
            </svg>
        </div>
    )
}
