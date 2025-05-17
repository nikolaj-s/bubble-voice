import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './HorizontalMediaScroller.module.css';
import { ImageComponent } from '../Image/Image';
import { MediaTooltipWrapper } from '../Wrappers/MediaTooltipWrapper/MediaTooltipWrapper';
import VideoThumbnail from '../Video/VideoThumbnail/VideoThumbnail';

export const HorizontalMediaScroller = ({ media = [], loading = false, error = null, onMediaClick = () => {}, seeMore = () => {} }) => {
  
    const containerRef = useRef(null);
  
  const [hasOverflow, setHasOverflow] = useState(false);

  const visibleMedia = media.slice(0, 15);
  
  const showSeeMore = media.length > 15;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkOverflow = () => {
      setHasOverflow(el.scrollWidth > el.clientWidth);
    };

    checkOverflow();
    const observer = new ResizeObserver(checkOverflow);
    observer.observe(el);

    return () => observer.disconnect();
  }, [media]);

  const handleFadeClick = () => {
    const el = containerRef.current;
    if (el) {
      el.scrollBy({ left: el.clientWidth, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
  
    const scrolledToEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;
    setHasOverflow(!scrolledToEnd);
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
      <div onScroll={handleScroll} ref={containerRef} className={styles.scroller}>
        {visibleMedia.map((item, idx) => (
            <div className={styles.card} key={idx}>
                <MediaTooltipWrapper media={item}>
                    {item.type === 'video' ? (
                        <VideoThumbnail {...item} />
                    ) : (
                        <ImageComponent src={item.thumbnail} />
                    )}
                </MediaTooltipWrapper>
            </div>
        ))}
        {showSeeMore && (
          <div className={styles.seeMore} onClick={seeMore}>
            + See More
          </div>
        )}
      </div>
      {hasOverflow && (
        <div onClick={handleFadeClick} className={styles.rightFade}>
          <ArrowRight className={styles.arrowIcon} />
        </div>
      )}
    </div>
  );
};
