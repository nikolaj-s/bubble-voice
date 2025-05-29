import React, { useRef, useState } from 'react';
import { motion, animate } from 'framer-motion';
import styles from './FixedSideMenuWrapper.module.css';

const SWIPE_CLOSE_X = 80; // px
const MAX_VERTICAL_DEVIATION = 32; // px

export const FixedSideMenuWrapper = ({ close = () => {}, children }) => {
    const [x, setX] = useState(0);
    const dragging = useRef(false);
    const touchStart = useRef({ x: 0, y: 0 });
    const lastDx = useRef(0);

    const handleTouchStart = e => {
        const t = e.touches[0];
        touchStart.current = { x: t.clientX, y: t.clientY };
        dragging.current = true;
        lastDx.current = 0;
    };

    const handleTouchMove = e => {
        if (!dragging.current) return;
        const t = e.touches[0];
        const dx = t.clientX - touchStart.current.x;
        const dy = Math.abs(t.clientY - touchStart.current.y);

        if (dy < MAX_VERTICAL_DEVIATION && dx > 0) {
            setX(dx);
            lastDx.current = dx;
        }
    };

    const handleTouchEnd = () => {
        dragging.current = false;
        if (lastDx.current > SWIPE_CLOSE_X) {
            // Animate menu out, then close
            setX(window.innerWidth);
            setTimeout(close, 230);
        } else {
            // Animate back to 0
            animate(x, 0, {
                duration: 0.22,
                ease: [0.4, 0.9, 0.7, 1.2],
                onUpdate: v => setX(v),
            });
        }
        lastDx.current = 0;
    };

    return (
        <>
            <div onClick={close} className={styles.close} />
            <motion.div
                className={styles.container}
                initial={{ x: '100%' }}
                animate={{ x }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                style={{ touchAction: 'pan-y', x }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {children}
            </motion.div>
        </>
    );
};
