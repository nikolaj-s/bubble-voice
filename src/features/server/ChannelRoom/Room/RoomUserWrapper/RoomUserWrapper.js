import React from 'react'
import { User } from '../User/User'

export const RoomUserWrapper = ({users}) => {

    const [expanded, setExpanded] = React.useState("");

    React.useEffect(() => {

        const parent = document.getElementById('live-chat-wrapper');

        for (const child of parent.children) {
            if (expanded === child.id) {
                // if child is of type video stream --> pop out of constraints
                child.style.position = 'absolute';
                child.style.maxHeight = 'calc(100% - 8px)';
                child.style.maxWidth = 'calc(100% - 8px)';
                child.style.width = 'calc(100% - 8px)';
                child.style.height = 'calc(100% - 8px)';
                child.style.top = '0';
                child.style.left = '0';
                child.style.zIndex = '1';
            } else {
                child.style.maxWidth = '600px';
                child.style.maxHeight = 'minmax(30%, 400px)';
                child.style.position = 'relative';
                child.style.zIndex = '0'
            }
        }

    }, [expanded])

    React.useEffect(() => {

        const parent = document.getElementById('live-chat-wrapper');

        parent.addEventListener('click', handleStreamExpansion);

        return () => {
            parent.removeEventListener('click', handleStreamExpansion);
        }

    }, [expanded])

    const handleStreamExpansion = (e) => {

        for (const el of e.path) {
            
            if ((el.id !== 'live-chat-wrapper' && el.id) && (el.className === 'active-user-container' || el.className === 'streaming-video-player-container')) {
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
        {!users ? null :
        users.map(obj => {
            return <User user={obj} key={obj.username} />
        })
        }
        </>
    )
}
