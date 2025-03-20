

export const generateFormData = (params) => {
    
    const data = new FormData();
      
    Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
        data.append(key, value);
        }
    });

    return data;

}