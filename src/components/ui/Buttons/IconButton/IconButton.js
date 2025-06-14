import styles from "./IconButton.module.css";
import Tooltip from '../../ToolTip/ToolTip';

const IconButton = ({
  Icon,
  title,
  onClick,
  position = "top",
  className = "",
  width,
  height,
  backgroundColor = 'rgba(0,0,0,0)',
  backgroundHover = 'var(--button-hover)',
  padding = 5,
  borderRadius,
  margin,
  disabled = false
}) => {

  const handleClick = (e) => {
    e.stopPropagation();
    if (!disabled) {
      onClick?.(e);
    }
  };

  return (
    <Tooltip content={title} position={position} disabled={disabled}>
      <button
        onMouseDown={(e) => {e.stopPropagation()}}
        type="button"
        style={{ width, height, backgroundColor, padding, borderRadius, margin, cursor: disabled ? "not-allowed" : "pointer" }}
        onClick={handleClick}
        className={`${styles.button} ${className} ${disabled ? styles.disabled : ""}`}
        disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
      >
        {Icon}
      </button>
    </Tooltip>
  );
};

export default IconButton;
