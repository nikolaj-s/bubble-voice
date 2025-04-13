

export const initialState = () => {
    const hideUsers = JSON.parse(localStorage.getItem('hideUsers')) || false;

    const hideCustomChannelIcons = JSON.parse(localStorage.getItem('hideCustomChannelIcons')) || false;

    const hideChannelBackgrounds = JSON.parse(localStorage.getItem('hideChannelBackgrounds')) || false;
    
    const theme = localStorage.getItem('theme') || 'default'; // 'default' = your dark theme
  
    return {
      hideUsers,
      hideCustomChannelIcons,
      hideChannelBackgrounds,
      theme
    };
  };
  