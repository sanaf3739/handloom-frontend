import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative pt-[100%] w-full overflow-hidden">
          <img
            src={`http://localhost:8000/uploads/${product.image}`}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover"
            width={400}
            height={400}
          />

        {/* Category Badge */}
        <div className="absolute top-1 sm:top-3 right-1 sm:right-3 bg-white/80 px-2 py-1 rounded text-xs font-medium">
          {product?.category.name || "New Arrival"}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleAddToWishlist}
          className="absolute top-1 sm:top-3 left-1 sm:left-3 z-10 bg-white/70 rounded-full p-2 hover:bg-white transition-all duration-300 group"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${
              isWishlisted
                ? "fill-current text-red-500"
                : "text-neutral-600 group-hover:text-red-500"
            }`}
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between p-4 flex-grow space-y-3">
        {/* Product Info */}
        <div>
          <h3 className="sm:text-lg font-semibold mb-1">{product.name}</h3>

          {/* Price on Next Line */}
          <div className="text-xl font-bold text-left mb-2">{product.price}</div>

          {/* Rating */}
          <div className="flex items-center text-sm mb-2">
            <div className="flex text-yellow-500 mr-2">★★★★☆</div>
            <span className="text-neutral-500">(4.5)</span>
          </div>

          {/* Description */}
          <p className="text-neutral-600 text-sm line-clamp-2 mb-3">
            {product.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <span className="text-green-600 text-sm font-medium">In Stock</span>
            <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-neutral-800 transition-colors">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:block">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
