
import styles from './InlineToggleGroup.module.css';

export const InlineToggleGroup = ({ toggles, onToggle }) => {
  // 1️⃣ Build an array of { key, label, active }
  const items = Object.entries(toggles).map(([key, entry]) => {
    const isObj  = entry !== null && typeof entry === 'object' && 'value' in entry;
    return {
      key,
      label: isObj ? entry.label : key,
      active: isObj ? entry.value : entry,
    };
  });

  // 2️⃣ Sort by label alphabetically
  items.sort((a, b) => a.label.localeCompare(b.label));

  return (
    <div className={styles.container}>
      {items.map(({ key, label, active }) => (
        <button
          key={key}
          type="button"
          className={`${styles.toggleButton} ${active ? styles.active : styles.inactive}`}
          onClick={() => onToggle(key, !active)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};