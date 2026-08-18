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
import { useFavorites } from "@/utils/favorites";
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
  const { count: favoritesCount } = useFavorites();
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
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          {/* Top Bar: Fluid, beautifully balanced with Logo, Location, Center Search, and Actions */}
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Left: Mobile Menu + Brand Logo + Location */}
            <div className="flex items-center space-x-3 lg:space-x-4 flex-shrink-0">
              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5 text-black" />
              </button>

              {/* Logo */}
              <Link to="/" className="text-xl sm:text-2xl lg:text-3xl font-playfair font-bold text-black tracking-tight hover:opacity-90 transition-opacity whitespace-nowrap">
                Graito Collective
              </Link>

              {/* Location Selector */}
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
                <button type="submit" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
                  <Search className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              {/* Search icon (for mobile) */}
              <div className="md:hidden relative">
                <button
                  onClick={toggleSearch}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5 text-black" />
                </button>
                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white p-2 rounded-lg shadow-lg border border-gray-200 z-50">
                    <form onSubmit={handleSearch} className="relative">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-3 pr-8 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        autoFocus
                      />
                      <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </form>
                  </div>
                )}
              </div>

              {/* Location Selector (Mobile only) */}
              <div className="sm:hidden">
                <LocationSelector />
              </div>

              {/* Sell an item button */}
              <Link to="/sell">
                <Button className="bg-black text-white hover:bg-gray-800 rounded-md px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium transition whitespace-nowrap">
                  Sell an item
                </Button>
              </Link>

              {/* Sign In */}
              <Link to="/signin" className="text-xs sm:text-sm font-medium text-black hover:text-gray-600 transition-colors whitespace-nowrap hidden lg:inline-block">
                Sign in
              </Link>

              {/* Favorites */}
              <Link to="/favorites" className="relative p-1.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Favorites">
                <Heart className="h-5 w-5 text-black cursor-pointer" />
                {favoritesCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                    {favoritesCount}
                  </Badge>
                )}
              </Link>

              {/* Profile */}
              <Link to="/profile" className="p-1.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Profile">
                <User className="h-5 w-5 text-black cursor-pointer" />
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-1.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Cart">
                <ShoppingCart className="h-5 w-5 text-black cursor-pointer" />
                <Badge className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                  0
                </Badge>
              </Link>
            </div>
          </div>

          {/* Desktop Secondary Navigation with Integrated Browse Categories */}
          <div className="border-t border-gray-100 py-2.5 hidden md:block">
            <div className="flex items-center space-x-6">
              {/* Browse Categories Dropdown */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setShowCategories(!showCategories)}
                  className="flex items-center gap-2 bg-black text-white px-3.5 py-1.5 rounded-md text-sm font-semibold shadow-sm hover:bg-gray-800 transition"
                >
                  <List className="h-4 w-4" />
                  Browse All Categories
                  {showCategories ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {showCategories && (
                  <div className="absolute left-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-xl grid grid-cols-1 gap-1 p-3 z-50">
                    {categories.map((category, index) => (
                      <div
                        key={`desktop-category-${category}-${index}`}
                        className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm font-medium text-gray-700 transition-colors"
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

              {/* Divider */}
              <div className="h-5 w-px bg-gray-200 flex-shrink-0" />

              {/* Category Links */}
              <div className="flex space-x-6 overflow-x-auto scrollbar-hide py-1 items-center flex-1">
                {navLinks.map((link, i) =>
                  link.to.startsWith("/") ? (
                    <Link
                      key={i}
                      to={link.to}
                      className={`text-sm font-medium text-black whitespace-nowrap hover:text-gray-600 transition-colors ${link.className || ""}`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={i}
                      href={link.to}
                      className={`text-sm font-medium text-black whitespace-nowrap hover:text-gray-600 transition-colors ${link.className || ""}`}
                    >
                      {link.label}
                    </a>
                  )
                )}
              </div>
            </div>
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