// ContextMenuButtonWithSubmenu.jsx
import React, { useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import ContextMenuButton from "./ContextMenuButton";
import TextInput from "../../Inputs/TextInput/TextInput";
import { isDesktop } from "../../../../lib/handlers/isDesktop";

const ContextMenuButtonWithSubmenu = ({
    label,
    submenuOptions,
    top,
    bottom,
    icon,
    useFilter
}) => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);
    const submenuRef = useRef(null);
    const closeTimeout = useRef(null);
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    const [filter, setFilter] = useState('');

    const openMenu = () => {
        clearTimeout(closeTimeout.current);
        setOpen(true);
    };
    const closeMenu = () => {
        // wait a bit before closing to allow pointer to enter submenu
        closeTimeout.current = setTimeout(() => setOpen(false), 100);
    };

    const handlePlaceMenu = () => {
        const btnRect = buttonRef.current.getBoundingClientRect();
        const submenuW = submenuRef.current.offsetWidth;
        const submenuH = submenuRef.current.offsetHeight;
        // default right
        let leftPos = btnRect.right;
        if (btnRect.right + submenuW > window.innerWidth) {
            leftPos = btnRect.left - submenuW;
        }
        // clamp vertical
        let topPos = btnRect.top;
        if (btnRect.top + submenuH > window.innerHeight) {
            topPos = window.innerHeight - submenuH - 8;
        }

        if (isDesktop()) {
            document.getElementById('ctx-menu-filter-input')?.focus();
        }

        setCoords({ top: topPos, left: leftPos });
    }

    useLayoutEffect(() => {

        let observer;

        if (!open || !buttonRef.current || !submenuRef.current) return;
        
        handlePlaceMenu();

        observer = new ResizeObserver(handlePlaceMenu);

        const config = { childList: true, subtree: false };

        observer.observe(submenuRef.current, config)

        return () => {
            observer?.disconnect();
        }

    }, [open, submenuOptions]);

    return (
        <>
            {/* trigger */}
            <div
                ref={buttonRef}
                onMouseEnter={openMenu}
                onMouseLeave={closeMenu}
                style={{ position: "relative", cursor: "pointer" }}
            >
                <ContextMenuButton
                    icon={icon}
                    label={label}
                    top={top}
                    bottom={bottom}
                />
            </div>

            {/* submenu portal */}
            {open &&
                createPortal(
                    <div
                        ref={submenuRef}
                        onMouseEnter={openMenu}
                        onMouseLeave={closeMenu}
                        style={{
                            position: "fixed",
                            top: coords.top,
                            left: coords.left,
                            backgroundColor: "var(--card-background-color)",
                            color: "var(--text-color)",
                            borderRadius: 6,
                            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                            maxHeight: "calc(100svh - 40px)",
                            overflowY: "auto",
                            padding: "5px",
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px',
                            minWidth: 250,
                            zIndex: 2000,
                            marginTop: -5
                        }}
                    >   
                        {useFilter && (
                        <div style={{flexShrink: 0, width: '100%'}} onKeyDown={(e) => {e.stopPropagation()}} 
                        onKeyUp={(e) => {e.stopPropagation()}} 
                        onClick={(e) => e.stopPropagation()}>
                            <TextInput value={filter} placeholder={'Filter'} onChange={setFilter} id={'ctx-menu-filter-input'} />
                        </div>)}
                        {submenuOptions.filter(o => o.label.toLowerCase().startsWith(filter.toLowerCase())).map((opt, i) => (
                            <div
                                key={i}

                                style={{
                                    padding: "0px",
                                    cursor: "pointer",
                                    borderBottom:
                                        i < submenuOptions.length - 1
                                            ? "1px solid rgba(0,0,0,0.1)"
                                            : "none",
                                }}
                            >
                                <ContextMenuButton

                                    {...opt}
                                    top={i === 0}
                                    bottom={i === submenuOptions.length - 1}
                                />
                            </div>
                        ))}
                    </div>,
                    document.body
                )}
        </>
    );
};

export default ContextMenuButtonWithSubmenu;
