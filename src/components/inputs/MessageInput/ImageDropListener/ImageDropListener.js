import React from 'react'

export const ImageDropListener = (props) => {

    const handleDragOver = () => {

        document.getElementById('image-drop-listener').classList.add('user-is-dragging');
        
    }

    const handleDragEnd = () => {

        document.getElementById('image-drop-listener').classList.remove('user-is-dragging');
    }

    React.useEffect(() => {

        document.body.addEventListener('dragover', handleDragOver);

        document.body.addEventListener('dragend', handleDragEnd);

        document.body.addEventListener('drop', handleDragEnd);

        document.body.addEventListener('dragleave', handleDragEnd);

        return () => {
            document.body.removeEventListener('dragover', handleDragOver);

            document.body.removeEventListener('dragend', handleDragEnd);

            document.body.removeEventListener('drop', handleDragEnd);

            document.body.removeEventListener('dragleave', handleDragEnd);
        }

    }, [])

    return (
        <div 
        draggable={true} {...props.root} id='image-drop-listener'>
        </div>
    )
}
