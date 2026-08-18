import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-14 pb-10 font-playfair w-full border-t border-neutral-900">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Main Grid: Left Brand Column + 4 Link Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-neutral-800">
          
          {/* Brand Column (Placed on the left of OUR SERVICES) */}
          <div className="lg:col-span-4 space-y-4 pr-0 lg:pr-6">
            <Link to="/" className="inline-block bg-white px-4 py-2 rounded-xl shadow-sm hover:opacity-95 transition-opacity">
              <img
                src="/images/l.webp"
                alt="Gratio Collective"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-gray-400 font-inter leading-relaxed max-w-sm">
              The premier authenticated marketplace for curated luxury vintage, pre-loved fashion, and rare collectibles.
            </p>
            <div className="pt-1 text-xs text-gray-400 font-inter flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>100% Authenticity Guaranteed</span>
            </div>
          </div>

          {/* Column 1: OUR SERVICES */}
          <div className="lg:col-span-2">
            <h3 className="text-xs sm:text-sm font-bold tracking-wider mb-4 text-gray-200 uppercase font-inter">
              Our Services
            </h3>
            <ul className="space-y-2.5 text-sm font-inter">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">Our concept</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Concierge Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Authentication</a></li>
            </ul>
          </div>

          {/* Column 2: BUY */}
          <div className="lg:col-span-2">
            <h3 className="text-xs sm:text-sm font-bold tracking-wider mb-4 text-gray-200 uppercase font-inter">
              Buy
            </h3>
            <ul className="space-y-2.5 text-sm font-inter">
              <li><Link to="/women" className="text-gray-400 hover:text-white transition-colors">Women's Collection</Link></li>
              <li><Link to="/men" className="text-gray-400 hover:text-white transition-colors">Men's Collection</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Order tracking</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns policy</a></li>
            </ul>
          </div>

          {/* Column 3: SELL */}
          <div className="lg:col-span-2">
            <h3 className="text-xs sm:text-sm font-bold tracking-wider mb-4 text-gray-200 uppercase font-inter">
              Sell
            </h3>
            <ul className="space-y-2.5 text-sm font-inter">
              <li><Link to="/sell" className="text-gray-400 hover:text-white transition-colors">Sell an item</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">How to sell</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Selling advice</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pro Seller Service</a></li>
            </ul>
          </div>

          {/* Column 4: HELP */}
          <div className="lg:col-span-2">
            <h3 className="text-xs sm:text-sm font-bold tracking-wider mb-4 text-gray-200 uppercase font-inter">
              Help
            </h3>
            <ul className="space-y-2.5 text-sm font-inter">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Impact Report</a></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Country / Currency, Legal Links, Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 font-inter">
            <span>🇺🇸 United States ($ USD) • English US</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400 font-inter">
            <a href="#" className="hover:text-white transition-colors">Accessibility Statement</a>
            <a href="#" className="hover:text-white transition-colors">Legal Information</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy & Cookies</a>
          </div>

          <div className="text-xs sm:text-sm text-gray-500 font-inter">
            © {new Date().getFullYear()} Gratio Collective. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
