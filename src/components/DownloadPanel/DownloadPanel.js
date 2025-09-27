import React from 'react';
import styles from './DownloadPanel.module.css';
import { Download, Apple, Laptop } from 'lucide-react';

/** tiny Windows logo (since lucide doesn't ship one) */
const WindowsLogo = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" aria-hidden focusable="false">
    <path fill="currentColor" d="M0 36l116-16v100H0V36zm256-18v118H124V20l132-2zM0 136h116v100L0 220V136zm124 0h132v100l-132-18V136z"/>
  </svg>
);

/** Detect platform in browser */
function usePlatform() {
  const [os, setOs] = React.useState('unknown');
  React.useEffect(() => {
    const ua = navigator.userAgent || '';
    if (/Windows/i.test(ua)) setOs('windows');
    else if (/Macintosh|Mac OS X/i.test(ua)) setOs('mac');
    else setOs('unknown');
  }, []);
  return os;
}

/**
 * Bubble Download Panel
 * Props:
 * - windowsUrl: string (required if offering Windows)
 * - windowsPortableUrl?: string
 * - macIntelUrl?: string
 * - macArmUrl?: string
 * - version?: string
 * - releaseNotesUrl?: string
 * - onDownload?: (target: 'windows'|'windows-portable'|'mac-intel'|'mac-arm') => void
 */
const DownloadPanel = ({
  windowsUrl,
  windowsPortableUrl,
  macIntelUrl,
  macArmUrl,
  version,
  releaseNotesUrl,
  onDownload,
}) => {
  const os = usePlatform();

  const handleClick = (href, target) => {
    if (!href) return;
    onDownload?.(target);
    // Open in a new tab (web) — in Electron you can use your IPC 'download' handler.
    window.open(href, '_blank', 'noopener');
  };

  const hasMac = macIntelUrl || macArmUrl;
  const hasWin = Boolean(windowsUrl || windowsPortableUrl);

  return (
    <div className={styles.panel} data-os={os}>
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <h3 className={styles.title}>Download Bubble</h3>
          {version && <span className={styles.version}>v{version}</span>}
        </div>

        {releaseNotesUrl && (
          <a className={styles.notesLink} href={releaseNotesUrl} target="_blank" rel="noreferrer">
            Release notes
          </a>
        )}
      </div>

      <div className={styles.grid}>
        {hasWin && (
          <div className={`${styles.card} ${os === 'windows' ? styles.recommended : ''}`}>
            <div className={styles.cardHeader}>
              <span className={styles.osIcon}><WindowsLogo /></span>
              <div className={styles.osTitle}>
                <div className={styles.osName}>Windows</div>
                {os === 'windows' && <div className={styles.badge}>Recommended</div>}
              </div>
            </div>
            <div className={styles.actions}>
              {windowsUrl && (
                <button
                  type="button"
                  className={styles.btn}
                  onClick={() => handleClick(windowsUrl, 'windows')}
                >
                  <Download size={18} />
                  <span>Download Installer</span>
                </button>
              )}
              {windowsPortableUrl && (
                <button
                  type="button"
                  className={styles.btnAlt}
                  onClick={() => handleClick(windowsPortableUrl, 'windows-portable')}
                >
                  <Laptop size={18} />
                  <span>Portable .zip</span>
                </button>
              )}
            </div>
          </div>
        )}

        {hasMac && (
          <div className={`${styles.card} ${os === 'mac' ? styles.recommended : ''}`}>
            <div className={styles.cardHeader}>
              <span className={styles.osIcon}><Apple size={18} /></span>
              <div className={styles.osTitle}>
                <div className={styles.osName}>macOS</div>
                {os === 'mac' && <div className={styles.badge}>Recommended</div>}
              </div>
            </div>
            <div className={styles.actions}>
              {macArmUrl && (
                <button
                  type="button"
                  className={styles.btn}
                  onClick={() => handleClick(macArmUrl, 'mac-arm')}
                >
                  <Download size={18} />
                  <span>Apple Silicon (M-series)</span>
                </button>
              )}
              {macIntelUrl && (
                <button
                  type="button"
                  className={styles.btnAlt}
                  onClick={() => handleClick(macIntelUrl, 'mac-intel')}
                >
                  <Download size={18} />
                  <span>Intel (x64)</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <p className={styles.helpText}>
        Files are signed. If your OS warns you, choose “Keep” or “Open Anyway” and verify the publisher is <strong>Bubble</strong>.
      </p>
    </div>
  );
};

export default DownloadPanel;
