import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Menu, Search, User, Heart, List, ChevronUp, ChevronDown, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TrustSection from "@/components/TrustSection";
import AntiqueSection from "@/components/AntiqueSection";
import Footer from "@/components/Footer";
import WelcomeModal from "@/components/WelcomeModal";
import CategoryCarousel from "@/components/CategoryCarousel";
import LocationSelector from "@/components/LocationSelector";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ChatAssistant from "@/components/ChatAssistant";
// Define navigation links for both desktop and mobile menus
const navLinks = [
  { to: "/women", label: "Women" },
  { to: "/men", label: "Men" },
  { to: "/children", label: "Kids" },
  { to: "/home-kitchen", label: "Home & Kitchen" },
  { to: "/beauty", label: "Beauty & Health" },
  { to: "/jewelry", label: "Jewelry & Accessories" },
  { to: "/bags", label: "Bags & Footwear" },
  { to: "/electronics", label: "Electronics" },
  { to: "/sports-fitness", label: "Sports & Fitness", className: "text-red-500 hover:text-red-600" },
  { to: "/car-motorbike", label: "Car & Motorbike" },
  { to: "/office-supplies", label: "Office Supplies & Stationery" },
  { to: "/pet-supplies", label: "Pet Supplies" },
  { to: "/musical-instruments", label: "Musical Instruments" },
  { to: "/books", label: "Books" },
  { to: "/about", label: "About Us" }, 
  { to: "/sale", label: "Sale", className: "text-red-500 hover:text-red-600" },
  { to: "/new-arrivals", label: "New Arrivals" }, 
  { to: "/designers", label: "Designers" }, 
  { to: "/vintage", label: "Vintage" },
];

