import React from "react";

const TestimonialCard = ({ avatar, name, location, rating, title, review, verified }) => {
  return (
    <div className="flex flex-col p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
      <div className="flex items-start mb-4">
        <div className="flex-shrink-0 mr-4">
          <img src={avatar} alt={name} className="w-16 h-16 rounded-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="text-lg font-semibold">{name}</div>
          {verified && (
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-5 h-5 mr-1 bg-blue-500 text-white rounded-full flex items-center justify-center">
                ✓
              </span>
              {location}
            </div>
          )}
        </div>
      </div>

      <div className="mb-2">
        <div className="mb-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-xl text-yellow-400">
              {i < Math.floor(rating) ? "★" : "☆"}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
      </div>

      <div className="text-gray-600 italic mb-4">"{review}"</div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      avatar:
        "https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png",
      name: "Zoe Biden",
      verified: true,
      location: "Hoe Designs",
      rating: 4,
      title: "Highly recommended",
      review:
        "I am very happy with the product that I ordered and received. The rug is of great quality. It's beautiful and the material is also very nice. I highly recommend this seller. I am very happy with the craftsmanship of the rug. Highly Recommend!!!",
    },
    {
      id: 2,
      avatar:
        "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png",
      name: "Harry Wood",
      verified: true,
      location: "Birmingham, UK",
      rating: 5,
      title: "Received on time",
      review:
        "Nice product and same as shown in the pic. Received product on time during this covid situation. The picture shown on the website does less justice to the actual product. The rug is much more beautiful than shown on the picture.",
    },
    {
      id: 3,
      avatar:
        "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001884.png",
      name: "Simon Paul",
      verified: true,
      location: "Houston, USA",
      rating: 4,
      title: "Perfect Collection",
      review:
        "Very good collection if carpets. The owner is extremely oriented towards quality and customer care. I am very happy with the product delivered.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between">
        <div className="w-full text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Testimonials</h2>
          <p className="text-gray-600">See what our customers have to say</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="relative">
            <div className="absolute -top-4 left-8 text-green-700 text-4xl">"</div>
            <TestimonialCard {...testimonial} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
