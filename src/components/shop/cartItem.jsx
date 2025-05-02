// CartItem.jsx - Optimized for mobile performance
import { Trash2, Plus, Minus } from "lucide-react";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../../src/store/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";

// Using memo to prevent unnecessary re-renders
const CartItem = memo(({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRemoveCart = () => {
    dispatch(removeFromCart(item._id));
    toast.error("Removed from cart");
  };

  const handleIncreaseQuantity = () => {
    dispatch(incrementQuantity(item._id));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decrementQuantity(item._id));
  };

  // Calculations outside of the JSX
  const totalPrice = (item.price * item.quantity).toFixed(2);
  const imageUrl = item?.images?.[0]?.url || "/placeholder-image.jpg";

  return (
    <div className="bg-white border rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow duration-300">
      {/* Mobile layout */}
      <div className="flex flex-col sm:hidden">
        <div className="flex items-start mb-3">
          <img
            src={imageUrl}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-md mr-3"
            loading="lazy"
          />
          <div>
            <h2 className="text-base font-semibold text-gray-800">
              <Link to="/">{item.name}</Link>
            </h2>
            <p className="text-gray-700 font-medium mt-1">${item.price.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center border rounded-full">
            <button
              onClick={handleDecreaseQuantity}
              className="p-1 text-gray-600 hover:bg-gray-100 rounded-l-full"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="px-2 text-gray-800">{item.quantity}</span>
            <button
              onClick={handleIncreaseQuantity}
              className="p-1 text-gray-600 hover:bg-gray-100 rounded-r-full"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="flex items-center">
            <p className="text-gray-800 font-semibold mr-3">${totalPrice}</p>
            <button
              onClick={handleRemoveCart}
              className="text-red-500 hover:text-red-700 p-1"
              aria-label="Remove item"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden sm:flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={imageUrl}
            alt={item.name}
            className="w-24 h-24 object-contain rounded-md cursor-pointer"
            loading="lazy"
            onClick={() => navigate(`/product/${item._id}`)}
          />

          <div className="flex-grow">
            <h2 className="text-lg font-semibold text-gray-800">
              <Link to={`/product/${item._id}`}>{item.name}</Link>
            </h2>
            <p className="text-gray-500 text-sm mb-2">{item.description}</p>
            <p className="text-gray-700 font-medium">${item.price.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center border rounded-full">
            <button
              onClick={handleDecreaseQuantity}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-full"
            >
              <Minus size={16} />
            </button>
            <span className="px-3 text-gray-800">{item.quantity}</span>
            <button
              onClick={handleIncreaseQuantity}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-full"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="flex items-center">
            <p className="text-gray-800 font-semibold mr-4">${totalPrice}</p>
            <button
              onClick={handleRemoveCart}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CartItem;
