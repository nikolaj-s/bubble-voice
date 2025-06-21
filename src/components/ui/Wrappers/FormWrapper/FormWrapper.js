import React from 'react';

import {motion} from 'framer-motion';

import styles from './FormWrapper.module.css';
import Label from '../../../ui/Titles/Label/Label';
import Header from '../../../ui/Titles/Header/Header';

import SpinnerLoading from '../../../ui/Loading/Spinner/SpinnerLoading';
import TextLabelError from '../../../Error/TextLabelError/TextLabelError';

export const FormWrapper = ({children, header = false, label = false, onSubmit, loading = false, error = false}) => {
  return (
    <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {!header ? null :<Header text={header} />}
        {!label ? null :<Label label={label} />}
        <form className={styles.form} onSubmit={onSubmit}>
          {error ?
          <TextLabelError error={error} />
          : null}
        {children}
        
        </form>
        {loading ? <SpinnerLoading /> : null}
    </motion.div>
  )
}
