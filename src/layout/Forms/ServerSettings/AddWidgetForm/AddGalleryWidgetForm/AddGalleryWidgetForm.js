import React from 'react'
import Label from '../../../../../components/ui/Titles/Label/Label'
import { GalleryInput } from '../../../../../components/ui/Inputs/GalleryInput/GalleryInput'
import { ApplyChangesPopup } from '../../../../../components/ApplyChangesPopup/ApplyChangesPopup';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createWidget } from '../../../../../features/Widgets/Thunks/createWidget';

export const AddGalleryWidgetForm = ({channel}) => {

    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const [images, setImages] = React.useState([]);

    const create = () => {

        if (images.length === 0) return;

        dispatch(createWidget({images, type: 'gallery'}));

        setSearchParams({section: "manageWidgets"});

    }

    return (
        <>
        <Label label='Create a gallery fitting for this channel' />
        <GalleryInput onImageChange={setImages} />
        <ApplyChangesPopup onClearChanges={() => {setImages([])}} onApply={create} name='Create Widget' disabled={(images.length < 1)} />
        </>
    )
}
