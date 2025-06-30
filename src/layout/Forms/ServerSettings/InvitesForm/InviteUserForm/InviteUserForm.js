import React, { useState } from 'react'
import Label from '../../../../../components/ui/Titles/Label/Label'
import TextInput from '../../../../../components/ui/Inputs/TextInput/TextInput'

export const InviteUserForm = () => {

    const [value, setValue] = useState("");

    return (
        <>
        <Label label='Find a user by their username to send a direct invite' />
        <TextInput value={value} onChange={setValue} placeholder='e.g @username' />
        </>
    )
}
