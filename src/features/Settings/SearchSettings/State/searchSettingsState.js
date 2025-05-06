

const searchSettingsSlice = () => {

    const disableSafeSearch = JSON.parse(localStorage.getItem('disableSafeSearch')) || false;

    const showFullResolutionPreviews = JSON.parse(localStorage.getItem('showFullResolutionPreviews')) || false;

    const autoSendOnClick = JSON.parse(localStorage.getItem('autoSendOnClick')) || false;

    return {
        disableSafeSearch,
        showFullResolutionPreviews,
        autoSendOnClick
    }
}

export default searchSettingsSlice;