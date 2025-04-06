

export const initialState = () => {

    const hideUserBar = JSON.parse(localStorage.getItem('hideUserBar')) || false;

    const hideCustomChannelIcons = JSON.parse(localStorage.getItem('hideCustomChannelIcons')) || false;

    const hideChannelBackgrounds = JSON.parse(localStorage.getItem('hideChannelBackgrounds')) || false;

    return {
        hideUserBar,
        hideCustomChannelIcons,
        hideChannelBackgrounds
    }
}