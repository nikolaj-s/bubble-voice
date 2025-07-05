

export const initialState = () => {
    const hideUsers = JSON.parse(localStorage.getItem('hideUsers')) || false;

    const hideCustomChannelIcons = JSON.parse(localStorage.getItem('hideCustomChannelIcons')) || false;

    const hideChannelBackgrounds = JSON.parse(localStorage.getItem('hideChannelBackgrounds')) || false;
    
    const useBlackVoiceChannelBackground = JSON.parse(localStorage.getItem('useBlackVoiceChannelBackground')) || false;

    const disableStreamAmbiance = JSON.parse(localStorage.getItem('disableStreamAmbiance')) || false;

    const theme = JSON.parse(localStorage.getItem('theme')) || 'default'; // 'default' = your dark theme

    const fontSize = JSON.parse(localStorage.getItem('fontSize')) || 14;

    const maximumMediaHeight = JSON.parse(localStorage.getItem('maximumMediaHeight')) || 350;
  
    return {
      hideUsers,
      hideCustomChannelIcons,
      hideChannelBackgrounds,
      theme,
      useBlackVoiceChannelBackground,
      disableStreamAmbiance,
      fontSize,
      maximumMediaHeight
    };
  };
  