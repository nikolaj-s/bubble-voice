import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import imageCompression from "browser-image-compression";
import styles from "./MessageInput.module.css";
import IconButton from "../../ui/Buttons/IconButton/IconButton";
import { Plus } from "lucide-react";
import { MediaPreview } from "../MediaPreview/MediaPreview";
import { useDispatch } from "react-redux";
import { setFilter } from "../../../features/Search/searchSlice";
import { setOverlay } from "../../../features/Overlay/overlaySlice";
import TextLabelError from "../../Error/TextLabelError/TextLabelError";

export const MessageInput = ({ value, setValue, setImage = () => {}, error, send = () => {} }) => {

    const textAreaRef = useRef(null);

    const dispatch = useDispatch();

    const [menuOpen, setMenuOpen] = useState(false);

    const [preview, setPreview] = useState(null);

    const fileInputRef = useRef(null);

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    const handleFileUpload = async (event) => {

        const file = event.target.files[0];

        if (!file) return;

        try {
            const options = { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true };
            const compressedFile = await imageCompression(file, options);

            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onloadend = () => {
                setPreview(reader.result);
                setImage(compressedFile);

                document.getElementById('chat-input').focus();
            };
        } catch (error) {
            console.error("Image compression failed:", error);
        }
    };

    // ✅ Cleanup preview on unmount
    useEffect(() => {
        return () => {
            setPreview(null);
        };
    }, []);

    useEffect(() => {

        const closeMenu = () => {
            setMenuOpen(false);
        }

       document.getElementById('chat-input').focus();

        document.addEventListener('click', closeMenu);

        return () => {
            document.removeEventListener('click', closeMenu);
        }

    }, [])

    const handleOpenSearchMedia = () => {
        
        dispatch(setFilter({path: 'images'}));

        dispatch(setOverlay('search'));
    }

    const handleSend = (e) => {
        if (value.trim().length === 0 && !preview) return;

        if (e.keyCode === 13) {
            send();
            setPreview(null);
        }
    }
    React.useEffect(() => {

        const adjustHeight = () => {
            const element = textAreaRef.current;
            element.style.height = "auto"; // Reset height
            element.style.height = `${element.scrollHeight === 32 ? 18 : element.scrollHeight}px`; // Set new height
        };

        adjustHeight();

    }, [value])
        

    const handleSetValue = (value) => {
        setValue(value);
    }

    return (
        <div className={styles["message-input-container"]}>
            {error && 
                    (<TextLabelError label="Error:" error={error} />) 
            }
            {preview && <MediaPreview clear={() => {setPreview(null); setImage(null)}} preview={preview} />}
            <div className={styles.inputButtonWrapper}>
                <div className={styles["input-wrapper"]}>
                    <textarea
                        ref={textAreaRef}
                        id="chat-input"
                        type="text"
                        className={styles["message-input"]}
                        placeholder="Type a message..."
                        value={value}
                        onChange={(e) => handleSetValue(e.target.value)}
                        onKeyUp={handleSend}
                        maxLength={1024}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                            } 
                        }}
                    />
                    
                </div>
                <IconButton 
                padding={12}
                borderRadius={'50%'}
                height={50}
                width={50}
                title={"Add Media"}
                Icon={<Plus color="var(--text-color)" />}
                onClick={toggleMenu}
                backgroundColor="var(--card-background-color)"
                />
            </div>
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className={styles["menu"]}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: -5 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <button onClick={() => fileInputRef.current.click()}>Upload Image</button>
                        <button onClick={handleOpenSearchMedia}>Search Media</button>
                    </motion.div>
                )}
            </AnimatePresence>

            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileUpload}
            />
        </div>
    );
};
