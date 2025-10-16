import React, { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.css';

/**
 * Pagination component driven by URL search param "page".
 *
 * Props:
 *   - pageCount (number) required
 *   - siblingCount (number) optional: how many pages to show either side of current (default 1)
 *   - onPageChange (function) optional: called with new page number
 */
export default function Pagination({ pageCount, siblingCount = 1, onPageChange }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // parse current page from query param, fallback to 1
  const currentPage = useMemo(() => {
    const p = parseInt(searchParams.get('page') || '1', 10);
    return Number.isNaN(p) || p < 1 ? 1 : Math.min(p, Math.max(1, pageCount || 1));
  }, [searchParams, pageCount]);

  // helper to update ?page= while preserving other params
  const goToPage = useCallback((page) => {
    const next = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      next.set('page', '1');
    } else {
      next.set('page', String(page));
    }
    setSearchParams(next, { replace: true }); // replace avoids stack growth when paginating
    if (onPageChange) onPageChange(page);
    // scroll to top or to a pagination anchor if desired:
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams, setSearchParams, onPageChange]);

  // generate visible pages list with ellipses
  const pages = useMemo(() => {
    const total = Math.max(1, Math.floor(pageCount || 1));
    const current = Math.min(Math.max(1, currentPage), total);
    const sibling = Math.max(0, siblingCount);

    // small helper: generate range
    const range = (from, to) => {
      const arr = [];
      for (let i = from; i <= to; i++) arr.push(i);
      return arr;
    };

    // show all pages if small
    const totalNumbers = sibling * 2 + 5; // first, last, current, two ellipses
    if (total <= totalNumbers) {
      return range(1, total);
    }

    const left = Math.max(2, current - sibling);
    const right = Math.min(total - 1, current + sibling);

    const showLeftEllipsis = left > 2;
    const showRightEllipsis = right < total - 1;

    const pagesArr = [1];

    if (showLeftEllipsis) {
      pagesArr.push('left-ellipsis');
    } else {
      pagesArr.push(...range(2, left - 1));
    }

    pagesArr.push(...range(left, right));

    if (showRightEllipsis) {
      pagesArr.push('right-ellipsis');
    } else {
      pagesArr.push(...range(right + 1, total - 1));
    }

    pagesArr.push(total);
    return pagesArr;
  }, [pageCount, currentPage, siblingCount]);

  if (!pageCount) return null;

  const onKeyNav = (ev, target) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      goToPage(target);
    }
  };

  return (
    <nav className={styles.container} aria-label="Pagination">
      <button
        className={styles.control}
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
        aria-label="Go to first page"
      >
        «
      </button>

      <button
        className={styles.control}
        onClick={() => goToPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ‹
      </button>

      <ul className={styles.pages} role="list">
        {pages.map((p, idx) => {
          if (typeof p === 'number') {
            const active = p === currentPage;
            return (
              <li key={p} className={styles.pageItem}>
                <button
                  className={`${styles.pageBtn} ${active ? styles.active : ''}`}
                  onClick={() => goToPage(p)}
                  onKeyDown={(e) => onKeyNav(e, p)}
                  aria-current={active ? 'page' : undefined}
                  aria-label={`Go to page ${p}`}
                >
                  {p}
                </button>
              </li>
            );
          } else {
            // ellipsis
            const key = `${p}-${idx}`;
            return (
              <li key={key} className={styles.ellipsis} aria-hidden>
                …
              </li>
            );
          }
        })}
      </ul>

      <button
        className={styles.control}
        onClick={() => goToPage(Math.min(pageCount, currentPage + 1))}
        disabled={currentPage === pageCount}
        aria-label="Next page"
      >
        ›
      </button>

      <button
        className={styles.control}
        onClick={() => goToPage(pageCount)}
        disabled={currentPage === pageCount}
        aria-label="Go to last page"
      >
        »
      </button>
    </nav>
  );
}
