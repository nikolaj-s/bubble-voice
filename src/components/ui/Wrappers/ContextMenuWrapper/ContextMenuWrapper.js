import React, { useState, useRef, useEffect } from "react";
import styles from "./ContextMenuWrapper.module.css";
import { useSelector } from "react-redux";
import ContextMenuButton from "../../../Buttons/ContextButtons/ContextMenuButton";
import ContextRadioButton from "../../../Buttons/ContextButtons/ContextRadioButton";
import ContextRangeInput from "../../../Buttons/ContextButtons/ContextRangeInput";
import { useContextMenuOptions } from "./getOptions";
import ContextMenuButtonWithSubmenu from "../../../Buttons/ContextButtons/ContextMenuButtonWithSubMenu";

const ContextMenuWrapper = ({ children, getMenuOptions }) => {


    const account = useSelector((state) => state.accountSlice.account);
    
    const user = useSelector((state) => state.serverUsersSlice?.users[account?.user_id]);

    const currentTextChannel = useSelector((state) => state.textChannelSlice.currentTextChannel);

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

            const options =getOptions(event, permissions[user?.server_group], currentTextChannel, channels);
    
            if (!options || options.length === 0) return;
    
            let clickX = event.clientX;
            let clickY = event.clientY;
    
            // Ensure the menu does not go out of bounds before setting state
            if (menuRef.current) {
                const { offsetWidth, offsetHeight } = menuRef.current;
                if (clickX + offsetWidth > window.innerWidth) {
                    clickX = window.innerWidth - offsetWidth;
                }
                if (clickY + offsetHeight > window.innerHeight) {
                    clickY = window.innerHeight - offsetHeight;
                }
            }
    
            setContextMenu({ visible: true, x: clickX, y: clickY, options });
        };

        
        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("click", handleClick);
        window.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("click", handleClick);
            window.removeEventListener("click", handleClick)
        };
    }, [getOptions, permissions, user, currentTextChannel, channels]);

    return (
        <div>
            {children}
            {contextMenu?.visible && (
                <div
                    ref={menuRef}
                    style={{
                        position: "fixed",
                        top: `${contextMenu.y}px`,
                        left: `${contextMenu.x}px`,
                        color: "var(--text-color)",
                        borderRadius: "6px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        zIndex: 1000,
                        minWidth: 150,
                        
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
                                borderBottom: index !== contextMenu.options.length - 1 ? "1px solid var(--background-color)" : "none",
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
                                <ContextRangeInput zIndex={12} top={index === 0} bottom={index=== contextMenu.options.length - 1}  label={option.label} onChange={(value) => {option.action(value)}} value={option.value} max={option.max} min={option.min} />
                            : 
                            null
                            }
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContextMenuWrapper;
