import { Link } from "react-router-dom";
import HandloomBreadcrumb from "../components/layout/breadcrumb";
import { Scissors, Package2, Trophy, Truck, Heart, ChevronRight } from "lucide-react";

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
const AboutUs = () => {
  return (
    <div className="font-sans bg-stone-50 text-stone-800 pt-10">
      {/* Breadcrumb */}
      <HandloomBreadcrumb category="About Us" />

      <div className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-16">
          {/* <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1> */}
          <p className="text-lg mb-6 leading-relaxed">
            We are a brand that believes in the power of handmade, and we're committed to
            creating products that are unique, beautiful, and made with love by hand.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <img
              src="/images/about/about-image.jpg"
              alt="Artisan weaving a rug"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="mb-4 leading-relaxed">
              Ibrahim Rugs is based out in Jaunpur which is known as Carpet City, Uttar
              Pradesh, India. We offer an assortment of carpets and rugs online for the
              ease of our customers. We are inspired by our appreciation for weaving. We
              are characterized by the Indian legacy and global aesthetics and offer
              timeless products for modern interiors.
            </p>
            <p className="leading-relaxed">
              It's our family business that has been making handmade carpets and rugs
              since 1989. We take pride in our craftsmanship and only use the highest
              quality materials to create our products. Our carpets and rugs are available
              in a wide range of colors, patterns, and sizes to suit any home or office
              space. Whether you're looking for a traditional or contemporary design, we
              have something to match your style.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <Scissors size={36} className="text-stone-700" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Craftsmanship</h3>
            <p>
              Every rug is meticulously handcrafted using techniques passed down through
              generations.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <Package2 size={36} className="text-stone-700" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Materials</h3>
            <p>
              We source only the finest materials to ensure our rugs are beautiful and
              long-lasting.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <Heart size={36} className="text-stone-700" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Heritage</h3>
            <p>
              We preserve traditional craftsmanship while evolving with contemporary
              design sensibilities.
            </p>
          </div>
        </div>

        {/* Heritage Section */}
        <div className="bg-stone-100 p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-semibold mb-4">
            Preserving Heritage Through Craftsmanship
          </h2>
          <p className="mb-4 leading-relaxed">
            Our rugs help in keeping the traditional craftsman heritage alive. Our carpets
            are hand-made to achieve magnificence and perfect quality that vows to improve
            with age in the long run. Each intricate knot of the carpet and weave is a
            motion of patience, respecting the crude integrity of the natural materials
            and a feasible custom of old processes.
          </p>
          <p className="leading-relaxed">
            This meticulous craftsmanship brings about a credible carpet with the rigor to
            go with you through the minutes that matter, for generations. With our fast
            delivery service, you will have your new carpet in no time, and as with all
            Ibrahim Rugs products, you know you're getting the absolute best in quality.
          </p>
        </div>

        {/* Commitment to Service */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
          <p className="mb-6 leading-relaxed">
            We are committed to providing our customers with the best possible service.
            Our team of experts are always on hand to answer any questions you may have
            about our products or the order process.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Trophy size={36} className="text-stone-700" />
              </div>
              <h3 className="font-semibold mb-2">Exceptional Quality</h3>
              <p className="text-sm">
                Each piece is a testament to our commitment to excellence
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Truck size={36} className="text-stone-700" />
              </div>
              <h3 className="font-semibold mb-2">Fast Delivery</h3>
              <p className="text-sm">
                Efficient shipping to bring our art to your doorstep
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Heart size={36} className="text-stone-700" />
              </div>
              <h3 className="font-semibold mb-2">Customer Satisfaction</h3>
              <p className="text-sm">Your happiness is our ultimate goal</p>
            </div>
          </div>
        </div>

        {/* Product Range */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Our Collection</h2>
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

        {/* Final Call to Action */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">
            Experience Authentic Craftsmanship
          </h2>
          <p className="mb-6 leading-relaxed">
            Our online showcase features a range of Indian carpets from leading weavers.
            Buy a carpet that fits with the interior of your home or office and matches
            the furniture and decor. Your new interior decoration will bring warmth and
            vibrancy to any room and is sure to be a showpiece in any room.
          </p>
          <p className="mb-6 leading-relaxed">
            Each of our Indian carpets is unique, and a range of sizes is available to
            meet your specifications. Altogether, you must know that you are purchasing an
            authentic piece of rug for your home or office that will be admired for
            generations to come.
          </p>
          <button className="bg-stone-800 hover:bg-stone-700 text-white font-semibold py-3 px-8 rounded-lg transition">
            <Link to="/"> Explore Our Collection</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
