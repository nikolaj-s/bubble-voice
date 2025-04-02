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
import ToggleSwitch from "../../../../components/ui/Inputs/ToggleSwitch/ToggleSwitch"
import { updateChannel } from "../../../../features/editChannel/Thunks/updateChannel"
import { BoxLabel } from "../../../../components/ui/Titles/BoxLabel/BoxLabel"

export const EditChannelForm = ({permissions}) => {

    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const channel = useSelector(state => state.editChannelSlice.selectedChannel);

    const loading = useSelector(state => state.editChannelSlice.loading);

    const [channelIcon, setChannelIcon] = React.useState(null);

    const [channelBackground, setChannelBackground] = React.useState(null);

    const [channelName, setChannelName] = React.useState("");

    const [channelDescription, setChannelDescription] = React.useState("");

    React.useEffect(() => {

        if (!channel?.channel_id) {
            setSearchParams({section: ""});
        }

        setChannelName(channel.channel_name);

        setChannelDescription(channel.channel_description || "");

    }, [channel])

    const handleApplyChanges = () => {

        if (loading) return;

        if (channelName.trim().length < 3) return;

        dispatch(updateChannel({channelIcon, channelBackground, channelName, channelDescription, channel_id: channel.channel_id}));
    }

    return (
        <NotAuthorized permission={permissions.user_can_edit_channels}>
            <LoadingErrorFormWrapper sliceName="editChannelSlice">
                <div style={{width: 'auto', alignSelf: 'flex-start'}}>
                    <BoxLabel label={`Channel Type: ${channel.channel_type}`} />
                </div>
                <Header text={`Edit The ${channel.channel_name} Channel`} />
                
                <Label label="Edit Channel Icon" />
                <ImageDropZone 
                height={50} 
                width={50}
                dimensions={50}
                existingImage={channel.channel_icon}
                onImageChange={setChannelIcon}
                borderRadius="50%"
                />
                <Label label="Edit Channel Name" />
                <TextInput 
                error={channelName.trim().length < 3 ? "Channel name must be longer than 3 characters" : null} 
                value={channelName}
                onChange={setChannelName}
                placeholder={"Name"}
                maxLength={28}
                
                />
                <Label label="Edit Channel Background" />
                <ImageDropZone 
                width={450}
                height={450}
                existingImage={channel.channel_background}
                onImageChange={setChannelBackground}
                dimensions={900}
                />
                <Header level={3} text="Details" />
                <Label label="Channel Description" />
                <TextArea 
                limit={800}
                placeholder="Description"
                text={channelDescription}
                setText={setChannelDescription}
                />
                
                <TextButton 
                action={handleApplyChanges}
                title="Apply Changes"
                disabled={(!channelIcon && !channelBackground) && (channel.channel_name === channelName || channelName.trim().length < 3) && (channel.channel_description === channelDescription)} />
            </LoadingErrorFormWrapper>
        </NotAuthorized>
    )
}