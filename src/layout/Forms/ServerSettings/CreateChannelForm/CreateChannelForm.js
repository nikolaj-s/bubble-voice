import React from 'react'
import Header from '../../../../components/Titles/Header/Header'
import Label from '../../../../components/Titles/Label/Label'
import TextInput from '../../../../components/Inputs/TextInput/TextInput'
import TextButton from '../../../../components/Buttons/TextButton/TextButton'
import TypeInput from '../../../../components/Inputs/TypeInput/TypeInput'

export const CreateChannelForm = ({permissions}) => {

    const [channelName, setChannelName] = React.useState("");

    const [channelType, setChannelType] = React.useState("voice");

    const [channelTypes, setChannelTypes] = React.useState(["voice", "text", "screenshots"]);

    return (
        <>
        <Header text='Create Channel' />
        <Label label='Channel Name:' />
        <TextInput placeholder={'Enter Channel Name'} onChange={setChannelName} />
        <Label label='Channel Type' />
        <TypeInput selected={channelType} types={channelTypes} onSelect={setChannelType} />
        <TextButton disabled={channelName.length < 3} title='Create Channel' />
        </>
    )
}
