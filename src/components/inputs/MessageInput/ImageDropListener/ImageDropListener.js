import React from 'react'
import { DropImageIcon } from '../../../Icons/DropImageIcon/DropImageIcon';
import { useSelector } from 'react-redux';
import { selectGlassColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const ImageDropListener = (props) => {

    const [dragged, toggleDragged] = React.useState(false);

    const glassColor = useSelector(selectGlassColor);

    const handleDragOver = (e) => {
        
        e.stopPropagation();

        toggleDragged(true);
        
    }

    const handleDragEnd = (e) => {

        toggleDragged(false);
    
    }

    React.useEffect(() => {

        document.body.addEventListener('dragenter', handleDragOver);

        document.body.addEventListener('drop', handleDragEnd);

        document.body.addEventListener('dragend', handleDragEnd);

        return () => {
            document.body.removeEventListener('dragenter', handleDragOver);

            document.body.removeEventListener('drop', handleDragEnd);

            document.body.removeEventListener('dragend', handleDragEnd);
        }

    }, [])
    
    return (
        <div 
        style={{
            pointerEvents: dragged ? 'all' : 'none',
            opacity: dragged ? 1 : 0,
            backgroundColor: dragged ? glassColor : null,
            transition: '0.1s'
        }}
        draggable={true} {...props.root} id='image-drop-listener'>
            <DropImageIcon action={handleDragEnd} />
        </div>
    )
}
