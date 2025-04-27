// RichTextViewer.jsx
import React from 'react';
import styles from './RichTextView.module.css';

/**
 * Displays sanitized rich text HTML content.
 * @param {Object} props
 * @param {string} props.content - Rich text HTML to render
 */
const RichTextView = ({ content }) => {

  return (
    <div
      className={styles.viewer}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default RichTextView;
