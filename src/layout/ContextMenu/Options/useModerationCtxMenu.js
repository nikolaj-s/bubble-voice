import { useDispatch, useSelector } from "react-redux"
import { useCallback } from "react";
import { ChevronRight, Clock } from "lucide-react";
import { setOverlay } from "../../../features/Overlay/overlaySlice";
import { setUserToModerate } from "../../../features/Moderation/moderationSlice";

export const useModerationCtxMenu = () => {

    const dispatch = useDispatch();

    const {_id: user_id} = useSelector(state => state.accountSlice.account);

    const getModerationOptions = useCallback((options, user, permissions) => {

        let moderation_options = []

        if (permissions.user_can_timeout_user_messaging && user_id !== user._id) {

            moderation_options.push({
                label: "Timeout Messaging",
                icon: <Clock color="var(--text-color)" />,
                type: 'button',
                onClick: () => {
                    dispatch(setUserToModerate(user._id))
                    dispatch(setOverlay('messagingTimeout'))
                }
            })
            
        }

        if (moderation_options.length > 0) {

            options.push({
                label: 'Moderation',
                submenuOptions: moderation_options,
                icon: <ChevronRight color="var(--text-color)" />
            })

        }

    }, [dispatch])

    return getModerationOptions;
}