import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  items: [],
  totalAmount: 0,
  cartIsShown: false,
  changed: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      const item = action.payload;
      const existingCartItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      const existingCartItem = state.items[existingCartItemIndex];
      state.changed = true;
      if (existingCartItem) {
        state.items[existingCartItemIndex].amount += item.amount;
      } else {
        state.items.push(item);
      }
      state.totalAmount += item.amount * item.price;
    },
    remove(state, action) {
      const id = action.payload;
      const existingCartItemIndex = state.items.findIndex( (cartItem) => cartItem.id === id );
      state.changed = true;
      if (existingCartItemIndex !== -1) {
        const existingCartItem = state.items[existingCartItemIndex];
        if (existingCartItem.amount === 1) {
          state.items.splice(existingCartItemIndex, 1);
        } else {
          existingCartItem.amount -= 1;
        }
        state.totalAmount -= existingCartItem.price;
        state.totalItemsNum -= 1;
      }
    },
    clear(state) {
      state.items = [];
      state.totalAmount = 0;
    },
    replaceCart(state, action) {
      state.totalAmount = action.payload.totalAmount;
      state.items = action.payload.items;
    },
    toggleCart(state) {
      state.cartIsShown = !state.cartIsShown;
    },
  },
});

// custom action creator to handle updating cart data on firebase server
export const sendCartItems = async (cart) => {
  try {
    const response = await fetch(
      "https://react-fetching-d4ab5-default-rtdb.firebaseio.com/carts.json",
      {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalAmount: cart.totalAmount,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Sending cart data failed.");
    }
  } catch (error) {
    toast(error);
  }
};

export const fetchCartItems = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-fetching-d4ab5-default-rtdb.firebaseio.com/carts.json"
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await sendRequest();

      dispatch(
        cartSlice.actions.replaceCart({
          items: cartData.items || [],
          totalAmount: cartData.totalAmount || 0,
        })
      );
    } catch (error) {
      toast(error);
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
