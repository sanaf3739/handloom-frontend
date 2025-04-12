import { Outlet } from "react-router";
import AdminSidebar from "../components/admin/sidebar";

const AdminLayout = () => {

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <AdminSidebar/>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