// Define categories for the "Browse All Categories" section
const categories = navLinks.map(link => link.label);

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false); // Renamed from isMobileMenuOpen for consistency with second code
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show welcome modal on first visit
    const hasVisited = localStorage.getItem('hasVisitedGraito');
    if (!hasVisited) {
      setShowWelcomeModal(true);
      localStorage.setItem('hasVisitedGraito', 'true');
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false); // Close search bar after search
      setShowMobileMenu(false); // Close mobile menu after search
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Renamed from toggleMobileMenu for consistency
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
      />

      {/* Top Banner */}
      <div className="bg-yellow-300 text-center py-2">
        <p className="text-xs sm:text-sm font-medium text-black">Get 10% off with code WELCOME10*</p>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Mobile menu, Location, and Search */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5 text-black" />
              </button>

              {/* Location Selector */}
              <LocationSelector />

              {/* Search icon (for mobile/tablet) */}
              <button
                onClick={toggleSearch}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors md:hidden" // Hide on desktop, desktop search is on right
              >
                <Search className="h-5 w-5 text-black" />
              </button>

              {/* Expandable Search Bar (for mobile/tablet) */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
                isSearchOpen ? 'w-48 sm:w-80 opacity-100' : 'w-0 opacity-0'
              }`}>
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search by brand, item..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-10 py-2 bg-gray-50 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </form>
              </div>
            </div>

            {/* Logo */}
            <div className="flex items-center">
              <span className="text-lg sm:text-2xl font-playfair font-bold text-black">
                Graito Collective
              </span>
            </div>

            {/* Right side actions (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search icon + Expandable input (Desktop) */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleSearch}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Search className="h-5 w-5 text-black" />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isSearchOpen ? 'w-80 opacity-100' : 'w-0 opacity-0'
                }`}>
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      placeholder="Search by brand, item..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-4 pr-10 py-2 bg-gray-50 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </form>
                </div>
              </div>
              {/* Sell an item button */}
              <Link to="/sell">
                <Button className="bg-black text-white hover:bg-gray-800 rounded-none px-4 py-2 text-sm">
                  Sell an item
                </Button>
              </Link>
              {/* Sign In */}
              <Link to="/signin" className="text-sm font-medium text-black hover:text-gray-600">
                Sign in
              </Link>
              {/* Favorites */}
              <Link to="/favorites" className="relative">
                <Heart className="h-5 w-5 text-black cursor-pointer" />
                {Number(localStorage.getItem("favoritesCount") || 0) > 0 && ( // Handle potential null/undefined
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {localStorage.getItem("favoritesCount")}
                  </Badge>
                )}
              </Link>
              {/* Profile */}
              <Link to="/profile">
                <User className="h-5 w-5 text-black cursor-pointer" />
              </Link>
              {/* Cart */}
              <Link to="/cart"> {/* Added link to cart */}
                <div className="relative">
                  <ShoppingCart className="h-5 w-5 text-black cursor-pointer" />
                  <Badge className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </Badge>
                </div>
              </Link>
            </div>
          </div>

          {/* Desktop Secondary Navigation */}
          <div className="border-t border-gray-100 py-3 overflow-hidden hidden md:block">
            <div className="flex space-x-6 px-4 overflow-x-auto scrollbar-hide">
              {navLinks.map((link, i) =>
                link.to.startsWith("/") ? (
                  <Link
                    key={i}
                    to={link.to}
                    className={`text-sm font-medium text-black whitespace-nowrap hover:text-gray-600 ${link.className || ""}`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={i}
                    href={link.to}
                    className={`text-sm font-medium text-black whitespace-nowrap hover:text-gray-600 ${link.className || ""}`}
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Desktop Browse Categories Button */}
          <div className="mt-3 px-2 hidden md:block">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-gray-800 transition"
            >
              <List className="h-5 w-5" />
              Browse All Categories
              {showCategories ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {showCategories && (
              <div className="mt-2 w-full max-w-md bg-white border border-gray-200 rounded-md shadow-lg grid grid-cols-2 gap-2 p-4">
                {categories.map((category, index) => (
                  <div
                    key={`desktop-category-${category}-${index}`}
                    className="flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 cursor-pointer text-sm font-medium text-gray-700"
                  >
                    <span>{category}</span>
                    <span className="bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {Math.floor(Math.random() * 10) + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Dialog */}
        <Dialog open={showMobileMenu} onOpenChange={setShowMobileMenu}>
          <DialogContent className="p-0 max-w-xs w-full h-screen rounded-none fixed top-0 left-0">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <span className="text-xl font-playfair font-bold text-black">Graito</span>
                <button onClick={() => setShowMobileMenu(false)} aria-label="Close menu">
                  <X className="h-6 w-6 text-black" />
                </button>
              </div>
              {/* Search */}
              <form onSubmit={handleSearch} className="flex items-center px-4 py-2 border-b">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 pl-3 pr-8 py-2 bg-gray-50 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button type="submit" className="absolute right-7">
                  <Search className="h-4 w-4 text-gray-400" />
                </button>
              </form>
              {/* Navigation Links */}
              <div className="flex flex-col gap-2 px-4 py-4">
                {navLinks.map((link, i) =>
                  link.to.startsWith("/") ? (
                    <Link
                      key={i}
                      to={link.to}
                      className={`text-base font-medium text-black py-2 ${link.className || ""}`}
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={i}
                      href={link.to}
                      className={`text-base font-medium text-black py-2 ${link.className || ""}`}
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {link.label}
                    </a>
                  )
                )}
              </div>
              {/* Actions */}
              <div className="flex items-center gap-4 px-4 py-2 border-t mt-auto">
                <Link to="/sell" onClick={() => setShowMobileMenu(false)}>
                  <Button className="bg-black text-white hover:bg-gray-800 rounded-none px-4 py-2 text-sm">
                    Sell
                  </Button>
                </Link>
                <Link to="/signin" className="text-sm font-medium text-black hover:text-gray-600" onClick={() => setShowMobileMenu(false)}>
                  <User className="inline h-5 w-5 mr-1" /> Sign in
                </Link>
                <Link to="/favorites" className="relative" onClick={() => setShowMobileMenu(false)}>
                  <Heart className="h-5 w-5 text-black" />
                  {Number(localStorage.getItem("favoritesCount") || 0) > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {localStorage.getItem("favoritesCount")}
                    </Badge>
                  )}
                </Link>
                <Link to="/profile" onClick={() => setShowMobileMenu(false)}>
                  <User className="h-5 w-5 text-black" />
                </Link>
                <Link to="/cart" onClick={() => setShowMobileMenu(false)}>
                  <div className="relative">
                    <ShoppingCart className="h-5 w-5 text-black" />
                    <Badge className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      0
                    </Badge>
                  </div>
                </Link>
              </div>
              {/* Browse Categories */}
              <div className="px-4 py-3 border-t">
                <button
                  onClick={() => setShowCategories(!showCategories)}
                  className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-gray-800 transition w-full"
                >
                  <List className="h-5 w-5" />
                  Browse All Categories
                  {showCategories ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {showCategories && (
                  <div className="mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg grid grid-cols-2 gap-2 p-4">
                    {categories.map((category, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 cursor-pointer text-sm font-medium text-gray-700"
                      >
                        <span>{category}</span>
                        <span className="bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {Math.floor(Math.random() * 10) + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </nav>

      {/* Page Sections */}
      <Hero />
      <CategoryCarousel />
      <Features />
      <AntiqueSection />
      <TrustSection />
      <Footer />
      <ChatAssistant />
      
      {/* Mobile Search Bar */}
      
    </div>
  );
};

export default Index; 