import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCardTwo from "../../components/product/productCardTwo";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/productSlice";
import HandloomBreadcrumb from "../../components/layout/breadcrumb";

const CategoryPage = () => {
  const { category } = useParams(); // Get category from URL
  const { products, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts({category: category})); // Fetch products once
  }, [dispatch, category]);

  // Filter products based on the selected category

  // Handle loading state
  if (loading) {
    return (
      <div className="container mx-auto py-10 px-6 text-center">
        <p>Loading products...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="container mx-auto py-10 px-6 text-center text-red-500">
        <p>Error loading products: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-6">
        <HandloomBreadcrumb category={category}/>
      {/* <h2 className="text-3xl font-bold text-center mb-6">
        {category === "All" ? "All Products" : `${category.replace("-", " ")}`}
      </h2> */}

      {/* Display Filtered Products */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 my-20">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCardTwo key={product._id} product={product} category={category} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
