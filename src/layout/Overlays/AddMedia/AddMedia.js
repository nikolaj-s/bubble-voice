import React from 'react'
import ContentHeader from '../../../components/Headers/ContentHeader/ContentHeader'
import { Music } from 'lucide-react'
import Label from '../../../components/ui/Titles/Label/Label'
import ImageDropZone from '../../../components/ui/Inputs/ImageDropZone/ImageDropZone'
import TextInput from '../../../components/ui/Inputs/TextInput/TextInput'
import TextLabelError from '../../../components/Error/TextLabelError/TextLabelError'
import MediaUpload from '../../../components/MediaUpload/MediaUpload'
import { ApplyChangesPopup } from '../../../components/ApplyChangesPopup/ApplyChangesPopup'
import ScrollLoadWrapper from '../../../components/ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../../../features/Channel/TextChannel/Thunks/sendMessage'
import { closeOverlay } from '../../../features/Overlay/overlaySlice'
import { Card } from '../../../components/ui/Wrappers/Card/Card'
import { getImageColor } from '../../../lib/services/getImageColor'
import { getImageColorFromFile } from '../../../lib/services/getImageColorFromFile'

export const AddMedia = () => {

    const dispatch = useDispatch();

    const [error, setError] = React.useState(null);

    const [thumbnail, setThumbnail] = React.useState(null);

    const [thumbnailPreview, setThumbnailPreview] = React.useState(null);

    const [file, setFile] = React.useState(null);

    const [title, setTitle] = React.useState("");

    const [duration, setDuration] = React.useState(null);

    const [color, setColor] = React.useState(null);

    const {currentTextChannel} = useSelector(state => state.textChannelSlice);


    const handleThumbnail = async (data) => {

        setThumbnailPreview(data.dataUrl);

        setThumbnail(data.file);

    }

    const handleMediaColor = async (file) => {
        const l_color = await getImageColorFromFile(file);

        setColor(l_color);
    }

    React.useEffect(() => {

        if (thumbnail) {

            handleMediaColor(thumbnail);

        } else {
            setColor(null);
        }

    }, [thumbnail])

    React.useEffect(() => {

        return () => {
            setThumbnailPreview(null);
            setThumbnail(null);
        }

    }, [])

    const handleMediaUpload = () => {

        if (!currentTextChannel) return setError("You must be in a text channel to upload your creation");

        const media_upload = {
            thumbnail: thumbnail,
            media: file,
            media_title: title,
            duration,
            channel_id: currentTextChannel,
            color
        }

        dispatch(sendMessage(media_upload));

        dispatch(closeOverlay())

    }

    return (
            <ScrollLoadWrapper style={{backgroundColor: 'var(--card-background-color)'}}>
                <Card>
                <ContentHeader Icon={Music} title={'Upload your media creation'} />
                <Label label='Thumbnail' />
                <ImageDropZone existingImage={thumbnailPreview} onImageChange={setThumbnail} dimensions={100} width={100} height={100} />
                <Label label='Title Your Media' />
                <TextInput value={title} onChange={setTitle} placeholder='make it unique...' />
                <Label label='Upload Media' />
                {error && (<TextLabelError error={error} />)}
                <MediaUpload onDuration={(time) => {setDuration(Math.floor(time))}} 
                onChange={(data) => {
                    console.log(data)
                    if (data?.meta?.optimized || data?.meta?.note === "Already under size limit.") {
                        setFile(data?.file)
                    } else {
                        setFile(null);
                    }
                    }} 
                    onFileName={setTitle} 
                    onThumbnail={handleThumbnail} 
                    onError={setError}  
                />
                </Card>
                <ApplyChangesPopup 
                    onApply={handleMediaUpload}
                    name='Upload' disabled={!file} 
                    onClearChanges={() => {
                    setFile(null);
                    setTitle("");
                    setThumbnail(null);
                    setThumbnailPreview(null);
                }} />
            </ScrollLoadWrapper>
    )
}
