import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import imageCompression from "browser-image-compression";
import styles from "./MessageInput.module.css";
import IconButton from "../../ui/Buttons/IconButton/IconButton";
import { ImageUp, Pencil, Plus, SearchIcon, Send } from "lucide-react";
import { MediaPreview } from "../MediaPreview/MediaPreview";
import { useDispatch } from "react-redux";
import { setFilter } from "../../../features/Search/searchSlice";
import { setOverlay } from "../../../features/Overlay/overlaySlice";
import TextLabelError from "../../Error/TextLabelError/TextLabelError";
import { ImageDropOverlay } from "../../ui/Inputs/ImageDropOverlay/ImageDropOverlay";
import { triggerAlert } from "../../../features/Alerts/alertsSlice";
import { getImageColorFromFile } from "../../../lib/services/getImageColorFromFile";

export const MessageInput = ({
  id,
  value,
  setValue,
  setImage = () => {},
  error,
  send = () => {},
  replyTo,
  placeholder,
  setIsDraggingImage,
  isDraggingImage
}) => {
  const textAreaRef  = useRef(null);
  const fileInputRef = useRef(null);
  const dispatch     = useDispatch();

  const [menuOpen, setMenuOpen]   = useState(false);
  const [focused, setFocused]     = useState(false);
  const [previews, setPreviews]   = useState([]);    

  const MAX_IMAGES = 6;

  const toggleMenu = () => setMenuOpen((v) => !v);

  const handleFileUpload = async (e) => {
    const filesList = Array.from(e.target.files || []);
 
    const slotsLeft = MAX_IMAGES - previews.length;
    const toProcess = filesList.slice(0, slotsLeft);

    if (!toProcess.length) {
      e.target.value = ""; 
      return;
    }

    const options = { maxSizeMB: 0.5, maxWidthOrHeight: 1024, useWebWorker: true };

    try {
      // 1️⃣ Compress all selected files
      const compressed = await Promise.all(toProcess.map(f => imageCompression(f, options)));
      // 2️⃣ Read all as DataURL
      const dataUrls  = await Promise.all(
        compressed.map(file => new Promise((res, rej) => {
          const reader = new FileReader();
          reader.onloadend = () => res(reader.result);
          reader.onerror   = rej;
          reader.readAsDataURL(file);
        }))
      );
      // 3️⃣ Update state

      const color = await getImageColorFromFile(compressed[0]);

      setPreviews([...dataUrls]);

      setImage([...compressed], color);

      document.getElementById(`chat-input-${id}`)?.focus();

    } catch (err) {
      console.error("Image compression/reading failed:", err);
      dispatch(triggerAlert('An error occured while processing your files', 'error'))
    } finally {
      e.target.value = ""; // allow re-uploading same file
    }
  };

  // Focus the textarea when necessary
  useEffect(() => {
    if (replyTo) document.getElementById(`chat-input-${id}`)?.focus();
  }, [replyTo]);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const handleOpenSearchMedia = () => {
    dispatch(setFilter({ path: "images" }));
    dispatch(setOverlay("search"));
  };

  const handleSend = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (value.trim() || previews.length) {
        send();
        setPreviews([]);
      }
    }
  };

  // auto-resize
  useLayoutEffect(() => {
    const el = textAreaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  useLayoutEffect(() => {
    document.getElementById(`chat-input-${id}`)?.focus();

    return () => {
      setPreviews([]);
    }
  }, [])

  return (
    <>
      <div className={styles["message-input-container"]} data-context={JSON.stringify({ type: "input", id: `chat-input-${id}` })}>
        {error && (
          <div className={styles.errorWrapper}>
            <TextLabelError error={error} />
          </div>
        )}

        {/* Media previews */}
        {previews.length > 0 && (
          <MediaPreview
            preview={previews}
            clear={() => {
              setPreviews([]);
              setImage([]);
            }}
          />
        )}

        <div className={`${styles.inputButtonWrapper} ${focused ? styles.focused : ""}`}>
          <IconButton
            title="Add"
            Icon={<Plus color="var(--text-color)" />}
            onClick={toggleMenu}
            backgroundColor="var(--input-background-color)"
          />

          <div
            onClick={() => document.getElementById(`chat-input-${id}`)?.focus()}
            className={`${styles["input-wrapper"]} `}
          >
            <textarea
              id={`chat-input-${id}`}
              ref={textAreaRef}
              className={styles["message-input"]}
              placeholder={`${placeholder}`}
              value={value}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleSend}
              maxLength={1024}
              rows={1}
            />

          </div>
          <IconButton
                disabled={!value.trim() && !previews.length}
                Icon={<Send color="var(--text-color)" />}
                title="Send"
                onClick={() => {
                  send();
                  setPreviews([]);
                }}
              />
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className={styles.menu}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: -5 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <button onClick={() => dispatch(setOverlay("createDrawing"))}>
                Create <Pencil color="var(--text-color)" size={20} />
              </button>
              <button onClick={() => fileInputRef.current.click()}>
                Upload <ImageUp color="var(--text-color)" size={20} />
              </button>
              <button onClick={handleOpenSearchMedia}>
                Search <SearchIcon color="var(--text-color)" size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          multiple
          onChange={handleFileUpload}
        />
      </div>

      <ImageDropOverlay
        isDraggingImage={isDraggingImage}
        setIsDraggingImage={setIsDraggingImage}
        onDropEvent={handleFileUpload}
      />
    </>
  );
};
