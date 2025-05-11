import React, { useState, useRef, useEffect } from "react";

import { useSelector } from "react-redux";

import ContextMenuButton from "../../components/ui/Buttons/ContextButtons/ContextMenuButton";

import ContextRadioButton from "../../components/ui/Buttons/ContextButtons/ContextRadioButton";

import ContextRangeInput from "../../components/ui/Buttons/ContextButtons/ContextRangeInput";

import { useContextMenuOptions } from "./getOptions";

import ContextMenuButtonWithSubmenu from "../../components/ui/Buttons/ContextButtons/ContextMenuButtonWithSubMenu";

import styles from './ContextMenuWrapper.module.css'

const ContextMenu = ({ children }) => {

    const account = useSelector((state) => state.accountSlice.account);
    
    const user = useSelector((state) => state.serverUsersSlice?.users[account?.user_id]);

    const currentTextChannel = useSelector((state) => state.textChannelSlice.currentTextChannel);

    const {currentChannel} = useSelector((state) => state.channelsSlice);

    const mediaPlayerState = useSelector(state => state.mediaPlayerSlice);

    const channels = useSelector((state) => state.channelsSlice.channels);

    const permissions = useSelector(
        (state) => state.serverPermissionsSlice.permissions
    );

    const [contextMenu, setContextMenu] = useState(null);

    const getOptions = useContextMenuOptions();
    
    const menuRef = useRef(null);
 
    const handleClick = () => {
        setContextMenu(null);
    };
    
    useEffect(() => {
        const handleContextMenu = (event) => {
            event.preventDefault();
    
            const options = getOptions(event, permissions[user?.server_group], currentTextChannel, channels, currentChannel, user);
            if (!options || options.length === 0) return;
    
            let clickX = event.clientX;
            let clickY = event.clientY;
    
            // First, set the menu at the raw click position
            setContextMenu({ visible: true, x: clickX, y: clickY, options });
    
            // Delay position adjustment to the next render cycle
            requestAnimationFrame(() => {
                if (menuRef.current) {
                    const { offsetWidth, offsetHeight } = menuRef.current;
    
                    let adjustedX = clickX;
                    let adjustedY = clickY;
    
                    if (clickX + offsetWidth > window.innerWidth) {
                        adjustedX = window.innerWidth - offsetWidth;
                    }
                    if (clickY + offsetHeight > window.innerHeight) {
                        adjustedY = window.innerHeight - offsetHeight;
                    }
    
                    setContextMenu((prev) => ({ ...prev, x: adjustedX, y: adjustedY }));
                }
            });
        };
    
        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("click", handleClick);
        window.addEventListener("click", handleClick);
    
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("click", handleClick);
            window.removeEventListener("click", handleClick);
        };
    }, [getOptions, permissions, user, currentTextChannel, channels, currentChannel, mediaPlayerState]);
    

    return (
        <div>
            {children}
            {contextMenu?.visible && (
                <>
                <div className={styles.mobileContainer} />
                <div
                    className={styles.container}
                    ref={menuRef}
                    style={{
                        position: "fixed",
                        top: `${contextMenu.y}px`,
                        left: `${contextMenu.x}px`,
                        color: "var(--text-color)",
                        borderRadius: "6px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        zIndex: 1000,
                        minWidth: 155,
                        padding: 5,
                        backgroundColor: 'var(--button-background)'
                        
                    }}
                >
                    {contextMenu.options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                handleClick();
                            }}
                            style={{
                                cursor: "pointer",
                                borderBottom: index !== contextMenu.options.length - 1 ? "1px solid rgba(0,0,0,0.1)" : "none",
                                
                            }}
                        >
                            {option.submenuOptions ?
                            <ContextMenuButtonWithSubmenu {...option} top={index === 0} bottom={index === contextMenu.options.length - 1} />
                            :
                            option.type === 'button' ?
                                <ContextMenuButton zIndex={12} {...option} top={index === 0} bottom={index === contextMenu.options.length - 1}  />
                            : option.type === 'radio' ?
                                <ContextRadioButton zIndex={12} top={index === 0} bottom={index === contextMenu.options.length - 1}  label={option.label} checked={option.state} onChange={(value) => {option.action(value)}} />
                            : option.type === 'range' ?
                                <ContextRangeInput zIndex={12} top={index === 0} bottom={index=== contextMenu.options.length - 1}  label={option.label} onChange={option.onChange} value={option.value} max={option.max} min={option.min} step={option.step} />
                            : 
                            null
                            }
                        </div>
                    ))}
                </div>
                </>
            )}
        </div>
    );
};

export default ContextMenu;
