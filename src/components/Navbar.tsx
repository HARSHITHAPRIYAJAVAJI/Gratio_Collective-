import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, Menu, Search, User, Heart, List, 
  ChevronUp, ChevronDown, ChevronRight, X, ArrowLeft 
} from "lucide-react";
import LocationSelector from "@/components/LocationSelector";
import { useFavorites } from "@/utils/favorites";
import { useCart } from "@/utils/cart";

interface NavbarProps {
  showBack?: boolean;
  backTo?: string;
  activeCategory?: string;
}

export const navLinks = [
  { to: "/women", label: "Women" },
  { to: "/men", label: "Men" },
  { to: "/children", label: "Kids" },
  { to: "/home-kitchen", label: "Home & Kitchen" },
  { to: "/beauty-health", label: "Beauty & Health" },
  { to: "/jewelry", label: "Jewelry & Accessories" },
  { to: "/bags", label: "Bags & Footwear" },
  { to: "/electronics", label: "Electronics" },
  { to: "/vintage", label: "Vintage" },
  { to: "/about", label: "About Us" },
];

export const allCategories = [
  { name: "Women's Fashion", link: "/women" },
  { name: "Men's Luxury & Watches", link: "/men" },
  { name: "Kids & Baby", link: "/children" },
  { name: "Designer Bags & Accessories", link: "/bags" },
  { name: "Fine Jewelry & Watches", link: "/jewelry" },
  { name: "Home, Kitchen & Decor", link: "/home-kitchen" },
  { name: "Beauty, Fragrance & Health", link: "/beauty-health" },
  { name: "Luxury Electronics & Audio", link: "/electronics" },
  { name: "Vintage & Rare Collectibles", link: "/vintage" },
  { name: "Footwear & Sneakers", link: "/footwear" },
];

