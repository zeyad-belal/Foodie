import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { notiActions } from "./notiSlice";

const initialState ={
  items :[],
  totalAmount : 0,
  cartIsShown:false
}

export const cartSlice = createSlice({
  name:'cart',
  initialState,
  reducers:{
    add(state, action){
      const existingCartItemIndex = state.cart.items.findIndex( (item) => item.id === action.payload.id );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;
      if(existingCartItem){
        let updatedItem = {...existingCartItem , amount: existingCartItem.amount + action.payload.amount}
        updatedItems = [...state.items]
        updatedItems[existingCartItemIndex] = updatedItem
        state.items = updatedItems
      }else{
        updatedItems = [...state.items, action.payload];
        state.items = updatedItems
      }
      state.totalAmount = state.totalAmount +  action.payload.amount * action.payload.price;
    },
    remove(state, action){
      const existingCartItemIndex = state.items.findIndex((item) => item.id === action.payload);
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
  
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.payload);
        state.items = updatedItems;
      } else {
        const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
        state.items = updatedItems
      }
      state.totalAmount = updatedTotalAmount;
    },
    clear(state){
      state.items = [];
      state.totalAmount = 0;
    },
    replaceCart(state, action) {
      state.totalAmount = action.payload.totalAmount;
      state.items = action.payload.items;
    },
    toggleCart(state){
      state.cartIsShown = !state.cartIsShown
    }
  }
})

// custom action creator to handle updating cart data on firebase server
export const sendCartItems = (cart) => {
  return async (dispatch) => {
    dispatch(
      notiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://react-http-6b4a6.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await sendRequest();

      dispatch(
        notiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        notiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
  };
};

// export const fetchCartItems =(cart) => {
//   return async (dispatch) => {
//     try{
//       const res = await axios.get("https://react-fetching-d4ab5-default-rtdb.firebaseio.com/cart.json")
//       const cartData = await res.data.json()
//       return data 
//     }catch(error){
//       console.log(error)
//     }

//     dispatch(replaceCart(cartData))
//   }
// }


export const cartActions = cartSlice.actions;

export default cartSlice