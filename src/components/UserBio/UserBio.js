import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import "./UserBio.css";
import { Image } from '../Image/Image';
import { setExpandedContent } from '../../features/ExpandContent/ExpandContentSlice';

export const UserBio = ({bio = "", margin}) => {

    const dispatch = useDispatch();

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const expand = (ct) => {
        dispatch(setExpandedContent(ct))
    }

    return (
        <>
        {bio.length > 0 ?
        <div style={{backgroundColor: primaryColor, margin: margin}} className='user-bio-preview-container'>
            <h2 style={{color: textColor, fontWeight: '400', margin: '5px 0px'}}>Bio</h2>
            <div className='inner-bio-wrapper'>
                <p style={{color: textColor}}>
                {bio.split(' ').map(i => {
                    return (i.includes('.jpg') || i.includes('.png') || i.includes('.jpeg') || i.includes('.gif') ?
                    <div onClick={() => {expand(i)}} className='mini-bio-image'>
                        <Image cursor='pointer' image={i} />
                    </div>
                    : 
                    i.startsWith('https') ?
                    <a href={i}>{i}</a>
                    :
                    i + " ")
                })}
                </p>
            </div>
            
        </div>
        : null}
        </>
    )
}