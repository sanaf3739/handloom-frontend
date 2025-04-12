import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Package,
  CreditCard,
  UserCircle,
  CheckCircle,
  Trash2,
  Plus,
  Minus,
  AlertCircle,
} from "lucide-react";

import { z } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

// Validation Schema
const UserDetailsSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  state: z.string().min(2, { message: "State must be at least 2 characters" }),
  country: z.string().min(2, { message: "Country must be at least 2 characters" }),
  pinCode: z.string().regex(/^\d{5,6}$/, { message: "Pin code must be 5 or 6 digits" }),
  phone: z.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
    message: "Invalid phone number",
  }),
  paymentMethod: z.enum(["COD", "Stripe", "Razorpay"]),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isAuthenticated = useSelector((state) => state.cart.isAuthenticated);
  const API_URL = import.meta.env.VITE_API_URL;
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phone: "",
    paymentMethod: "COD",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Modal state
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    title: "",
    description: "",
    type: "error", // can be "error", "success", "warning"
  });

  // Memoized calculations for performance
  const cartSummary = useMemo(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discountedTotal = subtotal - appliedDiscount;
    const tax = discountedTotal * 0.08; // 8% tax
    const total = discountedTotal + tax;

    return {
      subtotal,
      discountedTotal,
      tax,
      total,
    };
  }, [cartItems, appliedDiscount]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserDetails();
    }
  }, [isAuthenticated]);

  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get(API_URL + "/user");
      setUserDetails((prev) => ({
        ...prev,
        name: data.name,
        email: data.email,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        pinCode: data.pinCode,
        phone: data.phone,
      }));
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    try {
      UserDetailsSchema.parse(userDetails);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        setErrors(formErrors);
        return false;
      }
    }
  };

  const applyCoupon = async () => {
    try {
      const { data } = await axios.post("/api/validate-coupon", { code: couponCode });
      if (data.valid) {
        setAppliedDiscount(data.discountAmount);
        setModalInfo({
          isOpen: true,
          title: "Coupon Applied",
          description: `Coupon successfully applied! Discount: $${data.discountAmount}`,
          type: "success",
        });
      } else {
        setModalInfo({
          isOpen: true,
          title: "Invalid Coupon",
          description: "The coupon code you entered is not valid.",
          type: "error",
        });
        setAppliedDiscount(0);
      }
    } catch (error) {
      console.error("Coupon validation error", error);
      setModalInfo({
        isOpen: true,
        title: "Coupon Error",
        description: "Failed to validate coupon. Please try again.",
        type: "error",
      });
    }
  };

  const placeOrder = async () => {
    if (!validateForm()) {
      // Show form validation errors in modal
      const errorMessages = Object.values(errors).join(", ");
      setModalInfo({
        isOpen: true,
        title: "Form Validation Error",
        description: errorMessages || "Please check your input and try again.",
        type: "error",
      });
      return;
    }

    if (cartItems.length === 0) {
      setModalInfo({
        isOpen: true,
        title: "Empty Cart",
        description: "Your cart is empty. Please add items before placing an order.",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    const orderData = {
      items: cartItems,
      total: cartSummary.total,
      user: userDetails,
      paymentMethod: userDetails.paymentMethod,
      couponApplied: couponCode,
      discountAmount: appliedDiscount,
    };

    try {
      const { data } = await axios.post(`${API_URL}/orders`, orderData);
      dispatch(clearCart());
      navigate("/order-success", {
        state: {
          orderNumber: data.orderNumber,
          total: cartSummary.total,
        },
      });
    } catch (error) {
      console.error("Order failed", error);
      setModalInfo({
        isOpen: true,
        title: "Order Failed",
        description:
          error.response?.data?.message || "Order placement failed. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Modal Component
  const ErrorModal = () => (
    <AlertDialog
      open={modalInfo.isOpen}
      onOpenChange={(open) => setModalInfo((prev) => ({ ...prev, isOpen: open }))}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle
            className={`
                        flex items-center 
                        ${
                          modalInfo.type === "error"
                            ? "text-red-600"
                            : modalInfo.type === "success"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }
                    `}
          >
            <AlertCircle className="mr-2" />
            {modalInfo.title}
          </AlertDialogTitle>
          <AlertDialogDescription>{modalInfo.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Okay</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Error Modal */}
      <ErrorModal />
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Cart and User Details Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Cart Items */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Package className="mr-3 text-blue-600" />
              Your Cart
            </h3>
            {cartItems.length === 0 ? (
              <p className="text-gray-500 italic text-center">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center border-b pb-4 last:border-b-0"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => dispatch(decrementQuantity(item._id))}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(incrementQuantity(item._id))}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => dispatch(removeFromCart(item._id))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Details */}
          {/* User Details */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <UserCircle className="mr-3 text-blue-600" />
              Shipping Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={userDetails.name}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={userDetails.address}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={userDetails.city}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={userDetails.state}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={userDetails.country}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="pinCode"
                  placeholder="Pin Code"
                  value={userDetails.pinCode}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg ${
                    errors.pinCode ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.pinCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.pinCode}</p>
                )}
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={userDetails.phone}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCard className="mr-3 text-blue-600" />
              Payment Method
            </h3>
            <select
              name="paymentMethod"
              value={userDetails.paymentMethod}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="Stripe">Stripe</option>
              <option value="Razorpay">Razorpay</option>
            </select>
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="space-y-6">
          {/* Coupon Section */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <CheckCircle className="mr-3 text-green-600" />
              Coupon Code
            </h3>
            <div className="flex">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="w-full p-3 border border-gray-300 rounded-l-lg"
              />
              <button
                onClick={applyCoupon}
                className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartSummary.subtotal.toFixed(2)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${appliedDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>${cartSummary.tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>${cartSummary.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={placeOrder}
            disabled={isSubmitting || cartItems.length === 0}
            className={`
                            w-full py-4 rounded-lg text-white font-bold text-lg transition-all duration-300
                            ${
                              isSubmitting || cartItems.length === 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg"
                            }
                        `}
          >
            {isSubmitting ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
