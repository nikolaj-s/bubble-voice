import React from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PropTypes from 'prop-types';

const SortableItem = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export const VerticalReorderWrapper = ({ items, onReorder, children }) => {
  const sensors = useSensors(useSensor(PointerSensor, {activationConstraint: {delay: 200, tolerance: 4}}));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(i => i._id === active.id);
    const newIndex = items.findIndex(i => i._id === over.id);
    const newOrder = arrayMove(items, oldIndex, newIndex);
    onReorder?.(newOrder);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(i => i._id)} strategy={verticalListSortingStrategy}>
        {React.Children.map(children, (child, index) => (
          <SortableItem key={items[index]._id} id={items[index]._id}>
            {child}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
};

VerticalReorderWrapper.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
  })).isRequired,
  onReorder: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
