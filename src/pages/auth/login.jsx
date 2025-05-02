import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "../../components/form/Form";
import InputField from "../../components/form/InputField";

const Login = () => {
  const dispatch = useDispatch();
  const { loggingIn, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (data) => {
    const result = await dispatch(loginUser(data));
    if (result.meta.requestStatus === "fulfilled" && result.payload.success) {
      if (result?.payload?.user?.role === "admin") {
        navigate("/admin/dashboard");
      }else{
        navigate(from, { replace: true });
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <Form onSubmit={handleSubmit} defaultValues={{ email: "", password: "" }}>
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          validation={{ required: "Email is required" }}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          validation={{ required: "Password is required" }}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loggingIn}
          className="w-full p-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {loggingIn ? "Logging in..." : "Login"}
        </button>
      </Form>
      <p className="mt-4 text-sm text-center">
        Don't have an account?{" "}
        <Link to="/auth/signup" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
