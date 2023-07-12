import { createSlice } from '@reduxjs/toolkit';

const notiSlice = createSlice({
  name: 'noti',
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    showNotification(state, action) {
        state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const notiActions = notiSlice.actions;

export default notiSlice