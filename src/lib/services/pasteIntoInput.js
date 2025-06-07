export const pasteIntoInputById = (id, value, stateSetter) => {

    const inputElement = document.getElementById(id);

    if (!inputElement) return;

    const pasteEvent = new ClipboardEvent('paste', {
        bubbles: true,
        clipboardData: new DataTransfer()
    });

    pasteEvent.clipboardData.setData('text/plain', value);

    inputElement.dispatchEvent(pasteEvent);

};
