import React from "react";
import { useParams } from "react-router";

export const ChannelButtonDragWrapper = ({
  children,
  channel,
  draggingChannel,
  toggleDraggingChannel,
  move,
  category_id,
  collapse,
  draggingCategory,
}) => {
  const { channelID } = useParams();
  const [moveIndicator, toggleMoveIndicator] = React.useState(false);

  const handleDragStart = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("application/channel-id", channel.channel_id);
    toggleDraggingChannel(true);
    console.log('dragging', category_id, channel)
  };

  const handleDragEnd = (e) => {
   toggleDraggingChannel(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    toggleDraggingChannel(false);
    const sourceId = e.dataTransfer.getData("application/channel-id");
    if (!sourceId || sourceId === channel.channel_id) return;
  console.log(sourceId, category_id)
    move(sourceId, channel.channel_id, category_id); // ensure this category_id is valid
  };

  return (
    <div
      id={`channel-wrapper-button-${channel.channnel_id}`}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      style={{
        display: collapse && channel?.channel_id !== channelID ? "none" : undefined,
        position: 'relative'
      }}
    >
      {children}
      <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onDragEnter={() => toggleMoveIndicator(true)}
      onDragLeave={() => toggleMoveIndicator(false)}
      style={{
        width: "100%",
        height: "5px",
        position: "absolute",
        pointerEvents: draggingChannel ? "all" : "none",
        zIndex: draggingChannel ? 10 : null,
        backgroundColor: "transparent", // don't use background directly
      }}
    >
      {draggingChannel && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            backgroundColor: "var(--success-color)",
            opacity: moveIndicator ? 1 : 0.4,
            borderRadius: 2,
            transition: "opacity 0.15s ease, transform 0.2s ease",
            transform: moveIndicator ? "scaleY(1)" : "scaleY(0.6)",
            pointerEvents: "none",
          }}
        />
      )}
    </div>

    </div>
  );
};
