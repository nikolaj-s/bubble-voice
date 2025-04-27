// components/CustomIframeEmbed/CustomIframeEmbed.jsx
import React, { useState } from 'react';
import styles from './Embed.module.css';
import { Loader2, AlertTriangle } from 'lucide-react';

export const Embed = ({ url, height = 400 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (!url) {
    return (
      <div className={styles.placeholder}>
        <AlertTriangle size={24} />
        <p>No embed URL provided.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper} style={{ height }}>
      {isLoading && !hasError && (
        <div className={styles.loader}>
          <Loader2 className={styles.spin} size={24} />
          <p>Loading content...</p>
        </div>
      )}

      {hasError ? (
        <div className={styles.error}>
          <AlertTriangle size={24} />
          <p>Failed to load content.</p>
        </div>
      ) : (
        <iframe
          src={url}
          className={styles.iframe}
          onLoad={handleLoad}
          onError={handleError}
          title="Embedded Content"
          allow="autoplay; encrypted-media"
          loading="lazy"
        />
      )}
    </div>
  );
};
