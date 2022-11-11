import React from 'react'
import { DropImageIcon } from '../../../Icons/DropImageIcon/DropImageIcon';

export const ImageDropListener = (props) => {

    const [dragged, toggleDragged] = React.useState(false);

    const handleDragOver = () => {
        
        toggleDragged(true);
        
    }

    const handleDragEnd = () => {

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
            backdropFilter: dragged ? 'blur(5px)' : null
        }}
        draggable={true} {...props.root} id='image-drop-listener'>
            <DropImageIcon action={handleDragEnd} />
        </div>
    )
}
