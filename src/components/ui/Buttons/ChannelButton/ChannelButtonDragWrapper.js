import React from "react";

import { useDispatch, useSelector } from "react-redux";
import useUnreadStatus from "../../../../hooks/useUnreadStatus";
import { AlertIndicator } from "../../AlertIndicator/AlertIndicator";
import { toggleDraggingState } from "../../../../features/Channel/Channels/channelsSlice";
import { moveUserToChannel } from "../../../../features/Social/Thunks/moveUserToChannel";

export const ChannelButtonDragWrapper = ({
  children,
  channel,
  move,
  category_id,
  collapse,
}) => {

  const dispatch = useDispatch();

  const {currentTextChannel} = useSelector(state => state.textChannelSlice);

  const {currentVoiceChannel} = useSelector(state => state.voiceChannelSlice);

  const {draggingUser, draggingChannel} = useSelector(state => state.channelsSlice);

  const [draggingOver, toggleDraggingOver] = React.useState(false);

  const [moveIndicator, toggleMoveIndicator] = React.useState(false);

  const unread = useUnreadStatus({...channel})

  const handleDragStart = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("application/channel-id", channel.channel_id);

    dispatch(toggleDraggingState({state: 'draggingChannel', value: true}));
    console.log('dragging', category_id, channel)
  };

  const handleDragEnd = (e) => {
    dispatch(toggleDraggingState({state: 'draggingChannel', value: false}));
  };

  const handleDrop = (e) => {
    e.preventDefault();

    toggleDraggingOver(false);

    dispatch(toggleDraggingState({state: 'draggingChannel', value: false}));

    const sourceId = e.dataTransfer.getData("application/channel-id");

    const user = e.dataTransfer.getData("application/user-id");

    if (user && channel.channel_type === 'voice') {

      dispatch(moveUserToChannel({user_id: user, channel_id: channel._id}));

      return;
    }

    if (!sourceId || sourceId === channel.channel_id) return;

    move(sourceId, channel.channel_id, category_id); // ensure this category_id is valid
  };

  const handleDragOver = (e) => {
    e.preventDefault()

    if (channel.channel_type === 'voice') toggleDraggingOver(true);

  }

  const handleDragLeave = (e) => {
    e.preventDefault();

    toggleDraggingOver(false);

  }

  return (
    <div
      id={`channel-wrapper-button-${channel.channnel_id}`}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragEnter={handleDragOver}
      style={{
        display: unread ? null : collapse && channel?.channel_id !== currentTextChannel && channel?.channel_id !== currentVoiceChannel ? "none" : undefined,
        position: 'relative',
        backgroundColor: draggingOver ? 'var(--success-color)' : null
      }}
    >
      <AlertIndicator active={unread} />
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
