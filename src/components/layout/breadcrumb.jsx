import React from "react";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumb = ({ items = [], category }) => {
  return (
    <div className="bg-stone-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#1e213b] mb-4">
          {category === "All" ? "All Products" : `${category?.replace("-", " ")}`}
        </h1>

        <nav aria-label="Breadcrumb">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li className="flex items-center">
              <a
                href="/"
                className="flex items-center text-[#5b5b5b] hover:text-[#1e213b] transition-colors duration-200"
              >
                <span>Home</span>
              </a>
            </li>

            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                <ChevronRight size={12} className="mx-2 text-[#5b5b5b]" />
                {index === items.length - 1 ? (
                  <span className="font-medium text-[#1e213b]">{item.label}</span>
                ) : (
                  <a
                    href={item.href}
                    className="text-[#5b5b5b] hover:text-[#1e213b] transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

// Example usage component
const HandloomBreadcrumb = ({ category }) => {
  let breadcrumbItems = [
    { label: category, href: `/about` },
  ];
  if (!category === "About") {
    breadcrumbItems = [
      { label: "Categories", href: `/categories` },
      { label: category, href: `/categories/${category}` },
    ];
  }

  return <Breadcrumb items={breadcrumbItems} category={category} />;
};

export default HandloomBreadcrumb;
