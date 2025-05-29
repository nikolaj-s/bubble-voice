import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './Widgets.module.css';
import { SingleImageWidget } from './SingleImageWidget/SingleImageWidget';
import { MoreHorizontal, MoveVertical } from 'lucide-react';
import IconButton from '../ui/Buttons/IconButton/IconButton';
import { triggerContext } from '../../lib/services/helperFunctions';
import { GalleryWidget } from './GalleryWidget/GalleryWidget';
import { NoWidgetsPlaceholder } from './NoWidgetsPlaceholder/NoWidgetsPlaceholder';
import { EmbedWidget } from './EmbedWidget/EmbedWidget';
import { RichTextWidget } from './RichTextWidget/RichTextWidget';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { DynamicMediaWidget } from './DynamicMediaWidget/DynamicMediaWidget';
import { MediaPlayerWidget } from './MediaPlayerWidget/MediaPlayerWidget';

const SortableWidget = ({ id, children, editing, widget }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginRight: editing ? 40 : null,
    overflow: editing ? null : 'hidden',
    borderRadius: 8
     // smooth mobile drag
  };

  return (
    <div id={id} ref={setNodeRef} data-context={editing ? JSON.stringify({...widget, type: 'widget'}) : null} style={style} className={styles.widgetWrapper}>
      {editing && (
        <div className={styles.controls}>
          <IconButton 
            Icon={<MoreHorizontal color='var(--text-color)' />}
            title={'More'}
            onClick={(e) => {triggerContext(e, id)}}
            />
          <div {...attributes} {...listeners} className={styles.dragHandle}>
            <MoveVertical size={18} color='var(--text-color)' />
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export const Widgets = ({ widgets, editing, onReorder = () => {}, openAddWidgets = () => {} }) => {

    
    const [currentWidgets, setCurrentWidgets] = React.useState(widgets);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
    
        const oldIndex = currentWidgets.findIndex(w => w._id === active.id);
        const newIndex = currentWidgets.findIndex(w => w._id === over.id);
    
        const reordered = arrayMove(currentWidgets, oldIndex, newIndex);
    
        const updatedWithSortOrder = reordered.map((widget, index) => ({
        ...widget,
        sort_order: index
        }));
    
        setCurrentWidgets(updatedWithSortOrder);
        onReorder(updatedWithSortOrder);
    };
    
    React.useEffect(() => {
        setCurrentWidgets(widgets);
    }, [widgets]);

    if (widgets.length === 0) return <NoWidgetsPlaceholder user_can_edit_channels={true} action={openAddWidgets} />

    return (
        <div className={styles.container}>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
            <SortableContext
            items={currentWidgets.map(w => w._id)}
            strategy={verticalListSortingStrategy}
            >
            {currentWidgets.map(widget => (
                <SortableWidget widget={widget} key={widget._id} id={widget._id} editing={editing}>
                    {{
                      single_image: <SingleImageWidget {...widget.config} />,
                      gallery:      <GalleryWidget {...widget.config} />,
                      embed:        <EmbedWidget {...widget.config} />,
                      rich_text:    <RichTextWidget {...widget.config} />,
                      dynamic_media:<DynamicMediaWidget {...widget.config} timeout={0} />,
                      media_player: <MediaPlayerWidget {...widget.config} />
                    }[widget.widget_type] || null}
                </SortableWidget>
            ))}
            </SortableContext>
        </DndContext>
        </div>
    );
};
