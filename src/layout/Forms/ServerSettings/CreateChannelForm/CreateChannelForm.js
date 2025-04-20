import React from 'react'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label'
import TextInput from '../../../../components/ui/Inputs/TextInput/TextInput'
import TextButton from '../../../../components/ui/Buttons/TextButton/TextButton'
import TypeInput from '../../../../components/ui/Inputs/TypeInput/TypeInput'
import { NotAuthorized } from '../../../../components/Error/NotAuthorized/NotAuthorized'
import ImageDropZone from '../../../../components/ui/Inputs/ImageDropZone/ImageDropZone'
import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { createChannel } from '../../../../features/Channels/Thunks/createChannel'
import Dropdown from '../../../../components/ui/Inputs/DropDown/DropDown'

export const CreateChannelForm = ({permissions}) => {

    const dispatch = useDispatch();

    const {categories} = useSelector(state => state.categoriesSlice);

    const [category, setCategory] = React.useState({category_id: 'channels', category_name: "Channels"});

    const [channelName, setChannelName] = React.useState("");

    const [channelType, setChannelType] = React.useState("voice");

    const [channelTypes, setChannelTypes] = React.useState([
        {title: "Voice / Video", description: "Instant voice and video communication for seamless real-time interaction.", type: 'voice'},
        {title: "Text", description: "Live text-based conversations with instant messaging and rich formatting.", type: "text"},
        {title: "Thread", description: "Structured thread channel for paginated rich text discussions with formatting and media support.", type: "thread"}
    ]);

    const [channelIcon, setChannelIcon] = React.useState(null);

    const handleCreateChannel = () => {
        dispatch(createChannel({channelName, channelIcon, channelType, category: category.category_id}))
    }

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
                
                <TextButton action={handleCreateChannel} disabled={channelName.length < 3} title='Create Channel' />
            </LoadingErrorFormWrapper>
        </NotAuthorized>
    )
}
