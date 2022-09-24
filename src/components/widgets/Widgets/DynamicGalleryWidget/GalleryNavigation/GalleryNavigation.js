// library's
import React from 'react'
import { useSelector } from 'react-redux'

// state
import { selectPrimaryColor, selectTextColor } from '../../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

// style
import "./GalleryNavigation.css";

export const GalleryNavigation = ({images, action, currentIndex}) => {

    const [index, setIndex] = React.useState(0)

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    React.useEffect(() => {
       
        setIndex(currentIndex);

    }, [currentIndex])

    return (
        <div className='gallery-navigation-container'>
            {images.map((_, key) => {
                return (
                    <div
                    style={{
                        width: 15,
                        height: 15,
                        borderRadius: '50%',
                        backgroundColor: index === key ? textColor : primaryColor,
                        flexShrink: 0,
                        margin: '0 0.5rem'
                    }}
                    ></div>
                )
            })}
        </div>
    )
}
