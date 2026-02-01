import React, { useMemo } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import styles from "./RandomMediaGallery.module.css";

import { ImageComponent } from "../ui/Image/Image";
import { NsfwWrapper } from "../ui/Wrappers/NsfwWrapper/NsfwWrapper";
import OverlayActionButton from "../ui/Buttons/OverlayActionButton/OverlayActionButton";
import { ImageTooltipWrapper } from "../ui/Wrappers/ImageTooltipWrapper/ImageTooltipWrapper";
import { MediaTitle } from "../ui/Titles/MediaTitle/MediaTitle";
import { Images } from "lucide-react";
import { LongPressGestureWrapper } from "../ui/Gestures/LongPressGestureWrapper";
import { triggerContext } from "../../lib/services/helperFunctions";
import { VideoPreview } from "../ui/Video/VideoPreview/VideoPreview";
import { Card } from "../ui/Wrappers/Card/Card";

const RandomMediaGallery = ({ media = [], title = "", action = () => {} }) => {
  const randomMedia = useMemo(() => {
    const shuffled = [...media].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 9);
  }, [media]);

  return (
    <Card className={styles.cardShell}>
      <MediaTitle icon={Images} title={title} />

      <ResponsiveMasonry
        className={styles.galleryContainer}
        columnsCountBreakPoints={{ 0: 2, 700: 3, 1000: 3 }}
      >
        <Masonry gutter="10px">
          {randomMedia.map((item, idx) => (
            <div key={idx} className={styles.tile}>
              <LongPressGestureWrapper
                width={"100%"}
                height={"100%"}
                onTouchContext={(e) => triggerContext(e, item.src)}
              >
                <NsfwWrapper nsfw={item}>
                  <button
                    type="button"
                    className={styles.tileButton}
                 //   onClick={() => action(item, idx)}
                    aria-label="Open media"
                  >
                    {item.type === "video" ? (
                      <VideoPreview action={action} {...item} />
                    ) : (
                      <ImageTooltipWrapper image={item}>
                        <ImageComponent objectFit="cover" src={item.thumbnail || item.src} />
                      </ImageTooltipWrapper>
                    )}
                  </button>
                </NsfwWrapper>
              </LongPressGestureWrapper>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>

      <div className={styles.footer}>
        <OverlayActionButton action={action} title={"See more..."} />
      </div>
    </Card>
  );
};

export default RandomMediaGallery;
