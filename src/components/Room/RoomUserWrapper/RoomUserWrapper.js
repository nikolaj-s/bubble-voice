import React from 'react';
import { RoomUserCard } from '../RoomUserCard/RoomUserCard';

import styles from './RoomUserWrapper.module.css';

export const RoomUserWrapper = ({ users }) => {
    const [expanded, setExpanded] = React.useState("");
    const hidingNonVideoMembers = false;

    let margin = 8;
    const ratio = 9 / 16;

    React.useEffect(() => {
        const parent = document.getElementById('user-streams-wrapper');
        const c_count = Array.from(parent.children);

        if (expanded !== "") {
            for (const child of c_count) {
                if (child.id === expanded) {
                    let wDimension = parent.offsetWidth;
                    let hDimension = parent.offsetHeight;
                    let hConstraints = c_count.length === 1 ? 0 : c_count[0].id === expanded || c_count[c_count.length - 1].id === expanded ? 108 : 208;

                    let height = hDimension - hConstraints;
                    let max = 0;
                    let i = 1;

                    while (i < 5000) {
                        let a = area(i, height, wDimension, [0]);
                        if (a === false) {
                            max = i - 1;
                            break;
                        }
                        i++;
                    }

                    max = max - (2 * 2);
                    const v = child.querySelector('video');

                    if (v) {
                        v.style.objectFit = 'contain';
                    }

                    child.style.width = `100%`;
                    child.style.margin = '0px';
                    child.style.height = `${(max * ratio)}px`;
                    child.style.maxHeight = `100%`;
                    child.style.maxWidth = `100%`;
                    child.style.borderRadius = '0px';

                } else {
                    const v = child.querySelector('video');
                    if (v) {
                        v.style.objectFit = null;
                    }

                    child.style.borderRadius = null;
                    child.style.margin = '0px';
                    child.style.maxHeight = '540px';
                    child.style.maxWidth = '960px';
                    child.style.width = '100px';
                    child.style.height = '100px';
                }
            }
        } else {
            handleScaling();
        }
    // eslint-disable-next-line   
    }, [expanded, hidingNonVideoMembers]);

    React.useEffect(() => {
        let observer;
        try {
            handleScaling();
            window.onresize = function () {
                handleScaling(true);
            };

            const el = document.getElementById('user-streams-wrapper');
            const config = { childList: true, subtree: true };

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
            if (expanded !== "" && !resize) return;

            const parent = document.getElementById('user-streams-wrapper');

            const children = parent.children;

            const c_count = Array.from(children);

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
            setExpanded("");
        } else {
            setExpanded(id);
        }
    };

    return (
        <>
            <div
                className={styles.container}
                id='user-streams-wrapper'
                style={{
                    overflowY:'hidden',   // Allow vertical scrolling if needed
                    height: '100%',      // Ensure the parent has a full height to manage child sizes
                    display: 'flex',     // Use flexbox to control the children layout
                    flexWrap: 'wrap',    // Allow wrapping of child components
                    justifyContent: 'center'  // Center the children horizontally
                }}
            >
                {!users ? null :
                    users.map(user => {
                        return <RoomUserCard action={handleStreamExpansion} key={user.user_id} {...user} />
                    })
                }
            </div>
        </>
    );
};
