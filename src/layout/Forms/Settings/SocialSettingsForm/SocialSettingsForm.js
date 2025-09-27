
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label';
import { Card } from '../../../../components/ui/Wrappers/Card/Card';
import { Banner } from '../../../../components/Banner/Banner';
import IconButton from '../../../../components/ui/Buttons/IconButton/IconButton';
import { BoolIndicator } from '../../../../components/ui/BoolIndicator/BoolIndicator';
import { removeNotificationMute, setNotificationMute } from '../../../../features/AccountPreferences/accountPreferencesSlice';

export const SocialSettingsForm = () => {

    const dispatch = useDispatch();

    const {muted_notifications} = useSelector(state => state.accountPreferencesSlice);

    const {servers} = useSelector(state => state.serversSlice);

    const handleToggleServerMute = (server) => {

        if (muted_notifications[server._id]) {
            dispatch(removeNotificationMute(server._id));
        } else {
            dispatch(setNotificationMute({key: server._id, value: {type: 'server'}}));
        }

    }

    return (
        <>
        <Header text='Social Settings' />
        <Label label='Mute Notifications From' />
        {servers.map(server => (
            <Card style={{maxWidth: 400,}} key={server._id}>
                <Label label={server.server_name} />
                <Banner image={server.server_banner} />
                <div style={{position: 'absolute', right: 5, top: 5}}>
                    <IconButton onClick={() => {handleToggleServerMute(server)}} title={muted_notifications?.[server._id] ? 'Unmute' : 'Mute'}  Icon={<BoolIndicator active={muted_notifications?.[server._id]} />} />
                </div>
            </Card>
        ))}
        </>
    )
}
