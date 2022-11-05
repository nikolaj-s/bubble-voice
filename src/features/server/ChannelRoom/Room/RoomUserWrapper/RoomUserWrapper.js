import React from 'react'
import { useSelector } from 'react-redux';
import { selectMiscSettingsHideNonVideoParticapents } from '../../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { User } from '../User/User'

export const RoomUserWrapper = ({users}) => {

    const [expanded, setExpanded] = React.useState("");

    const hidingNonVideoMembers = useSelector(selectMiscSettingsHideNonVideoParticapents);

    let margin = 30;

    const ratio = (9 / 16);

    React.useEffect(() => {

        const parent = document.getElementById('user-streams-wrapper');

        if (expanded !== "") {

            for (const child of parent.children) {
                if (child.id === expanded) {

                    const v = child.querySelector('video');

                    if (v) {
                        v.style.objectFit = 'contain'
                    }
                    child.style.width = '100%';
                    child.style.height = 'calc(100% - 300px)';
                    child.style.maxHeight = '900px'
                    child.style.maxWidth = '1600px'
                } else {
                    const v = child.querySelector('video');

                    if (v) {

                        v.style.objectFit = 'cover'
                    
                    }
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
        try {
            handleScaling()

            window.addEventListener('resize', handleScaling);

            document.getElementById('user-streams-wrapper').addEventListener('DOMNodeInserted', handleScaling)

            document.getElementById('user-streams-wrapper').addEventListener('DOMNodeRemoved', handleScaling)
            return () => {
                window.removeEventListener('resize', handleScaling)

                document.getElementById('user-streams-wrapper')?.removeEventListener('DOMNodeInserted', handleScaling)

                document.getElementById('user-streams-wrapper')?.removeEventListener('DOMNodeRemoved', handleScaling)
            }
        } catch (error) {
            console.log(error);
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

    const handleScaling = () => {
        try {
            const parent = document.getElementById('user-streams-wrapper');

            const children = parent.children;
            
            const c_count = Array.from(children).filter(child => ((child.attributes[2] ? child.attributes[2]["value"].includes('flex') : null && child.className === 'active-user-container') || child.className === 'streaming-video-player-container'));
            
            let wDimension = parent.offsetWidth;

            let hDimension = parent.offsetHeight;
            
            let max = 0;
            let i = 1;

            while (i < 5000) {
                let a = area(i, hDimension, wDimension, c_count)
                if (a === false) {
                    max = i - 1;
                    break;
                }
                i++;
            }

            max = max - (margin * 2);
            
            for (const c of children) {
                
                c.style.width = `${max}px`;
                c.style.height = `${(max * ratio)}px`;
            
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleStreamExpansion = (e) => {

        for (const el of e.path) {
            
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
        <div id='user-streams-wrapper'>
        {!users ? null :
        users.map(obj => {
            return <User user={obj} key={obj.username} />
        })
        }
        </div>
    )
}
