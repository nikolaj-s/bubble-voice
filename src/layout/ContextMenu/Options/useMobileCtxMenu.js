import { LayoutDashboard, Settings, Settings2, Users } from 'lucide-react';
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setChannelToViewWidgetsOf } from '../../../features/Widgets/widgetsSlice';
import { setOverlay } from '../../../features/Overlay/overlaySlice';
import { toggleMobileMenu } from '../../../features/Mobile/mobileSlice';

export const useMobileCtxMenu = () => {

    const dispatch = useDispatch();

    const {currentTextChannel} = useSelector(state => state.textChannelSlice);

    const {currentVoiceChannel} = useSelector(state => state.voiceChannelSlice);

    const getMobileMenuOptions = useCallback((options) => {
        if (currentTextChannel || currentVoiceChannel) {
            options.push({
                label: "Widgets",
                icon: <LayoutDashboard color="var(--text-color)"/>,
                type: 'button',
                onClick: () => {
                    dispatch(setChannelToViewWidgetsOf(currentTextChannel || currentVoiceChannel))
                    dispatch(setOverlay("widgets"))
                }
            })
        }

        options.push({
            label: "Users",
            icon: <Users color="var(--text-color)" />,
            type: 'button',
            onClick: () => {
                dispatch(toggleMobileMenu('isUserMenuOpen'))
            }
        })

        options.push({
            label: "Bubble Settings",
            icon: <Settings2 color="var(--text-color)" />,
            type: "button",
            onClick: () => {
                dispatch(setOverlay('serverSettings'))
            }
        })

        options.push({
            label: "Settings",
            icon: <Settings color="var(--text-color)" />,
            type: "button",
            onClick: () => {
                dispatch(setOverlay('settings'))
            }
        })
        
    }, [currentTextChannel, currentVoiceChannel, dispatch])
    
    return {getMobileMenuOptions};
}

