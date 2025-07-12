import React, { useEffect, useState } from 'react'
import { Users } from '../users/Users'
import { useSelector } from 'react-redux'
import { LineSpacer } from '../../../components/ui/Spacers/LineSpacer/LineSpacer';
import { ToolBar } from '../../../components/ui/Wrappers/ToolBar/ToolBar';
import TextButton from '../../../components/ui/Buttons/TextButton/TextButton';
import { Moments } from '../../../components/Moments/Moments';
import { AnimatePresence, motion } from 'framer-motion';

const slideVariants = {
  enter: direction => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: direction => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0
  })
};

export const SectionThree = () => {

    const [page, setPage] = useState('users');

    const {currentTextChannel} = useSelector(state => state.textChannelSlice);

    const [direction, setDirection] = useState(0);

    useEffect(() => {
        setDirection(page === 'users' ? 1 : -1);
    }, [page]);

    return (
        <>
        <ToolBar style={{backgroundColor: 'var(--primary-color)', marginTop: 20, padding: '5px 10px'}} >
            <TextButton action={() => {setPage('users')}} backgroundColor={page === 'users' ? 'var(--button-hover)' : 'var(--primary-color)'} height={30} minHeight={30} title='Users' />
            <TextButton action={() => {setPage('moments')}} backgroundColor={page === 'moments' ? 'var(--button-hover)' : 'var(--primary-color)'} minHeight={30} height={30} title='Moments'  />
        </ToolBar>
        <LineSpacer height={1} opacity={1} backgroundColor={'var(--background-color)'} />
        <div style={{height: 'calc(100% - 40px)', display: 'flex', width: '100%', flexDirection: 'column', position: 'relative'}}>
          <AnimatePresence mode='sync'>
              {page === 'users' ? (
                  <motion.div
                  style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0}}
                  key="users"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  >
                  <Users />
                  </motion.div>
              ) : (
                  <motion.div
                                   style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0}}
                  key="moments"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  >
                  <Moments channel_id={currentTextChannel} />
                  </motion.div>
              )}
          </AnimatePresence>
        </div>
        </>
    )
}
