const embedHandlers = {
  youtube: (parsedUrl) => {
    const hostname = parsedUrl.hostname.toLowerCase();
    const pathname = parsedUrl.pathname;
    const searchParams = parsedUrl.searchParams;

    let videoId = null;

    if (hostname.includes('youtu.be')) {
      videoId = pathname.split('/').filter(Boolean).pop();
    } else if (pathname.includes('/shorts/')) {
      videoId = pathname.split('/shorts/').pop();
    } else {
      videoId = searchParams.get('v') || pathname.split('/').filter(Boolean).pop();
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  },

  vimeo: (parsedUrl) => {
    const videoId = parsedUrl.pathname.split('/').filter(Boolean).pop();
    return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
  },

  tiktok: (parsedUrl) => {
    return `https://www.tiktok.com/embed${parsedUrl.pathname}`;
  },

  twitter: (parsedUrl, originalUrl) => {
    return `https://twitframe.com/show?url=${encodeURIComponent(originalUrl)}`;
  },

  instagram: (parsedUrl) => {
    return `https://www.instagram.com${parsedUrl.pathname.replace(/\/$/, '')}/embed/`;
  },

  facebook: (parsedUrl, originalUrl) => {
    const vId = parsedUrl.searchParams.get('v');
    if (vId) {
      return `https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=${vId}`;
    } else {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(originalUrl)}`;
    }
  },

  reddit: (parsedUrl) => {
    return `https://www.redditmedia.com${parsedUrl.pathname}?ref_source=embed&ref=share`;
  },

  twitch: (parsedUrl) => {
    const hostname = parsedUrl.hostname.toLowerCase();
    const paths = parsedUrl.pathname.split('/').filter(Boolean);

    if (hostname.includes('clips.twitch.tv')) {
      const clipId = paths.pop();
      return `https://clips.twitch.tv/embed?clip=${clipId}&parent=yourdomain.com`;
    }

    if (paths[0] === 'videos' && paths[1]) {
      return `https://player.twitch.tv/?video=${paths[1]}&parent=yourdomain.com`;
    }

    if (parsedUrl.searchParams.has('clip')) {
      const clipId = parsedUrl.searchParams.get('clip');
      return `https://clips.twitch.tv/embed?clip=${clipId}&parent=yourdomain.com`;
    }

    if (paths.length >= 1) {
      return `https://player.twitch.tv/?channel=${paths[0]}&parent=yourdomain.com`;
    }

    return null;
  },

  // --- Adult sites ---
  pornhub: (parsedUrl) => {
    const viewKey = parsedUrl.searchParams.get('viewkey');
    const pathPart = parsedUrl.pathname.split('/').filter(Boolean).pop();
    return viewKey ? `https://www.pornhub.com/embed/${viewKey}` : pathPart ? `https://www.pornhub.com/embed/${pathPart}` : null;
  },

  xvideos: (parsedUrl) => {
    const match = parsedUrl.pathname.match(/\d+/);
    return match ? `https://www.xvideos.com/embedframe/${match[0]}` : null;
  },

  xhamster: (parsedUrl) => {
    const videoId = parsedUrl.pathname.split('/').filter(Boolean).pop();
    return videoId ? `https://xhamster.com/embed/${videoId}` : null;
  },

  redgifs: (parsedUrl) => {
    const gifId = parsedUrl.pathname.split('/').filter(Boolean).pop();
    return gifId ? `https://redgifs.com/ifr/${gifId}` : null;
  },

  onlyfans: (parsedUrl, originalUrl) => {
    return originalUrl; // no embedding
  },

  // --- New Adds ---
  soundcloud: (parsedUrl) => {
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(parsedUrl.href)}`;
  },

  spotify: (parsedUrl) => {
    return `https://open.spotify.com/embed${parsedUrl.pathname}`;
  },

  dailymotion: (parsedUrl) => {
    const videoId = parsedUrl.pathname.split('/').filter(Boolean).pop();
    return videoId ? `https://www.dailymotion.com/embed/video/${videoId}` : null;
  },

  giphy: (parsedUrl) => {
    const gifId = parsedUrl.pathname.split('-').pop();
    return gifId ? `https://giphy.com/embed/${gifId}` : null;
  },

  streamable: (parsedUrl) => {
    const videoId = parsedUrl.pathname.split('/').filter(Boolean).pop();
    return videoId ? `https://streamable.com/e/${videoId}` : null;
  },

  mixcloud: (parsedUrl) => {
    return `https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=${encodeURIComponent(`https://www.mixcloud.com${parsedUrl.pathname}`)}`;
  },
};
export const generateEmbedUrl = (url) => {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace(/^www\./, '').toLowerCase();

    // Smart matching
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      return embedHandlers.youtube(parsedUrl);
    }
    if (hostname.includes('vimeo.com')) {
      return embedHandlers.vimeo(parsedUrl);
    }
    if (hostname.includes('tiktok.com')) {
      return embedHandlers.tiktok(parsedUrl);
    }
    if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
      return embedHandlers.twitter(parsedUrl, url);
    }
    if (hostname.includes('instagram.com')) {
      return embedHandlers.instagram(parsedUrl);
    }
    if (hostname.includes('facebook.com')) {
      return embedHandlers.facebook(parsedUrl, url);
    }
    if (hostname.includes('reddit.com')) {
      return embedHandlers.reddit(parsedUrl);
    }
    if (hostname.includes('twitch.tv') || hostname.includes('clips.twitch.tv')) {
      return embedHandlers.twitch(parsedUrl);
    }
    if (hostname.includes('pornhub.com')) {
      return embedHandlers.pornhub(parsedUrl);
    }
    if (hostname.includes('xvideos.com')) {
      return embedHandlers.xvideos(parsedUrl);
    }
    if (hostname.includes('xhamster.com')) {
      return embedHandlers.xhamster(parsedUrl);
    }
    if (hostname.includes('redgifs.com')) {
      return embedHandlers.redgifs(parsedUrl);
    }
    if (hostname.includes('onlyfans.com')) {
      return embedHandlers.onlyfans(parsedUrl, url);
    }
    if (hostname.includes('soundcloud.com')) {
      return embedHandlers.soundcloud(parsedUrl);
    }
    if (hostname.includes('spotify.com')) {
      return embedHandlers.spotify(parsedUrl);
    }
    if (hostname.includes('dailymotion.com')) {
      return embedHandlers.dailymotion(parsedUrl);
    }
    if (hostname.includes('giphy.com')) {
      return embedHandlers.giphy(parsedUrl);
    }
    if (hostname.includes('streamable.com')) {
      return embedHandlers.streamable(parsedUrl);
    }
    if (hostname.includes('mixcloud.com')) {
      return embedHandlers.mixcloud(parsedUrl);
    }

    // fallback
    return url;

  } catch (err) {
    console.error('Invalid URL provided:', url);
    return null;
  }
};
