import PropTypes from "prop-types";
import styles from "./Header.module.css";

const Header = ({ text, level = 1, className = "", margin, textAlign }) => {
  const Tag = `h${level}`; // Dynamically choose the HTML heading tag (h1, h2, h3, etc.)

  return <Tag style={{margin, textAlign}} className={`${styles.title} ${className}`}>{text}</Tag>;
};

Header.propTypes = {
  text: PropTypes.string.isRequired, // The title text
  level: PropTypes.number, // Heading level (default: h1)
  className: PropTypes.string, // Custom className for additional styling
};

export default Header;
