import { useDispatch, useSelector } from "react-redux"
import { NotAuthorized } from "../../../../components/Error/NotAuthorized/NotAuthorized"
import Header from "../../../../components/ui/Titles/Header/Header"
import { LoadingErrorFormWrapper } from "../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper"
import { useSearchParams } from "react-router-dom"

import React from "react"
import Label from "../../../../components/ui/Titles/Label/Label"
import TextInput from "../../../../components/ui/Inputs/TextInput/TextInput"
import ImageDropZone from "../../../../components/ui/Inputs/ImageDropZone/ImageDropZone"
import TextButton from "../../../../components/ui/Buttons/TextButton/TextButton"
import TextArea from "../../../../components/ui/Inputs/TextArea/TextArea"
import { updateChannel } from "../../../../features/editChannel/Thunks/updateChannel"
import { BoxLabel } from "../../../../components/ui/Titles/BoxLabel/BoxLabel"
import { LineSpacer } from "../../../../components/ui/Spacers/LineSpacer/LineSpacer"
import { deleteChannel } from "../../../../features/editChannel/Thunks/deleteChannel"
import ConfirmationPopup from "../../../../components/ui/Menus/ConfirmationPopup/ConfirmationPopup"
import Dropdown from "../../../../components/ui/Inputs/DropDown/DropDown"
import { Trash2 } from "lucide-react"
import { ApplyChangesPopup } from "../../../../components/ApplyChangesPopup/ApplyChangesPopup"
import { setManageWidgetsForChannel } from "../../../../features/Widgets/manageWidgetsSlice"

export const EditChannelForm = ({permissions}) => {

    const dispatch = useDispatch();

    const defaultCategory = {category_name: 'Channels', category_id: 'channels'};

    const [searchParams, setSearchParams] = useSearchParams();

    const channel = useSelector(state => state.editChannelSlice.selectedChannel);

    const loading = useSelector(state => state.editChannelSlice.loading);

    const [channelIcon, setChannelIcon] = React.useState(null);

    const [channelBackground, setChannelBackground] = React.useState(null);

    const [channelName, setChannelName] = React.useState("");

    const [channelDescription, setChannelDescription] = React.useState("");

    const [confirmDeleteChannel, toggleConfirmDeleteChannel] = React.useState(false);

    const {categories} = useSelector(state => state.categoriesSlice);

    const [category, setCategory] = React.useState(defaultCategory);

    React.useEffect(() => {

        if (!channel?.channel_id) {
            setSearchParams({section: ""});
        }

        setChannelName(channel.channel_name);

        setChannelDescription(channel.channel_description || "");

        setCategory(categories.find(c => c.category_id === channel.category) || defaultCategory);

    }, [channel])

    const handleApplyChanges = () => {

        if (loading) return;

        if (channelName.trim().length < 3) return;

        dispatch(updateChannel({channelIcon, channelBackground, channelName, channelDescription, channel_id: channel.channel_id, category: category.category_id}));
    }

    const handleDeleteChannel = () => {
        if (loading) return;

        dispatch(deleteChannel(channel));
    }

    const openAddWidget = () => {

        dispatch(setManageWidgetsForChannel(channel.channel_id));

        setSearchParams({section: 'addWidget'});
    }

    const openManageWidgets = () => {

        dispatch(setManageWidgetsForChannel(channel.channel_id));

        setSearchParams({section: 'manageWidgets'});
    }

    return (
        <NotAuthorized permission={permissions.user_can_edit_channels}>
            <LoadingErrorFormWrapper sliceName="editChannelSlice">
                <div style={{width: 'auto', alignSelf: 'flex-start'}}>
                    <BoxLabel label={`Channel Type: ${channel.channel_type}`} />
                </div>
                <Header text={`Edit The ${channel.channel_name} Channel`} />
                <LineSpacer />
                <Header level={3} text="Details" />
                <Label label="Edit Channel Name" />
                <TextInput 
                error={channelName?.trim()?.length < 3 ? "Channel name must be longer than 3 characters" : null} 
                value={channelName}
                onChange={setChannelName}
                placeholder={"Name"}
                maxLength={28}
                
                />
                <Label label="Change Category:" />
                <Dropdown selected={category.category_name} options={[defaultCategory, ...categories]} selector="category_name" setSelected={setCategory} />
                <Label label="Channel Description" />
                <TextArea 
                limit={800}
                placeholder="Description"
                text={channelDescription}
                setText={setChannelDescription}
                />
                <LineSpacer />
                <Header level={3} text="Appearance" />
                <Label label="Edit Channel Icon" />
                <ImageDropZone 
                height={50} 
                width={50}
                dimensions={100}
                existingImage={channel.channel_icon}
                onImageChange={setChannelIcon}
                borderRadius="50%"
                />
                
                <Label label="Edit Channel Background" />
                <ImageDropZone 
                width={450}
                height={450}
                existingImage={channel.channel_background}
                onImageChange={setChannelBackground}
                dimensions={1000}
                />
                <LineSpacer />
                <Header level={3} text="Widgets" />
                <Label label="add a widget to this channel" />
                <TextButton action={openAddWidget} maxWidth={150} title="Add Widget" />
                <Label label="Manage Existing Widgets" />
                <TextButton action={openManageWidgets} maxWidth={150} title="Manage" />
                
                {permissions?.user_can_delete_channels &&
                <>
                <LineSpacer />
                <Label label="Delete Channel" />
                <TextButton 
                icon={<Trash2 size={20} color="var(--text-color)" />}
                action={() => {toggleConfirmDeleteChannel(true)}} 
                maxWidth={150} backgroundColor={'var(--error-color)'} 
                title="Delete" />
                </>
                }
                {confirmDeleteChannel && 
                <ConfirmationPopup 
                onCancel={() => {toggleConfirmDeleteChannel(false)}}
                onConfirm={() => {handleDeleteChannel()}}
                message={"Are you sure you want to delete this channel, this will permananetly remove all content"}
                />}
                <ApplyChangesPopup 
                onApply={handleApplyChanges}
                disabled={(!channelIcon && !channelBackground) && (channel.channel_name === channelName || channelName.trim().length < 3) && (channel.channel_description === channelDescription) && (channel.category === category.category_id)}
                />
            </LoadingErrorFormWrapper>
        </NotAuthorized>
    )
}