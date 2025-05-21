import ContextMenuButton from "./ContextMenuButton";

import React, {useState, useRef, useEffect } from "react";

const ContextMenuButtonWithSubmenu = ({ label, submenuOptions, top, bottom, icon}) => {
    const [hovered, setHovered] = useState(false);
    const buttonRef = useRef(null);
    const submenuRef = useRef(null);
    const [submenuPosition, setSubmenuPosition] = useState("right");

    useEffect(() => {
        if (hovered && buttonRef.current && submenuRef.current) {
            
            const buttonRect = buttonRef.current.getBoundingClientRect();

            const submenuWidth = submenuRef.current.offsetWidth;

            if (buttonRect.right + submenuWidth > window.innerWidth) {
                setSubmenuPosition("right");
            } else {
                setSubmenuPosition("left");
            }
        }
    }, [hovered]);

    return (
        <div
            ref={buttonRef}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ position: "relative", cursor: "pointer",  }}
        >
            <ContextMenuButton icon={icon} label={label} top={top} bottom={bottom} />
            {hovered && (
                <div
                    ref={submenuRef}
                    style={{
                        position: "absolute",
                        backgroundColor: 'var(--card-background-color)',
                        top: -5,
                        [submenuPosition]: "100%", // Either 'left' or 'right'
                        color: "var(--text-color)",
                        borderRadius: "10px",
                        overflow: 'hidden',
                        padding: '5px',
                        minWidth: 150,
                        zIndex:0
                    }}
                >
                    {submenuOptions.map((option, index) => (
                        <div
                        key={`ctx-sub-option-${index}`}
                        style={{
                            cursor: "pointer",
                            borderBottom: index !== submenuOptions.length - 1 ? "1px solid rgba(0,0,0,0.1)" : "none",
                        }}
                        >
                        <ContextMenuButton {...option} top={index === 0} bottom={index === submenuOptions.length - 1}  />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContextMenuButtonWithSubmenu;
