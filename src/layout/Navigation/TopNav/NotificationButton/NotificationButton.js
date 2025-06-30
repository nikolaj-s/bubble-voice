import React from 'react'
import IconButton from '../../../../components/ui/Buttons/IconButton/IconButton'
import { Bell } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleNotificationPanel } from '../../../../features/Notifications/notificationsSlice'
import { TextIndicator } from '../../../../components/ui/TextIndicator/TextIndicator'

export const NotificationButton = () => {

    const dispatch = useDispatch();

    const {notification_count} = useSelector(state => state.notificationsSlice);

    return (
        <IconButton
          Icon={
          <>
            {notification_count > 0 && (
                <div style={{position: 'absolute', top: -2, left: -5}}>
                    <TextIndicator title={notification_count < 10 ? notification_count : '9+'} backgroundColor='var(--error-color)' minWidth={10} />
                </div>
            )}
            <Bell color="var(--text-color)" />
          </>}
          position="bottom"
          title={"Notifications"}
          onClick={() => {dispatch(toggleNotificationPanel())}}
        />
    )
}