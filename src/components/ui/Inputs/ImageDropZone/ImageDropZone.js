import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import { ImageUp } from "lucide-react";
import styles from "./ImageDropZone.module.css"; // Ensure this file exists

const ImageDropZone = ({ 
  existingImage, 
  onImageChange, 
  borderRadius = "8px", 
  width = 200, 
  height = 200,
  dimensions = 800,
  objectFit = 'cover',
  parentFileSrc,
}) => {
  
  const [preview, setPreview] = useState(existingImage || "");

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {

    if (!parentFileSrc) {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }

      setPreview(existingImage);

      setImageFile(null);

    }

  }, [parentFileSrc, existingImage, preview])

  // Cleanup previous object URLs
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      const maxSize = dimensions;
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: maxSize,
        useWebWorker: true,
        fileType: 'image/webp'
      };

      try {
        const compressedFile = await imageCompression(file, options);
        const objectUrl = URL.createObjectURL(compressedFile);

        setImageFile(compressedFile);
        setPreview(objectUrl);
        onImageChange(compressedFile);
      } catch (error) {
        console.error("Image compression error:", error);
      }
    },
    [onImageChange, dimensions]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/heic": [".heic"],
    },
    onDrop,
    multiple: false,
    
  });

  return (
    <div 
      {...getRootProps()} 
      className={styles.dropzone} 
      style={{ width, height, borderRadius, flexShrink: 0 }}
    >
      <input {...getInputProps()} />
      {preview ? (
        <img 
          draggable={false}
          src={preview} 
          alt="Preview" 
          className={styles.image} 
          style={{ width: "100%", height: "100%", borderRadius, objectFit }}
        />
      ) : (
        <ImageUp color="var(--text-color)" />
      )}
    </div>
  );
};

export default ImageDropZone;
