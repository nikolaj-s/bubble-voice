import React from 'react'

import { ButtonAnimationWrapper } from '../../../components/buttons/ButtonAnimationWrapper/ButtonAnimationWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { selectAccentColor, selectTextColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { findSimilarImages, selectLoadingSimilarImages, selectSimilarImages, selectSimilarImagesSource } from '../../SimilarImageMenu/SimilarImageSlice'

import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'

import "./SimilarResults.css";
import { ImagePreview } from '../../../components/ImagePreview/ImagePreview'
import { setExpandedContent, setMetaData } from '../ExpandContentSlice'
import { Loading } from '../../../components/LoadingComponents/Loading/Loading'

export const SimilarResults = ({expandedContent}) => {

    const dispatch = useDispatch();

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const loading = useSelector(selectLoadingSimilarImages);

    const similarImageSource = useSelector(selectSimilarImagesSource);

    const images = useSelector(selectSimilarImages);

    const expand = (i) => {
        dispatch(setExpandedContent(i))
    }

    const sendMetaData = (i) => {
        dispatch(setMetaData(i))
    }

    const handleFindSimilar = () => {

        if (!expandedContent) return;

        if (loading) return;
        
        dispatch(findSimilarImages({image: expandedContent, withinExpanded: true}))
    }

    return (
        <>
        {expandedContent === similarImageSource ? null :
        <ButtonAnimationWrapper action={handleFindSimilar} background={accentColor} padding={"5px 4px"} borderRadius='10px' height={28} width={'290px'} >
            <p style={{color: textColor}}>Find Similar Images</p>
        </ButtonAnimationWrapper>}
        <div className='similar-results-container'>
            <ResponsiveMasonry style={{height: 'auto'}} columnsCountBreakPoints={{0: 2}}>
                <Masonry gutter='5px'> 
                    {images.map(image => {
                        return (
                            <ImagePreview action={() => {sendMetaData(image)}} expand={expand} key={image.image} altImage={image.preview} image={image.image} /> 
                        )
                    })}
                    
                </Masonry>
            </ResponsiveMasonry>
            <Loading loading={loading} />
        </div>
        </>
    )
}
