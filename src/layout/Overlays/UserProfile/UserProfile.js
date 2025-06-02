
import { useDispatch, useSelector } from 'react-redux'
import { Profile } from '../../../components/Profile/Profile';
import MousePositionCardWrapper from '../../../components/ui/Wrappers/MousePositionCardWrapper/MousePositionCardWrapper';
import { AnimatePresence } from 'framer-motion';
import { setUserProfile } from '../../../features/UserProfile/userProfileSlice';

export const UserProfile = () => {

    const dispatch = useDispatch();

    const {user} = useSelector(state => state.userProfileSlice);

    const {x, y} = useSelector(state => state.mousePositionSlice);

    const profile = useSelector(state => state.serverUsersSlice.users[user])

    const close = () => {
        dispatch(setUserProfile(null));
    }

    return (
        <AnimatePresence>
            {profile && (
            <MousePositionCardWrapper key={profile?._id} open={true} x={x} y={y} onClose={close}>
                <Profile account={profile} />
            </MousePositionCardWrapper>)}
        </AnimatePresence>
    )
}
