
export const safeGet = (key, fallback) => {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value !== null ? value : fallback;
    } catch (err) {
      console.warn(`Corrupt localStorage item: "${key}", clearing it.`);
      localStorage.removeItem(key);
      return fallback;
    }
  };
