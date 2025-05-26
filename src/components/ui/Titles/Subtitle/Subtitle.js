import styles from './Subtitle.module.css'

export const Subtitle = ({children, margin}) => {
    return (
        <p style={{margin}} className={styles.subtitle}>{children}</p>
    )
}
