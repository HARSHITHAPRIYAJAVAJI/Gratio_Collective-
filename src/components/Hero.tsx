import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    img: "/images/graito-collective.jpg",
    title: "Best of Graito Collective",
    description: "Ready to ship from our warehouse.",
    cta: "Shop up to 70% off",
  },
  {
    img: "/images/h2.jpeg",
    title: "Timeless Elegance",
    description: "Discover luxury pre-owned fashion.",
    cta: "Explore Collection",
  },
  {
    img: "/images/h.jpeg",
    title: "Summer Essentials",
    description: "Styles for the modern wardrobe.",
    cta: "Shop the Looks",
  },
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const { img, title, description, cta } = slides[currentSlide];

  return (
    <div className="relative">
      {/* Premium Marketplace Banner */}
      <div className="bg-black text-white px-4 py-3 sm:px-6 sm:py-3 mx-2 sm:mx-4 mt-4 rounded-lg">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl font-bold tracking-wide uppercase mb-2">
        Premium Marketplace
          </h3>
          <p className="text-lg sm:text-xl font-semibold mb-1">
           • Be Unique • Be Amazing • Be You •
          </p>
          <p className="text-xs sm:text-sm text-gray-300 mb-6 max-w-2xl mx-auto">
            Discover extraordinary products that define luxury and elegance. Experience premium shopping with curated collections from trusted artisans.
          </p>
        </div>
      </div>

      {/* Auto-Changing Hero Section */}
      <section className="relative mx-2 sm:mx-4 mt-4 rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 transition-all duration-700 ease-in-out">
          

          
        </div>
      </section>

      {/* Second Static Hero Section */}
      <section className="relative mx-2 sm:mx-4 mt-4 rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Add content here if needed */}
        </div>
      </section>
    </div>
  );
};

export default Hero;
