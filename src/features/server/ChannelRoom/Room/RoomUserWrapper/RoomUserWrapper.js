import React from 'react'
import { User } from '../User/User'

export const RoomUserWrapper = ({users}) => {

    const [expanded, setExpanded] = React.useState("");

    const [prevExpanded, setPrevExpanded] = React.useState("")

    React.useEffect(() => {

        const parent = document.getElementById('live-chat-wrapper');

        for (const child of parent.children) {
            if (expanded === child.id) {
                // if child is of type video stream --> pop out of constraints
                child.style.position = 'absolute';
                child.style.maxHeight = 'calc(100% - 8px)';
                child.style.maxWidth = 'calc(100% - 8px)';
                child.style.width = 'calc(100% - 8px)';
                child.style.height = '100%';
                child.style.top = '0';
                child.style.left = '0';
                child.style.zIndex = '1';
            } else {
                child.style.maxWidth = '700px';
                child.style.maxHeight = '400px';
                child.style.position = 'relative';
                child.style.zIndex = '0'
            }
        }

    }, [expanded])

    const handleExpansion = (el) => {
        if (el.id === expanded) {
            setExpanded("");
        } else {
            setExpanded(el.id);
        }
    }

    const handleStreamExpansion = (e) => {
        const id = e.path[0].id.split('container')[0] + 'container';

        if (id === expanded) {
            setExpanded("");
        } else {
            setExpanded(id);
        }
    }

    // handle expansion of streams
    React.useEffect(() => {

        const streams = document.getElementsByClassName('streaming-video-player-container');

        for (const stream of streams) {
            stream.addEventListener('click', handleStreamExpansion);
        }

        return () => {
            for (const stream of streams) {
                stream.removeEventListener('click', handleStreamExpansion);
            }
        }

    })

    return (
        <>
        {!users ? null :
        users.map(obj => {
            return <User expand={handleExpansion} user={obj} key={obj.username} />
        })
        }
        </>
    )
}
