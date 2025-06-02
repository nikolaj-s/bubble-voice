import React from 'react'
import Label from '../../../../../components/ui/Titles/Label/Label'
import ImageDropZone from '../../../../../components/ui/Inputs/ImageDropZone/ImageDropZone'
import { ApplyChangesPopup } from '../../../../../components/ApplyChangesPopup/ApplyChangesPopup'
import { useDispatch } from 'react-redux'
import { createWidget } from '../../../../../features/Widgets/Thunks/createWidget'
import { useSearchParams } from 'react-router-dom'

export const AddSingleImageWidgetForm = ({channel}) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    const [image, setImage] = React.useState(null);

    const create = () => {
        if (image.size > 2 * 1024 * 1024) return;

        if (!channel) return;

        dispatch(createWidget({image, type: 'single_image', ...channel}));

        setSearchParams({section: 'manageWidgets'});
    }

    return (
        <>
        <Label label='Upload an image:' />
        <ImageDropZone parentFileSrc={image} objectFit='contain' onImageChange={setImage} width={400} height={400} />
        <ApplyChangesPopup name='Create' onApply={create} onClearChanges={() => {setImage(null)}} disabled={!image} />
        </>
    )
}
