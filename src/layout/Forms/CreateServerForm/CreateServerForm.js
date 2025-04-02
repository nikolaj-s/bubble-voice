import React from 'react'
import Label from '../../../components/ui/Titles/Label/Label'
import TextInput from '../../../components/ui/Inputs/TextInput/TextInput'
import ImageDropZone from '../../../components/ui/Inputs/ImageDropZone/ImageDropZone'
import { useDispatch, useSelector } from 'react-redux'
import { selectCreateServerError, selectCreateServerLoading } from '../../../features/CreateServer/createServerSlice'
import SpinnerLoading from '../../../components/ui/Loading/Spinner/SpinnerLoading'
import TextButton from '../../../components/ui/Buttons/TextButton/TextButton'
import { CreateServerThunk } from '../../../features/CreateServer/Thunks/CreateServerThunk'
import TextLabelError from '../../../components/Error/TextLabelError/TextLabelError'

export const CreateServerForm = () => {

    const dispatch = useDispatch();

    const [name, setName] = React.useState("The Igloo");

    const [password, setPassword] = React.useState("TheIgloo321$");

    const [confirmPassword, setConfirmPassword] = React.useState("TheIgloo321$");

    const [banner, setBanner] = React.useState({});

    const loading = useSelector(selectCreateServerLoading);

    const error = useSelector(selectCreateServerError);

    const handleCreateServer = () => {
        if (loading) return;

        dispatch(CreateServerThunk({name, password, confirmPassword, banner}));
    }

    return (
        <>
            <Label label='Bubble Name:' />
            <TextInput placeholder={"Name"} type='text' value={name} onChange={setName} />
            <Label label='Bubble Password: ' />
            <TextInput placeholder={"Password"}  value={password} onChange={setPassword} />
            <Label label="Confirm Password" />
            <TextInput placeholder={'Confirm Password'} value={confirmPassword} onChange={setConfirmPassword} />
            <Label label='Select A Banner' />
            <ImageDropZone width={320} height={200} onImageChange={setBanner}/>
            {loading ? <SpinnerLoading /> : null}
            {error ? <TextLabelError label='Error:' error={error} /> : null}
            <TextButton action={handleCreateServer} title='Create'  />
         </>
    )
}
