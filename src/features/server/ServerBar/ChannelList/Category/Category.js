import React from 'react'
import { AltDownIcon } from '../../../../../components/Icons/AltDownIcon/AltDownIcon'
import { useSelector } from 'react-redux'
import { selectActivationColor, selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { LoadingChannelsPlaceHolder } from '../../../../../components/LoadingChannelsPlaceHolder/LoadingChannelsPlaceHolder'
import { ChannelButton } from '../../../../../components/buttons/ChannelButton/ChannelButton'

export const Category = ({category_id, catagoryName, channels, draggingChannel, toggleDraggingChannel, draggingUser, toggleDragginUser, move, handleJoinChannel, loading, draggingCategory, toggleDraggingCategory, moveCategory, marginBottom = null}) => {

    const [collapse, toggleCollapse] = React.useState(false);

    const [moveIndicator, toggleMoveIndicator] = React.useState(false);

    const textColor = useSelector(selectTextColor);

    const activationColor = useSelector(selectActivationColor);

    const handleCategoryMove = (e) => {
        try {
            const id = e.dataTransfer.getData('text');

            toggleMoveIndicator(false);

            if (draggingCategory) {

                if (category_id === 'channels') return;

                if (!id) return;

                moveCategory(id, category_id, false);
            } else {
                
                if (!id || id.split(' ').length > 1) return;
    
                move(id, 0, category_id);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const onDragStart = (e) => {
        e.stopPropagation();

        if (!category_id || category_id === 'channels') return;

        e.dataTransfer.setData('text/plain', `${category_id}`);

        toggleDraggingCategory(true);
    }

    const onDragEnd = () => {
        toggleDraggingCategory(false);
    }

    const newCategoryPos = (e) => {

        e.stopPropagation();

        toggleMoveIndicator(false);

        if (draggingCategory) {

            if (category_id === 'channels') return;

            const id = e.dataTransfer.getData('text');

            if (!id) return;

            moveCategory(id, category_id, true);

        }

        
    }

    React.useEffect(() => {

        const collapsed = localStorage.getItem(category_id);

        if (collapsed) {
            const value = JSON.parse(collapsed);

            if (value?.collapsed) toggleCollapse(true);
        }

    }, [])
    
    React.useEffect(() => {

        const data = {collapsed: collapse};

        localStorage.setItem(category_id, JSON.stringify(data));

    }, [collapse])

    return (
        <>
        <div 
        draggable={category_id !== 'channels'}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        id={category_id}
        style={{
            backgroundColor: moveIndicator && !draggingUser ? activationColor : null,
            marginBottom: marginBottom
        }}
        onDragOver={(e) => {e.preventDefault()}}
        onDrop={handleCategoryMove} onDragEnter={() => {toggleMoveIndicator(true)}} onDragLeave={() => {toggleMoveIndicator(false)}}
        onClick={() => {toggleCollapse(!collapse)}}
        className='channel-list-collapse-button category'>
            <AltDownIcon altFlip={true} flip={collapse} />
            <p style={{color: textColor}}>{catagoryName}</p>
        </div>
        <div draggable='false' className='channel-list-button-wrapper'>
                {loading ? <LoadingChannelsPlaceHolder /> : 
                <>
                    {channels.map((channel, key) => {
                        
                        return (
                            <ChannelButton category_id={category_id} key={channel._id} draggingChannel={draggingChannel} toggleDraggingChannel={toggleDraggingChannel} draggingUser={draggingUser} toggleDraggingUser={toggleDragginUser}  move={move} collapse={collapse} index={key} action={handleJoinChannel} channel={channel} users={channel.users} />   
                        )
                        
                    })}
                </>
                }
        {category_id === 'channels' ? null :
        <div onDragOver={(e) => {e.preventDefault()}} style={{width: '100%', height: collapse ? 0 : 10, flexShrink: 0, backgroundColor: moveIndicator && !draggingUser && !draggingChannel ? activationColor : null, zIndex: draggingCategory ? 2 : -1, pointerEvents: 'all'}} onDrop={newCategoryPos} onDragEnter={() => {toggleMoveIndicator(true)}} onDragLeave={() => {toggleMoveIndicator(false)}} />
        }
        </div>
        </>
    )
}
