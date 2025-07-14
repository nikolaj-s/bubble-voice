import { useEffect, useState, useRef } from "react";
import styles from "./ScreenPicker.module.css";
import { useDispatch } from "react-redux";
import { stopSharingScreen } from "../../features/Channel/MediaControl/mediaControlSlice";
import SpinnerLoading from "../ui/Loading/Spinner/SpinnerLoading";
import TextButton from "../ui/Buttons/TextButton/TextButton";

const ScreenPicker = () => {

  const [sources, setSources] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const picked = useRef(false);

  const dispatch = useDispatch();
 
  const fetchSources = async () => {
    setLoading(true);
    setError(null);
    try {
      const srcs = await window.electron.getSources();
      setSources(srcs);
      setLoading(false);
    } catch (err) {
      setError("Could not fetch screen/window sources. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSources();
    return () => {
      if (!picked.current) handleCancel();
    };
    // eslint-disable-next-line
  }, []);

  const handlePick = (source) => {
    picked.current = true;
    window.dispatchEvent(
      new CustomEvent("bubble:screen-picker-selected", { detail: { source } })
    );
  };

  const handleCancel = () => {
    picked.current = true;
    window.dispatchEvent(
      new CustomEvent("bubble:screen-picker-selected", { detail: { source: null } })
    );
    dispatch(stopSharingScreen());
  };

  return (
    <div className={styles.modal}>
      {loading ? (
        <SpinnerLoading />
      ) : error ? (
        <div className={styles.error}>
          <span>{error}</span>
          <TextButton title="Retry" action={fetchSources} />
        </div>
      ) : (
        <div className={styles.sourcesGrid}>
          {sources.map((src) => (
            <button
              key={src.id}
              className={styles.sourceCard}
              onClick={() => handlePick(src)}
              tabIndex={0}
              title={src.name}
            >
              <div className={styles.thumbnailWrapper}>
                <img
                  src={src.thumbnail}
                  alt={src.name}
                  className={styles.thumbnail}
                />
                {src.icon && (
                  <img
                    src={src.icon}
                    alt="App Icon"
                    className={styles.appIcon}
                  />
                )}
              </div>
              <span className={styles.sourceName}>{src.name}</span>
            </button>
          ))}
        </div>
      )}
      <TextButton backgroundColor={'var(--error-color)'} action={handleCancel} title="Cancel" />
    </div>
  );
};

export default ScreenPicker;
