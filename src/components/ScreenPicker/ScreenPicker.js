import { useEffect, useState, useRef } from "react";
import styles from "./ScreenPicker.module.css";
import { useDispatch } from "react-redux";
import { stopSharingScreen } from "../../features/Channel/MediaControl/mediaControlSlice";
import SpinnerLoading from "../ui/Loading/Spinner/SpinnerLoading";
import TextButton from "../ui/Buttons/TextButton/TextButton";
import { ToolBar } from "../ui/Wrappers/ToolBar/ToolBar";
import { AppWindow, Monitor } from "lucide-react";

const ScreenPicker = () => {

  const [sources, setSources] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const picked = useRef(false);

  const dispatch = useDispatch();

  const [filter, setFilter] = useState('window');
 
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
      <ToolBar style={{width: '100%', display: 'inline-flex', justifyContent: 'space-evenly'}}>
        <TextButton action={() => {setFilter('window')}} width={'calc(50% - 5px)'} title="Application's" icon={AppWindow} backgroundColor={filter === 'window' ? null : 'transparent'} />
        <TextButton action={() => {setFilter('screen')}} width={'calc(50% - 5px)'} title="Screen's" icon={Monitor} backgroundColor={filter === 'screen' ? null : 'transparent'} />
      </ToolBar>
      {loading ? (
        <SpinnerLoading />
      ) : error ? (
        <div className={styles.error}>
          <span>{error}</span>
          <TextButton title="Retry" action={fetchSources} />
        </div>
      ) : (
        <div className={styles.sourcesGrid}>
          {sources.filter(src => src?.id?.includes(filter)).map((src) => (
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
