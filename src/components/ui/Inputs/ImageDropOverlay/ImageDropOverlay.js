import { useDropzone } from 'react-dropzone';
import styles from './ImageDropOverlay.module.css';
import { ImagePlus } from 'lucide-react';

export const ImageDropOverlay = ({
  onDropEvent,
  isDraggingImage,
  setIsDraggingImage = () => {}
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: true,          // ← maximum of 5 files
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles, fileRejections, event) => {
      setIsDraggingImage(false);
      // ensure we only pass at most 5
      const files = acceptedFiles.slice(0, 6);
     
      onDropEvent({ target: { files } });
    },
    onDragEnter: () => setIsDraggingImage(true),
    onDragLeave: () => setIsDraggingImage(false)
  });

  return (
    <>
      {/* always-mounted invisible root so Dropzone stays active */}
      <div
        style={{ pointerEvents: isDraggingImage ? 'auto' : 'none' }}
        className={styles.dropRoot}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
      </div>

      {isDraggingImage && (
        <>
          <div className={styles.dropOverlay} />
          <div className={styles.dropUI}>
            <ImagePlus size={32} className={styles.icon} />
            <p className={styles.message}>
              Drop up to 5 images here
            </p>
          </div>
        </>
      )}
    </>
  );
};
