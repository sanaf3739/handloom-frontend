import { MoveLeft, MoveRight } from "lucide-react";
import React, { useRef } from "react";
import ProductCardTwo from "../product/productCardTwo";
import { sliderSettings } from "../../config/homeCategory";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeCategory = ({ title, products, viewAllLink = "#" }) => {
  const sliderRef = useRef(null);

  // Navigation handlers
  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <section className="mt-16 overflow-hidden">
      <div className="container mx-auto px-4 py-8 xl:px-16">
        <div className="flex justify-between items-start sm:items-center mb-6">
          <div className="flex items-center mb-10">
            <div className="w-2 h-10 bg-black mr-3 rounded-full"></div>
            <h1 className="text-3xl md:text-4xl font-bold text-start">{title}</h1>
          </div>

          <div className="flex items-center mt-4 sm:mt-0">
            {/* <a 
              href={viewAllLink} 
              className="mr-6 text-sm font-medium hover:underline transition-all duration-300"
            >
              View All
            </a> */}
            <div className="flex items-center gap-3">
              <button
                onClick={goToPrev}
                className="bg-black cursor-pointer hover:bg-gray-800 transition-colors duration-300 w-10 h-10 md:w-12 md:h-12 rounded flex items-center justify-center shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 transform hover:scale-105"
                aria-label="Previous slide"
              >
                <MoveLeft className="text-white w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="bg-black cursor-pointer hover:bg-gray-800 transition-colors duration-300 w-10 h-10 md:w-12 md:h-12 rounded flex items-center justify-center shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 transform hover:scale-105"
                aria-label="Next slide"
              >
                <MoveRight className="text-white w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="slider-container">
            {products?.length ? (
              <Slider ref={sliderRef} {...sliderSettings}>
                {products.map((product) => (
                  <div key={product._id} className="px-2 mb-10 group">
                    <div className="transform transition-transform duration-300 group-hover:scale-[1.02]">
                      <ProductCardTwo product={product} />
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCategory;
