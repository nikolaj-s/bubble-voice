// RichTextEditor.jsx
import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
} from 'lucide-react';

import 'react-quill/dist/quill.core.css';

import styles from './RichTextEditor.module.css';

import './qlEditor.css';
import Dropdown from '../DropDown/DropDown';

const HEADERS =  [{label: 'Normal', value: ""}, {label: "H1", value: 1}, {label: 'H2', value: 2}, {label: "H3", value: 3}];

const CustomToolbar = ({ formats, applyFormat, openImageModal, openLinkModal }) => (

  <div className={styles.toolbar}>
    <Dropdown 
    options={HEADERS} 
    selected={HEADERS.find(h => h.value === formats.header) || HEADERS[0]}
    selector='label'
    setSelected={(header) => {applyFormat('header', header.value); console.log(formats.header)}}

    />
    {['bold', 'italic', 'underline', 'strike'].map((fmt, i) => {
      const Icon = [Bold, Italic, Underline, Strikethrough][i];
      return (
        <button
          key={fmt}
          type="button"
          className={`${styles.toolbarButton} ${formats[fmt] ? styles.active : ''}`}
          onClick={() => applyFormat(fmt)}
        >
          <Icon size={18} />
        </button>
      );
    })}

    <button
      type="button"
      className={`${styles.toolbarButton} ${formats.list === 'ordered' ? styles.active : ''}`}
      onClick={() => applyFormat('list', 'ordered')}
    >
      <ListOrdered size={18} />
    </button>
    <button
      type="button"
      className={`${styles.toolbarButton} ${formats.list === 'bullet' ? styles.active : ''}`}
      onClick={() => applyFormat('list', 'bullet')}
    >
      <List size={18} />
    </button>
  </div>
);

const RichTextEditor = ({ value, onChange, placeholder = "Enter some text..." }) => {
  const quillRef = useRef(null);
  const [formats, setFormats] = useState({});
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const applyFormat = useCallback((format, value = true) => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;
    const current = editor.getFormat();
    editor.format(format, current[format] && value === true ? false : value);
    setFormats(editor.getFormat());
  }, []);

  useEffect(() => {
    try {
            const editor = quillRef.current?.getEditor();

            if (!editor || !editor?.getFormat()) return;
            const updateFormats = () => setFormats(editor?.getFormat());
           
            editor.on('selection-change', updateFormats);
            editor.on('text-change', updateFormats);
        return () => {
            editor.off('selection-change', updateFormats);
            editor.off('text-change', updateFormats);
        };
    } catch (error) {
        console.log(error);
        return;
    }
  }, []);

  const insertImage = (url) => {
    const editor = quillRef.current?.getEditor();
    const range = editor.getSelection();
    if (range?.index) {
      editor.insertEmbed(range?.index, 'image', url);
      // Apply inline styles to newly inserted image
      setTimeout(() => {
        const img = editor.root.querySelector(`img[src="${url}"]`);
        if (img) {
          img.style.maxWidth = '100%';
          img.style.height = 'auto';
          img.style.maxHeight = '200px';
        }
      }, 0);
    }
    setFormats(editor.getFormat());
  };
  const handleImageInsert = () => { insertImage(imageUrl.trim()); setImageUrl(''); setShowImageModal(false); };

  const handleLinkInsert = () => {
    const editor = quillRef.current?.getEditor();
    const range = editor.getSelection();
    if (range && linkUrl) editor.formatText(range?.index, range.length, 'link', linkUrl.trim());
    setLinkUrl(''); setShowLinkModal(false);
  };

  const handleChange = (content) => {
    onChange(content);
  };

  const modules = useMemo(() => ({
    toolbar: false,
    clipboard: {
      matchers: [
        [Node.TEXT_NODE, (node, delta) => {
          const text = node.data.trim();
          const imageRegex = /(https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg))$/i;
          const urlRegex   = /(https?:\/\/[^\s]+)/i;
  
          // 1) If it’s an image, embed it
          if (imageRegex.test(text)) {
            return { ops: [{ insert: { image: text } }] };
          }
          // 2) Otherwise, if it’s any URL, turn it into a link
          if (urlRegex.test(text)) {
            return {
              ops: [{
                insert: text,
                attributes: { link: text }
              }]
            };
          }
          // 3) Otherwise, leave it alone
          return delta;
        }]
      ]
    }
  }), []);

  const formatsList = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'link', 'image', 'color'
  ];

  return (
    <div className={styles.editorWrapper}>
      <CustomToolbar
        formats={formats}
        applyFormat={applyFormat}
        openImageModal={() => setShowImageModal(true)}
        openLinkModal={() => setShowLinkModal(true)}
      />
      <ReactQuill
        ref={quillRef}
        theme={null}
        style={{color: 'var(--text-color)'}}
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formatsList}
        className={styles.editor}
        placeholder={placeholder}
      />

      {showImageModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Insert Image</h3>
            <input
              type="text"
              placeholder="Enter image URL..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={styles.input}
            />
            <div className={styles.modalButtons}>
              <button onClick={handleImageInsert} className={styles.confirmButton}>Insert</button>
              <button onClick={() => setShowImageModal(false)} className={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showLinkModal && (
        <div onClick={(e) => {e.stopPropagation()}} className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Insert Link</h3>
            <input
              type="text"
              placeholder="Enter link URL..."
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className={styles.input}
            />
            <div className={styles.modalButtons}>
              <button onClick={handleLinkInsert} className={styles.confirmButton}>Insert</button>
              <button onClick={() => setShowLinkModal(false)} className={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
