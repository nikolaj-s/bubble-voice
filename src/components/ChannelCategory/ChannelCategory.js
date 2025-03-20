import React from "react";

import styles from "./ChannelCategory.module.css";
import ChannelButton from "../Buttons/ChannelButton/ChannelButton";
import { ChevronDown } from "lucide-react";
import { ChannelButtonDragWrapper } from "../Buttons/ChannelButton/ChannelButtonDragWrapper";

export const Category = ({
  category_id,
  catagoryName,
  channels,
  draggingChannel,
  toggleDraggingChannel,
  draggingUser,
  toggleDragginUser,
  move,
  loading,
  draggingCategory,
  toggleDraggingCategory,
  moveCategory,
  marginBottom = null,
}) => {
  const [collapse, toggleCollapse] = React.useState(false);

  const [moveIndicator, toggleMoveIndicator] = React.useState(false);

  const handleCategoryMove = (e) => {
    try {
      const id = e.dataTransfer.getData("text");

        toggleMoveIndicator(false);
        toggleDraggingCategory(false);
        toggleDraggingChannel(false);
      if (draggingCategory) {
        if (!id) return;
        console.log(id, category_id);
        moveCategory(id, category_id, false);
      } else {
        if (!id || id.split(" ").length > 1) return;

        move(id, 0, category_id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCategoryDragStart = (e) => {
    e.stopPropagation();

    if (!category_id) return;

    e.dataTransfer.setData("text/plain", `${category_id}`);

    toggleDraggingCategory(true);
  };

  const onCategoryDragEnd = () => {
    toggleDraggingCategory(false);
  };

  const newCategoryPos = (e) => {
    e.stopPropagation();

    toggleMoveIndicator(false);

    if (draggingCategory) {
      const id = e.dataTransfer.getData("text");

      if (!id) return;

      moveCategory(id, category_id, true);
    }
  };

  React.useEffect(() => {
    const collapsed = localStorage.getItem(category_id);

    if (collapsed) {
      const value = JSON.parse(collapsed);

      if (value?.collapsed) toggleCollapse(true);
    }
  }, []);

  React.useEffect(() => {

    const data = { collapsed: collapse };

    localStorage.setItem(category_id, JSON.stringify(data));

  }, [collapse]);

  return (
    <div
        
        id={category_id}
        
    >
      <div
        draggable={true}
        onDragStart={onCategoryDragStart}
        onDragEnd={onCategoryDragEnd}
        style={{
            backgroundColor: draggingChannel ? "var(--success-color)" : null,
            padding: draggingChannel ? '5px 0px' : null,
            borderRadius: 5,
            marginBottom: marginBottom,
            opacity: draggingChannel ? 1 : null
          }}
        
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={handleCategoryMove}
        onDragEnter={() => {
          toggleMoveIndicator(true);
        }}
        onDragLeave={() => {
          toggleMoveIndicator(false);
        }}
        onClick={() => {
          toggleCollapse(!collapse);
        }}
        className={styles["channel-list-collapse-button"]}
      >
        <ChevronDown style={{rotate: collapse ? '180deg' : '0deg', transition: '0.2s'}} />
        <p style={{ color: "var(--text-color)" }}>{catagoryName}</p>
      </div>
      <div onDragOver={(e) => {e.preventDefault()}} draggable={false} className={styles["channel-list-button-wrapper"]}>
        <>
          {channels.map((channel, key) => {
            return (
              <ChannelButtonDragWrapper
                key={`channel-drag-wrapper-${channel.channel_id}`}
                category_id={category_id}
                channel={channel}
                collapse={collapse}
                draggingChannel={draggingChannel}
                move={move}
                draggingCategory={draggingCategory}
                toggleDraggingChannel={toggleDraggingChannel}
              >
                <ChannelButton {...channel} key={channel.channel_id} />
              </ChannelButtonDragWrapper>
            );
          })}
        </>
      </div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
        }}
        style={{
          width: "100%",
          height: draggingCategory ? 10 : 0,
          flexShrink: 0,
          backgroundColor: draggingCategory ? "var(--success-color)" : null,
          zIndex: draggingCategory ? 2 : -1,
          pointerEvents: "all",
        }}
        onDrop={newCategoryPos}
        onDragEnter={() => {
          toggleMoveIndicator(true);
        }}
        onDragLeave={() => {
          toggleMoveIndicator(false);
        }}
      />
    </div>
  );
};
