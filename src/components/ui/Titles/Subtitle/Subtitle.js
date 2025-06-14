import styles from './Subtitle.module.css'

export const Subtitle = ({children, margin, className, width, textAlign}) => {
    return (
        <p style={{margin, width, textAlign}} className={`${styles.subtitle} ${className}`}>{children}</p>
    )
}
