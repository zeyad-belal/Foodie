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

// const CartReducer = (state = defaultCartState, action) => {
//   if (action.type === "ADD") {
//     const updatedTotalAmount =
//       state.totalAmount + action.item.amount * action.item.price;

//     const existingCartItemIndex = state.items.findIndex(
//       (item) => item.id === action.item.id
//     );
//     const existingCartItem = state.items[existingCartItemIndex];
//     let updatedItems;

//     if (existingCartItem) {
//       const updatedItem = {
//         ...existingCartItem,
//         amount: existingCartItem.amount + action.item.amount,
//       };

//       updatedItems = [...state.items];
//       updatedItems[existingCartItemIndex] = updatedItem;
//     } else {
//       updatedItems = [...state.items, action.item];
//     }

//     return {
//       items: updatedItems,
//       totalAmount: updatedTotalAmount,
//     };
//   } else if (action.type === "REMOVE") {
//     const existingCartItemIndex = state.items.findIndex(
//       (item) => item.id === action.id
//     );

//     const existingItem = state.items[existingCartItemIndex];

//     const updatedTotalAmount = state.totalAmount - existingItem.price;

//     let updatedItems;

//     if (existingItem.amount === 1) {
//       updatedItems = state.items.filter((item) => item.id !== action.id);
//     } else {
//       const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
//       updatedItems = [...state.items];
//       updatedItems[existingCartItemIndex] = updatedItem;
//     }
//     return {
//       items: updatedItems,
//       totalAmount: updatedTotalAmount,
//     };
//   } else if (action.type === "CLEAR") {
//     return defaultCartState;
//   }
//   return state;
// };

const store = configureStore({
  reducer: cartSlice.reducer
});

export const cartActions = cartSlice.actions

export default store;
