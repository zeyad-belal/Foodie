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
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;
      state.changed = true;
      if (existingCartItem) {
        let updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
        state.items = updatedItems;
      } else {
        updatedItems = [...state.items, action.payload];
        state.items = updatedItems;
      }
      state.totalAmount =
        state.totalAmount + action.payload.amount * action.payload.price;
    },
    remove(state, action) {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      state.changed = true;
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.payload);
        state.items = updatedItems;
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
        state.items = updatedItems;
      }
      state.totalAmount = updatedTotalAmount;
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
      // console.log(cartData)
      dispatch(
        cartSlice.actions.replaceCart({
          items: cartData.items || [],
          totalAmount: cartData.totalAmount,
        })
      );
    } catch (error) {
      toast(error);
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
