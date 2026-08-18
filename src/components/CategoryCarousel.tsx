import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const CategoryCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      title: "Women's Collection",
      subtitle: "Discover luxury fashion for women",
      image: "/images/h.webp",
      link: "/women",
      bgColor: "bg-rose-100"
    },
    {
      id: 2,
      title: "Men's Collection",
      subtitle: "Premium menswear and accessories",
      image: "/images/hero1.webp",
      link: "/men",
      bgColor: "bg-blue-100"
    },
    {
      id: 3,
      title: "Children's Style",
      subtitle: "Adorable fashion for little ones",
      image: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=800&h=500&fit=crop&crop=center&auto=format&q=75",
      link: "/children",
      bgColor: "bg-yellow-100"
    },
    {
      id: 4,
      title: "Luxury Bags",
      subtitle: "Designer handbags and accessories",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=500&fit=crop&crop=center&auto=format&q=75",
      link: "/bags",
      bgColor: "bg-purple-100"
    },
    {
      id: 5,
      title: "Premium Jewelry",
      subtitle: "Exquisite jewelry and timepieces",
      image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=500&fit=crop&crop=center&auto=format&q=75",
      link: "/jewelry",
      bgColor: "bg-amber-100"
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
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 mt-6 mb-12">
      <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-md">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 transform translate-x-0'
                : index < currentSlide
                ? 'opacity-0 transform -translate-x-full'
                : 'opacity-0 transform translate-x-full'
            }`}
          >
            <Link to={slide.link} className="block h-full">
              <div className={`${slide.bgColor} h-full relative overflow-hidden group cursor-pointer`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                  {/* Left side - Content */}
                  <div className="flex flex-col justify-center p-8 lg:p-12 z-10 relative">
                    <h2 className="text-4xl lg:text-6xl font-playfair font-bold text-black mb-4 group-hover:transform group-hover:translate-x-2 transition-transform duration-300">
                      {slide.title}
                    </h2>
                    <p className="text-lg lg:text-xl text-gray-700 mb-6 group-hover:transform group-hover:translate-x-2 transition-transform duration-300 delay-75">
                      {slide.subtitle}
                    </p>
                    <div className="inline-flex items-center text-black font-medium group-hover:transform group-hover:translate-x-2 transition-transform duration-300 delay-150">
                      <span className="mr-2">Shop Now</span>
                      <ChevronRight className="h-5 w-5 group-hover:transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  {/* Right side - Image */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={slide.image}
                      alt={slide.title}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-all duration-300"></div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200 z-20 shadow-lg"
        >
          <ChevronLeft className="h-6 w-6 text-black" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200 z-20 shadow-lg"
        >
          <ChevronRight className="h-6 w-6 text-black" />
        </button>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-white scale-110' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryCarousel;