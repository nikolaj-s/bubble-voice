
export const copyToClipboard = (str) => {
    navigator.clipboard.writeText(str);
}

export const downloadImage = (image) => {

    const filename = image.split('/');

    fetch(image)
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.target = "_blank"
            link.download = filename[filename.length - 1];
            link.click();
            URL.revokeObjectURL(url); // Clean up the object URL
        })
        .catch(err => {
            window.open(image, "_blank")
        });
}

export const getFormattedDate = (data) => {

    const date = new Date(data);

    const formattedDate = date.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'long', // Full month name
        year: 'numeric',
        });

    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    return {formattedDate, formattedTime}
}