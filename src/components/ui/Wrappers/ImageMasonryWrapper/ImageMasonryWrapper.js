import React from 'react';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

export const ImageMasonryWrapper = ({children}) => {

    return (
        <ResponsiveMasonry 
        columnsCountBreakPoints={{500: 1, 510: 3}}
        gutterBreakPoints={{500: '3px'}}
        >
            <Masonry gutter='2px'>
                {children}
            </Masonry>
        </ResponsiveMasonry>
    )
}
