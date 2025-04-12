import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import MenuItems from "../components/layout/menuItems";
import Footer from "../components/layout/footer";
import { Header } from "../components/layout/header";
import { SheetDescription } from "../components/ui/sheet";

const ShoppingLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-64" aria-describedby={undefined}>
          {/* <div className="flex flex-col h-full"> */}
          <SheetHeader className="border-black">
            <SheetTitle className="text-2xl">Handloom</SheetTitle>
          </SheetHeader>
          {/* </div> */}
          <MenuItems isOpen={isOpen} setIsOpen={setIsOpen} />
        </SheetContent>
      </Sheet>
      {/* Navbar */}

      <Header open={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <main className="flex-1 my-20">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ShoppingLayout;
