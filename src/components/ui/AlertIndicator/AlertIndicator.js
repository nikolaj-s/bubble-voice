import styles from './AlertIndicator.module.css'

export const AlertIndicator = ({active}) => {
  return (
    <>
   {active && (<div className={styles.alertIndicator} />)}
   </>
  )
}
