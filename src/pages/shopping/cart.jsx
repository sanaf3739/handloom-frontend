import { useSelector, useDispatch } from "react-redux";
import {clearCart } from "../../store/slices/cartSlice";
import { Link } from "react-router-dom";
import CartItem from "../../components/shop/cartItem";
import { useEffect, useState } from "react";
import { ShoppingCart, Trash2, CreditCard } from "lucide-react";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, isAuthenticated } = useSelector((state) => state.cart);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    );
  }, [cartItems]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <ShoppingCart className="mr-3 text-blue-600" size={36} />
            Your Cart
          </h1>
          {cartItems.length > 0 && (
            <button 
              onClick={handleClearCart}
              className="text-red-500 hover:text-red-700 flex items-center transition-colors duration-300"
            >
              <Trash2 className="mr-2" size={20} />
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
            <Link 
              to="/" 
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 p-6">
            {/* Cart Items Column */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>

            {/* Cart Summary Column */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Cart Summary
                </h2>
                <div className="space-y-2 text-gray-600">
                  <p className="flex justify-between">
                    <span>Total Items:</span>
                    <span className="font-bold">{cartItems.length}</span>
                  </p>
                  <div className="border-t my-2"></div>
                  <p className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total Amount:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </p>
                </div>
              </div>
              
              <button 
                className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                <CreditCard className="mr-2" size={20} />
                <Link to="/checkout">Proceed to Checkout</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;