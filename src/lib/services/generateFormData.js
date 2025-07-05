

export const generateFormData = (params) => {
  const data = new FormData();

  Object.entries(params).forEach(([key, value]) => {
    if (value == null) return;

    if (Array.isArray(value)) {
      value.forEach(item => {
        if (item != null) {
          data.append(key, item);
        }
      });
    } else {
      data.append(key, value);
    }
  });

  return data;
};
