
export const copyToClipboard = (str) => {

    try {
        if (window?.electron) {
            window?.electron?.copyText(str);
        } else {
            navigator.clipboard.writeText(str);
        }
    } catch (err) {
        return {error: true}
    }
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

export const triggerContext = (e, id) => {
    const element = document.getElementById(id);

    const event = new MouseEvent("contextmenu", {
        bubbles: true,
        cancelable: false,
        view: window,
        clientX: e.clientX, // Set X position
        clientY: e.clientY, // Set Y position
        });
       
        element.dispatchEvent(event);
}

export const getTimeUntil24Hours = (timestamp) => {
    const createdAt = new Date(timestamp);
    const expiresAt = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000);
    const now = new Date();
  
    const diffMs = expiresAt - now;
  
    if (diffMs <= 0) return 'Already passed 24 hours';
  
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
    return `${hours}h ${minutes}m`;
  };
  
export const isValidObjectId = (id) => {
    return typeof id === 'string' && /^[a-f\d]{24}$/i.test(id);
}