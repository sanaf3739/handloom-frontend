import { Link, Outlet } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/slices/authSlice";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "../components/ui/button";
import MenuItems from "../components/layout/menuItems";
import Footer from "../components/layout/footer";
import { Header } from "../components/layout/header";

const ShoppingLayout = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-64">
          {/* <div className="flex flex-col h-full"> */}
          <SheetHeader className="border-black">
            <SheetTitle className="text-2xl">Handloom</SheetTitle>
          </SheetHeader>
          {/* </div> */}
          <MenuItems isOpen={isOpen} setIsOpen={setIsOpen} />
        </SheetContent>
      </Sheet>
      {/* Navbar */}
      {/* <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">MyShop</Link>
                <nav>
                    <Link to="/" className="mx-2">Home</Link>
                    <Link to="/cart" className="mx-2">Cart</Link>
                    {user ? (
                        <>
                            <span className="mx-2">{user.email}</span>
                            <button 
                                className="bg-red-500 px-3 py-1 rounded" 
                                onClick={() => dispatch(logoutUser())}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/auth/login" className="mx-2">Login</Link>
                    )}
                </nav>
            </header> */}

      <Header open={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <main className="flex-1 my-20">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
      {/* <footer className="bg-gray-900 text-white text-center p-4 mt-4">
        © 2025 MyShop. All rights reserved.
      </footer> */}
    </div>
  );
};

export default ShoppingLayout;
