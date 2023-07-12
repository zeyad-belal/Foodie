import {configureStore} from '@reduxjs/toolkit'
import notiSlice from './notiSlice';
import cartSlice from './cartSlice';


const store = configureStore({
  reducer: { noti: notiSlice.reducer , cart: cartSlice.reducer }
});


export default store;
