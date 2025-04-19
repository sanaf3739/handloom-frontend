import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Share,
  HelpCircle,
  MessageSquare,
  Minus,
  Plus,
  ChevronDown,
  Star,
  PlaneTakeoff,
  ShoppingCart,
} from "lucide-react";
import { fetchProducts } from "@/store/slices/productSlice";
import { addToCart } from "@/store/slices/cartSlice";
import toast from "react-hot-toast";

const ProductDetailPage = () => {
  const { products } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { productId } = useParams();
  const date = new Date();
  const currentDate = date.getDate();
  const months = [
    "Jan",
    "FEB",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const currentMonth = months[date.getMonth()];

  // Find the selected product
  const selectedProduct = products.find((product) => product._id === productId);
  const isAddedInCart = cartItems.filter((cartItem) => cartItem._id === productId);

  // State management
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("3X5 FEET");
  const [mainImage, setMainImage] = useState("");

  // Available sizes
  const sizes = [
    "3X5 FEET",
    "4X6 FEET",
    "5X8 FEET",
    "6X9 FEET",
    "8X10 FEET",
    "9X11 FEET",
    "9X12 FEET",
    "10X14 FEET",
    "12X14 FEET",
  ];

  // Fetch products if needed
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Set default main image when product data is available
  useEffect(() => {
    if (selectedProduct && selectedProduct.images && selectedProduct.images.length > 0) {
      setMainImage(selectedProduct.images[0]?.url);
    }
  }, [selectedProduct]);

  // Handle image selection
  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  // Add to cart functionality
  const handleAddToCart = () => {
    dispatch(addToCart(selectedProduct));
    toast.success("Added to cart");
  };

  // Quantity handlers
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Render star rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? "text-yellow-500 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  // Handle loading state
  if (!selectedProduct) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
        </div>
        <p className="mt-4 text-gray-600">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-10 md:pt-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Product Images */}
        <div className="w-full md:w-1/2">
          <div className="flex flex-col md:flex-row">
            {/* Thumbnails */}
            <div className="order-2 md:order-1 md:w-24 md:mr-4 flex overflow-x-auto md:flex-col md:overflow-visible gap-2 mt-4 md:mt-0">
              {selectedProduct.images &&
                selectedProduct.images.map((image, index) => (
                  <div
                    key={index}
                    className={`border cursor-pointer transition-all duration-200 ${
                      mainImage === image?.url
                        ? "border-teal-700 shadow-md"
                        : "border-gray-200 hover:border-gray-400"
                    } flex-shrink-0 md:mb-3 w-16 h-16 md:w-auto md:h-auto`}
                    onClick={() => handleThumbnailClick(image?.url)}
                  >
                    <img
                      src={image?.url}
                      alt={`${selectedProduct.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>

            {/* Main Image */}
            <div className="order-1 md:order-2 flex-1 border border-gray-200 overflow-hidden">
              {mainImage && (
                <img
                  src={mainImage}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {selectedProduct.name}
          </h1>

          <div className="mb-4 flex gap-3 items-center">
            <div className="flex gap-1">{renderStars(selectedProduct.rating)}</div>
            <a href="#reviews" className="text-sm text-blue-600 hover:underline">
              VIEW ALL REVIEWS
            </a>
          </div>

          <div className="flex items-center gap-3 mb-6">
            {selectedProduct.originalPrice && (
              <span className="text-gray-500">
                MRP:{" "}
                <span className="line-through">
                  ₹{selectedProduct.originalPrice.toLocaleString()}
                </span>
              </span>
            )}
            |
            <span className="text-2xl font-bold">
              ₹{selectedProduct.price?.toLocaleString()}
            </span>
            {selectedProduct.discount > 0 && (
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                {Math.floor(selectedProduct.discount)}% OFF
              </span>
            )}
          </div>

          {/* Size Selection */}
          {selectedProduct.size && (
            <div className="mb-6">
              <div className="text-sm font-medium text-gray-700 mb-2">
                SIZE: {selectedSize}
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`text-xs py-2 px-1 border ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-700 mb-2">QUANTITY:</div>
            <div className="flex items-center">
              <div className="flex border border-gray-300">
                <button className="px-3 py-2" onClick={decrementQuantity}>
                  <Minus size={16} />
                </button>
                <div className="w-12 flex items-center justify-center border-l border-r border-gray-300">
                  {quantity}
                </div>
                <button className="px-3 py-2" onClick={incrementQuantity}>
                  <Plus size={16} />
                </button>
              </div>

              {isAddedInCart.length ? (
                <Link
                  className="ml-4 py-2 px-6 bg-teal-700 text-white font-medium"
                  to="/cart"
                >
                  Go To Cart
                </Link>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="ml-4 py-2 px-6 bg-teal-700 text-white font-medium"
                >
                  Add To Cart
                </button>
              )}
            </div>
          </div>

          {/* Buy Button */}
          <button className="w-full py-3 border border-teal-700 text-teal-700 font-medium mb-6">
            Buy It Now
          </button>

          {/* Action Buttons */}
          <div className="flex items-center space-x-6 mb-8 border-b border-gray-200 pb-6">
            <button className="flex items-center text-sm">
              <Share size={16} className="mr-2" />
              SHARE
            </button>
            <button className="flex items-center text-sm">
              <HelpCircle size={16} className="mr-2" />
              ASK A QUESTION
            </button>
            <button className="flex items-center text-sm">
              <MessageSquare size={16} className="mr-2" />
              FAQ
            </button>
          </div>

          {/* Custom Requirement */}
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Have a Custom Requirement or any query?</p>
            <button className="py-2 px-6 bg-teal-700 text-white">WhatsApp Us</button>
          </div>

          {/* Delivery Information */}
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <div className="text-sm text-gray-500 mb-1">Estimated Arrival</div>
            <div className="font-medium mb-4">
              {selectedProduct.estimatedDelivery || "15 - 20 Days"}
            </div>
{/* 
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mb-1">
                  <span className="text-blue-500 text-xs"><ShoppingCart /></span>
                </div>
                <div className="text-xs text-center">
                  {`${currentDate} ${currentMonth}`}
                  <br />
                  <span className="text-gray-500">Order Placed</span>
                </div>
              </div>

              <div className="h-1 bg-blue-400 flex-1 mx-2"></div>

              <div className="flex flex-col items-center">
                <div className="bg-yellow-100 rounded-full w-10 h-10 flex items-center justify-center mb-1">
                  <span className="text-yellow-500 text-xs"><PlaneTakeoff /></span>
                </div>
                <div className="text-xs text-center">
                  {`${currentDate + 7} ${currentMonth} - ${
                    currentDate + 8
                  } ${currentMonth} `}
                  <br />
                  <span className="text-gray-500">Order dispatches</span>
                </div>
              </div>

              <div className="h-1 bg-green-400 flex-1 mx-2"></div>

              <div className="flex flex-col items-center">
                <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mb-1">
                  <span className="text-green-500 text-xs">{currentDate + 15}</span>
                </div>
                <div className="text-xs text-center">
                  22 Mar - 27 Mar
                  <br />
                  <span className="text-gray-500">Delivered</span>
                </div>
              </div>
            </div> */}

            <div className="flex justify-between text-sm">
              <div>
                <div>Returns & exchanges</div>
                <div className="text-green-500 font-medium">
                  {selectedProduct.returnsAccepted !== false
                    ? "Accepted"
                    : "Not Accepted"}
                </div>
              </div>
              <div className="text-right">
                <div>Return & exchange window</div>
                <div className="font-medium">
                  {selectedProduct.returnWindow || "14 days"}
                </div>
              </div>
            </div>

            <button className="w-full mt-4 py-2 text-sm flex items-center justify-center text-gray-600 border-t border-gray-200 pt-3">
              Return & Exchange Policy
              <ChevronDown size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Description */}
      {selectedProduct.description && (
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium mb-4">Product Description</h2>
          <div className="text-gray-700">{selectedProduct.description}</div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
