import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy} from '@dnd-kit/sortable';
import { SingleImageWidget } from './SingleImageWidget/SingleImageWidget';
import { GalleryWidget } from './GalleryWidget/GalleryWidget';
import { NoWidgetsPlaceholder } from './NoWidgetsPlaceholder/NoWidgetsPlaceholder';
import { EmbedWidget } from './EmbedWidget/EmbedWidget';
import { RichTextWidget } from './RichTextWidget/RichTextWidget';
import { DynamicMediaWidget } from './DynamicMediaWidget/DynamicMediaWidget';
import { MediaPlayerWidget } from './MediaPlayerWidget/MediaPlayerWidget';
import { Card } from '../ui/Wrappers/Card/Card';
import { VerticalReorderWrapper } from '../ui/Wrappers/VerticalReorderWrapper/VerticalReorderWrapper';


export const WidgetList = ({widgets, editing}) => {
  console.log(widgets)
  if (widgets.length === 0) return null;

  return (
    <>
     {widgets.map(widget => (
      <Card key={widget._id}>
      {{
        single_image: <SingleImageWidget {...widget.config} />,
        gallery:      <GalleryWidget {...widget.config} />,
        embed:        <EmbedWidget {...widget.config} />,
        rich_text:    <RichTextWidget {...widget.config} />,
        dynamic_media:<DynamicMediaWidget {...widget.config} timeout={0} />,
        media_player: <MediaPlayerWidget {...widget.config} {...widget} />
      }[widget.widget_type] || null}
      </Card>
    ))}
    </>
  )

}

export const Widgets = ({ widgets, editing, onReorder = () => {}, openAddWidgets = () => {}, pinned }) => {
console.log(widgets)
    if (pinned && widgets.length === 0) return null;

    if (widgets.length === 0) return <NoWidgetsPlaceholder user_can_edit_channels={true} action={openAddWidgets} />

    if (editing) {
      return (
          <VerticalReorderWrapper onReorder={onReorder} items={widgets} >
            <WidgetList widgets={widgets}  />
          </VerticalReorderWrapper>
      );
    } else {

      return (<WidgetList widgets={widgets} />)
    }

    
};
