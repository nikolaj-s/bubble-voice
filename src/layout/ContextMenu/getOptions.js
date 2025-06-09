import { useCallback } from "react";

import { useAppCtxMenu } from "./Options/useAppCtxMenu";
import { useMediaPlayerCtxMenu } from "./Options/useMediaPlayerCtxMenu";
import { useUserCtxMenu } from "./Options/UserOptions/useUserCtxMenu";
import { useViewWidgetsCtxMenu } from "./Options/useViewWidgetsCtxMenu";
import { useWidgetsCtxMenu } from "./Options/WidgetOptions/useWidgetsCtxMenu";
import { useWidgetCtxMenu } from "./Options/WidgetOptions/useWidgetCtxMenu";
import { useChannelCtxMenu } from "./Options/ChannelOptions/useChannelCtxMenu";
import { useCategoryCtxMenu } from "./Options/ChannelOptions/useCategoryCtxMenu";
import { useChannelsCtxMenu } from "./Options/ChannelOptions/useChannelsCtxMenu";
import { useUserStreamCtxMenu } from "./Options/UserOptions/useUserStreamCtxMenu";
import { useMessageCtxMenu } from "./Options/useMessageCtxMenu";
import { useImageCtxMenu } from "./Options/MediaOptions/useImageCtxMenu";
import { useVideoCtxMenu } from "./Options/MediaOptions/useVideoCtxMenu";
import { useControlBarCtxMenu } from "./Options/useControlBarCtxMenu";
import { useMobileCtxMenu } from "./Options/useMobileCtxMenu";
import { useVoiceChannelCtxMenu } from "./Options/useVoiceChannelCtxMenu";
import { useConnectionCtxMenu } from "./Options/useConnectionCtxMenu";
import { useInputCtxMenu } from "./Options/useInputCtxMenu";

export const useContextMenuOptions = () => {

    const {getAppSubmenuOptions} = useAppCtxMenu();

    const {getMediaPlayerOptions} = useMediaPlayerCtxMenu();

    const {getUserOptions} = useUserCtxMenu();

    const {getUserStreamOptions} = useUserStreamCtxMenu();

    const {getViewWidgetsOption} = useViewWidgetsCtxMenu();

    const {getWidgetsOptions} = useWidgetsCtxMenu();

    const {getWidgetOptions} = useWidgetCtxMenu();

    const {getChannelOptions} = useChannelCtxMenu();

    const {getChannelsOptions} = useChannelsCtxMenu();

    const {getCategoryOptions} = useCategoryCtxMenu();

    const {getMessageOptions} = useMessageCtxMenu();

    const {getImageOptions} = useImageCtxMenu();

    const {getVideoOptions} = useVideoCtxMenu();

    const {getControlBarOptions} = useControlBarCtxMenu();

    const {getMobileMenuOptions} = useMobileCtxMenu();

    const {getVoiceChannelOptions} = useVoiceChannelCtxMenu();

    const {getConnectionOptions} = useConnectionCtxMenu();

    const {getInputOptions} = useInputCtxMenu();

    const getOptions = (e, permissions) => {
        try {
            const options = [];

            const path = e.composedPath();

            const data = {};

            for (const el of path) {
                try {
                    if (el?.getAttribute("data-context")) {
                        const json = JSON.parse(el.getAttribute("data-context"));

                        data[json.type] = json;
                    }
                } catch (error) {
                    continue;
                }
            }

            if (data.appSubmenu) getAppSubmenuOptions(options);

            if (data.appSubmenu || data.widgetsOverlay) getViewWidgetsOption(options);

            if (data.userStreamSource) getUserStreamOptions(options, data.userStreamSource);
            
            if (data.mediaplayer) getMediaPlayerOptions(options);

            if (data.user) getUserOptions(options, data.user, permissions);

            if (data.user) getUserStreamOptions(options, data.user);

            if (data.widgetsOverlay) getWidgetsOptions(options, data, permissions);

            if (data.widget) getWidgetOptions(options, data, permissions);

            if (data.channel) getChannelOptions(options, data, permissions);

            if (data.category) getCategoryOptions(options, data, permissions);

            if (data.channelList || data.mobileMenu) getChannelsOptions(options, permissions);

            if (data.message) getMessageOptions(options, data, permissions);

            if (data.image || data.imageSearchResult) getImageOptions(options, data, permissions);

            if (data.video) getVideoOptions(options, data);

            if (data.controlBar) getControlBarOptions(options);

            if (data.mobileMenu) getMobileMenuOptions(options);

            if (data.room || data.appSubmenu) getVoiceChannelOptions(options, permissions);

            if (data.input) getInputOptions(options, data);

            if (data.channel || data.room || data.controlBar || data.appSubmenu) getConnectionOptions(options); 

            return options;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
       

  return getOptions;
};
