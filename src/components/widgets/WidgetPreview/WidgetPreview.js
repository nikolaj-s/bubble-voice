// library's
import React from 'react'
import { useSelector } from 'react-redux';
import { Reorder } from 'framer-motion'

// state
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// components
import { DynamicGalleryWidget } from '../Widgets/DynamicGalleryWidget/DynamicGalleryWidget';
import { ImageWidget } from '../Widgets/ImageWIdget/ImageWidget';
import { ListWidget } from '../Widgets/ListWidget/ListWidget';
import { PlainTextWidget } from '../Widgets/PlainTextWidget/PlainTextWidget';
import { TitleWidget } from '../Widgets/TitleWidget/TitleWidget';
import { VideoWidget } from '../Widgets/VideoWIdget/VideoWidget';
import { SubMenuButton } from '../../buttons/subMenuButton/SubMenuButton';
import { InputPlaceHolder } from '../../titles/InputPlaceHolder/InputPlaceHolder'

// style
import "./WidgetPreview.css";
import { MusicWidget } from '../Widgets/MusicWIdget/MusicWIdget';

export const WidgetPreview = ({widgets = [], editing = false, reorder}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <div className='widgets-preview-container'>
            {widgets.length === 0 ? 
            <h3 style={{color: textColor}}>This Channel Has No Widgets</h3> :
            editing ?
            <Reorder.Group className='editing-widgets-preview-container' values={widgets} onReorder={reorder} >
                {widgets.map((widget, key) => {
                return (
                    <Reorder.Item transition={widget.delete ? {duration: 0} : null} className={`${widget.type} editing-single-widget"`} id={widget._id} key={widget._id} value={widget} >
                        {widget.type === 'title' && !widget.delete ? <TitleWidget editing={editing} key={widget._id} widget={widget} /> : null}
                        {widget.type === 'plainText' && !widget.delete ? <PlainTextWidget editing={editing} key={widget._id} widget={widget} /> : null}
                        {widget.type === 'list' && !widget.delete ? <ListWidget editing={editing} key={widget._id} widget={widget} /> : null}
                        {widget.type === 'image' && !widget.delete ? <ImageWidget editing={editing} key={widget._id} widget={widget} /> : null}
                        {widget.type === 'video' && !widget.delete ? <VideoWidget editing={editing} key={widget._id} widget={widget} /> : null}
                        {widget.type === 'dynamicGallery' && !widget.delete ? <DynamicGalleryWidget editing={editing} key={widget._id} widget={widget} /> : null}
                        {widget.type === 'music' && !widget.delete ? <MusicWidget editing={editing} /> : null}
                        {widget.delete ? null : <SubMenuButton position={"absolute"} zIndex={3} top={10} left={"90%"} />}
                        {widget.delete ? <InputPlaceHolder margin={"1% 0"} value={"Hit Apply To Save Changes"} /> : null}
                    </Reorder.Item>
                )
            })}
            </Reorder.Group>
            : widgets.map((widget, key) => {
                return (
                    <>
                    {widget.type === 'title' ? <TitleWidget key={widget._id} widget={widget} /> : null}
                    {widget.type === 'plainText' ? <PlainTextWidget key={widget._id} widget={widget} /> : null}
                    {widget.type === 'list' ? <ListWidget key={widget._id} widget={widget} /> : null}
                    {widget.type === 'image' ? <ImageWidget key={widget._id} widget={widget} /> : null}
                    {widget.type === 'video' ? <VideoWidget key={widget._id} widget={widget} /> : null}
                    {widget.type === 'dynamicGallery' ? <DynamicGalleryWidget key={widget._id} widget={widget} /> : null}
                    {widget.type === 'music' ? <MusicWidget key={widget._id} /> : null}
                    </>
                )
            })}
        </div>
    )
}
