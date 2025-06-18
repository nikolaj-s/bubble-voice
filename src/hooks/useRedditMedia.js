import { useState, useEffect } from 'react';

export const useRedditMedia = (query, debounceDelay = 1500) => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || query.trim().length < 3) {
      setMedia([]);
      return;
    }

    const handler = setTimeout(() => {
      const fetchData = async () => {
        const cacheKey = `redditMediaCache_${query.toLowerCase()}`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          const now = Date.now();
          const threeDays = 1000 * 60 * 60 * 24 * 3;
          if (now - parsed.timestamp < threeDays) {
            console.log('Using cached Reddit media for:', query);
            setMedia(parsed.data);
            setLoading(false);
            return;
          } else {
            localStorage.removeItem(cacheKey);
          }
        }

        try {
          setLoading(true);
          console.log('Fetching new Reddit media for:', query);

          const response = await fetch(
            `https://www.reddit.com/search.json?` +
            `q=${encodeURIComponent(query)}` +
            `&limit=45&include_over_18=on&sort=relevance&type=link&t=month`
          );
          const data = await response.json();

          if (!data?.data?.children) {
            setMedia([]);
            setLoading(false);
            return;
          }

          const formattedResults = [];

          for (const child of data.data.children) {
            const post = child.data;
            const nsfw = !!post.over_18;
            const snippet = post.title || '';
            // turn tags array into a comma-separated string
            const tagsArray = extractTagsFromTitle(snippet);
            const tagsString = tagsArray.join(' ');

            // --- gallery images ---
            if (post.is_gallery && post.gallery_data) {
              const mediaMetadata = post.media_metadata || {};
              const galleryItems = post.gallery_data.items || [];
              for (const item of galleryItems) {
                const meta = mediaMetadata[item.media_id];
                if (meta?.s?.u) {
                  const origUrl = decodeHtmlEntities(meta.s.u);
                  formattedResults.push({
                    src: origUrl,
                    thumbnail: origUrl,
                    query,
                    type: 'image',
                    tags: tagsString,
                    title: snippet,
                    nsfw,
                    alt_links: [],
                    width: meta.s?.x || 0,
                    height: meta.s?.y || 0,
                  });
                }
              }
            }
            // --- videos: HLS → DASH → fallback ---
            else if (post.is_video && post.media?.reddit_video) {
              const rv = post.media.reddit_video;
              const srcUrl = rv.hls_url || rv.dash_url || rv.fallback_url || '';
              formattedResults.push({
                    src: srcUrl,
                    thumbnail: post.thumbnail || srcUrl,
                    query,
                    type: 'video',
                    tags: tagsString,
                    title: snippet,
                    nsfw,
                    alt_links: [],
                    width: rv.width || 0,
                    height: rv.height || 0,
                    duration: rv.duration || null,
              });
            }
            // --- direct image links ---
            else if (post.url?.match(/\.(jpe?g|gif|png)$/i)) {
              const origUrl = post.url;
              const preview = post.preview?.images?.[0];
              formattedResults.push({
                    src: origUrl,
                    thumbnail: origUrl,
                    query,
                    type: 'image',
                    tags: tagsString,
                    title: snippet,
                    nsfw,
                    alt_links: [],
                    width: preview?.source?.width || 0,
                    height: preview?.source?.height || 0,
              });
            }
            // --- imgur fallback ---
            else if (post.domain === 'i.imgur.com' && post.url) {
              const origUrl = post.url;
              const preview = post.preview?.images?.[0];
              formattedResults.push({
                    src: origUrl,
                    thumbnail: origUrl,
                    query,
                    type: 'image',
                    tags: tagsString,
                    title: snippet,
                    nsfw,
                    alt_links: [],
                    width: preview?.source?.width || 0,
                    height: preview?.source?.height || 0,
              });
            }
          }

          // cache + set state
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ data: formattedResults, timestamp: Date.now() })
          );
          setMedia(formattedResults);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching Reddit media:', err);
          setError(err);
          setLoading(false);
        }
      };

      fetchData();
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [query, debounceDelay]);

  return { media, loading, error };
};

// Helpers
const decodeHtmlEntities = (text) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = text;
  return txt.value;
};

const extractTagsFromTitle = (title) => {
  if (!title) return [];
  return title
    .toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 2 && /^[a-z0-9]+$/.test(w));
};
