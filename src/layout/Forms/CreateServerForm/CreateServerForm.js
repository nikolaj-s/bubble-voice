import React from 'react'
import { FormWrapper } from '../../../components/ui/Wrappers/FormWrapper/FormWrapper'
import Label from '../../../components/Titles/Label/Label'
import TextInput from '../../../components/Inputs/TextInput/TextInput'

export const CreateServerForm = () => {

    const [name, setName] = React.useState("");

    const [password, setPassword] = React.useState("");

    const [banner, setBanner] = React.useState({});

    return (
        <FormWrapper header={"Create Bubble"}>
            <Label label='Bubble Name:' />
            <TextInput placeholder={"Name"} type='text' value={name} onChange={setName} />
            <Label label='Bubble Password: ' />
            <TextInput placeholder={"Password"} type='password' value={password} onChange={setPassword} />
        </FormWrapper>
    )
}
