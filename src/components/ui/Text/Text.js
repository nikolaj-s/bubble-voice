import styles from './Text.module.css';

export const Text = ({children, style, className}) => {
    return (
        <p style={style} className={`${styles.text} ${className}`}>{children}</p>
    )
}
