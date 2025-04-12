import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/orders";
axios.defaults.withCredentials = true;

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch sizes");
    }
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: true,
    errors: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.loading = true;
      state.errors = null;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
  },
});

export default orderSlice.reducer;
