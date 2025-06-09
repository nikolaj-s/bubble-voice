import styles from './BoolIndicator.module.css'

export const BoolIndicator = ({active, width = 16, height = 16}) => {
    return (
        <div className={styles.container} style={{width, height}}>
            {active && (<div className={styles.active} />)}
        </div>
    )
}
