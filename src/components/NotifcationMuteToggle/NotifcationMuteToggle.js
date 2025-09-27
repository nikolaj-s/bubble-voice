
import TextButton from '../ui/Buttons/TextButton/TextButton';
import { Bell, BellOff } from 'lucide-react';

const NotificationMuteToggle = ({
  value,
  onChange,

}) => {
 
  return (
    <TextButton action={onChange} title={`${value ? 'Unmute' : 'Mute'} Notifications`} icon={value ? BellOff : Bell} />
  );
};

export default NotificationMuteToggle;