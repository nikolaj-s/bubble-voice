import { createSlice } from "@reduxjs/toolkit";


const ExpandContentSlice = createSlice({
    name: 'ExpandContentSlice',
    initialState: {
        selectedContent: false,
        iframe: false,
        reddit: false,
        videoStartTime: 0,
        youtube: false,
        channelInfo: false,
        metaData: {}
    },
    reducers: {
        setVideoStartTime: (state, action) => {
            state.videoStartTime = action.payload;
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        setExpandedContent: (state, action) => {
            if (action.payload === false) {
                state.selectedContent = false;
                state.iframe = false;
                state.youtube = false;
                state.reddit = false;
                state.channelInfo = false;
            } else {
                const expandedContent = action.payload;

                state.selectedContent = action.payload;
                
                if (expandedContent.content_type === 'channel-info') {
                    state.channelInfo = true;

                    state.selectedContent = expandedContent;
                    
                    return;
                }

                const imageFormats = ['.webp', '.jpg', '.jpeg', '.png', '.gif', 'images', '-jpg', '-jpeg', '-png', '-gif'];

                const image = imageFormats.some(format => action.payload.includes(format));

                if (image) return;

                if (expandedContent.type === 'reddit') {
                    
                    state.reddit = true;

                } else if (expandedContent?.includes('https')) {

                    const text = expandedContent;
                    
                    if (text.includes('redgif')) {
                    
                        state.iframe = "https://redgifs.com/ifr/" + (text.split('redgifs.com/')[1]?.includes('watch') ? text.split('redgifs.com/')[1]?.split('watch/')[1].toLowerCase() : text.split('redgifs.com/')[1]?.split('-')[0].toLowerCase());
                    
                    } else if (text.includes('youtu.be') || text.includes('youtube.com')) {
                        
                        state.youtube = text.includes('youtu.be') ? text.split('be/')[1] : text.includes('youtube.com/v/') ? text.split('/v/')[1] : text.split('v=')[1];

                    } else if (text.includes('pornhub')) {
        
                        state.iframe = "https://www.pornhub.com/embed/" + (text.split('viewkey=')[1])
        
                    } else  if (text.includes('xvideos')) {
        
                        state.iframe = "https://www.xvideos.com/embedframe/" + (text.split('video')[1].split('/')[0]);
        
                    } else if (text.includes('reddit')) {
        
                        state.iframe = "https://www.redditmedia.com/r/" + (text.split('r/')[1].split('?utm_')[0] + "?ref_source=embed&amp;ref=share&amp;embed=true&amp;theme=dark")
        
                    } else if (text.includes('steampowered')) {
        
                        state.iframe = "https://store.steampowered.com/widget/" + (text.split('app/')[1].split('/')[0]);
                    
                    } else if (text.includes('vimeo')) {
                        
                            state.iframe = "https://player.vimeo.com/video/" + text.split('com/')[1];
                    }else if (text.includes('xxbrits') || text.includes('sextaped')) {

                        state.iframe = text.replace('/videos/', '/embed/')
                    }  else {
                        state.iframe = text;
                    }

                } else if (expandedContent?.includes('song:')) {
                    state.youtube = action.payload.split(':')[1]
                }
            }
        }
    }
})

export const selectRedditExpanded = state => state.ExpandContentSlice.reddit;

export const selectIframeExpanded = state => state.ExpandContentSlice.iframe;

export const selectExpandedContent = state => state.ExpandContentSlice.selectedContent;

export const selectVideoStartTime = state => state.ExpandContentSlice.videoStartTime;

export const selectYouTubeExpand = state => state.ExpandContentSlice.youtube;

export const selectChannelInfoExpanded = state => state.ExpandContentSlice.channelInfo;

export const selectMediaMetaData = state => state.ExpandContentSlice.metaData;

export const { setExpandedContent, setVideoStartTime, setMetaData } = ExpandContentSlice.actions;

export default ExpandContentSlice.reducer;