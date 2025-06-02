

const searchSettingsSlice = () => {

    const disableSafeSearch = JSON.parse(localStorage.getItem('disableSafeSearch')) || false;

    const showFullResolutionPreviews = JSON.parse(localStorage.getItem('showFullResolutionPreviews')) || false;

    const autoSendOnClick = JSON.parse(localStorage.getItem('autoSendOnClick')) || false;

    const addToMediaPlayerOnClick = JSON.parse(localStorage.getItem('addToMediaPlayerOnClick')) || false;

    return {
        disableSafeSearch,
        showFullResolutionPreviews,
        autoSendOnClick,
        addToMediaPlayerOnClick
    }
}

export default searchSettingsSlice;