import React from 'react'

import "./ScreenShotShowCase.css";
import { useDispatch, useSelector } from 'react-redux';

import { selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Image } from '../Image/Image';
import { setExpandedContent } from '../../features/ExpandContent/ExpandContentSlice';

export const ScreenShotShowCase = ({screenShots, marginTop = 5}) => {

    const dispatch = useDispatch();

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const expand = (value) => {
        dispatch(setExpandedContent(value))
    }

    return (
        <>
        {screenShots && screenShots?.length > 0 ?
        <>
            <div style={{backgroundColor: primaryColor}} className='screenshot-title-container'>
                <h3 style={{color: textColor, fontSize: '1.2rem', fontWeight: 400}}>Screenshot Showcase</h3>
            </div>
            <div style={{backgroundColor: primaryColor, marginTop: marginTop}} className='screen-shot-showcase-container'>
               
                <div className='screen-shot-wrapper-display'>
                    <div className='most-recent-screenshot-container'>
                        <Image expandContent={expand} cursor='pointer' objectFit='contain' image={screenShots[0].content.image} />
                    </div>
                    <div className='other-screenshots-wrapper'>
                        {screenShots.map((data, i) => {
                            return (i === 0 ? null :
                            <div className='screen-shot-showcase-wrapper'>
                                <Image expandContent={expand} cursor='pointer' objectFit='cover' image={data.content.image} />
                            </div>
                            )
                        })}
                    </div>
                </div>
            </div> 
        </>
        : null}
        </>
    )
}
