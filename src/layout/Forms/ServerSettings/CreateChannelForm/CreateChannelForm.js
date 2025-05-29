import React from 'react'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label'
import TextInput from '../../../../components/ui/Inputs/TextInput/TextInput'
import TypeInput from '../../../../components/ui/Inputs/TypeInput/TypeInput'
import { NotAuthorized } from '../../../../components/Error/NotAuthorized/NotAuthorized'
import ImageDropZone from '../../../../components/ui/Inputs/ImageDropZone/ImageDropZone'
import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { createChannel } from '../../../../features/Channel/Channels/Thunks/createChannel'
import Dropdown from '../../../../components/ui/Inputs/DropDown/DropDown'
import { ApplyChangesPopup } from '../../../../components/ApplyChangesPopup/ApplyChangesPopup'
import { useSearchParams } from 'react-router-dom'

export const CreateChannelForm = ({permissions}) => {

    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const {categories} = useSelector(state => state.categoriesSlice);

    const [category, setCategory] = React.useState({category_id: 'channels', category_name: "Channels"});

    const {selectedChannel} = useSelector(state => state.editChannelSlice);

    const {loading} = useSelector(state => state.channelsSlice);

    const [channelName, setChannelName] = React.useState("");

    const [channelType, setChannelType] = React.useState("voice");

    // eslint-ignore-next-line
    const channelTypes = [
        {title: "Voice / Video", description: "Instant voice and video communication for seamless real-time interaction.", type: 'voice'},
        {title: "Text", description: "Live text-based conversations with instant messaging and rich formatting.", type: "text"},
        {title: "Thread", description: "Structured thread channel for paginated rich text discussions with formatting and media support.", type: "thread"}
    ]

    const [channelIcon, setChannelIcon] = React.useState(null);

    const handleCreateChannel = () => {
        dispatch(createChannel({channelName, channelIcon, channelType, category: category.category_id}))
    }

    const clearChanges = () => {
        setChannelName("");

        setChannelType("voice");
    }

    React.useEffect(() => {

        if (selectedChannel._id) {
            setSearchParams({section: "editChannel", channel: selectedChannel._id});
        }

    // eslint-ignore-next-line
    }, [selectedChannel])

    return (
        <NotAuthorized permission={permissions?.user_can_create_channels}>
            <LoadingErrorFormWrapper sliceName='channelsSlice'>
                <Header text='Create Channel' />
                <Label label='Choose a custom channel icon:' />
                <ImageDropZone dimensions={100} width={50} height={50} borderRadius='50%' onImageChange={setChannelIcon} />
                <Label label='Set your channel name:' />
                <TextInput placeholder={'Enter Channel Name'} maxLength={28} value={channelName} onChange={setChannelName} />
                <Label label='Select Category:' />
                <Dropdown options={[{category_name: "Channels", category_id: "channels"}, ...categories]} selector='category_name' selected={category} setSelected={(value) => {setCategory(value)}} />
                <Label label='Select a channel type:' />
                <TypeInput 
                selected={channelType} 
                types={channelTypes} 
                onSelect={setChannelType} />
                <ApplyChangesPopup disabled={channelName.trim().length < 3 || loading} name='Create Channel' onClearChanges={clearChanges} onApply={handleCreateChannel} />
          </LoadingErrorFormWrapper>
        </NotAuthorized>
    )
}
