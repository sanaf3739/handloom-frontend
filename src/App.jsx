import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/authLayout";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Home from "./pages/home";
import AdminLayout from "./layouts/adminLayout";
import AdminDashboard from "./pages/admin/dashboard";
import AdminOrders from "./pages/admin/orders";
import AdminProducts from "./pages/admin/products";
import ShoppingLayout from "./layouts/shoppingLayout";
import ProductDetails from "./pages/shopping/productDetails";
import Cart from "./pages/shopping/cart";
import Checkout from "./pages/shopping/checkout";
import ProtectedRoute from "./routes/protectedRoute";
import PageNotFound from "./pages/page-not-found";
import { fetchUser } from "./store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CategoryPage from "./pages/shopping/categoryPage";
import AdminCategories from "./pages/admin/categories";
import AdminSizes from "./pages/admin/sizes";
import ProductDetailPage from "./pages/shopping/productDetailPage";
import ProtecteCheckoutdRoute from "./routes/protectedCheckoutRoute";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">Loading...</div>
    ); // ✅ Wait for user to load
  }
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<ShoppingLayout />}>
        <Route index element={<Home />} />
        <Route path="/categories" element={<Navigate to="/categories/all" replace />} />
        <Route path="/categories/:category" element={<CategoryPage />} />
        {/* <Route path="product/:id" element={<ProductDetails />} /> */}
        <Route path="product/:productId" element={<ProductDetailPage />} />
        <Route path="cart" element={<Cart />} />
        <Route
          path="checkout"
          element={
            <ProtecteCheckoutdRoute>
              <Checkout />
            </ProtecteCheckoutdRoute>
          }
        />
      </Route>

      {/* Auth Routes */}
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      {/* Admin Routes*/}
      <Route path="admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="sizes" element={<AdminSizes />} />
        </Route>
      </Route>

      {/* Not Found Route */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
