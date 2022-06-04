import React from 'react'
import { useDispatch } from 'react-redux'
import { useRoutes } from 'react-router'
import { TextInput } from '../../../../components/inputs/TextInput/TextInput';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';

const Settings = () => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setHeaderTitle('Key Bind Settings'))
    }, [])

    return (
        <>
        <InputTitle title={"Push To Talk"} />
        <TextInput />
        <InputTitle title={"Mute Mic"} />
        <TextInput />
        <InputTitle title={"Mute Audio"} />
        <TextInput />
        <InputTitle title={"Activate Camera"} />
        <TextInput />
        <InputTitle title={"Disconnect"} />
        <TextInput />
        </>
    )
}

export const KeyBindSettings = () => useRoutes([
    { path: "keybindings", element: <Settings /> }
])
