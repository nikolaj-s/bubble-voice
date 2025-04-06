import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

export const ImageMasonryWrapper = ({children}) => {

    return (
        <ResponsiveMasonry 
        columnsCountBreakPoints={{500: 1, 700: 2, 1000: 3, 1300: 4}}
        gutterBreakPoints={{500: '3px'}}
        >
            <Masonry gutter='2px'>
                {children}
            </Masonry>
        </ResponsiveMasonry>
    )
}
