import { createSlice } from "@reduxjs/toolkit";


const ExpandContentSlice = createSlice({
    name: 'ExpandContentSlice',
    initialState: {
        selectedContent: false,
        iframe: false,
        reddit: false,
        videoStartTime: 0
    },
    reducers: {
        setVideoStartTime: (state, action) => {
            state.videoStartTime = action.payload;
        },
        setExpandedContent: (state, action) => {
            if (state.selectedContent !== false) {
                state.selectedContent = false;
            } else {
                const expandedContent = action.payload;

                state.selectedContent = action.payload;

                if (expandedContent.type === 'reddit') {
                    
                    state.reddit = true;

                } else if (expandedContent?.includes('https')) {
                    for (const text of expandedContent.split(' ')) {
                        if (text.includes('redgif')) {
                        
                            state.iframe = "https://redgifs.com/ifr/" + (text.split('redgifs.com/')[1]?.includes('watch') ? text.split('redgifs.com/')[1]?.split('watch/')[1].toLowerCase() : text.split('redgifs.com/')[1]?.split('-')[0].toLowerCase());
                        
                        } else if (text.includes('youtu.be') || text.includes('youtube.com')) {
            
                            state.iframe = "https://www.youtube.com/embed/" + (text.split('/')[3].includes('watch?') ? text.split('/')[3].split('watch?v=')[1].split('&')[0] : text.split('/')[3]);
            
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
                
                        } else {
                            state.iframe = false;
                        }

                    }
                }
            }
        }
    }
})

export const selectRedditExpanded = state => state.ExpandContentSlice.reddit;

export const selectIframeExpanded = state => state.ExpandContentSlice.iframe;

export const selectExpandedContent = state => state.ExpandContentSlice.selectedContent;

export const selectVideoStartTime = state => state.ExpandContentSlice.videoStartTime;

export const { setExpandedContent, setVideoStartTime } = ExpandContentSlice.actions;

export default ExpandContentSlice.reducer;