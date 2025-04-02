import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevices, setWebcam, setMicrophone, setSpeaker } from "../../../../features/Settings/Devices/deviceSlice";
import styles from "./DeviceSelector.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react"; // Import an icon from lucide-react
import Label from "../../Titles/Label/Label";

export const DeviceSelector = ({ type }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const devices = useSelector((state) => state.deviceSlice[type + "s"]);
  const selectedDevice = useSelector((state) => state.deviceSlice[`selected${type.charAt(0).toUpperCase() + type.slice(1)}`]);

  useEffect(() => {
    if (!devices.length) {
      dispatch(fetchDevices());
    }
  }, [dispatch, devices]);

  const setDevice = (deviceId) => {
    const device = devices.find((d) => d.deviceId === deviceId);
    if (type === "webcam") dispatch(setWebcam(device));
    if (type === "microphone") dispatch(setMicrophone(device));
    if (type === "speaker") dispatch(setSpeaker(device));
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={dropdownRef}>
      <Label label={`Select ${type.charAt(0).toUpperCase() + type.slice(1)}`} />

      <div className={styles.dropdown} onClick={() => setIsOpen(!isOpen)}>
        <motion.button
          className={styles.dropdownButton}
          whileTap={{ scale: 0.98 }}
        >
          {selectedDevice?.label || `Select a ${type}`}
          <motion.span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
            <ChevronDown size={16} />
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.dropdownList}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {devices.length > 0 ? (
                devices.map((device) => (
                  <motion.div
                    key={device.deviceId}
                    className={styles.dropdownItem}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setDevice(device.deviceId)}
                  >
                    {device.label || `Unnamed ${type}`}
                  </motion.div>
                ))
              ) : (
                <motion.div className={styles.dropdownItem} disabled>
                  Loading...
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
