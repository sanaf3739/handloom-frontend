import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/sizes";
axios.defaults.withCredentials = true;

// Fetch all sizes
export const fetchSizes = createAsyncThunk(
  "sizes/fetchSizes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch sizes");
    }
  }
);

// Create a size
export const createSize = createAsyncThunk(
  "sizes/createSize",
  async (sizeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, sizeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create size");
    }
  }
);

// Update a size
export const updateSize = createAsyncThunk(
  "sizes/updateSize",
  async ({ id, sizeData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, sizeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update size");
    }
  }
);

// Delete a size
export const deleteSize = createAsyncThunk(
  "sizes/deleteSize",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete size");
    }
  }
);

// Size slice
const sizeSlice = createSlice({
  name: "size",
  initialState: { sizes: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSizes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSizes.fulfilled, (state, action) => {
        state.loading = false;
        state.sizes = action.payload;
      })
      .addCase(fetchSizes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSize.fulfilled, (state, action) => {
        state.sizes.push(action.payload);
      })
      .addCase(updateSize.fulfilled, (state, action) => {
        state.sizes = state.sizes.map((size) =>
          size._id === action.payload._id ? action.payload : size
        );
      })
      .addCase(deleteSize.fulfilled, (state, action) => {
        state.sizes = state.sizes.filter((size) => size._id !== action.payload);
      });
  },
});

export default sizeSlice.reducer;
