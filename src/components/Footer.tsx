import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 font-playfair w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center justify-center mb-10 pb-8 border-b border-gray-800 text-center">
          <Link to="/" className="inline-block bg-white px-5 py-2.5 rounded-xl shadow-md hover:opacity-95 transition-opacity">
            <img
              src="/images/l.png"
              alt="Gratio Collective"
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </Link>
          <p className="mt-3 text-sm text-gray-400 font-inter max-w-md">
            The premier authenticated marketplace for curated luxury vintage, pre-loved fashion, and rare collectibles.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-300">OUR SERVICES</h3>
            <ul className="space-y-2 text-sm font-inter">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our concept</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Concierge Service</a></li>
            </ul>
          </div>

          {/* Buy */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-300">BUY</h3>
            <ul className="space-y-2 text-sm font-inter">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Order tracking</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our authentication service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns policy</a></li>
            </ul>
          </div>

          {/* Sell */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-300">SELL</h3>
            <ul className="space-y-2 text-sm font-inter">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">How to sell</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our selling advice</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sell an item</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Professional Seller Service</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-300">HELP</h3>
            <ul className="space-y-2 text-sm font-inter">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Impact Report</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Join the team</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Fashion stories</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-sm text-gray-400 font-inter">🇺🇸 United States ($ USD) • English US</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 sm:space-x-6 text-sm text-gray-400 font-inter">
              <a href="#" className="hover:text-white transition-colors">Accessibility Statement</a>
              <a href="#" className="hover:text-white transition-colors">Legal Information</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy & Cookies</a>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400 font-inter">
              © {new Date().getFullYear()} Gratio Collective. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
