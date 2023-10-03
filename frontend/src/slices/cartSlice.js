import { createSlice } from "@reduxjs/toolkit";
import { updateCart, updateItemQty } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //...
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // Store the override flag
        const shouldOverride = item.override;

        // Remove the override field from the item
        delete item.override;

        // Update the item quantity
        state.cartItems = updateItemQty(state.cartItems, item, shouldOverride);
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);

      //  TODO notify the user
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
