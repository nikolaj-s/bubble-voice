import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import styles from "./ImageDropZone.module.css";
import { AddImageIcon } from "../../Icons/AddImageIcon/AddImageIcon";

const ImageDropZone = ({ 
  existingImage, 
  onImageChange, 
  borderRadius = "8px", 
  width = 200, 
  height = 200,
  dimensions = 800
}) => {
  
  const [preview, setPreview] = useState(existingImage || "");

  const [imageFile, setImageFile] = useState(null);

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
      const maxSize = dimensions// Use the largest dimension
      const options = {
        maxSizeMB: 0.75,
        maxWidthOrHeight: maxSize,
        useWebWorker: true,
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
    [onImageChange, width, height]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: ['image/jpeg', 'image/jpg', 'image/webp', 'image/png'],
    onDrop,
    multiple: false,
  });

  return (
    <div 
      {...getRootProps()} 
      className={styles.dropzone} 
      style={{ width, height, borderRadius, flexShrink: 0, maxWidth: 'calc(100% - 10px)' }}
    >
      <input {...getInputProps()} />
      {preview ? (
        <img src={preview} alt="Preview" 
          className={styles.image} 
          style={{ width: "100%", height: "100%", borderRadius }}
        />
      ) : (
        <AddImageIcon />
      )}
    </div>
  );
};

export default ImageDropZone;

