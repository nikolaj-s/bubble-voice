import React from 'react'

export const OLD_Music = () => {
  return (
    <>
        {(currentlyPlaying && disableMediaWidget === false) ?
        <>
        
        <div 
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseUp}
        style={{
            backgroundColor: behind ? primaryColor : null,
            width: behind ? 'calc(100% - 4px)' : (expanded) ? 'calc(100%)' : visible ? 480 : 50,
            height: behind ? behindHeight : expanded ? "100%" : 275,
            right: 5,
            left: behind ? 0 : expanded ? '50%' : left,
            top: behind ? 0 : expanded ? 0 : top,
            transform: behind ? null : expanded ? 'translate(-50%, 0%)' : 'translate(0%, 50%)',
            boxShadow: expanded ? '5px 5px 60px rgba(0, 0, 0, 0.8)' : null,
            borderRadius: '10px',
            position: behind ? 'relative' : expanded  ? 'absolute' : 'fixed',
            zIndex: behind ? 0 : 12,
            marginTop: behind ? 5 : null,
            maxHeight: behind ? '500px' : null,
            border: behind ? `2px solid ${secondaryColor}` : null
        }}
        id={'music-player-component'}
        className='music-player-overlay-wrapper'>
            <div 
            style={{display: (expanded||behind) ? 'none' : 'flex',
            backgroundColor: primaryColor, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderTopRightRadius: visible ? 0 : 10, borderBottomRightRadius: visible ? 0 : 10,
           
            }}
            className='music-player-overlay-controls'>
                <MusicOverlayButton playing={musicPlaying} description={visible ? 'Hide' : 'Show'} action={toggleVisibility} width={20} height={20} />
                {(channel?.locked_media && channel?.media_auth?.includes(username)) || channel.channel_owner === username || permissions.server_group_name === 'Owner' || !channel.locked_media ? <SkipButton action={handleSkip} width={20} height={20} /> : null}
                {(channel?.locked_media && channel?.media_auth?.includes(username)) || channel.channel_owner === username || permissions.server_group_name === 'Owner' || !channel.locked_media ? !musicPlaying ? <PlayButton action={handleTogglePlaying} width={20} height={20}  /> : <PauseButton action={handleTogglePlaying} width={20} height={20} /> : <LockedIcon width={30} height={85} padding={5} i_height={25} i_width={25} />}
                
                <AudioToggleButton opacity={0.2} desc_width={120} description={(experimentalAudioCapture && sharingScreen) ? "Disabled While Streaming With Experimental Audio Enabled" : null} active={(experimentalAudioCapture && sharingScreen)} width={20} height={20} o_mouseEnter={() => {handleToggleVolumeControls(true)}} o_mouseLeave={() => {handleToggleVolumeControls(false)}} action={handleMute} state={!muted} />
                <PlaceBehindButton action={handleToggleBehind} description={"Pop In"} width={20} height={20} />
                {volumeControls ?
                <div style={{right: visible ? 248 : 35}} onMouseLeave={() => {handleToggleVolumeControls(false)}} onMouseEnter={() => {handleToggleVolumeControls(true)}} className='music-overlay-volume-container' >
                    <div style={{backgroundColor: primaryColor}} >
                        <Range action={handleVolumeChange} min={0} max={100} value={volume} step={0.01} />
                    </div> 
                </div>
                : null}
            </div>
            <div
            
            
            style={{ maxWidth: visible ? '100%' : 0, transition: '0.2s', cursor: expanded ? 'default' : 'grab'}} className='youtube-player-wrapper' id="youtube-media-container">
                <YouTube 
                
                onReady={handleOnReady}
                id={'room-music-player'}
                videoId={currentlyPlaying}  opts={{
                    
                    height: '100%',
                    width: '100%',
                    playerVars: {
                        fs: 0,
                        autoplay: 1,
                        enablejsapi: 1,
                        start: musicQueue[0]?.current ? musicQueue[0].current : 0,
                        controls: 0,
                        modestbranding: 1,
                        disablekb: 1
                    }}} style={{
                        borderBottomRightRadius: 15,
                        width: '100%',
                        height: '100%'
                    }} />
                    <div className='youtube-disable-clicking'>
                        <div className='song-title-container'>
                            <p style={{color: textColor}}>{musicQueue[0]?.title}</p>
                            <p style={{color: textColor, fontSize: '0.7rem', opacity: 0.7}}>Added By: {musicQueue[0]?.added_by}</p>
                        </div>
                        <ExpandButton width={20} height={20} action={handleExpansion} description={"Expand"} />
                    </div>
                    
            </div>
            <Loading loading={loading} />
        </div>
        {behind ? 
        <div 
        style={{
        backgroundColor: primaryColor,
        }}
        className='behind-music-player-overlay-controls'>
            <MusicOverlayButton playing={musicPlaying} description={visible ? 'Hide' : 'Show'} action={toggleVisibility} width={20} height={20} />
            {(channel?.locked_media && channel?.media_auth?.includes(username)) || channel.channel_owner === username || permissions.server_group_name === 'Owner' || !channel.locked_media ? <SkipButton action={handleSkip} width={20} height={20} /> : null}
            {(channel?.locked_media && channel?.media_auth?.includes(username)) || channel.channel_owner === username || permissions.server_group_name === 'Owner' || !channel.locked_media ? !musicPlaying ? <PlayButton action={handleTogglePlaying} width={20} height={20}  /> : <PauseButton action={handleTogglePlaying} width={20} height={20} /> : <LockedIcon width={30} height={85} padding={5} i_height={25} i_width={25}  />}
                
            <AudioToggleButton opacity={0.2} active={experimentalAudioCapture && sharingScreen} desc_width={120} description={(experimentalAudioCapture && sharingScreen) ? "Disabled While Streaming With Experimental Audio Enabled" : null} width={20} height={20} o_mouseEnter={() => {handleToggleVolumeControls(true)}} o_mouseLeave={() => {handleToggleVolumeControls(false)}} action={handleMute} state={!muted} />
            <PlaceBehindButton action={handleToggleBehind} active={true} description={"Pop Out"} width={20} height={20} />
            {volumeControls ?
            <div style={{right: visible ? 248 : 35}} onMouseLeave={() => {handleToggleVolumeControls(false)}} onMouseEnter={() => {handleToggleVolumeControls(true)}} className='music-overlay-volume-container' >
                <div style={{backgroundColor: primaryColor}} >
                    <Range action={handleVolumeChange} min={0} max={100} value={volume} step={0.01} />
                </div> 
            </div>
            : null}
        </div>
        : null}
        </>
        : null}
       
        </>
  )
}
