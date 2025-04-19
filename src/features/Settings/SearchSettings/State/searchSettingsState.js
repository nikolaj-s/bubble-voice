

const searchSettingsSlice = () => {

    const disableSafeSearch = JSON.parse(localStorage.getItem('disableSafeSearch')) || false;

    const showFullResolutionPreviews = JSON.parse(localStorage.getItem('showFullResolutionPreviews')) || false;

    return {
        disableSafeSearch,
        showFullResolutionPreviews
    }
}

export default searchSettingsSlice;