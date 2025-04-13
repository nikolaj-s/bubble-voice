

export const initialState = () => {

    const disableNsfwBlur = JSON.parse(localStorage.getItem('disableNsfwBlur')) || false;

    const muteVideo = JSON.parse(localStorage.getItem('muteVideo')) || false;

    return {
        disableNsfwBlur,
        muteVideo
    }
}