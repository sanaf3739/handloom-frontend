import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/orders";
axios.defaults.withCredentials = true;

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch order");
    }
  }
);

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

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create order");
    }
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    order: null,
    loading: true,
    errors: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrder.pending, (state) => {
      state.loading = true;
      state.errors = null;
    });
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.order = action.payload;
      state.loading = false;
    });
    builder.addCase(getOrder.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
    
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

    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = true;
      state.order = action.payload;
    });
    builder.addCase(createOrder.rejected, (state) => {
      state.loading = true;
      state.errors = action.payload;
    });
  },
});

export default orderSlice.reducer;
