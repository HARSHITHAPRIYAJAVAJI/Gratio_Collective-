import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const CategoryCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      title: "Women's Collection",
      subtitle: "Discover curated luxury fashion & vintage designer silhouettes",
      image: "/images/h.webp",
      link: "/women",
      bgColor: "bg-rose-100/70"
    },
    {
      id: 2,
      title: "Men's Collection",
      subtitle: "Premium menswear, sartorial tailoring, and collector timepieces",
      image: "/images/hero1.webp",
      link: "/men",
      bgColor: "bg-blue-100/70"
    },
    {
      id: 3,
      title: "Children's Style",
      subtitle: "Adorable curated fashion for little luxury connoisseurs",
      image: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=800&h=500&fit=crop&crop=center&auto=format&q=75",
      link: "/children",
      bgColor: "bg-yellow-100/70"
    },
    {
      id: 4,
      title: "Luxury Bags",
      subtitle: "Authenticated designer handbags, clutches, and leather goods",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=500&fit=crop&crop=center&auto=format&q=75",
      link: "/bags",
      bgColor: "bg-purple-100/70"
    },
    {
      id: 5,
      title: "Premium Jewelry",
      subtitle: "Exquisite high jewelry, fine gold, and authenticated watches",
      image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=500&fit=crop&crop=center&auto=format&q=75",
      link: "/jewelry",
      bgColor: "bg-amber-100/70"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 mt-4 sm:mt-6 mb-8 sm:mb-12">
      <div className="relative h-[440px] sm:h-[480px] lg:h-[500px] rounded-2xl overflow-hidden shadow-md bg-white border border-neutral-200">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 transform translate-x-0 pointer-events-auto'
                : index < currentSlide
                ? 'opacity-0 transform -translate-x-full pointer-events-none'
                : 'opacity-0 transform translate-x-full pointer-events-none'
            }`}
          >
            <Link to={slide.link} className="block h-full">
              <div className={`${slide.bgColor} h-full relative overflow-hidden group cursor-pointer`}>
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  {/* Left side - Content */}
                  <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14 z-10 relative order-2 md:order-1 pb-16 md:pb-14">
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-playfair font-bold text-black mb-2 sm:mb-4 group-hover:transform group-hover:translate-x-2 transition-transform duration-300">
                      {slide.title}
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-neutral-700 mb-4 sm:mb-6 max-w-md group-hover:transform group-hover:translate-x-2 transition-transform duration-300 delay-75">
                      {slide.subtitle}
                    </p>
                    <div className="inline-flex items-center text-black font-semibold text-xs sm:text-sm group-hover:transform group-hover:translate-x-2 transition-transform duration-300 delay-150">
                      <span className="mr-1.5 border-b border-black pb-0.5">Explore Department</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  {/* Right side - Image */}
                  <div className="relative h-48 sm:h-64 md:h-full w-full overflow-hidden order-1 md:order-2">
                    <img 
                      src={slide.image}
                      alt={slide.title}
                      loading={index === 0 ? "eager" : "lazy"}
                      {...(index === 0 ? ({ fetchpriority: "high" } as any) : {})}
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-300"></div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.preventDefault();
            prevSlide();
          }}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black rounded-full w-10 h-10 items-center justify-center transition-all duration-200 z-20 shadow-md hover:scale-105 border border-gray-200"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 text-black" />
        </button>
        
        <button
          onClick={(e) => {
            e.preventDefault();
            nextSlide();
          }}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black rounded-full w-10 h-10 items-center justify-center transition-all duration-200 z-20 shadow-md hover:scale-105 border border-gray-200"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 text-black" />
        </button>

        {/* Slide Indicators (Cleanly aligned under the text on the left, not overlapping photos) */}
        <div className="absolute bottom-5 left-6 sm:left-10 lg:left-14 flex items-center space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                setCurrentSlide(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-black' 
                  : 'w-2 bg-black/30 hover:bg-black/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;