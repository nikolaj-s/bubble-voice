import React from 'react'
import { NoMedia } from '../../../../../../components/NoMedia/NoMedia'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { ImagePreview } from '../../../../../../components/ImagePreview/ImagePreview'
import { VideoPreview } from '../../../../../../components/VideoPreview/VideoPreview'
import { useSelector } from 'react-redux'
import { selectShowFullResPreviews } from '../../../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice'

export const Reccomendations = ({media, count, expand, openMetaData}) => {

    const showFullResPreviews = useSelector(selectShowFullResPreviews);

    return (
        <>
        {media?.length === 0 ?
            <NoMedia alt={true} message={"No Server Media, Start Using The Image Search To Populate This Area"} />
            :
            <ResponsiveMasonry key="recommendations-data" style={{width: 'calc(100% - 5px)'}} columnsCountBreakPoints={{800: 1, 1000: 2, 1500: 3, 1900: 4, 2500: 5}}>
                <Masonry gutter='5px'> 
                    {media.map((img, key) => {
                        return (
                           <>
                            {img.type === 'image' ?
                            <ImagePreview key={img.image} altImage={img.preview} nsfw={img.nsfw} image={img.image} expand={(i) => {expand(i); openMetaData(img)}} tags={img.tags} />
                            :
                            <VideoPreview action={() => {expand(img.link)}} video={img} />}
                            </>
                        )
                    })}
                </Masonry>
            </ResponsiveMasonry>}
        </>
    )
}
