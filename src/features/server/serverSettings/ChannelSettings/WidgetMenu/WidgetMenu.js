// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRoutes } from 'react-router';

// state
import { selectHeaderTitle, setHeaderTitle } from '../../../../contentScreen/contentScreenSlice';
import { TextButton } from '../../../../../components/buttons/textButton/TextButton';

// components
import { InputTitle } from '../../../../../components/titles/inputTitle/InputTitle';
import { TitleWidgetButton } from '../../../../../components/widgets/WidgetButtons/TitleWidgetButton/TitleWidgetButton';
import { PlainTextWidgetButton } from '../../../../../components/widgets/WidgetButtons/PlainTextWidgetButton/PlainTextWidgetButton';
import { SettingsSpacer } from '../../../../../components/Spacers/SettingsSpacer/SettingsSpacer'
import { ListWidgetButton } from '../../../../../components/widgets/WidgetButtons/ListWidgetButton/ListWidgetButton';
import { ImageWidgetButton } from '../../../../../components/widgets/WidgetButtons/ImageWidgetButton/ImageWidgetButton';
import { DynamicGalleryWidgetButton } from '../../../../../components/widgets/WidgetButtons/DynamicGalleryButton/DynamicGalleryButton';
import { VideoWidgetButton } from '../../../../../components/widgets/WidgetButtons/VideoWidgetButton/VideoWidgetButton';
import { MusicWidgetButton } from '../../../../../components/widgets/WidgetButtons/MusicWidgetButton/MusicWidgetButton';

// style
import "./WidgetMenu.css";
import { ImplementWidgetMenu } from '../../../../../components/widgets/ImplementWidgetMenu/ImplementWidgetMenu';

const Wrapper = () => {

    const dispatch = useDispatch();

    const headerTitle = useSelector(selectHeaderTitle);

    const [addingWidget, toggleAddingWidget] = React.useState(false);

    const [type, setType] = React.useState("");

    const [name, setName] = React.useState("");

    React.useEffect(() => {

        document.getElementsByClassName('content-screen-inner-container')[0].scrollTo(0, 0);

        if (headerTitle.includes('Edit Channel')) {

            dispatch(setHeaderTitle(headerTitle + ' / Add Widget'))

        }

        return () => {
          
            dispatch(setHeaderTitle(""))

        }
    // eslint-disable-next-line
    }, [])

    const handleCancel = () => {
        window.location.hash = window.location.hash.split('/add-widgets')[0];
    }

    const openAddWidgetMenu = (type, name) => {
        toggleAddingWidget(true);
        setType(type)
        setName(name)
    }

    const closeAddWidgetMenu = () => {
        toggleAddingWidget(false);
        setType("")
        setName("")
    }

    return (
        <>
            <div className='widget-menu-container'>
                <InputTitle title={"Text Widgets"} />
                <TitleWidgetButton action={() => {openAddWidgetMenu("title", "Add A Title Widget")}} />
                <div className='text-widgets-large-wrapper'>
                    <PlainTextWidgetButton action={() => {openAddWidgetMenu("plainText", "Plain Text Widget")}} />
                    <ListWidgetButton action={() => {openAddWidgetMenu('list', "Add List Widget")}} />
                </div>
                <InputTitle title={"Image Widgets"} />
                <div className='widgets-button-wrapper'>
                    <ImageWidgetButton action={() => {openAddWidgetMenu('image', "Add Image Widget")}} />
                    <DynamicGalleryWidgetButton action={() => {openAddWidgetMenu("dynamicGallery", "Add Dynamic Image Gallery")}} />
                </div>
                <InputTitle title={"Video Widgets"} />
                <div className='widgets-button-wrapper'>
                    <VideoWidgetButton action={() => {openAddWidgetMenu('video', "Add Video Widget")}} />
                </div>
                <InputTitle title={"Media Widgets"} />
                <div className='widgets-button-wrapper'>
                    <MusicWidgetButton action={() => {openAddWidgetMenu('music', "Add Music Widget")}} />
                </div>
                <TextButton marginTop={"2%"} action={handleCancel} name="Cancel" />
                <SettingsSpacer />
            </div>
            {addingWidget ? <ImplementWidgetMenu close={closeAddWidgetMenu} active={addingWidget} type={type} name={name} /> : null}
        </>
    )
}


export const WidgetMenu = () => useRoutes([
    { path: 'channels/:id/add-widgets', element: <Wrapper /> }
])