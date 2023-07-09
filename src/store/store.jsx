import {createSlice ,configureStore} from '@reduxjs/toolkit'

const initialState ={
  items :[],
  totalAmount : 0,
  cartIsShown:false
}

const cartSlice = createSlice({
  name:'cart',
  initialState,
  reducers:{
    add(state, action){
      const existingCartItemIndex = state.items.findIndex( (item) => item.id === action.payload.id );
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
    toggleCart(state){
      state.cartIsShown = !state.cartIsShown
    }
  }
})


const store = configureStore({
  reducer: cartSlice.reducer
});

export const cartActions = cartSlice.actions

export default store;
