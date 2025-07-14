import { safeGet } from "../../../../lib/handlers/safeGet";

export const initialState = () => {
  
  return {
    hideUsers: safeGet('hideUsers', false),
    hideCustomChannelIcons: safeGet('hideCustomChannelIcons', false),
    hideChannelBackgrounds: safeGet('hideChannelBackgrounds', false),
    useBlackVoiceChannelBackground: safeGet('useBlackVoiceChannelBackground', false),
    disableStreamAmbiance: safeGet('disableStreamAmbiance', false),
    theme: safeGet('theme', 'default'),
    fontSize: safeGet('fontSize', 14),
    maximumMediaHeight: safeGet('maximumMediaHeight', 350),
  };
};
