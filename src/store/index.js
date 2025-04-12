import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categorySlice";
import sizeReducer from "./slices/sizeSlice";
import orderReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
    category: categoryReducer,
    size: sizeReducer,
    order: orderReducer
  },
})