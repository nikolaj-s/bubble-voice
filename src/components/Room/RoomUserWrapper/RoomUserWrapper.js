import React, { useCallback, useState } from 'react';

import { RoomUserCard } from '../RoomUserCard/RoomUserCard';

import styles from './RoomUserWrapper.module.css';

import { useDispatch, useSelector } from 'react-redux';

import { MediaPlayerStreamSource } from '../../MediaPlayer/MediaPlayerStreamSource/MediaPlayerStreamSource';

import RoomPlaceholder from '../RoomPlaceholder/RoomPlaceholder';

import UserStreamSource from '../UserStreamSource/UserStreamSource';
import PipWrapper from '../../PipWrapper/PipWrapper';
import { useNavigate } from 'react-router';
import { setVoiceChannelFocused } from '../../../features/Channel/VoiceChannel/voiceChannelSlice';

export const RoomUserWrapper = ({ users, disable_streams }) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const server_id = useSelector(state => state.serverDetailsSlice.server_id);

    const [ambientColor, setAmbientColor] = useState(null);

    const { hideUsers } = useSelector(state => state.appearanceSlice);

    const textChannelOpen = useSelector(state => state.textChannelSlice.currentTextChannel);

    const focused = useSelector(state => state.voiceChannelSlice.focused);

    const [expanded, setExpanded] = React.useState(null);

    const hideNonVideoUsers = useSelector(state => state.voiceChannelSlice.hideNonVideoUsers);

    const hideMediaPlayer = useSelector(state => state.mediaPlayerSlice.hideMediaPlayer);

    const fullScreen = useSelector(state => state.uiSlice.fullscreen)
   
    let margin = 8;

    const ratio = 9 / 16;

    React.useLayoutEffect(() => {
            const parent = document.getElementById('user-streams-wrapper');
            if (!parent) return;

            const children = Array.from(parent.children).filter(c => !c.hidden);

            // Calculate available space for expanded child
            if (focused === false) {

                for (const child of children) {
                 
                    child.style.gridRow = 1;
                    child.style.gridColumn = 1;
                    child.style.width = '100%';
                    child.style.height = '100%';

                    const video = child.querySelector('video');

                    if (video) video.style.objectFit = 'contain'
                }

            } else if (expanded) {
                const expandedChild = children.find(child => child.id === expanded);
                const nonExpandedChildren = children.filter(child => child.id !== expanded);

                const parentWidth = parent.offsetWidth;
                const parentHeight = parent.offsetHeight;

                // How much space do the other items need?
                const reservedWidth = nonExpandedChildren.length * 100; // 100px width per side-by-side? (adjust as needed)
                const reservedHeight = nonExpandedChildren.length * 100; // 100px height if stacked (see below)

                // We'll assume you want the others at the BOTTOM, so reserve height
                const availableHeight = Math.max(parentHeight - (nonExpandedChildren.length > 0 ? 105 : 0), 0);
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

                // 1) Compute how many 100px columns fit (at least 1)
                const numberOfColumns = Math.max(Math.floor(parentWidth / 100), 1);

                // 2) Build [middle, middle-1, middle+1, middle-2, middle+2…] up to `n`
                function generateColumnOrder(n) {
                const order = [];
                const midF = (n + 1) / 2;
                const left  = Math.floor(midF);
                const right = Math.ceil(midF);
                const seen  = new Set();
                let step = 0;

                while (order.length < n) {
                    if (step === 0) {
                    if (!seen.has(left))  { order.push(left);  seen.add(left);  }
                    if (right !== left && !seen.has(right)) { order.push(right); seen.add(right); }
                    } else {
                    const l = left - step;
                    if (l >= 1 && !seen.has(l)) { order.push(l); seen.add(l); }
                    const r = right + step;
                    if (r <= n && !seen.has(r)) { order.push(r); seen.add(r); }
                    }
                    step++;
                }
                return order;
                }

                const columnOrder = generateColumnOrder(numberOfColumns);
                // e.g. n=5 → [3,2,4,1,5]; n=4 → [2,3,1,4]

                // 3) Loop and assign each child to the next spot in that spiral
                nonExpandedChildren.forEach((child, idx) => {
                const col = columnOrder[idx % numberOfColumns];

                child.style.gridRow    = 2;
                child.style.gridColumn = col;
                child.style.width      = `100px`;
                child.style.height     = `100px`;
                child.style.margin     = `0`;
                child.style.borderRadius = `50%`;

                const v = child.querySelector('video');
                if (v) v.style.objectFit = 'cover';
                });
            

            } else {
                handleScaling();
                setAmbientColor(null);
            }
    // eslint-disable-next-line
    }, [expanded, hideNonVideoUsers, hideUsers, textChannelOpen, hideMediaPlayer, fullScreen, focused]);


    React.useLayoutEffect(() => {
        let observer;
        let sizeObserver;
        try {
            handleScaling();
            window.removeEventListener('resize', () => handleScaling(true));

            const el = document.getElementById('user-streams-wrapper');
            const config = { childList: true, subtree: false };

            observer = new MutationObserver(handleScaling);
            observer.observe(el, config);

            sizeObserver = new ResizeObserver(handleScaling);
            sizeObserver.observe(el, config);

            return () => {
                observer.disconnect();
                sizeObserver?.disconnect();
                window.removeEventListener('resize', () => handleScaling(true));

            };
        } catch (error) {
            console.log(error);
        }

        return () => {
            window.removeEventListener('resize', handleScaling);
            window.onresize = null;
            observer?.disconnect();
            sizeObserver?.disconnect();
        };
    // eslint-disable-next-line
    }, [focused]);

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

    const handleScaling = useCallback((resize = false) => {
        try {

            if (expanded && !resize) return;

            if (resize) setExpanded(null);

            const parent = document.getElementById('user-streams-wrapper');

            const children = parent.children;

            if (focused === false) {
                for (const child of children) {
                    child.style.gridRow = 1;
                    child.style.gridColumn = 1;
                    child.style.width = '100%';
                    child.style.height = '100%';

                    const video = child.querySelector('video');

                    if (video) video.style.objectFit = 'contain'
                }

                return;
            }

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
    }, [expanded, focused]);

    const handleStreamExpansion = (id) => {
        if (id === expanded) {
            setExpanded(null);
        } else {
            setExpanded(id);
        }
    };

    const returnToVoiceChannel = (e) => {

        e.stopPropagation();

        navigate(`/dashboard/server/${server_id}`);

        dispatch(setVoiceChannelFocused(true));

    }

    return (
        <PipWrapper isPip={!focused} title='Current Stream' onClose={returnToVoiceChannel} >
            <div
                className={`${styles.container} ${expanded ? styles.expandedContainer : null} ${focused === false ? styles.popout : null}`}
                id='user-streams-wrapper'
                style={{
                    overflowY:'hidden',   // Allow vertical scrolling if needed
                    height: fullScreen ? '100svh' : null,      // Allow wrapping of child components
                    justifyContent: 'center',
                    backgroundColor: ambientColor,  // Center the children horizontally,
                    paddingBottom: fullScreen ? 0 : null
                }}
            >   
                {users.map((user, key) => (
                    <React.Fragment key={user.id + key}>
                    {user.type === 'user' ?
                        <RoomUserCard key={user.id} {...user} action={handleStreamExpansion} />
                        : user.type === 'stream' ?
                        <UserStreamSource setAmbientColor={setAmbientColor} action={handleStreamExpansion} key={user.id} {...user} isExpanded={expanded === user.id} /> :
                        null
                        }
                    </React.Fragment>
                ))}
                <MediaPlayerStreamSource key='media-player-stream-source' expanded={expanded === 'media-player-stream-source'} expand={handleStreamExpansion} /> 
                {disable_streams && (<RoomPlaceholder />)}
            </div>
        </PipWrapper>
    );
};
