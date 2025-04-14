import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getOrder } from "@/store/slices/orderSlice";

export const OrderSuccess = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.order);

  const orderId = location?.state?.orderId;

  useEffect(() => {
    if (orderId) {
      dispatch(getOrder(orderId));
    }
  }, [orderId]);

  if (!orderId) return <div className="p-4 text-center text-red-500">Order ID not found.</div>;
  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;

  // ... your UI rendering logic here
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">🎉 Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-4">Order Number: <strong>{order.orderNumber}</strong></p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold border-b pb-2 mb-2">Shipping Details</h3>
          <div className="text-sm text-gray-700">
            <p><strong>Name:</strong> {order.shippingAddress.name}</p>
            <p><strong>Email:</strong> {order.shippingAddress.email}</p>
            <p><strong>Phone:</strong> {order.shippingAddress.phone}</p>
            <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.pinCode}, {order.shippingAddress.country}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold border-b pb-2 mb-2">Items</h3>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item._id} className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
                <p className="text-right font-semibold">${item.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold border-b pb-2 mb-2">Payment Info</h3>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
        </div>

        <div className="flex justify-between items-center border-t pt-4 text-lg font-bold">
          <span>Total Amount</span>
          <span>${order.totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
