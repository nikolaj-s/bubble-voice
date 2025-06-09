import styles from './BoolIndicator.module.css'

export const BoolIndicator = ({active, width = 16, height = 16, color}) => {
    return (
        <div className={styles.container} style={{width, height, borderColor: color}}>
            {active && (<div className={styles.active} style={{backgroundColor: color}} />)}
        </div>
    )
}