const Navbar: React.FC<NavbarProps> = ({ showBack = false, backTo = "/" }) => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const favoritesCount = favorites.length;
  const { count: cartCount } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMobileMenu]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setShowMobileMenu(false);
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-yellow-300 text-center py-2 px-4">
        <p className="text-xs sm:text-sm font-medium text-black tracking-tight">
          Get 10% off with code <span className="font-bold">WELCOME10*</span>
        </p>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white shadow-xs border-b border-gray-100 sticky top-0 z-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          {/* Top Bar: Fluid, balanced layout */}
          <div className="flex items-center justify-between h-16 gap-3 sm:gap-4">
            {/* Left: Mobile Menu / Back Button + Brand Logo + Location */}
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              {showBack ? (
                <Link
                  to={backTo}
                  className="flex items-center space-x-1.5 text-xs sm:text-sm font-medium text-black hover:text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Back</span>
                </Link>
              ) : (
                <button
                  onClick={() => setShowMobileMenu(true)}
                  className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Open mobile menu"
                >
                  <Menu className="h-5 w-5 text-black" />
                </button>
              )}

              {/* Logo */}
              <Link to="/" className="flex items-center hover:opacity-90 transition-opacity flex-shrink-0">
                <img
                  src="/images/l.webp"
                  alt="Gratio Collective"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </Link>

              {/* Location Selector (Hidden on mobile header, available in mobile menu) */}
              <div className="hidden sm:block">
                <LocationSelector />
              </div>
            </div>

            {/* Center: Search Bar on Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-4">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for brands, luxury vintage, items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 bg-gray-50 hover:bg-gray-100/70 focus:bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-1.5 sm:space-x-3 flex-shrink-0">
              {/* Mobile Search Toggle */}
              <div className="md:hidden relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5 text-black" />
                </button>
                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 max-w-[calc(100vw-32px)] bg-white p-2.5 rounded-xl shadow-xl border border-gray-200 z-50">
                    <form onSubmit={handleSearch} className="relative">
                      <input
                        type="text"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-3 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        autoFocus
                      />
                      <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* Sell an item button */}
              <Link to="/sell" className="hidden sm:inline-flex">
                <Button className="bg-black text-white hover:bg-gray-800 rounded-md px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium transition whitespace-nowrap">
                  Sell an item
                </Button>
              </Link>

              {/* Sign In */}
              <Link
                to="/signin"
                className="text-xs sm:text-sm font-medium text-black hover:text-gray-600 transition-colors whitespace-nowrap hidden lg:inline-block"
              >
                Sign in
              </Link>

              {/* Favorites */}
              <Link
                to="/favorites"
                className="relative p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Favorites"
              >
                <Heart className="h-5 w-5 text-black cursor-pointer" />
                {favoritesCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center p-0 font-bold">
                    {favoritesCount}
                  </Badge>
                )}
              </Link>

              {/* Profile */}
              <Link
                to="/profile"
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors hidden sm:inline-flex"
                aria-label="Profile"
              >
                <User className="h-5 w-5 text-black cursor-pointer" />
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5 text-black cursor-pointer" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-black text-white text-[10px] rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center p-0 font-bold animate-in zoom-in duration-200">
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </div>
          </div>

          {/* Desktop Secondary Navigation with Browse Categories */}
          <div className="border-t border-gray-100 py-2.5 hidden md:block">
            <div className="flex items-center space-x-6">
              {/* Browse Categories Dropdown */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setShowCategories(!showCategories)}
                  className="flex items-center gap-2 bg-black text-white px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold shadow-xs hover:bg-gray-800 transition"
                >
                  <List className="h-4 w-4" />
                  Browse Categories
                  {showCategories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {showCategories && (
                  <div className="absolute left-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl grid grid-cols-1 gap-1 p-2.5 z-50">
                    {allCategories.map((cat, index) => (
                      <Link
                        key={index}
                        to={cat.link}
                        onClick={() => setShowCategories(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 text-xs sm:text-sm font-medium text-gray-700 hover:text-black transition-colors"
                      >
                        <span>{cat.name}</span>
                        <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="h-5 w-px bg-gray-200 flex-shrink-0" />

              {/* Category Links */}
              <div className="flex space-x-5 overflow-x-auto scrollbar-hide py-1 items-center flex-1">
                {navLinks.map((link, i) => (
                  <Link
                    key={i}
                    to={link.to}
                    className="text-xs sm:text-sm font-medium text-gray-700 hover:text-black whitespace-nowrap transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Slide-out Drawer (Fixed Full-Height Left Overlay) */}
        {showMobileMenu && (
          <div className="fixed inset-0 z-[100] flex">
            {/* Dark Backdrop Overlay */}
            <div 
              onClick={() => setShowMobileMenu(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
              aria-hidden="true"
            />

            {/* Slide-out Sidebar Content */}
            <div 
              className="relative z-50 w-[85vw] max-w-sm h-[100dvh] bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300 ease-out"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white flex-shrink-0">
                <Link to="/" onClick={() => setShowMobileMenu(false)}>
                  <img src="/images/l.webp" alt="Gratio Collective" className="h-8 w-auto object-contain" />
                </Link>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-black" />
                </button>
              </div>

              {/* Drawer Scrollable Body */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
                {/* Search in Drawer */}
                <form onSubmit={handleSearch} className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search brands, items, vintage..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <button type="submit" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search className="h-4 w-4" />
                  </button>
                </form>

                {/* Location in Drawer */}
                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                    Delivery Location
                  </span>
                  <LocationSelector />
                </div>

                {/* Sell an item button */}
                <Link to="/sell" onClick={() => setShowMobileMenu(false)} className="block">
                  <Button className="w-full bg-black text-white hover:bg-neutral-800 h-11 rounded-xl text-sm font-semibold shadow-sm">
                    + Sell an Item with Gratio
                  </Button>
                </Link>

                {/* Categories Navigation */}
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                    Collections & Departments
                  </span>
                  <div className="grid grid-cols-1 gap-1">
                    {allCategories.map((cat, index) => (
                      <Link
                        key={index}
                        to={cat.link}
                        onClick={() => setShowMobileMenu(false)}
                        className="text-sm font-medium text-gray-800 hover:text-black hover:bg-gray-50 px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between"
                      >
                        <span>{cat.name}</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </Link>
                    ))}
                    <Link
                      to="/about"
                      onClick={() => setShowMobileMenu(false)}
                      className="text-sm font-medium text-gray-800 hover:text-black hover:bg-gray-50 px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between"
                    >
                      <span>About Us</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </Link>
                  </div>
                </div>

                {/* Account & Shopping Quick Links */}
                <div className="pt-3 border-t border-gray-100 pb-6">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                    Account & Shopping
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/cart"
                      onClick={() => setShowMobileMenu(false)}
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 hover:bg-gray-50"
                    >
                      <ShoppingCart className="h-4 w-4 text-black" />
                      <span>Bag ({cartCount})</span>
                    </Link>
                    <Link
                      to="/favorites"
                      onClick={() => setShowMobileMenu(false)}
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 hover:bg-gray-50"
                    >
                      <Heart className="h-4 w-4 text-red-500" />
                      <span>Favorites ({favoritesCount})</span>
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setShowMobileMenu(false)}
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 hover:bg-gray-50"
                    >
                      <User className="h-4 w-4 text-gray-600" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/signin"
                      onClick={() => setShowMobileMenu(false)}
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 hover:bg-gray-50"
                    >
                      <User className="h-4 w-4 text-gray-600" />
                      <span>Sign In</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
