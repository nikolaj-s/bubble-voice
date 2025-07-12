
import styles from './LineSpacer.module.css'

export const LineSpacer = ({margin, backgroundColor, opacity, height}) => {
  return (
    <div style={{margin, backgroundColor, opacity, height}} className={styles.spacer} />
  )
}
