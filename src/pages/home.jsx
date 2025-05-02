import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { Button } from "@/components/ui/button";
import Testimonials from "../components/home/Testimonials";
import Blog from "../components/home/Blog";
import HomeCategory from "../components/home/homeCategory";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productSlice";
import Spinner from "../components/loaders/Spinner";

const categories = [
  {
    name: "Hand Tufted",
    image: "/images/hand-tufted.webp",
    link: "/categories/hand-tufted",
  },
  {
    name: "Hand Knotted",
    image: "/images/hand-knotted.webp",
    link: "/categories/hand-knotted",
  },
  {
    name: "Hand Woven",
    image: "/images/hand-woven.webp",
    link: "/categories/hand-woven",
  },
];

const slides = [
  "/images/banner/home_page_banner_1_1.webp",
  "/images/banner/home_page_banner_2_2.webp",
  "/images/banner/home_page_banner_3_3.webp",
];

export default function Home() {
  const { products, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }
  
  return (
    // Add pt-24 to add padding for the fixed header
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000 }}
        className="w-full h-[400px] md:h-[500px] lg:h-[600px]"
      >
        {slides.map((image, index) => (
          <SwiperSlide
            key={index}
            className="relative bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-4">
              <Button className="mt-4 bg-white text-black px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 cursor-pointer">
                Shop Now
              </Button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-12 xl:px-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
          Explore Our Categories
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link to={category.link} key={index} className="w-full">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-100 sm:h-64 lg:h-100 object-center rounded-4xl"
              />
            </Link>
          ))}
        </div>
      </div>
      <HomeCategory
        title="Floral Rug"
        products={products.filter((product) => product?.category?.slug === "floral-rug")}
      />
      <HomeCategory
        title="Modern Rug"
        products={products.filter((product) => product?.category?.slug === "modern-rug")}
      />
      <HomeCategory
        title="Oushak Rug"
        products={products.filter((product) => product?.category?.slug === "oushak-rug")}
      />
      <Testimonials />
      <Blog />
    </div>
  );
}
