import React from 'react'
import Header from '../../../components/ui/Titles/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { ImageComponent } from '../../../components/ui/Image/Image';
import Label from '../../../components/ui/Titles/Label/Label';
import TextInput from '../../../components/ui/Inputs/TextInput/TextInput';
import TextButton from '../../../components/ui/Buttons/TextButton/TextButton';
import { setServerToJoinPassword } from '../../../features/JoinServer/joinServerSlice';
import TextLabelError from '../../../components/Error/TextLabelError/TextLabelError';
import SpinnerLoading from '../../../components/ui/Loading/Spinner/SpinnerLoading';
import { useNavigate } from 'react-router';
import { JoinServer } from '../../../features/JoinServer/Thunks/JoinServer';
import { Description } from '../../../components/ui/Description/Description';
import { Text } from '../../../components/ui/Text/Text';
import ContentPlaceholder from '../../../components/ui/Placeholders/ContentPlaceholder/ContentPlaceholder';
import { AlertCircle } from 'lucide-react';

export const JoinServerForm = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {selectedServer, loading, error, password} = useSelector(state => state.joinServerSlice);

  const handleJoinServer = () => {
    
    if (loading) return;

    dispatch(JoinServer({navigate}));

  }
 

  return (
    <>
    {error ? <TextLabelError error={error} /> : null}
    <h1 style={{color: 'var(--text-color)'}}><span style={{color: 'var(--accent-color)'}}>Join</span> {selectedServer?.server_name}</h1>
    {selectedServer?.welcome_message && (<Description description={selectedServer?.welcome_message} />)}
    <div style={{
      width: '100%',
      height: 200,
      borderRadius: '10px',
      overflow: 'hidden'
    }}>
    <ImageComponent src={selectedServer?.server_banner} />
    </div>
    {selectedServer?.invite_only ?
    <>
    <ContentPlaceholder icon={AlertCircle} title={'Invite Only'} message={'Whoops looks like this exlusive bubble is invite only'} />
    </>
    :
    <>
    <Label label='Enter Server Password' />
    <TextInput value={password} onChange={(value) => {dispatch(setServerToJoinPassword(value))}} type='password' placeholder='password'  />
    <TextButton action={handleJoinServer} title='Join' />
    </>
    }
  
    {loading ? <SpinnerLoading /> : null}
    </>
  )
}
