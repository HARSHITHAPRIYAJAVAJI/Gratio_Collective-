import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="w-full bg-black text-white py-6 sm:py-8 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-playfair font-bold tracking-widest uppercase mb-2 text-white">
          Premium Marketplace
        </h2>
        <p className="text-sm sm:text-base font-medium text-gray-200 mb-2.5 tracking-wide">
          • Be Unique • Be Amazing • Be You •
        </p>
        <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
          Discover extraordinary products that define luxury and elegance. Experience premium shopping with curated collections from trusted artisans.
        </p>
      </div>
    </section>
  );
};

export default Hero;
