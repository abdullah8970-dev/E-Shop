import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    isCartOpen: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.isCartOpen = true;
    },
    addToCartForBuyNow: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) 
        {
        existingItem.quantity += 1;
       } else 
        {
        state.items.push({ ...action.payload, quantity: 1 });
        }
      // Do not open cart for buy now
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index !== -1) 
        {
        state.items.splice(index, 1);
       }
    },
    increaseQuantity: (state, action) =>
       {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
       }
    },
    decreaseQuantity: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index !== -1)
        {
        state.items[index].quantity = Math.max(0, state.items[index].quantity - 1);
        }
    },
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
  },
});

export const { addToCart, addToCartForBuyNow, removeFromCart, increaseQuantity, decreaseQuantity, openCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;
