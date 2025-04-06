

export const initialState = () => {

    const disableNsfwBlur = JSON.parse(localStorage.getItem('disableNsfwBlur')) || false;

    return {
        disableNsfwBlur
    }
}