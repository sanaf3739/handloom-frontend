import Loading from "@/components/loaders/Loading";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/analytics`);
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-2xl font-bold">
            {loading ? <Loading /> : data?.totalProducts || 0}
          </p>{" "}
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Hand Tufted Products</h2>
          <p className="text-2xl font-bold">
            {loading ? <Loading /> : data?.categoryWiseProductCounts?.HandTufted || 0}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Hand Knotted Products</h2>
          <p className="text-2xl font-bold">
            {loading ? <Loading /> : data?.categoryWiseProductCounts?.HandKnotted || 0}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Hand Woven Products</h2>
          <p className="text-2xl font-bold">
            {loading ? <Loading /> : data?.categoryWiseProductCounts?.HandWoven || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
