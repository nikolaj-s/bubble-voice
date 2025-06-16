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

          const response = await fetch(`https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&limit=45&include_over_18=on&sort=relevance&type=link&t=month`);
          
          const data = await response.json();

          if (!data?.data?.children) {
            setMedia([]);
            setLoading(false);
            return;
          }

          const formattedResults = [];

          for (const child of data.data.children) {
            const post = child.data;
            const nsfw = post.over_18 || false;
            const tags = extractTagsFromTitle(post.title);
            const snippet = post.title || '';

            if (post.is_gallery && post.gallery_data) {
              const mediaMetadata = post.media_metadata || {};
              const galleryItems = post.gallery_data.items || [];

              for (const item of galleryItems) {
                const mediaItem = mediaMetadata[item.media_id];
                if (mediaItem?.s?.u) {
                  const origUrl = decodeHtmlEntities(mediaItem.s.u);

                  formattedResults.push({
                    src: origUrl,
                    thumbnail: origUrl,
                    query,
                    type: 'image',
                    tags,
                    nsfw,
                    alt_links: [],
                    width: mediaItem.s?.x || 0,
                    height: mediaItem.s?.y || 0,
                    snippet,
                  });
                }
              }
            }
            else if (post.is_video && post.media?.reddit_video?.fallback_url) {
              const origUrl = post.media.reddit_video.fallback_url;
              formattedResults.push({
                src: origUrl,
                thumbnail: post.thumbnail || origUrl,
                query,
                type: 'video',
                tags,
                nsfw,
                alt_links: [],
                width: post.media.reddit_video.width || 0,
                height: post.media.reddit_video.height || 0,
                duration: post.media.reddit_video.duration || null,
                snippet,
              });
            }
            else if (post.url?.match(/\.(jpeg|jpg|gif|png)$/)) {
              const origUrl = post.url;
              const previewImage = post.preview?.images?.[0];
              formattedResults.push({
                src: origUrl,
                thumbnail: origUrl,
                query,
                type: 'image',
                tags,
                nsfw,
                alt_links: [],
                width: previewImage?.source?.width || 0,
                height: previewImage?.source?.height || 0,
                snippet,
              });
            }
            else if (post.domain === 'i.imgur.com' && post.url) {
              const origUrl = post.url;
              const previewImage = post.preview?.images?.[0];
              formattedResults.push({
                src: origUrl,
                thumbnail: origUrl,
                query,
                type: 'image',
                tags,
                nsfw,
                alt_links: [],
                width: previewImage?.source?.width || 0,
                height: previewImage?.source?.height || 0,
                snippet,
              });
            }
          }

          localStorage.setItem(cacheKey, JSON.stringify({
            data: formattedResults,
            timestamp: Date.now(),
          }));

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
    .split(' ')
    .filter(word => word.length > 2 && /^[a-z0-9]+$/.test(word));
};
