import React, { useState } from "react";
import { Heart, ShoppingCart, Expand, Star, ShoppingBag } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import toast from "react-hot-toast";

const ProductCardTwo = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  // Render star rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? "text-yellow-500 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const handleExpandClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("added to cart");
    console.log("added to the cart");
  };

  return (
    <div
      className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-[3/4]">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.images[0].url}
            alt="Red Hand Tufted Melting Persian Design Area Rug"
            className="w-full h-full object-cover"
          />
        </Link>
        {product.discount >= 0 && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {`${Math.ceil(product.discount)}% OFF`}
          </div>
        )}
        <div
          className={`absolute top-4 right-4 flex flex-col space-y-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-110 transition-transform cursor-pointer">
            {cartItems.find((cartItem) => cartItem._id === product._id) ? (
              <Link to="/cart">
                <ShoppingBag className="w-4 h-4 text-gray-700" />
              </Link>
            ) : (
              <ShoppingCart className="w-4 h-4 text-gray-700" onClick={handleAddToCart} />
            )}
          </button>
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-110 transition-transform cursor-pointer">
            <Heart className="w-4 h-4 text-gray-700" />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-110 transition-transform cursor-pointer">
            <Expand className="w-4 h-4 text-gray-700" onClick={handleExpandClick} />
          </button>
        </div>
      </div>
      <div className="p-2 sm:p-4">
      <div className="flex items-center space-x-1 mb-2">
          {renderStars(product.rating)}
          {/* <span className="text-xs text-gray-500 ml-2">(128)</span> */}
        </div>
        <h2 className="text-sm sm:text-lg font-semibold mb-2">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h2>
        <div className="flex items-center space-x-1 sm:space-x-3 mb-1">
          <span className="text-base md:text-xl sm:font-bold text-neutral-800">
            &#8377;{product.price}
          </span>
          <span className="text-xs sm:text-sm text-gray-400 line-through">
            &#8377;{product.originalPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCardTwo;
