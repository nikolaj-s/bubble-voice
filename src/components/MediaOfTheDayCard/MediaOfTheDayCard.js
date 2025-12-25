// MediaOfTheDayCard.js
import React from "react";
import { Image, Video, Camera, Clock } from "lucide-react";
import { useDispatch } from "react-redux";

import styles from "./MediaOfTheDayCard.module.css";

import { NsfwWrapper } from "../ui/Wrappers/NsfwWrapper/NsfwWrapper";
import { MediaTitle } from "../ui/Titles/MediaTitle/MediaTitle";
import { ImageComponent } from "../ui/Image/Image";
import { ImageTooltipWrapper } from "../ui/Wrappers/ImageTooltipWrapper/ImageTooltipWrapper";
import { LongPressGestureWrapper } from "../ui/Gestures/LongPressGestureWrapper";
import { getTimeUntil24Hours, triggerContext } from "../../lib/services/helperFunctions";
import { setExpandedImage } from "../../features/Media/ExpandedImage/expandedImageSlice";
import { setOverlay } from "../../features/Overlay/overlaySlice";
import { Subtitle } from "../ui/Titles/Subtitle/Subtitle";
import { expandVideo } from "../../features/Media/ExpandedVideo/expandedVideoSlice";
import VideoThumbnail from "../ui/Video/VideoThumbnail/VideoThumbnail";
import { Card } from "../ui/Wrappers/Card/Card";
import { Text } from "../ui/Text/Text";

const MediaOfTheDayCard = ({
  title = "Media of the day",
  query,
  tags = "",
  src,
  thumbnail,
  type = "image",
  date,
  media = {},
}) => {
  const dispatch = useDispatch();

  const [untilUpdate, setUntilUpdate] = React.useState("");
  const [source, setSource] = React.useState({});

  const Icon = type === "video" ? Video : type === "camera" ? Camera : Image;

  React.useEffect(() => {
    if (date) setUntilUpdate(getTimeUntil24Hours(date));
  }, [date]);

  React.useEffect(() => {
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)/i;
    if (imageExtensions.test(query)) setSource({ type: "image", src: query });
    else setSource({ type: "query", src: query });
  }, [query]);

  const openSource = () => {
    if (type === "image") {
      dispatch(setExpandedImage({ image: source?.src }));
      dispatch(setOverlay("expandImage"));
      return;
    }

    if (type === "video") {
      dispatch(setOverlay("expandVideo"));
      dispatch(expandVideo(media));
    }
  };

  return (
    <Card
      className={styles.card}
      data-context={JSON.stringify(media)}
      style={{ maxHeight: 800, minHeight: 500, flexShrink: 0 }}
    >
      <MediaTitle icon={Icon} title={title} />

      <div className={styles.mediaContent}>
        <NsfwWrapper nsfw={media}>
          {type === "video" ? (
            <VideoThumbnail width="100%" maxWidth="100%" {...media} action={openSource} />
          ) : (
            <LongPressGestureWrapper
              width={"100%"}
              height={"100%"}
              onTouchContext={(e) => triggerContext(e, src)}
            >
              <ImageTooltipWrapper image={{ src, type }}>
                <ImageComponent objectFit="contain" src={src} altSrc={thumbnail} alt={title} />
              </ImageTooltipWrapper>
            </LongPressGestureWrapper>
          )}
        </NsfwWrapper>
      </div>

      <div className={styles.metaPanel}>
        <div className={styles.metaTop}>
          <div className={styles.sourceRow}>
            <Subtitle>Media found related to:</Subtitle>

            {source.type === "image" ? (
              <button type="button" className={styles.sourceButton} onClick={openSource}>
                source
              </button>
            ) : (
              <span className={styles.queryText} title={query}>
                {query}
              </span>
            )}
          </div>

          <div className={styles.updatesIn} title={`Updates in ${untilUpdate}`}>
            <Clock strokeWidth={3} color="var(--text-color)" size={15} />
            <span className={styles.updatesText}>{untilUpdate}</span>
          </div>
        </div>

        <Text className={styles.helperText}>
          {source.type === "image" ? "Tap source to open the original." : "Query-based media discovery."}
        </Text>

        <div className={styles.mediaTags}>
          {tags
            ?.split(" ")
            .filter(Boolean)
            .slice(0, 3)
            .map((tag, idx) => (
              <span className={styles.mediaTag} key={idx}>
                #{tag}
              </span>
            ))}
        </div>
      </div>
    </Card>
  );
};

export default MediaOfTheDayCard;
