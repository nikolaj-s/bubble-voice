import React from 'react'
import Header from '../../../components/Titles/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { ImageComponent } from '../../../components/Image/Image';
import Label from '../../../components/Titles/Label/Label';
import TextInput from '../../../components/Inputs/TextInput/TextInput';
import TextButton from '../../../components/Buttons/TextButton/TextButton';
import { setServerToJoinPassword } from '../../../features/JoinServer/joinServerSlice';
import TextLabelError from '../../../components/Error/TextLabelError/TextLabelError';
import SpinnerLoading from '../../../components/Loading/Spinner/SpinnerLoading';
import { useNavigate } from 'react-router';
import { JoinServer } from '../../../features/JoinServer/Thunks/JoinServer';

export const JoinServerForm = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {selectedServer, loading, error, password} = useSelector(state => state.joinServerSlice);

  const handleJoinServer = () => {
    
    if (loading) return;

    dispatch(JoinServer(navigate));

  }

  return (
    <>
    <Header text={`Join ${selectedServer?.server_name || 'Bubble'}`} />
    <div style={{
      width: '100%',
      height: 200,
      borderRadius: '10px',
      overflow: 'hidden'
    }}>
    <ImageComponent src={selectedServer?.server_banner} />
    </div>
    <Label label='Enter Server Password' />
    <TextInput value={password} onChange={(value) => {dispatch(setServerToJoinPassword(value))}} type='password'  />
    {error ? <TextLabelError label='Error:' error={error} /> : null}
    {loading ? <SpinnerLoading /> : null}
    <TextButton action={handleJoinServer} title='Join' />
    </>
  )
}
