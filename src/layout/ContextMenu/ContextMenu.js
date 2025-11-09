import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import ContextMenuButton from "../../components/ui/Buttons/ContextButtons/ContextMenuButton";
import ContextRadioButton from "../../components/ui/Buttons/ContextButtons/ContextRadioButton";
import ContextRangeInput from "../../components/ui/Buttons/ContextButtons/ContextRangeInput";
import ContextMenuButtonWithSubmenu from "../../components/ui/Buttons/ContextButtons/ContextMenuButtonWithSubMenu";
import { useContextMenuOptions } from "./getOptions";
import { LineSpacer } from "../../components/ui/Spacers/LineSpacer/LineSpacer";
import styles from "./ContextMenuWrapper.module.css";
import IconButton from "../../components/ui/Buttons/IconButton/IconButton";
import { X } from "lucide-react";

const ContextMenu = ({ children }) => {
    const account = useSelector(s => s.accountSlice.account);
    const user = useSelector(s => s.serverUsersSlice.users[account?._id]);
    const currentTextChannel = useSelector(s => s.textChannelSlice.currentTextChannel);
    const { currentChannel } = useSelector(s => s.channelsSlice);
    const mediaPlayerState = useSelector(s => s.mediaPlayerSlice);
    const channels = useSelector(s => s.channelsSlice.channels);
    const permissions = useSelector(s => s.serverPermissionsSlice.permissions);

    const [contextMenu, setContextMenu] = useState(null);
    const menuRef = useRef(null);
    const getOptions = useContextMenuOptions();

    useEffect(() => {
        const handleContextMenu = event => {
            event.preventDefault();
            const options = getOptions(
                event,
                permissions[user?.server_group],
                currentTextChannel,
                channels,
                currentChannel,
                user
            );
            if (!options?.length) return;

            let clickX = event.clientX;
            let clickY = event.clientY;
            setContextMenu({ visible: true, x: clickX, y: clickY, options });

            requestAnimationFrame(() => {
                if (!menuRef.current) return;
                const { offsetWidth, offsetHeight } = menuRef.current;
                let adjX = clickX, adjY = clickY;
                if (clickX + offsetWidth > window.innerWidth) {
                    adjX = window.innerWidth - offsetWidth;
                }
                if (clickY + offsetHeight > window.innerHeight) {
                    adjY = window.innerHeight - offsetHeight;
                }
                setContextMenu(prev => ({ ...prev, x: adjX, y: adjY }));
            });
        };

        const hide = () => setContextMenu(null);
        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("click", hide);
        window.addEventListener("click", hide);
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("click", hide);
            window.removeEventListener("click", hide);
        };
    }, [
        getOptions,
        permissions,
        user,
        currentTextChannel,
        channels,
        currentChannel,
        mediaPlayerState
    ]);

    return (
        <div className="context">
            {children}
            {contextMenu?.visible && (
                <>
                    <div className={styles.mobileContainer} />
                    <div
                        onClick={(e) => {e.stopPropagation()}}
                        className={styles.container}
                        ref={menuRef}
                        style={{
                            top: `${contextMenu.y}px`,
                            left: `${contextMenu.x}px`
                        }}
                    >
                        <div className={styles.scrollWrapper}>
                            <div className={styles.mobileCloseWrapper}>
                                <IconButton onClick={() => {setContextMenu(null)}} Icon={<X color="var(--text-color)" />} />
                            </div>
                            {contextMenu.options.map((opt, idx) => {
                                const isLast = idx === contextMenu.options.length - 1;
                                const commonProps = {
                                    key: idx,
                                    className: styles.menuItem,
                                    style: { borderBottom: isLast ? "none" : undefined },
                                    onClick: () => setContextMenu(null)
                                };

                                if (opt.submenuOptions) {
                                    return (
                                        <div {...commonProps} key={idx}>
                                            <ContextMenuButtonWithSubmenu
                                                {...opt}
                                                top={idx === 0}
                                                bottom={isLast}
                                            />
                                        </div>
                                    );
                                }

                                switch (opt.type) {
                                    case "button":
                                        return (
                                            <div {...commonProps}key={idx}>
                                                <ContextMenuButton
                                                    {...opt}
                                                    top={idx === 0}
                                                    bottom={isLast}
                                                />
                                            </div>
                                        );
                                    case "radio":
                                        return (
                                            <div {...commonProps} key={idx}>
                                                <ContextRadioButton
                                                    label={opt.label}
                                                    checked={opt.state}
                                                    onChange={opt.action}
                                                    top={idx === 0}
                                                    bottom={isLast}
                                                />
                                            </div>
                                        );
                                    case "range":
                                        return (
                                            <div {...commonProps} key={idx}>
                                                <ContextRangeInput
                                                    label={opt.label}
                                                    value={opt.value}
                                                    max={opt.max}
                                                    min={opt.min}
                                                    step={opt.step}
                                                    onChange={opt.onChange}
                                                    top={idx === 0}
                                                    bottom={isLast}
                                                />
                                            </div>
                                        );
                                    case "spacer":
                                        return <LineSpacer key={idx} />;
                                    default:
                                        return null;
                                }
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ContextMenu;
