import React, { useRef, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './HorizontalMediaScroller.module.css';
import { ImageComponent } from '../Image/Image';
import { MediaTooltipWrapper } from '../Wrappers/MediaTooltipWrapper/MediaTooltipWrapper';
import VideoThumbnail from '../Video/VideoThumbnail/VideoThumbnail';

export const HorizontalMediaScroller = ({
  media = [],
  loading = false,
  error = null,
  onMediaClick = () => {},
  seeMore = () => {}
}) => {
  const containerRef = useRef(null);

  const [hasRightOverflow, setHasRightOverflow] = useState(false);
  const [hasLeftOverflow, setHasLeftOverflow]   = useState(false);

  const visibleMedia = media.slice(0, 15);
  const showSeeMore  = media.length > 15;

  // initial & resize/overflow check
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkOverflow = () => {
      setHasRightOverflow(el.scrollWidth > el.clientWidth);
      setHasLeftOverflow(el.scrollLeft > 5);
    };

    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(el);
    return () => observer.disconnect();
  }, [media]);

  // onScroll update both flags
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const scrolledToEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;
    setHasRightOverflow(!scrolledToEnd);
    setHasLeftOverflow(el.scrollLeft > 5);
  };

  const handleFadeRight = () => {
    const el = containerRef.current;
    if (el) {
      el.scrollBy({ left: el.clientWidth, behavior: 'smooth' });
    }
  };

  const handleFadeLeft = () => {
    const el = containerRef.current;
    if (el) {
      el.scrollBy({ left: -el.clientWidth, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.scroller}>
          {Array.from({ length: 6 }).map((_, i) => {
            const width = Math.floor(Math.random() * (250 - 120 + 1)) + 120;
            return (
              <div
                key={i}
                className={styles.skeletonCard}
                style={{ width: `${width}px` }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>Failed to load media.</div>;
  }

  return (
    <div className={styles.wrapper}>
      {/* Left fade arrow */}
      {hasLeftOverflow && (
        <div className={styles.leftFade} onClick={handleFadeLeft}>
          <ArrowLeft className={styles.arrowIcon} />
        </div>
      )}

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className={styles.scroller}
      >
        {visibleMedia.map((item, idx) => (
          <div
            className={styles.card}
            key={idx}
            onClick={() => onMediaClick(item)}
          >
            <MediaTooltipWrapper media={item}>
              {item.type === 'video' ? (
                <VideoThumbnail {...item} />
              ) : (
                <ImageComponent src={item.thumbnail} />
              )}
            </MediaTooltipWrapper>
          </div>
        ))}

        {/* {showSeeMore && (
          <div className={styles.seeMore} onClick={seeMore}>
            + See More
          </div>
        )} */}
      </div>

      {/* Right fade arrow */}
      {hasRightOverflow && (
        <div className={styles.rightFade} onClick={handleFadeRight}>
          <ArrowRight className={styles.arrowIcon} />
        </div>
      )}
    </div>
  );
};
