// components/ProfileBio.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProfileBio.module.css';
import { Markdown } from '../../Markdown/Markdown';

const ProfileBio = ({
  bio = '',
  maxHeight = 150,
  initiallyExpanded = false,
  className = '',
}) => {
  const [expanded, setExpanded] = React.useState(Boolean(initiallyExpanded));
  const [hasOverflow, setHasOverflow] = React.useState(false);
  const textRef = React.useRef(null);

  const measureOverflow = React.useCallback(() => {
    const el = textRef.current;
    if (!el) return false;
    const prevMax = el.style.maxHeight;
    const prevOverflow = el.style.overflow;
    el.style.maxHeight = `${maxHeight}px`;
    el.style.overflow = 'hidden';
    const overflowing = el.scrollHeight > el.clientHeight + 1;
    el.style.maxHeight = prevMax;
    el.style.overflow = prevOverflow;
    return overflowing;
  }, [maxHeight]);

  React.useEffect(() => {
    setHasOverflow(measureOverflow());
  }, [bio, maxHeight, expanded, measureOverflow]);

  React.useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHasOverflow(measureOverflow()));
    ro.observe(el);
    const onResize = () => setHasOverflow(measureOverflow());
    window.addEventListener('resize', onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [measureOverflow]);

  const empty = bio.trim().length === 0;

  const containerClasses = [
    styles.userBio,
    expanded ? styles.expanded : '',
    hasOverflow && !expanded ? styles.collapsed : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={containerClasses}
      style={{ padding: empty ? 0 : undefined, ['--max-height']: `${maxHeight}px` }}
    >
      <div ref={textRef} className={styles.bioText}>
        <Markdown text={bio} />
      </div>

      {/* gradient hint when collapsed */}
      {hasOverflow && !expanded && <div className={styles.fade} aria-hidden />}

      {/* built-in action (click to expand/collapse) */}
      {hasOverflow && (
        <div className={styles.actionRow}>
          <button
            type="button"
            className={styles.actionButton}
            onClick={() => setExpanded(v => !v)}
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        </div>
      )}
    </div>
  );
};

ProfileBio.propTypes = {
  bio: PropTypes.string,
  maxHeight: PropTypes.number,
  initiallyExpanded: PropTypes.bool,
  className: PropTypes.string,
};

export default ProfileBio;