import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

export const SubPageWrapper = ({page, children}) => {

    return (
        <AnimatePresence mode='wait'>
            <motion.div
                    key={page}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 10
                    }}
                    >
                    {children}
            </motion.div>
        </AnimatePresence>
    )
}
