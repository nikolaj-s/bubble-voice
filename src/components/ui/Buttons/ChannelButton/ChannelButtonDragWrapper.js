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

  const onDrop = (event) => {
    try {
      toggleDraggingChannel(false);

      event.target.style.zIndex = "atuo";

      document.getElementById(
        `channel-wrapper-button-${channel._id}`
      ).style.backgroundColor = "rgba(0, 0, 0, 0)";

      if (channel.text_only) return;

      const id = event.dataTransfer.getData("text");

      if (!id) return;

      const split_id = id.split(" ");

      const selected_username =
        split_id.length > 2 ? `${split_id[1]} ${split_id[2]}` : split_id[1];

      const channel_id = split_id[0];

      if (channel_id === channel._id) return;

      toggleDraggingChannel(false);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleNewChannelPosition = (e) => {
    try {
      e.target.style.zIndex = "atuo";

      toggleMoveIndicator(false);

      const id = e.dataTransfer.getData("text");

      if (!id || id.split(" ").length > 1) return;

      move(id, channel.channel_id, category_id);

      toggleDraggingChannel(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDragStart = (e) => {
    console.log(e);
    e.stopPropagation();

    e.dataTransfer.setData("text/plain", `${channel.channel_id}`);

    toggleDraggingChannel(true);

    console.log("channel drag start");
  };

  const handleDragEnd = (e) => {
    e.target.style.zIndex = "atuo";

    toggleDraggingChannel(false);
  };

  return (
    <>
      <div
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        id={`channel-wrapper-button-${channel._id}`}
        draggable={true}
        onDrop={onDrop}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        style={{
          display: collapse && channel?.channel_id !== channelID ? "none" : null,
        }}
      >
        {children}
        <div
          onDragOver={(e) => {
            e.preventDefault();
          }}
          style={{
            width: "100%",
            flexShrink: 0,
            height:
              draggingChannel && !moveIndicator
                ? 3
                : draggingChannel && moveIndicator
                ? 5
                : 0,
            backgroundColor: draggingChannel
              ? "var(--success-color)"
              : "transparent",
            opacity:
              draggingChannel && !moveIndicator
                ? 0.5
                : draggingChannel && moveIndicator
                ? 1
                : 0,
            pointerEvents: "all",
            position: "relative",
            bottom: 0,
          }}
          onDrop={handleNewChannelPosition}
          onDragEnter={() => {
            toggleMoveIndicator(true);
          }}
          onDragLeave={() => {
            toggleMoveIndicator(false);
          }}
        />
      </div>
    </>
  );
};
