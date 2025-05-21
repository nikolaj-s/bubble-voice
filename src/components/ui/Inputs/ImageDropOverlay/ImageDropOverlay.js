
import { useDropzone } from 'react-dropzone';
import styles from './ImageDropOverlay.module.css';
import { ImagePlus } from 'lucide-react';

export const ImageDropOverlay = ({ onDropEvent, isDraggingImage, setIsDraggingImage = () => {} }) => {

    const {
        getRootProps,
        getInputProps,
    } = useDropzone({
        noClick: true,
        noKeyboard: true,
        multiple: false,
        accept: { 'image/*': [] },
        onDrop: (acceptedFiles, fileRejections, event) => {
            setIsDraggingImage(false);
            onDropEvent({target: {files: acceptedFiles}});
        },
        onDragEnter: () => {setIsDraggingImage(true)},
        onDragLeave: () => {setIsDraggingImage(false)}
    });

    return (
        <>
        {/* Always-mounted invisible root to keep useDropzone active */}
        <div 
        style={{pointerEvents: isDraggingImage ? 'auto' : 'none'}}
        className={styles.dropRoot} {...getRootProps()}>
            <input {...getInputProps()} />
        </div>

        {/* Only mount this during drag to capture the drop */}
        {isDraggingImage && (
            <>
            <div className={styles.dropOverlay} />
            <div className={styles.dropUI}>
                <ImagePlus size={32} className={styles.icon} />
                <p className={styles.message}>
                Image incoming!<br />
                </p>
            </div>
            </>
        )}
        </>
    );
};
