import React from 'react'
import Label from '../../../../../components/ui/Titles/Label/Label'
import ImageDropZone from '../../../../../components/ui/Inputs/ImageDropZone/ImageDropZone'
import { ApplyChangesPopup } from '../../../../../components/ApplyChangesPopup/ApplyChangesPopup'
import { useDispatch } from 'react-redux'
import { createWidget } from '../../../../../features/Widgets/Thunks/createWidget'
import { useSearchParams } from 'react-router-dom'
import { getImageColorFromFile } from '../../../../../lib/services/getImageColorFromFile'

export const AddSingleImageWidgetForm = ({channel}) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    const [color, setColor] = React.useState(null);

    const [image, setImage] = React.useState(null);

    React.useEffect(() => {

        if (image) getImageColorFromFile(image).then(res => {console.log(res);setColor(res)});

        return () => {
            setColor(null);
        }

    }, [image])

    const create = () => {
        if (image.size > 2 * 1024 * 1024) return;

        if (!channel) return;

        dispatch(createWidget({image, type: 'single_image', color, ...channel}));

        setSearchParams({section: 'manageWidgets'});
    }

    return (
        <>
        <Label label='Upload an image:' />
        <ImageDropZone backgroundColor={color} dimensions={1000} parentFileSrc={image} objectFit='contain' onImageChange={setImage} width={400} height={400} />
        <ApplyChangesPopup name='Create' onApply={create} onClearChanges={() => {setImage(null)}} disabled={!image} />
        </>
    )
}
