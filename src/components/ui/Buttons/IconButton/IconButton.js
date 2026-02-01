import styles from "./IconButton.module.css";
import Tooltip from '../../ToolTip/ToolTip';

import { isValidElement } from "react";

const IconButton = ({
  Icon,
  title,
  onClick,
  position = "top",
  className = "",
  width = 30,
  height = 30,
  backgroundColor = 'rgba(0,0,0,0)',
  backgroundHover = 'var(--button-hover)',
  padding = 5,
  borderRadius,
  margin,
  disabled = false,
  toolTipBackground
}) => {

  const handleClick = (e) => {
    e.stopPropagation();
    if (!disabled) {
      onClick?.(e);
    }
  };

  return (
  <div style={{width, height}} className={className}>
    <Tooltip toolTipBackground={toolTipBackground} content={title} position={position} disabled={disabled}>
        <button
        
          type="button"
          style={{ width, height, backgroundColor, padding, borderRadius, margin, cursor: disabled ? "not-allowed" : "pointer" }}
          onClick={handleClick}
          className={`${styles.button} ${className} ${disabled ? styles.disabled : ""}`}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
        >
          
          {isValidElement(Icon) ? Icon : typeof Icon === 'function' || typeof Icon === 'object' ? <Icon color='var(--text-color)' /> : null}
          
        </button>
    </Tooltip>
   </div>
  );
};

export default IconButton;
