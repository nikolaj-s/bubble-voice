import { Images, Settings2 } from "lucide-react";

import { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import { setOverlay } from "../../../features/Overlay/overlaySlice";
import { BoolIndicator } from "../../../components/ui/BoolIndicator/BoolIndicator";
import { toggleAppearanceSetting } from "../../../features/Settings/Appearance/appearanceSlice";

export const useAppCtxMenu = () => {

    const dispatch = useDispatch();

    const {server_id} = useSelector(state => state.serverDetailsSlice);

    const hideSideBar = useSelector(state => state.appearanceSlice.hideUsers);

    const getAppSubmenuOptions = useCallback((options) => {

        if (!server_id) return;

        options.push({
            label: 'Bubble Settings',
            type: 'button',
            icon: <Settings2 color="var(--text-color)" />,
            onClick: () => {
                dispatch(setOverlay('serverSettings'));
            }
        })

        options.push({
            label: 'Bubble Recommendations',
            type: 'button',
            icon: <Images color="var(--text-color)" />,
            onClick: () => {
                dispatch(setOverlay('serverRecommendations'))
            }
        })

        options.push({
            label: "Hide Side Bar",
            type: 'button',
            icon: <BoolIndicator active={hideSideBar} />,
            onClick: () => {
                dispatch(toggleAppearanceSetting('hideUsers'));
            }
        })


    }, [dispatch, server_id, hideSideBar])

    return {getAppSubmenuOptions}
}