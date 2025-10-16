import React from 'react'
import { Card } from '../../../components/ui/Wrappers/Card/Card'
import { useDispatch, useSelector } from 'react-redux'
import Label from '../../../components/ui/Titles/Label/Label';
import ContentHeader from '../../../components/Headers/ContentHeader/ContentHeader';
import { Pencil } from 'lucide-react';
import TextArea from '../../../components/ui/Inputs/TextArea/TextArea';
import ToggleSwitch from '../../../components/ui/Inputs/ToggleSwitch/ToggleSwitch';
import { ApplyChangesPopup } from '../../../components/ApplyChangesPopup/ApplyChangesPopup';
import SpinnerLoading from '../../../components/ui/Loading/Spinner/SpinnerLoading';
import TextLabelError from '../../../components/Error/TextLabelError/TextLabelError';
import { ImageComponent } from '../../../components/ui/Image/Image';
import ScrollLoadWrapper from '../../../components/ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper';
import VideoPlayer from '../../../components/ui/Video/VideoPlayer/VideoPlayer';
import { triggerAlert } from '../../../features/Alerts/alertsSlice';
import { editMessage } from '../../../features/EditMessage/Thunks/editMessage';
import { useNavigate } from 'react-router';
import LinkPreview from '../../../components/LinkPreview/LinkPreview';

export const EditMessage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [text, setText] = React.useState("");

    const [nsfw, toggleNsfw] = React.useState(false);

    const [changeMade, toggleChangeMade] = React.useState(false);

    const [images, setImages] = React.useState([]);

    const [video, setVideo] = React.useState(null);

    const {loading, error, selectedMessage: message} = useSelector(state => state.editMessageSlice);

    React.useEffect(() => {

        setText(message?.text || "");

        toggleNsfw(message?.nsfw || false);

        setImages(message?.image ? [message?.image] : message?.images ? message?.images : []);

        setVideo(message?.video);

    }, [message])


    React.useEffect(() => {

        toggleChangeMade(JSON.stringify({...message, nsfw, text}) !== JSON.stringify(message))

    }, [nsfw, message, text])

    const handleClearChanges = () => {
        setText(message?.text || "");

        toggleNsfw(message?.nsfw || false);
    }

    const handleApplyChanges = () => {

        if (loading) return;

        if (!images.length && text.length === 0) return dispatch(triggerAlert("Cant update message to be empty", 'error'));

        dispatch(editMessage({message: {...message, text, nsfw}}, navigate))

    }

    return (   
        
        <ScrollLoadWrapper > 
            <Card>
                <ContentHeader Icon={Pencil} title={'Edit Your Message'} />
                {error && (<TextLabelError error={error} />)}
                <Label label='Change Text' />
                <TextArea text={text} setText={setText} limit={512} />

                <Label label='Mark Nsfw' />

                <ToggleSwitch initialState={nsfw} onToggle={toggleNsfw} />
                {(images.length || video || message?.link_preview)&& (<Label label='Media Contained In This Message' />)}
                {images?.map(img => {
                    return <ImageComponent key={img} borderRadius={10} width={150} height={150} src={img} />
                })}
                {video && (<VideoPlayer src={video} />)}
                <ApplyChangesPopup onApply={handleApplyChanges} disabled={!changeMade} onClearChanges={handleClearChanges} />
                {loading && (<SpinnerLoading />)}
                {message?.link_preview && (<LinkPreview link_preview={message?.link_preview} />)}
            </Card>
         </ScrollLoadWrapper>
    )
}
