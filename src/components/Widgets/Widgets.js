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
import { Card } from '../ui/Wrappers/Card/Card';

const SortableWidget = ({ id, children, editing, widget }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginRight: editing ? 40 : null,
    borderRadius: 8,
    maxHeight: editing ? 200 : null
     // smooth mobile drag
  };

  return (
    <Card id={id} ref={setNodeRef} data-context={JSON.stringify({...widget, type: 'widget', editing})} style={style} className={styles.widgetWrapper}>
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
      <div style={{
        overflow: editing ? 'hidden' : null,
        width: '100%',
        height: '100%'
      }}>
      {children}
      </div>
    </Card>
  );
};

export const WidgetList = ({widgets, editing}) => {
  console.log(widgets)
  if (widgets.length === 0) return null;

  return (
    <>
     {widgets.map(widget => (
        <SortableWidget widget={widget} key={widget._id} id={widget._id} editing={editing}>
            {{
              single_image: <SingleImageWidget {...widget.config} />,
              gallery:      <GalleryWidget {...widget.config} />,
              embed:        <EmbedWidget {...widget.config} />,
              rich_text:    <RichTextWidget {...widget.config} />,
              dynamic_media:<DynamicMediaWidget {...widget.config} timeout={0} />,
              media_player: <MediaPlayerWidget {...widget.config} {...widget} />
            }[widget.widget_type] || null}
        </SortableWidget>
    ))}
    </>
  )

}

export const WidgetArray = (widgets) => {return widgets?.map(widget => (
        <SortableWidget widget={widget} key={widget._id} id={widget._id} editing={false}>
            {{
              single_image: <SingleImageWidget {...widget.config} />,
              gallery:      <GalleryWidget {...widget.config} />,
              embed:        <EmbedWidget {...widget.config} />,
              rich_text:    <RichTextWidget {...widget.config} />,
              dynamic_media:<DynamicMediaWidget {...widget.config} timeout={0} />,
              media_player: <MediaPlayerWidget {...widget.config} channel_id={widget.channel_id} />
            }[widget.widget_type] || null}
        </SortableWidget>
))}

export const Widgets = ({ widgets, editing, onReorder = () => {}, openAddWidgets = () => {}, pinned }) => {

    
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

    if (pinned && widgets.length === 0) return null;

    if (widgets.length === 0) return <NoWidgetsPlaceholder user_can_edit_channels={true} action={openAddWidgets} />

    return (
        <>
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
              <SortableContext
              items={currentWidgets.map(w => w._id)}
              strategy={verticalListSortingStrategy}
              >
                <WidgetList widgets={currentWidgets} editing={editing} />
              </SortableContext>
          </DndContext>
        </>
    );
};
