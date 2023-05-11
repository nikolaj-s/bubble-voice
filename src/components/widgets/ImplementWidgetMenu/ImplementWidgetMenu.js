// library's
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

// component's
import { InputTitle } from '../../titles/inputTitle/InputTitle';
import { TextInput } from '../../inputs/TextInput/TextInput';
import { ApplyCancelButton } from '../../buttons/ApplyCancelButton/ApplyCancelButton'
import { ImageInput } from '../../inputs/ImageInput/ImageInput'
import { ToggleButton } from '../../buttons/ToggleButton/ToggleButton';
import { TextArea } from '../../inputs/TextArea/TextArea';
import { Loading } from '../../LoadingComponents/Loading/Loading';
import { Error } from '../../Error/Error';
import { AltError } from '../../AltError/AltError'
import { Video } from '../../Video/Video'
// state
import { selectSecondaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./ImplementWidgetMenu.css";

// socket
import { socket } from '../../../features/server/ServerBar/ServerBar';
import { addWidgetToChannel, selectEditingChannelId } from '../../../features/server/ServerSlice';
import { MusicWidgetButton } from '../WidgetButtons/MusicWidgetButton/MusicWidgetButton';

export const ImplementWidgetMenu = ({active = false, type, name, close}) => {

    const dispatch = useDispatch();

    const [inputTitle, setInputTitle] = React.useState("");

    const [localActive, toggleLocalActive] = React.useState(false);

    const [textValue, setTextValue] = React.useState("");

    const [boolState, toggleBoolState] = React.useState(true);

    const [image, setImage] = React.useState({});

    const [loading, toggleLoading] = React.useState(false);

    const [error, toggleError] = React.useState(false);

    const [errorMessage, setErrorMessage] = React.useState("");

    const [videoAudio, toggleVideoAudio] = React.useState(false);

    const [option1, setOption1] = React.useState("");

    const [option2, setOption2] = React.useState("");

    const [option3, setOption3] = React.useState("");

    const [option4, setOption4] = React.useState("");

    const [option5, setOption5] = React.useState("");

    const [option6, setOption6] = React.useState("");

    const textColor = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const editingChannelId = useSelector(selectEditingChannelId);

    React.useEffect(() => {

        if (type === 'title') {
            setInputTitle("Title")
        } else if (type === 'list') {
            setInputTitle("Create A List Widget By Seperating Each Bulletin With A Comma")
        } else if (type === 'plainText') {
            setInputTitle("Plain Text Widget")
        } else if (type === 'image') {
            setInputTitle("Upload Image")
        } else if (type === 'dynamicGallery') {
            setInputTitle("Fetches Images Based On Your Query")
        } else if (type === 'video') {
            setInputTitle('Video')
        }

        document.getElementsByClassName('content-screen-inner-container')[0].style.overflowY = 'hidden'

        document.getElementsByClassName('content-screen-inner-container')[0].scrollTo(0, 0)

        toggleLocalActive(true);

        return () => {

            toggleLocalActive(false);

            document.getElementsByClassName('content-screen-inner-container')[0].style.overflowY = 'auto'
        
            setImage({});

            setTextValue("");
        }
    
    // eslint-disable-next-line
    }, [active, type, name])

    const handleTextValue = (value) => {
        setTextValue(value);
    }

    const addWidget = async () => {

        if ((type !== 'image' && type !== 'music' && type !== 'wheel-spin') && textValue.length < 3) {

            toggleError(true)

            setErrorMessage("Text Input Cannot Be Less Than 3 Characters Long");

            return;
        }

        if (type === 'image' && !image.preview) {
            return;
        }

        if (type === 'image' && image.size > 1000000) {

            toggleError(true)

            setErrorMessage("Image Cannot Be Larger Than 1MB");

            return;
        }
       
        if (type === 'wheel-spin') {

            if (option1.length === 0 || option2.length === 0 || option3.length === 0 || option4.length === 0 || option5.length === 0 || option6.length === 0) {

                toggleError(true);

                setErrorMessage("On More Options Are Empty");

                return;

            }

        }

        toggleLoading(true);

        const widgetObject = {
            type: type,
            file: image,
            text: textValue,
            bool: boolState,
            channel_id: editingChannelId,
            videoAudio: videoAudio
        }
        
        await socket.request('add widget to channel', widgetObject)
        .then(response => {
            
            toggleLoading(false);

            dispatch(addWidgetToChannel({channel_id: response.channel_id, widget: response.data}));

            window.location.hash = window.location.hash.split('/add-widgets')[0]

        })
        .catch(error => {
            console.log(error)
            toggleError(true)
            setErrorMessage(error);
            toggleLoading(false)
        })
    
    }

    const handleSetImage = (file) => {
        setImage(file);
    } 

    const handleToggleBoolState = () => {
        toggleBoolState(!boolState)
    }

    const closeError = () => {
        toggleError(false)
        setErrorMessage("");
    }

    const handleOptionsInput = (value, state) => {

        if (value.includes(',')) return;

        if (value.length > 14) return;

        if (state === 'option1') {
            setOption1(value)
        } else if (state === 'option2') {
            setOption2(value)
        } else if (state === 'option3') {
            setOption3(value)
        } else if (state === 'option4') {
            setOption4(value)
        } else if (state === 'option5') {
            setOption5(value)
        } else if (state === 'option6') {
            setOption6(value)
        }

        setTextValue(`${option1},${option2},${option3},${option4},${option5},${option6}`);

    }

    const handleToggleVideoAudio = () => {
        toggleVideoAudio(!videoAudio);
    }

    return (
        <>
        <AnimatePresence>
            {localActive ? 
            <motion.div 
            style={{
                backgroundColor: secondaryColor
            }}
            className='implement-widget-menu-container'>
                <div 
                style={{
                    backgroundColor: secondaryColor
                }}
                className='inner-implement-widget-menu-container'>
                 
                    {type === 'music' || type === 'wheel-spin' || type === 'subreddit' ? null : 
                    <InputTitle title={inputTitle} />}
                    {type === 'title' || type === 'dynamicGallery' ? <TextInput inputValue={textValue} action={handleTextValue} placeholder={type === 'dynamicGallery' ? "Image Query" : "Text"} /> : null}
                    {type === 'plainText' || type === 'list' ? <TextArea inputValue={textValue} action={handleTextValue} placeHolder={"Text"} /> : null}
                    {type === 'image' ? 
                    <div className='adding-widget-image'>
                        <ImageInput maxDimensions={1280} getFile={handleSetImage} borderRadius='5px' /> 
                    </div>
                    : null}
                    
                    {type === 'video' ? <TextInput marginBottom='2%' inputValue={textValue} action={handleTextValue} placeholder={"Video URL"} /> : null}
                    {type === 'video' ? <AltError error={true} errorMessage={"The below options only work on video links that will play within the native video player."} /> : null}
                    {type === 'video' ? <InputTitle title={"Loop"} /> : null}
                    {type === 'video' ? <ToggleButton state={boolState} action={handleToggleBoolState} /> : null}
                    {type === 'video' ? 
                    <>
                    <InputTitle title={"Preview"} />
                    <div className='video-widget-preview-container'>
                        
                        <Video  objectFit='contain' video={textValue} />
                    </div>
                    </>
                    : null}
                    {type === 'video' ? <InputTitle title={"Audio On By Default"} /> : null}
                    {type === 'video' ? <ToggleButton state={videoAudio} action={handleToggleVideoAudio} /> : null}
                    {type === 'music' ? <MusicWidgetButton prev={true} /> : null}
                    {type === 'wheel-spin' ? 
                    Array.apply(null, Array(6)).map((i, key) => {
                        return (
                            <>
                            <InputTitle key={`title-${key}`} title={`Option ${key + 1}`} />
                            <TextInput key={`input-${key}`} action={handleOptionsInput} stateSelector={`option${key + 1}`} inputValue={eval(`option${key+1}`)} title={'Option'} />
                            </>
                        )
                    })
                    : null}
                    <ApplyCancelButton apply={addWidget} cancel={close} name='Add'  />
                </div>
                <Loading overflow={false} loading={loading} error={error} />
                {error ? <Error action={closeError} errorMessage={errorMessage} /> : null}
            </motion.div> 
            : null}
        </AnimatePresence>
        </>
    )
}
