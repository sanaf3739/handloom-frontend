import { getOrders } from "../../store/slices/orderSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const {orders, loading} = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if(loading){
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-2">{order.orderNumber}</td>
                <td className="p-2">{order.shippingAddress.name}</td>
                <td className="p-2">{order.totalAmount}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      order.status === "Completed"
                        ? "bg-green-500 text-white"
                        : order.status === "Pending"
                        ? "bg-yellow-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
