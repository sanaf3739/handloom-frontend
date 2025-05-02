import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { fetchUser } from "../store/slices/authSlice";
import Spinner from "../components/loaders/Spinner";

const ProtecteCheckoutdRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        console.log("Navigating to the login page...");
        // ✅ Pass the current location as state
        navigate("/auth/login", { state: { from: location }, replace: true });
      } else if (user.role === "admin") {
        // Check if the user is already on an admin route (like /admin/products, /admin/orders, etc.)
        if (location.pathname === "/admin") {
          console.log("Navigating admin to the dashboard...");
          navigate("/admin/dashboard", { replace: true });
        }
      } else if (user.role === "user") {
        navigate("/checkout", { replace: true });
      }
    }
  }, [user, loading, navigate, location.pathname]);

  if (loading) {
    return <Spinner />;
  }

  return user ? children || <Outlet /> : null;
};

export default ProtecteCheckoutdRoute;
