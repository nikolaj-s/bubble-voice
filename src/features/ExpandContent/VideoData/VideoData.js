import React from 'react'

export const VideoData = ({data = {}}) => {

    const [info, setInfo] = React.useState({});

    React.useEffect(() => {
        if (data.title) {
            setInfo(data);
        }
    }, [data])

    return (
        <div className='video-data-container'>
            
        </div>
    )
}
