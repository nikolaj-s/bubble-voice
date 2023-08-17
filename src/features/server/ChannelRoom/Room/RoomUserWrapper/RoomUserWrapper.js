import React from 'react'
import { useSelector } from 'react-redux';
import { selectDisableMediaWidget, selectHideUserStatus, selectMiscSettingsHideNonVideoParticapents } from '../../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { selectBehindState, selectMusicExpanded } from '../Music/MusicSlice';
import { User } from '../User/User'
import { selectTriggerRoomRescale, triggerRoomRescale } from '../../../ServerSlice';
import { Music } from '../Music/Music';

export const RoomUserWrapper = ({users, page, loaded}) => {

    const [expanded, setExpanded] = React.useState("");

    const hidingNonVideoMembers = useSelector(selectMiscSettingsHideNonVideoParticapents);

    const hidingUserStatus = useSelector(selectHideUserStatus);

    const musicExpanded = useSelector(selectMusicExpanded);

    const behindState = useSelector(selectBehindState);

    const roomRescale = useSelector(selectTriggerRoomRescale);

    const hideMediaVideo = useSelector(selectDisableMediaWidget);

    let margin = 8

    const ratio = (9 / 16);

    React.useEffect(() => {

        const parent = document.getElementById('user-streams-wrapper');

        const c_count = Array.from(parent.children).filter(child => ((child.attributes[2] ? child.attributes[2]["value"].includes('flex') : null && child.className === 'active-user-container') || (child.className === 'streaming-video-player-container' && child.attributes[2]["value"].includes('flex'))));
            
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
                        let a = area(i, height, wDimension, [0])
                        if (a === false) {
                            max = i - 1;
                            break;
                        }
                        i++;
                    }
        
                    max = max - (2 * 2);

                    const v = child.querySelector('video');

                    if (v) {
                        v.style.objectFit = 'contain'
                    }

                    child.style.width = `100%`;
                    child.style.margin = '0px'
                    child.style.height = `${(max * ratio)}px`;
                    child.style.maxHeight = `calc(100%)`
                    child.style.maxWidth = `calc(100%)`
                    child.style.borderRadius = '0px'

                } else {
                    const v = child.querySelector('video');

                    if (v) {
                        v.style.objectFit = null;
                    }

                    child.style.borderRadius = null;
                    child.style.margin = '0px'
                    child.style.maxHeight = '540px'
                    child.style.maxWidth = '960px'
                    child.style.width = '100px'
                    child.style.height = '100px'
                }
            }

            

        } else {
            handleScaling();
        }
    // eslint-disable-next-line   
    }, [expanded, hidingNonVideoMembers])



    React.useEffect(() => {

        setTimeout(() => {
            handleScaling(true);
        }, 50)
        
    }, [hideMediaVideo])
    
    
    React.useEffect(() => {
        setTimeout(() => {
            handleScaling();
        }, 300)
    }, [page])


    React.useEffect(() => {
        
        handleScaling();
       
    }, [roomRescale])

    React.useEffect(() => {
        
        handleScaling();

    }, [hidingUserStatus])

    React.useEffect(() => {

        let observer;

        try {
            handleScaling()

            let timeout;

            window.onresize = function() {

                handleScaling(true);
            }

            const el = document.getElementById('user-streams-wrapper');

            const config = { childList: true, subtree: true};

            observer = new MutationObserver(handleScaling);

            observer.observe(el, config);

            return () => {

                observer.disconnect();

                window.removeEventListener('resize', handleScaling)

                window.onresize = null;
            }
        } catch (error) {
            console.log(error);
        }

        return () => {

            window.removeEventListener('resize', handleScaling);

            window.onresize = null;

            observer?.disconnect();
        }

    // eslint-disable-next-line
    }, [])

    React.useEffect(() => {

        try {

            const parent = document.getElementById('user-streams-wrapper');

            parent.addEventListener('click', handleStreamExpansion);

            return () => {
                parent?.removeEventListener('click', handleStreamExpansion);
            }

        } catch (error) {
            console.log(error);
        }
        
    // eslint-disable-next-line
    }, [expanded])

    const area = (increment, hD, wD, active_streams) => {
        let i = 0;
        let w = 0;
        let h = increment * ratio + (margin * 2);
        while (i < (active_streams.length)) {
            if ((w + increment) > wD) {
                w = 0;
                h = h + (increment * ratio) + (margin * 2);
            }
            w = w + increment + (margin * 2);
            i++;
        }
        if (h > hD || increment > wD) return false;
        else return increment;
    }

    const handleScaling = (resize = false) => {
        try {

            if (expanded !== "" && !resize) return;

            const parent = document.getElementById('user-streams-wrapper');
            
            const children = parent.children
            
            const c_count = Array.from(children).filter(child => ((child.attributes[2] ? child.attributes[2]["value"].includes('flex') : null && child.className === 'active-user-container') || (child.className === 'streaming-video-player-container' && child.attributes[2]["value"].includes('flex'))));
            
            let wDimension = parent.offsetWidth - 10;

            let hDimension = parent.offsetHeight - 20;
            
            let max = 0;
            let i = 1;

            while (i < 8000) {
                let a = area(i, hDimension, wDimension, c_count)
                if (a === false) {
                    max = i - 1;
                    break;
                }
                i++;
            }

            max = max - (margin * 2);
            
            for (const c of children) {
                c.style.maxHeight = '540px'
                c.style.maxWidth = '960px'
                c.style.width = `${max}px`;
                c.style.height = `${(max * ratio)}px`;
                c.style.margin = '2px'
                c.style.position = null;
                c.style.objectFit = 'contain';
                c.style.borderRadius = null;

                const v = c.querySelector('video');

                if (v) {
                    v.style.objectFit = null;
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleStreamExpansion = (e) => {

        const path = e.path || (e.composedPath && e.composedPath())

        for (const el of path) {
            
            if ((el.id !== 'user-streams-wrapper' && el.id) && (el.className === 'active-user-container' || el.className === 'streaming-video-player-container')) {
                if (el.id === expanded) {
                    setExpanded("");
                } else {
                    setExpanded(el.id);
                }
            }
            
        }
            
    }

    return (
        <>
            <div
            
            id='user-streams-wrapper'>
                {!users ? null :
                users.map(obj => {
                    return <User user={obj} key={obj.username} />
                })
                }
                {loaded ? <Music /> : null}
            </div>
        </>
    )
}
