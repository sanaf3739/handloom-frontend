import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        console.log("Navigating to the login page...");
        navigate("/auth/login", { replace: true });
      } else if (user.role === "admin") {
        // Check if the user is already on an admin route (like /admin/products, /admin/orders, etc.)
        if (location.pathname === "/admin") {
          console.log("Navigating admin to the dashboard...");
          navigate("/admin/dashboard", { replace: true });
        }
      }
      else if (user.role === "user"){
         navigate("/");
      }
    }
  }, [user, loading, navigate, location.pathname]);

  if (loading) {
    // console.log("Loading user data...");
    return <div className="flex items-center justify-center h-screen text-lg">Loading...</div>;
  }

  return user ? children || <Outlet /> : null;
};

export default ProtectedRoute;
