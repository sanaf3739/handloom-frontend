import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL + "/products";
axios.defaults.withCredentials = true;

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, {
        params: filters
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch products");
    }
  }
);

// Create a product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, productData);
      if(response.data.success){
        toast.success('Product Added Successfully!')
      }
      return response.data;
    } catch (error) {
      toast.error('Adding Product Failed!')
      return rejectWithValue(error.response?.data?.message || "Failed to create product");
    }
  }
);

// Update a product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, productData);
      if(response.data.success){
        toast.success('Product Updated Successfully!')
      }
      return response.data;
    } catch (error) {
      toast.error('Updating Product Failed!')
      return rejectWithValue(error.response?.data?.message || "Failed to update product");
    }
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      if(response.data.success){
        toast.success('Product Deleted Successfully!')
        return id;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete product");
    }
  }
);

// Product slice
const productSlice = createSlice({
  name: "products",
  initialState: { products: [], totalPages: 1, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
      });
  },
});

export default productSlice.reducer;
