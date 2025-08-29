import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const Features: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories = [
    {
      title: "WOMEN",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop&crop=center",
      link: "/women",
      subcategories: ["Dresses", "Tops", "Jackets", "Pants", "Skirts", "Shoes", "Bags"]
    },
    {
      title: "MEN", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=center",
      link: "/men",
      subcategories: ["Shirts", "Suits", "Casual Wear", "Shoes", "Accessories", "Watches"]
    },
    {
      title: "CHILDREN",
      image: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=300&h=300&fit=crop&crop=center",
      link: "/children",
      subcategories: ["Boys", "Girls", "Baby", "Shoes", "Toys", "School Wear"]
    },
    {
      title: "BAGS",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop&crop=center",
      link: "/bags",
      subcategories: ["Handbags", "Backpacks", "Clutches", "Totes", "Shoulder Bags", "Travel Bags"]
    },
    {
      title: "JEWELRY",
      image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=300&h=300&fit=crop&crop=center",
      link: "/jewelry",
      subcategories: ["Necklaces", "Rings", "Earrings", "Bracelets", "Watches", "Fine Jewelry"]
    },
    {
      title: "HOME & KITCHEN",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop&crop=center",
      link: "/home-kitchen",
      subcategories: ["Furniture", "Decor", "Kitchen", "Bedding", "Lighting", "Storage"]
    },
    {
      title: "BEAUTY & HEALTH",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&crop=center",
      link: "/beauty-health",
      subcategories: ["Skincare", "Makeup", "Hair Care", "Fragrances", "Health", "Wellness"]
    },
    {
      title: "ELECTRONICS",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=300&fit=crop&crop=center",
      link: "/electronics",
      subcategories: ["Phones", "Laptops", "Audio", "Gaming", "Smart Home", "Accessories"]
    }
  ];

  const toggleCategory = (title: string) => {
    setExpandedCategory(expandedCategory === title ? null : title);
  };

  return (
    <section className="py-5 sm:py-1 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-playfair font-bold text-black mb-6 sm:mb-8">Shop by Category</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <div key={index} className="group">
              <Link to={category.link}>
                <div className="cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-2 sm:mb-3">
                    <img 
                      src={category.image}
                      alt={category.title}
                      className="w-full h-32 sm:h-40 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs sm:text-sm font-medium text-black tracking-wide">
                      {category.title}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleCategory(category.title);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronDown 
                        className={`h-3 w-3 sm:h-4 sm:w-4 text-gray-600 transition-transform ${
                          expandedCategory === category.title ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                  </div>
                </div>
              </Link>
              
              {expandedCategory === category.title && (
                <div className="mt-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 gap-1">
                    {category.subcategories.map((sub, subIndex) => (
                      <Link
                        key={subIndex}
                        to={`${category.link}?subcategory=${sub.toLowerCase()}`}
                        className="text-xs text-gray-600 hover:text-black transition-colors py-1"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;