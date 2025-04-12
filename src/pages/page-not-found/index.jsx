import { Link } from "react-router";

const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="text-xl text-gray-700 mt-2">Oops! Page not found.</p>
            <Link to="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
                Go to Home
            </Link>
        </div>
    );
};

export default PageNotFound;
