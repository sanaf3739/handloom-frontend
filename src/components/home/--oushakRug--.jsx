import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../product/productCard';
import ProductCardTwo from '../product/productCardTwo';

// Rug data (matching the image)
const rugs = [
  {
    id: 1,
    name: "Vivian Hand Knotted Oushak Rug",
    price: "₹39,808.22",
    image: "/images/default/placeholder/test.jpg",
    discount: "50% OFF",
    category: "best-seller"
  },
  {
    id: 2,
    name: "Blue Turkish Oushak Hand Knotted Rug for Bedroom & Living Room",
    price: "₹39,808.22",
    image: "/images/default/placeholder/600x600.png",
    discount: "50% OFF"
  },
  {
    id: 3,
    name: "Sky Blue Turkish Oushak Hand Knotted Rug for Bedroom & Living Room",
    price: "₹39,808.22",
    image: "/images/default/placeholder/600x600.png",
    discount: "50% OFF"
  },
  {
    id: 4,
    name: "Sky Blue Turkish Oushak Hand Knotted Rug for Bedroom & Living Room",
    price: "₹39,808.22",
    image: "/images/default/placeholder/600x600.png",
    discount: "50% OFF"
  },
  {
    id: 5,
    name: "Pink Turkish Oushak Hand Knotted Rug for Bedroom & Living Room",
    price: "₹39,808.22",
    image: "/images/default/placeholder/600x600.png",
    discount: "50% OFF"
  },
  {
    id: 6,
    name: "Grey Turkish Oushak Hand Knotted Rug for Bedroom & Living Room",
    price: "₹39,808.22",
    image: "/images/default/placeholder/600x600.png",
    discount: "50% OFF"
  },
  {
    id: 7,
    name: "Pink Cream Turkish Oushak Hand Knotted Rug for Bedroom & Living Room",
    price: "₹39,808.22",
    image: "/images/default/placeholder/600x600.png",
    discount: "50% OFF"
  },
  {
    id: 8,
    name: "Navy Blue Turkish Oushak Hand Knotted Rug for Bedroom & Living Room",
    price: "₹39,808.22",
    image: "/images/default/placeholder/600x600.png",
    discount: "50% OFF"
  }
];

const OushakRugPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const rugsPerPage = 6;
  const totalPages = Math.ceil(rugs.length / rugsPerPage);

  // Get the rugs for the current page
  const getCurrentPageRugs = () => {
    const startIndex = currentPage * rugsPerPage;
    return rugs.slice(startIndex, startIndex + rugsPerPage);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => 
      prevPage < totalPages - 1 ? prevPage + 1 : prevPage
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => 
      prevPage > 0 ? prevPage - 1 : prevPage
    );
  };

  const handlePageDotClick = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-start">Oushak Rug</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {getCurrentPageRugs().map((rug) => (
          <ProductCardTwo product={rug} key={rug.id}/>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                currentPage === index ? 'bg-gray-800' : 'bg-gray-300'
              }`}
              onClick={() => handlePageDotClick(index)}
            />
          ))}
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OushakRugPage;