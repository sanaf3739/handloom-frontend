import { useDispatch, useSelector } from "react-redux"; 
import { signupUser } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "../../components/form/Form";
import InputField from "../../components/form/InputField";

const Signup = () => {
  const dispatch = useDispatch();
  const { signingUp, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const result = await dispatch(signupUser(data));
    if (result.meta.requestStatus === "fulfilled") navigate("/auth/login");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>
      <Form onSubmit={handleSubmit} defaultValues={{ fullName: "", email: "", password: "" }}>
        <InputField
          label="Full Name"
          name="fullName"
          type="text"
          placeholder="Enter your full name"
          validation={{ required: "Full Name is required" }}
        />
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
          validation={{
            required: "Password is required",
            minLength: { value: 6, message: "Min 6 characters" },
          }}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={signingUp}
          className="w-full p-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {signingUp ? "Signing up..." : "Sign Up"}
        </button>
      </Form>
      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-blue-500 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Signup;
