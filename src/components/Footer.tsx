import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 font-playfair w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-300">OUR SERVICES</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">Our concept</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Concierge Service</a></li>
            </ul>
          </div>

          {/* Buy */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-300">BUY</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">Order tracking</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Our authentication service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Returns policy</a></li>
            </ul>
          </div>

          {/* Sell */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-300">SELL</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">How to sell</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Our selling advice</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Sell an item</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Professional Seller Service</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-300">HELP</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Impact Report</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Join the team</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Fashion stories</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-sm text-gray-400">🇺🇸 United States ($ USD) • English US</span>
            </div>
            
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white">Accessibility Statement</a>
              <a href="#" className="hover:text-white">Legal Information</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Privacy Policy & Cookies</a>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              © 2024 Graito Collective. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
