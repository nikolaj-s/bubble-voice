import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './GalleryInput.module.css';
import { Move, Plus } from 'lucide-react';
import ImageDropZone from '../ImageDropZone/ImageDropZone';
import { nanoid } from 'nanoid';

const SortableItem = ({ id, children, dragHandle }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      touchAction: 'none' // fix mobile behavior
    };
  
    return (
      <div ref={setNodeRef} style={style} className={styles.sortableItem}>
        {/* Render a drag handle */}
        <div {...attributes} {...listeners} className={styles.dragHandle}>
          {dragHandle}
        </div>
        {/* Render the main child (like ImageDropZone) without drag interference */}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    );
  };
  

export const GalleryInput = ({
  onImageChange = () => {},
  objectFit = 'cover'
}) => {
  const [images, setImages] = useState([
      { id: nanoid(), file: null },
    ]);
    
  const handleImageChange = (index, file) => {

    const updated = [...images];

    updated[index] = { ...updated[index], file };

    setImages(updated);

    onImageChange(updated.map(img => img.file).filter(img => img !== null)); // emit just file list
  
  };

  const handleAddDropZone = () => {
    if (images.length >= 9) return;
    setImages([...images, {file: null, id: nanoid()}]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
  
    const oldIndex = images.findIndex(img => img.id === active.id);
    const newIndex = images.findIndex(img => img.id === over.id);
  
    const reordered = arrayMove(images, oldIndex, newIndex);
    setImages(reordered);
    
    onImageChange(reordered.map(img => img.file).filter(img => img !== null)); // emit raw files if needed
  }

  return (
    <div className={styles.galleryWrapper}>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={images.map((img) => img.id)}
          strategy={rectSortingStrategy}
        >
          <div className={styles.grid}>
            {images.map((img, index) => (
              <SortableItem 
              dragHandle={<Move color='var(--text-color)' size={20} />}
              key={img.id} id={img.id} index={index}>
                <ImageDropZone
                  parentFileSrc={img.file}
                  image={img}
                  onImageChange={(file) => handleImageChange(index, file)}
                  width={'100%'}
                  height={200}
                  objectFit={objectFit}
                />
              </SortableItem>
            ))}
            {images.length < 9 && (<button className={styles.addButton} onClick={handleAddDropZone}>
                <Plus size={18} />
            </button>)}
          </div>
        </SortableContext>
      </DndContext>

      
    </div>
  );
};
