import React, { useState, useRef, useEffect } from "react";
import styles from "./ContextMenuWrapper.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getOptions } from "./getOptions";
import ContextMenuButton from "../../../Buttons/ContextButtons/ContextMenuButton";
import ContextRadioButton from "../../../Buttons/ContextButtons/ContextRadioButton";
import ContextRangeInput from "../../../Buttons/ContextButtons/ContextRangeInput";
import { useNavigate } from "react-router";

const ContextMenuWrapper = ({ children, getMenuOptions }) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [contextMenu, setContextMenu] = useState(null);
    
    const menuRef = useRef(null);

    const handleContextMenu = (event) => {
        event.preventDefault();

        const options =getOptions(event, useSelector, dispatch, navigate);

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

    const handleClick = () => {
        setContextMenu(null);
    };

    useEffect(() => {
        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <div>
            {children}
            {contextMenu?.visible && (
                <div
                    ref={menuRef}
                    style={{
                        position: "absolute",
                        top: `${contextMenu.y}px`,
                        left: `${contextMenu.x}px`,
                        background: "var(--card-background-color)",
                        color: "var(--text-color)",
                        borderRadius: "6px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        zIndex: 1000,
                        overflow: 'hidden',
                        minWidth: 120
                    }}
                >
                    {contextMenu.options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                option.action();
                                handleClick();
                            }}
                            style={{
                                cursor: "pointer",
                                borderBottom: index !== contextMenu.options.length - 1 ? "1px solid var(--background-color)" : "none",
                            }}
                        >
                            {option.type === 'button' ?
                                <ContextMenuButton label={option.label} onClick={() => {option.action()}} />
                            : option.type === 'radio' ?
                                <ContextRadioButton label={option.label} checked={option.state} onChange={(value) => {option.action(value)}} />
                            : option.type === 'range' ?
                                <ContextRangeInput label={option.label} onChange={(value) => {option.action(value)}} value={option.value} max={option.max} min={option.min} />
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
