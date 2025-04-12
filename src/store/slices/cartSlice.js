import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
  isAuthenticated: false,
  isLoading: true
};

// Fetch cart from database if user is logged in
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const { data } = await axios.get("/api/cart");
  return data;
});

// Add product to cart (update quantity if exists)
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, { getState }) => {
    const { isAuthenticated, cartItems } = getState().cart;

    if (isAuthenticated) {
      const { data } = await axios.post("/api/cart/add", item);
      return data;
    } else {
      // Check if item exists in cart
      const existingItem = cartItems.find((cartItem) => cartItem._id === item._id);

      if (existingItem) {
        return {
          ...existingItem,
          quantity: existingItem.quantity ? existingItem.quantity + 1 : 1,
        };
      } else {
        return { ...item, quantity: item.quantity || 1 };
      }
    }
  }
);

// Remove item from cart (for authenticated users)
export const removeFromCartDB = createAsyncThunk(
  "cart/removeFromCartDB",
  async (itemId) => {
    await axios.delete(`/api/cart/remove/${itemId}`);
    return itemId;
  }
);

// Clear cart from database
export const clearCartDB = createAsyncThunk("cart/clearCartDB", async () => {
  await axios.delete("/api/cart/clear");
  return [];
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    incrementQuantity: (state, action) => {
      let cartItem = state.cartItems.find((cartItem) => cartItem._id === action.payload);
      if (cartItem) {
        cartItem.quantity = cartItem.quantity ? cartItem.quantity + 1 : 1;
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }
    },
    decrementQuantity: (state, action) => {
      let cartItem = state.cartItems.find((cartItem) => cartItem._id === action.payload);
      if (cartItem) {
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem._id !== action.payload
          );
        }
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify([]));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const existingItem = state.cartItems.find(
          (item) => item._id === action.payload._id
        );

        if (existingItem) {
          existingItem.quantity = action.payload.quantity;
        } else {
          state.cartItems.push(action.payload);
        }

        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      })
      .addCase(removeFromCartDB.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
      })
      .addCase(clearCartDB.fulfilled, (state) => {
        state.cartItems = [];
      });
  },
});

export const {
  removeFromCart,
  clearCart,
  setAuthentication,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
