import React from 'react';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Benefits of buying Handloom Carpets",
      date: "Jan 02, 2024",
      comments: 0,
      author: "Ibrahim Rugs",
      excerpt: "In a world dominated by mass production and mechanization, the allure of handcrafted goods has never been more appealing. Handloom carpets, with their intricate designs and timeless charm, stand as a testament to the beauty and benefits ...",
      image: "https://www.ridahandloom.com/cdn/shop/articles/Obeetee_Carpets-_5_handmade_best_sellers_to_bring_home_900x_a0229032-7139-4216-bcc2-47f1cbca4383_1512x.webp?v=1704191575",
    },
    {
      id: 2,
      title: "Expert Tips on Selecting Hand-Tufted Modern Area Rugs for...",
      date: "Aug 29, 2023",
      comments: 0,
      author: "Ibrahim Rugs",
      excerpt: "Hand-Tufted Modern Area Rugs Guide Introduction: When it comes to interior design, the right rug can be the cornerstone of a well-curated space. In this guide, we will delve into the world of hand-tufted modern area rugs, exploring every...",
      image: "https://www.ridahandloom.com/cdn/shop/articles/photo-1594040226829-7f251ab46d80_1_900x.jpg?v=1703793550",
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-2">Blogs</h1>
        <p className="text-xl text-gray-600">Explore more about Handloom Craft</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {blogPosts.map((post) => (
          <div key={post.id} className="flex flex-col">
            <div className="relative mb-4">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-64 object-cover rounded-md"
              />
            </div>
            
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span>{post.date}</span>
              <span className="mx-2">-</span>
              <span>{post.comments} Comments</span>
              <span className="mx-2">-</span>
              <span>By {post.author}</span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{post.title}</h2>
            
            <div className="mb-4 flex justify-center">
              <div className="w-24 h-px bg-gray-300"></div>
            </div>
            
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            
            <div className="mt-auto">
              <button className="border border-green-700 text-green-700 px-6 py-2 rounded hover:bg-green-700 hover:text-white transition-colors duration-300">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}