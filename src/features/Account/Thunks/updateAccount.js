import { createAsyncThunk } from '@reduxjs/toolkit';

import Axios from 'axios';

import { API_URL } from '../../../lib/Validation';

import { getToken } from '../../../lib/services/authService';

export const updateAccount = createAsyncThunk(
  'accountSlice/updateAccount',
  async (
    {
      userImage,
      userBanner,
      newShape,
      color,
      bio,
      displayName,
      decoration,
      userImageGifFrame,
      userBannerGifFrame,
      hotLinkPostsDisabled,
      password,
      newPassword,
      confirmNewPassword,
      showCaseScreenShots,
      socket, // Accept socket as an argument
    },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const token = await getToken();

      if (!token) {
        return rejectWithValue({ error: true, errorMessage: 'Validation error: No token' });
      }
      // Prepare form data
      const data = new FormData();

      data.append('displayName', displayName);

      data.append('userImage', userImage);

      data.append('bio', bio);

      data.append('userBanner', userBanner);

      data.append('password', password);

      data.append('newPassword', newPassword);

      data.append('confirmNewPassword', confirmNewPassword);

      data.append('profileImageShape', newShape);

      data.append('color', color);

      data.append('showCaseScreenShots', showCaseScreenShots);

      data.append('decoration', decoration);

      data.append('userBannerGifFrame', userBannerGifFrame);

      data.append('userImageGifFrame', userImageGifFrame);

      data.append('hotLinkPostsDisabled', hotLinkPostsDisabled);

      // Make Axios request
      const response = await Axios.post(`${API_URL}/update-account`, data, {
        headers: { TOKEN: token },
      });

      if (response.data.error) {
        return rejectWithValue({
          error: true,
          errorMessage: response.data.errorMessage || 'Unknown error',
        });
      }

      // Handle socket request if socket is passed
      if (socket) {
        try {
       //   const res = await socket.request('update member file');
   // Assuming you have this action
        } catch (error) {
          return rejectWithValue({ error: true, errorMessage: error.message || 'Socket error' });
        }
      }

      return response.data;
    } catch (error) {
      return rejectWithValue({ error: true, errorMessage: error.message || 'An error occurred' });
    }
  }
);
