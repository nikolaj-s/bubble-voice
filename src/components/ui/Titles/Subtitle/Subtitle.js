import styles from './Subtitle.module.css'

export const Subtitle = ({children, margin, className}) => {
    return (
        <p style={{margin}} className={`${styles.subtitle} ${className}`}>{children}</p>
    )
}
