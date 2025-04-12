import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/slices/authSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    return (
        <nav className="p-4 bg-gray-900 text-white flex justify-between">
            <Link to="/">Home</Link>
            {user ? (
                <>
                    <span>Welcome, {user.name}</span>
                    <button onClick={() => dispatch(logoutUser())} className="ml-4 bg-red-500 px-4 py-1 rounded">Logout</button>
                </>
            ) : (
                <Link to="/auth/login">Login</Link>
            )}
        </nav>
    );
};

export default Navbar;
