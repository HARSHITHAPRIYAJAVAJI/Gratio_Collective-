import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-12 font-playfair w-full border-t border-neutral-900">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Main Grid: Left Brand Column + 4 Link Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-neutral-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4 pr-0 lg:pr-6">
            <Link to="/" className="inline-block group">
              <span className="text-2xl sm:text-3xl font-bold font-playfair tracking-wider uppercase text-white group-hover:text-yellow-400 transition-colors">
                Gratio Collective
              </span>
            </Link>
            <p className="text-base text-gray-300 font-inter leading-relaxed max-w-sm">
              The premier authenticated marketplace for curated luxury vintage, pre-loved fashion, and rare collectibles.
            </p>
            <div className="pt-1 text-sm text-gray-300 font-inter flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="font-medium">100% Authenticity Guaranteed</span>
            </div>
          </div>

          {/* Column 1: OUR SERVICES */}
          <div className="lg:col-span-2">
            <h3 className="text-sm sm:text-base font-bold tracking-wider mb-4 text-white uppercase font-inter">
              Our Services
            </h3>
            <ul className="space-y-3 text-[15px] sm:text-base font-inter">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">Our concept</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Concierge Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Authentication</a></li>
            </ul>
          </div>

          {/* Column 2: BUY */}
          <div className="lg:col-span-2">
            <h3 className="text-sm sm:text-base font-bold tracking-wider mb-4 text-white uppercase font-inter">
              Buy
            </h3>
            <ul className="space-y-3 text-[15px] sm:text-base font-inter">
              <li><Link to="/women" className="text-gray-300 hover:text-white transition-colors">Women's Collection</Link></li>
              <li><Link to="/men" className="text-gray-300 hover:text-white transition-colors">Men's Collection</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Order tracking</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Returns policy</a></li>
            </ul>
          </div>

          {/* Column 3: SELL */}
          <div className="lg:col-span-2">
            <h3 className="text-sm sm:text-base font-bold tracking-wider mb-4 text-white uppercase font-inter">
              Sell
            </h3>
            <ul className="space-y-3 text-[15px] sm:text-base font-inter">
              <li><Link to="/sell" className="text-gray-300 hover:text-white transition-colors">Sell an item</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">How to sell</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Selling advice</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pro Seller Service</a></li>
            </ul>
          </div>

          {/* Column 4: HELP */}
          <div className="lg:col-span-2">
            <h3 className="text-sm sm:text-base font-bold tracking-wider mb-4 text-white uppercase font-inter">
              Help
            </h3>
            <ul className="space-y-3 text-[15px] sm:text-base font-inter">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Impact Report</a></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Country / Currency, Legal Links, Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2 text-sm text-gray-300 font-inter">
            <span>🇺🇸 United States ($ USD) • English US</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-5 sm:gap-7 text-sm text-gray-300 font-inter">
            <a href="#" className="hover:text-white transition-colors">Accessibility Statement</a>
            <a href="#" className="hover:text-white transition-colors">Legal Information</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy & Cookies</a>
          </div>

          <div className="text-sm text-gray-400 font-inter">
            © {new Date().getFullYear()} Gratio Collective. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
