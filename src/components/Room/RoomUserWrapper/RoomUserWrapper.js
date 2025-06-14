import React from 'react';

import { RoomUserCard } from '../RoomUserCard/RoomUserCard';

import styles from './RoomUserWrapper.module.css';

import { useSelector } from 'react-redux';

import { MediaPlayerStreamSource } from '../../MediaPlayer/MediaPlayerStreamSource/MediaPlayerStreamSource';

import RoomPlaceholder from '../RoomPlaceholder/RoomPlaceholder';

import UserStreamSource from '../UserStreamSource/UserStreamSource';

export const RoomUserWrapper = ({ users, disable_streams }) => {

    const { hideUsers } = useSelector(state => state.appearanceSlice);

    const textChannelOpen = useSelector(state => state.textChannelSlice.currentTextChannel);

    const [expanded, setExpanded] = React.useState(null);

    const hideNonVideoUsers = useSelector(state => state.voiceChannelSlice.hideNonVideoUsers);

    const hideMediaPlayer = useSelector(state => state.mediaPlayerSlice.hideMediaPlayer);

    const fullScreen = useSelector(state => state.uiSlice.fullScreen)

    let margin = 8;

    const ratio = 9 / 16;

    React.useEffect(() => {
            const parent = document.getElementById('user-streams-wrapper');
            if (!parent) return;

            const children = Array.from(parent.children).filter(c => !c.hidden);

            // Calculate available space for expanded child
            if (expanded) {
                const expandedChild = children.find(child => child.id === expanded);
                const nonExpandedChildren = children.filter(child => child.id !== expanded);

                const parentWidth = parent.offsetWidth;
                const parentHeight = parent.offsetHeight;

                // How much space do the other items need?
                const reservedWidth = nonExpandedChildren.length * 100; // 100px width per side-by-side? (adjust as needed)
                const reservedHeight = nonExpandedChildren.length * 100; // 100px height if stacked (see below)

                // We'll assume you want the others at the BOTTOM, so reserve height
                const availableHeight = Math.max(parentHeight - (nonExpandedChildren.length > 0 ? 110 : 0), 0);
                const availableWidth = parentWidth;

                // Aspect ratio logic
                if (expandedChild) {
                const context = JSON.parse(expandedChild.getAttribute('data-context'));
                let width = availableWidth;
                let height = availableHeight;

                // Fit the aspect ratio box inside the available area
                const wByAR = height * (context.aspectRatio || (16 / 9));
                const hByAR = width / (context.aspectRatio || (16 / 9));
                
                if (wByAR <= width) {
                    width = wByAR;
                } else {
                    height = hByAR;
                }
                

                // Apply styles to expanded child
                expandedChild.style.width = `100%`;
                expandedChild.style.height = `${height}px`;
                expandedChild.style.maxWidth = `100%`;
                expandedChild.style.maxHeight = `100%`;
                expandedChild.style.margin = '0px';
                expandedChild.style.borderRadius = '0px';
                expandedChild.style.gridColumn = '1 / -1';
                expandedChild.style.gridRow = '1';
                const v = expandedChild.querySelector('video');
                    if (v) v.style.objectFit = 'contain';
                }

                const numberofColums = Math.floor(parentWidth / 100);
               
                // All other (non-expanded) children: 100x100
                let column = 1;

                for (const child of nonExpandedChildren) {

                    if (column === numberofColums) {
                        column = 1;
                    }
                
                    child.style.gridRow = 2;

                    child.style.gridColumn = column;

                    child.style.width = `100px`;

                    child.style.height = `100px`;

                    child.style.margin = '0px';

                    child.style.borderRadius = '50%';

                    const v = child.querySelector('video');

                    if (v) v.style.objectFit = 'cover';

                    column += 1;
                }
            } else {
                handleScaling();
            }
    // eslint-disable-next-line
    }, [expanded, hideNonVideoUsers, hideUsers, textChannelOpen, hideMediaPlayer, fullScreen]);


    React.useEffect(() => {
        let observer;
        try {
            handleScaling();
            window.onresize = function () {
                handleScaling(true);
            };

            const el = document.getElementById('user-streams-wrapper');
            const config = { childList: true, subtree: false };

            observer = new MutationObserver(handleScaling);
            observer.observe(el, config);

            return () => {
                observer.disconnect();
                window.removeEventListener('resize', handleScaling);
                window.onresize = null;
            };
        } catch (error) {
            console.log(error);
        }

        return () => {
            window.removeEventListener('resize', handleScaling);
            window.onresize = null;
            observer?.disconnect();
        };
    // eslint-disable-next-line
    }, []);

    const area = (increment, hD, wD, active_streams) => {
        let i = 0;
        let w = 0;
        let h = increment * ratio + (margin * 2);
        while (i < active_streams.length) {
            if ((w + increment) > wD) {
                w = 0;
                h = h + (increment * ratio) + (margin * 2);
            }
            w = w + increment + (margin);
            i++;
        }
        if (h > hD || increment > wD) return false;
        else return increment;
    };

    const handleScaling = (resize = false) => {
        try {

            if (expanded && !resize) return;

            if (resize) setExpanded(null);

            const parent = document.getElementById('user-streams-wrapper');

            const children = parent.children;

            const c_count = Array.from(children).filter(c => !c.hidden);
      
            let wDimension = parent.offsetWidth;
            let hDimension = parent.offsetHeight;

            let max = 0;
            let i = 1;

            while (i < 8000) {
                let a = area(i, hDimension, wDimension, c_count);
                if (a === false) {
                    max = i - 1;
                    break;
                }
                i++;
            }

            max = max - (margin * 2);

            // Apply scaling to child components and prevent overflow
            for (const c of children) {
                c.style.width = `${max}px`;
                c.style.height = `${(max * ratio)}px`;
                c.style.margin = '2px';
                c.style.position = null;
                c.style.objectFit = 'contain';
                c.style.borderRadius = null;
                c.style.gridRow = null;
                c.style.gridRow = null;
                c.style.maxWidth = `960px`;
                c.style.maxHeight = '540px'
                const v = c.querySelector('video');
                if (v) {
                    v.style.objectFit = null;
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleStreamExpansion = (id) => {
        if (id === expanded) {
            setExpanded(null);
        } else {
            setExpanded(id);
        }
    };

    return (
        <>
            <div
                className={`${styles.container} ${expanded ? styles.expandedContainer : null}`}
                id='user-streams-wrapper'
                style={{
                    overflowY:'hidden',   // Allow vertical scrolling if needed
                    height: '100%',      // Allow wrapping of child components
                    justifyContent: 'center'  // Center the children horizontally
                }}
            >   
                {users.map(user => (
                    <>
                   {user.type === 'user' ?
                    <RoomUserCard key={user.id} {...user} action={handleStreamExpansion} />
                    : user.type === 'stream' ?
                    <UserStreamSource action={handleStreamExpansion} key={user.id} {...user} isExpanded={expanded === user.id} /> :
                    null
                    }
                    </>
                ))}
                <MediaPlayerStreamSource expanded={expanded === 'media-player-stream-source'} expand={handleStreamExpansion} /> 
                {disable_streams && (<RoomPlaceholder />)}
            </div>
        </>
    );
};
