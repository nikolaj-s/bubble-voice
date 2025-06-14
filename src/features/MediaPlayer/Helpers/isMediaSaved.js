/**
 * Checks if a media src is saved in a specific channel's media list.
 *
 * @param {object} savedMediaState - The savedMedia slice from Redux state.
 * @param {string} channelId - The channel ID to check.
 * @param {string} src - The media src to check for.
 * @returns {boolean} True if found, otherwise false.
 */
export const isMediaSaved = (savedMediaState, channelId, src) => {
  const channelData = savedMediaState.saves[channelId];
  if (!channelData || !Array.isArray(channelData)) return false;
  console.log(src)
  return channelData.some(item => item.src === src);
};
