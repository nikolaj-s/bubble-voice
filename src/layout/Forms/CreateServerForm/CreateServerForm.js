import React from 'react'
import Label from '../../../components/ui/Titles/Label/Label'
import TextInput from '../../../components/ui/Inputs/TextInput/TextInput'
import ImageDropZone from '../../../components/ui/Inputs/ImageDropZone/ImageDropZone'
import { useDispatch, useSelector } from 'react-redux'
import { selectCreateServerError, selectCreateServerLoading } from '../../../features/CreateServer/createServerSlice'
import SpinnerLoading from '../../../components/ui/Loading/Spinner/SpinnerLoading'
import { CreateServerThunk } from '../../../features/CreateServer/Thunks/CreateServerThunk'
import TextLabelError from '../../../components/Error/TextLabelError/TextLabelError'
import PasswordRequirements from '../../../components/ui/PasswordRequirements/PasswordRequirements'
import CreateBubbleSplash from '../../../components/Headers/CreateBubbleSplash/CreateBubbleSplash'
import { ApplyChangesPopup } from '../../../components/ApplyChangesPopup/ApplyChangesPopup'

export const CreateServerForm = () => {

    const dispatch = useDispatch();

    const [name, setName] = React.useState("");

    const [password, setPassword] = React.useState("");

    const [confirmPassword, setConfirmPassword] = React.useState("");

    const [validPassword, toggleValidPassword] = React.useState(false); 

    const [banner, setBanner] = React.useState(null);

    const loading = useSelector(selectCreateServerLoading);

    const error = useSelector(selectCreateServerError);

    const handleCreateServer = () => {
        if (loading) return;

        dispatch(CreateServerThunk({name, password, confirmPassword, banner}));
    }

    return (
        <>
            <CreateBubbleSplash />
            <Label label='Upload A Banner' />
            <ImageDropZone parentFileSrc={banner}  width={320} height={200} onImageChange={setBanner}/>
            <Label label='Bubble Name:' />
            <TextInput placeholder={"Name"} type='text' value={name} onChange={setName} />
            <PasswordRequirements isValid={toggleValidPassword} password={password} />
            <TextInput placeholder={"Password"}  value={password} onChange={setPassword} type='password' />
            
            <Label label="Confirm Password" />
            {password !== confirmPassword && (<TextLabelError error={'Passwords do not match'} />)}
            <TextInput placeholder={'Confirm Password'} value={confirmPassword} onChange={setConfirmPassword} type='password' />
            
            {loading ? <SpinnerLoading /> : null}
            {error ? <TextLabelError label='Error:' error={error} /> : null}
            <ApplyChangesPopup onApply={handleCreateServer} name='Create Bubble' disabled={(name.trim().length < 3) || !banner || !validPassword || (confirmPassword !== password)} />
           
         </>
    )
}
