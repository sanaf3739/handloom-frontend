import React, { useEffect, useState } from "react"; 
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCardTwo from "../product/productCardTwo";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/productSlice";

const HomeCategory = ({ title, category }) => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  // Fetch products when category changes
  useEffect(() => {
    if (category) {
      dispatch(fetchProducts()); // Fetch products based on category slug
    }
  }, [dispatch, category]); // Include category in dependencies

  // Filter products based on category slug
  const filteredProducts = products.filter((product) => product.category?.slug === category);
  const [currentPage, setCurrentPage] = useState(0);
  const rugsPerPage = 4;
  const totalPages = Math.ceil(filteredProducts.length / rugsPerPage);

  const getCurrentPageRugs = () => {
    const startIndex = currentPage * rugsPerPage;
    return filteredProducts.slice(startIndex, startIndex + rugsPerPage);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages - 1 ? prevPage + 1 : prevPage));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : prevPage));
  };

  return (
    <div className="container mx-auto px-4 py-8 xl:px-24">
      <h1 className="text-3xl font-bold mb-8 text-start">{title}</h1>

      {loading ? (
        <p className="text-center text-lg">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No products found for this category.</p>
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4"
            >
              {getCurrentPageRugs().map((rug) => (
                <motion.div
                  key={rug._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCardTwo product={rug} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-4">
              <Button variant="outline" size="icon" onClick={handlePrevPage} disabled={currentPage === 0}>
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full cursor-pointer ${currentPage === index ? "bg-gray-800" : "bg-gray-300"}`}
                    onClick={() => setCurrentPage(index)}
                  />
                ))}
              </div>

              <Button variant="outline" size="icon" onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomeCategory;
