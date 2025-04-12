import { Trash2, Plus, Minus } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { decrementQuantity, incrementQuantity, removeFromCart } from "../../../src/store/slices/cartSlice";

const CartItem = ({ item }) => {
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

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center space-x-4">
        <img
          src={item?.images[0]}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-md"
        />
        
        <div className="flex-grow">
          <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
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
          <span className="px-1 text-gray-800">{item.quantity}</span>
          <button 
            onClick={handleIncreaseQuantity}
            className="p-2 min-w-10 text-gray-600 hover:bg-gray-100 rounded-r-full"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="flex items-center">
          <p className="text-gray-800 font-semibold mr-4">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
          <button 
            onClick={handleRemoveCart} 
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;