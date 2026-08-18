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
    // Show welcome modal on first visit after initial paint
    const hasVisited = localStorage.getItem('hasVisitedGratio');
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setShowWelcomeModal(true);
        localStorage.setItem('hasVisitedGratio', 'true');
      }, 2500);
      return () => clearTimeout(timer);
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
              <Link to="/" className="flex items-center hover:opacity-90 transition-opacity flex-shrink-0">
                <img 
                  src="/images/l.webp" 
                  alt="Gratio Collective" 
                  className="h-10 sm:h-12 w-auto object-contain" 
                />
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
            <div className="flex items-center space-x-1.5 sm:space-x-3 flex-shrink-0">
              {/* Search icon (for mobile) */}
              <div className="md:hidden relative">
                <button
                  onClick={toggleSearch}
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5 text-black" />
                </button>
                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 max-w-[calc(100vw-32px)] bg-white p-2 rounded-lg shadow-xl border border-gray-200 z-50">
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

              {/* Sell an item button */}
              <Link to="/sell" className="hidden sm:inline-flex">
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
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center p-0 text-[10px]">
                    {favoritesCount}
                  </Badge>
                )}
              </Link>

              {/* Profile */}
              <Link to="/profile" className="p-1.5 rounded-full hover:bg-gray-100 transition-colors hidden sm:inline-flex" aria-label="Profile">
                <User className="h-5 w-5 text-black cursor-pointer" />
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-1.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Cart">
                <ShoppingCart className="h-5 w-5 text-black cursor-pointer" />
                <Badge className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center p-0 text-[10px]">
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
          <DialogContent className="p-0 max-w-xs sm:max-w-sm w-full h-[100dvh] rounded-none fixed top-0 left-0 bg-white shadow-2xl z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <img src="/images/l.webp" alt="Gratio Collective" className="h-8 w-auto object-contain" />
              <button onClick={() => setShowMobileMenu(false)} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700" aria-label="Close menu">
                <X className="h-5 w-5 text-black" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              {/* Search in Drawer */}
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search brands, bags, vintage..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button type="submit" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search className="h-4 w-4" />
                </button>
              </form>

              {/* Delivery Location in Drawer */}
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Delivery Location</span>
                <LocationSelector />
              </div>

              {/* Sell an item prominent CTA */}
              <Link to="/sell" onClick={() => setShowMobileMenu(false)} className="block">
                <Button className="w-full bg-black text-white hover:bg-neutral-800 h-11 rounded-xl text-sm font-semibold shadow-sm">
                  + Sell an Item with Gratio
                </Button>
              </Link>

              {/* Navigation Links */}
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Collections</span>
                <div className="grid grid-cols-1 gap-1">
                  {navLinks.map((link, i) =>
                    link.to.startsWith("/") ? (
                      <Link
                        key={i}
                        to={link.to}
                        className={`text-sm font-medium text-gray-800 hover:text-black hover:bg-gray-50 px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between ${link.className || ""}`}
                        onClick={() => setShowMobileMenu(false)}
                      >
                        <span>{link.label}</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </Link>
                    ) : (
                      <a
                        key={i}
                        href={link.to}
                        className={`text-sm font-medium text-gray-800 hover:text-black hover:bg-gray-50 px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between ${link.className || ""}`}
                        onClick={() => setShowMobileMenu(false)}
                      >
                        <span>{link.label}</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </a>
                    )
                  )}
                </div>
              </div>

              {/* Account Links */}
              <div className="pt-3 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Account</span>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/profile"
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 hover:bg-gray-50"
                  >
                    <User className="h-4 w-4 text-gray-600" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/favorites"
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 hover:bg-gray-50"
                  >
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>Favorites</span>
                  </Link>
                  <Link
                    to="/signin"
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 hover:bg-gray-50 col-span-2"
                  >
                    <User className="h-4 w-4 text-gray-600" />
                    <span>Sign In / Register</span>
                  </Link>
                </div>
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