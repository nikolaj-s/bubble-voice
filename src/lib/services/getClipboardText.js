export const getClipboardText = async () => {
  try {

    if (window?.electron) {
      return await window?.electron?.readText();
    }

    if (navigator.clipboard && typeof navigator.clipboard.readText === 'function') {
      return await navigator.clipboard.readText();
    }
    // Fallback not possible in most modern browsers for privacy reasons
    return null;
  } catch (err) {
    return {error: true};
  }
};
