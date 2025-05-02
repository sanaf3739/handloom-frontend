import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Base URL
const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

// Fetch User
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/me`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);

// Async Thunks
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Login failed");
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Signup failed");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
  return null;
});

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    loggingIn: false,
    signingUp: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loggingIn = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loggingIn = false;
        state.user = action.payload.user || action.payload; // ✅ Ensure `user` is assigned correctly
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loggingIn = false;
        state.error = action.payload;
      })

      .addCase(signupUser.pending, (state) => {
        state.signingUp = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.signingUp = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signingUp = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })

      .addCase(fetchUser.pending, (state, action) => {
        // state.loading = true,
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        (state.loading = false), (state.user = action.payload.user || action.payload); // ✅ Ensure `user` is stored properly
      })
      .addCase(fetchUser.rejected, (state) => {
        (state.loading = false), (state.user = null);
      });
  },
});

export default authSlice.reducer;
