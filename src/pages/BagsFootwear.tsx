import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Menu, Search, User, Heart, X, Filter, Grid, List, ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useFavorites } from "@/utils/favorites";

// Mock ProductFilter component to resolve import error
// In a real application, this would be a separate, more complex component
interface ProductFilterProps {
  onFilterChange: (filters: any) => void;
  currentFilters: any;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange, currentFilters }) => {
  const [minPrice, setMinPrice] = useState<string>(currentFilters.priceRange ? currentFilters.priceRange[0].toString() : "");
  const [maxPrice, setMaxPrice] = useState<string>(currentFilters.priceRange ? currentFilters.priceRange[1].toString() : "");
  const [selectedBrands, setSelectedBrands] = useState<string[]>(currentFilters.brand || []);

  // Example brands for demonstration
  const brands = ["Chanel", "Louis Vuitton", "Gucci", "Prada", "Hermes", "Nike", "Timberland", "Christian Louboutin", "Cole Haan", "Teva", "Allen Edmonds"];

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
    applyFilters(e.target.value, maxPrice, selectedBrands);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
    applyFilters(minPrice, e.target.value, selectedBrands);
  };

  const handleBrandChange = (brand: string, isChecked: boolean) => {
    let newSelectedBrands: string[];
    if (isChecked) {
      newSelectedBrands = [...selectedBrands, brand];
    } else {
      newSelectedBrands = selectedBrands.filter(b => b !== brand);
    }
    setSelectedBrands(newSelectedBrands);
    applyFilters(minPrice, maxPrice, newSelectedBrands);
  };

  const applyFilters = (minP: string, maxP: string, brands: string[]) => {
    const newFilters = {
      priceRange: [minP ? parseFloat(minP) : 0, maxP ? parseFloat(maxP) : Infinity],
      brand: brands,
    };
    onFilterChange(newFilters);
  };

  useEffect(() => {
    setMinPrice(currentFilters.priceRange ? currentFilters.priceRange[0].toString() : "");
    setMaxPrice(currentFilters.priceRange ? currentFilters.priceRange[1].toString() : "");
    setSelectedBrands(currentFilters.brand || []);
  }, [currentFilters]);


  return (
    <div className="bg-card p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Filters</h3>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-sm mb-2">Price Range</h4>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full p-2 border rounded-md text-sm bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            className="w-full p-2 border rounded-md text-sm bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-sm mb-2">Brand</h4>
        <div className="space-y-2">
          {brands.map(brand => (
            <label key={brand} className="flex items-center text-sm text-foreground">
              <input
                type="checkbox"
                className="mr-2 rounded border-border text-primary focus:ring-primary"
                checked={selectedBrands.includes(brand)}
                onChange={(e) => handleBrandChange(brand, e.target.checked)}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Add more filter categories here (e.g., Size, Condition, Material) */}
    </div>
  );
};


// Define a Product interface for type safety, encompassing fields for both bags and footwear
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand: string;
  category: string; // e.g., 'sneakers', 'boots', 'handbags', 'backpacks'
  rating: number;
  reviews: number;
  size?: string; // Applicable to both bags and footwear
  condition?: string; // More relevant for pre-owned bags
}

// Mock data for bags
const bagProducts: Product[] = [
  { id: 101, name: "Chanel Classic Flap Bag", price: 4500, originalPrice: 6000, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=400&fit=crop&crop=center", brand: "Chanel", category: "handbags", rating: 4.9, reviews: 789, size: "Medium", condition: "Excellent" },
  { id: 102, name: "Louis Vuitton Neverfull MM", price: 2100, originalPrice: 2800, image: "https://images.unsplash.com/photo-1574697921983-a36c84c1f9b3?w=300&h=400&fit=crop&crop=center", brand: "Louis Vuitton", category: "totes", rating: 4.7, reviews: 1200, size: "MM", condition: "Very Good" },
  { id: 103, name: "Gucci Marmont Shoulder Bag", price: 1800, originalPrice: 2400, image: "https://images.unsplash.com/photo-1566418858712-421739c9f2b8?w=300&h=400&fit=crop&crop=center", brand: "Gucci", category: "shoulder_bags", rating: 4.6, reviews: 500, size: "Small", condition: "Good" },
  { id: 104, name: "Prada Nylon Backpack", price: 950, originalPrice: 1500, image: "https://images.unsplash.com/photo-1536780963351-4034293f0b4d?w=300&h=400&fit=crop&crop=center", brand: "Prada", category: "backpacks", rating: 4.5, reviews: 300, size: "Large", condition: "Fair" },
  { id: 105, name: "Hermes Birkin 35", price: 15000, originalPrice: 20000, image: "https://images.unsplash.com/photo-1622340331003-8898b31a0e8c?w=300&h=400&fit=crop&crop=center", brand: "Hermes", category: "handbags", rating: 5.0, reviews: 200, size: "35", condition: "Pristine" },
];

// Mock data for footwear
const footwearProducts: Product[] = [
  { id: 1, name: "Running Shoes Pro", price: 129, originalPrice: 179, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop", brand: "Nike", category: "sneakers", rating: 4.8, reviews: 1234 },
  { id: 2, name: "Classic Leather Boots", price: 199, originalPrice: 299, image: "https://images.unsplash.com/photo-1608256246200-53e8b47b9409?w=300&h=300&fit=crop", brand: "Timberland", category: "boots", rating: 4.6, reviews: 892 },
  { id: 3, name: "High Heel Pumps", price: 89, originalPrice: 129, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=300&fit=crop", brand: "Christian Louboutin", category: "heels", rating: 4.5, reviews: 567 },
  { id: 4, name: "Casual Loafers", price: 79, originalPrice: 119, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop", brand: "Cole Haan", category: "casual", rating: 4.7, reviews: 345 },
  { id: 5, name: "Athletic Sandals", price: 59, originalPrice: 89, image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=300&h=300&fit=crop", brand: "Teva", category: "sandals", rating: 4.4, reviews: 234 },
  { id: 6, name: "Formal Oxford", price: 149, originalPrice: 219, image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=300&h=300&fit:crop", brand: "Allen Edmonds", category: "formal", rating: 4.9, reviews: 456 }
];

const BagsFootwear: React.FC = () => {
  const { isFavorite, toggleFavorite, count: favoritesCount } = useFavorites();
  // useSearchParams hook to read and update URL query parameters
  const [searchParams, setSearchParams] = useSearchParams();
  // Determine the current category from URL, defaulting to 'bags'
  const currentCategory = searchParams.get('category') || 'bags';
  // Determine the current subcategory from URL
  const currentSubcategory = searchParams.get('subcategory');

  // State for search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State for filter sidebar visibility on mobile
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // State for product view mode (grid or list)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // State for filters applied via ProductFilter component
  const [filters, setFilters] = useState<any>({});

  // State for products displayed after applying all filters and search
  const [filteredDisplayProducts, setFilteredDisplayProducts] = useState<Product[]>([]);

  // Define subcategories for each main category
  const bagsSubcategories = ["Handbags", "Totes", "Shoulder Bags", "Backpacks"];
  const footwearSubcategories = ["Sneakers", "Boots", "Heels", "Casual", "Sandals", "Formal"];

  // useEffect hook to re-filter products whenever category, subcategory, filters, or search query changes
  useEffect(() => {
    let productsToFilter: Product[] = [];
    // Select the appropriate product list based on the current category
    if (currentCategory === 'bags') {
      productsToFilter = bagProducts;
    } else if (currentCategory === 'footwear') {
      productsToFilter = footwearProducts;
    }

    let filtered = productsToFilter;

    // Apply subcategory filter if one is selected
    if (currentSubcategory) {
      filtered = filtered.filter(product =>
        product.category === currentSubcategory.toLowerCase().replace(/\s+/g, '-')
      );
    }

    // Apply general filters received from ProductFilter (example logic)
    if (filters.brand && filters.brand.length > 0) {
      filtered = filtered.filter(product => filters.brand.includes(product.brand));
    }
    if (filters.priceRange && filters.priceRange.length === 2) {
        // Assuming priceRange is an array [min, max]
        filtered = filtered.filter(product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]);
    }
    // Add more specific filter applications here (e.g., size, condition) based on ProductFilter's output
    if (filters.size && filters.size.length > 0) {
      filtered = filtered.filter(product => product.size && filters.size.includes(product.size));
    }
    if (filters.condition && filters.condition.length > 0) {
      filtered = filtered.filter(product => product.condition && filters.condition.includes(product.condition));
    }

    // Apply search query filter
    if (searchQuery) {
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // Update the state with the newly filtered products
    setFilteredDisplayProducts(filtered);
  }, [currentCategory, currentSubcategory, filters, searchQuery]); // Dependencies for useEffect

  // Handler for search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is automatically applied via the useEffect when searchQuery changes
    setIsSearchOpen(false); // Close the search bar after searching
  };

  // Toggle visibility of the search input
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  // Toggle visibility of the mobile navigation menu
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Helper function to get subcategories based on the current main category
  const getSubcategories = () => {
    return currentCategory === 'bags' ? bagsSubcategories : footwearSubcategories;
  };

  // Helper function to get the main title for the product section
  const getProductTitle = () => {
    return currentCategory === 'bags' ? 'Luxury Bags' : 'Premium Footwear';
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Top Banner for promotions */}
      <div className="bg-yellow-300 text-center py-2">
        <p className="text-xs sm:text-sm font-medium text-black">Get 10% off with code WELCOME10*</p>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-background shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile menu toggle button */}
              <button onClick={toggleMobileMenu} className="md:hidden p-2 rounded-full hover:bg-accent transition-colors">
                <Menu className="h-5 w-5 text-foreground" />
              </button>

              {/* Back button, always visible */}
              <Link to="/" className="flex items-center space-x-2 text-sm font-medium text-black hover:text-gray-600">
                <ArrowLeft className="h-5 w-5 text-black" />
                <span className="hidden sm:inline">Back</span>
              </Link>

              {/* Search toggle button */}
              <button onClick={toggleSearch} className="p-2 rounded-full hover:bg-accent transition-colors">
                <Search className="h-5 w-5 text-foreground" />
              </button>
              {/* Search input field, animated based on isSearchOpen state */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? 'w-48 sm:w-80 opacity-100' : 'w-0 opacity-0'}`}>
                <form onSubmit={handleSearch} className="relative">
                  <input type="text" placeholder={`Search ${currentCategory}...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-4 pr-10 py-2 bg-muted border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </form>
              </div>
            </div>

            {/* Brand Logo/Name */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
                <img 
                  src="/images/l.png" 
                  alt="Gratio Collective" 
                  className="h-10 sm:h-12 w-auto object-contain" 
                />
              </Link>
            </div>

            {/* Right-aligned navigation icons/buttons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/sell" className="hidden sm:block">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-3 sm:px-4 py-2 text-xs sm:text-sm">Sell</Button>
              </Link>
              <Link to="/profile" className="hidden sm:block text-xs sm:text-sm font-medium text-foreground hover:text-muted-foreground">Profile</Link>
              <Link to="/favorites" className="relative p-1.5 rounded-full hover:bg-accent transition-colors">
                <Heart className="h-5 w-5 text-foreground cursor-pointer" />
                {favoritesCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                    {favoritesCount}
                  </Badge>
                )}
              </Link>
              <div className="relative">
                <ShoppingCart className="h-5 w-5 text-foreground cursor-pointer" />
                <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">0</Badge>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={toggleMobileMenu}>
          <div className="bg-white w-64 h-full shadow-lg p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" className="absolute top-4 right-4" onClick={toggleMobileMenu}>
              <X className="h-6 w-6" />
            </Button>
            <h2 className="text-xl font-bold mb-4">Menu</h2>
            <Link to="/sell" className="block text-lg font-medium text-foreground hover:text-primary" onClick={toggleMobileMenu}>Sell</Link>
            <Link to="/profile" className="block text-lg font-medium text-foreground hover:text-primary" onClick={toggleMobileMenu}>Profile</Link>
            <Link to="/favorites" className="block text-lg font-medium text-foreground hover:text-primary" onClick={toggleMobileMenu}>Favorites</Link>
            {/* Add more mobile menu items here if needed */}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 sm:mb-8">
          {/* Dynamic title based on selected category */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-foreground mb-2">
            {getProductTitle()}
          </h1>
          {/* Dynamic description based on selected category */}
          <p className="text-sm sm:text-base text-muted-foreground">
            {currentCategory === 'bags' ? 'Discover exquisite bags for every occasion.' : 'Step into style with our premium shoe collection.'}
          </p>
        </div>

        {/* Category Selector (Bags / Footwear) */}
        {/* Allows users to switch between the main product categories */}
        <div className="mb-6 sm:mb-8 flex flex-wrap gap-2">
          <Link
            to={{ pathname: '/bags-footwear', search: '?category=bags' }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${currentCategory === 'bags' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'}`}
            onClick={() => setFilters({})} // Clear filters when main category changes for a fresh start
          >
            Bags
          </Link>
          <Link
            to={{ pathname: '/bags-footwear', search: '?category=footwear' }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${currentCategory === 'footwear' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'}`}
            onClick={() => setFilters({})} // Clear filters when main category changes for a fresh start
          >
            Footwear
          </Link>
        </div>

        {/* Subcategories for the currently selected main category */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {/* Link to show all subcategories within the current main category */}
            <Link
              to={{ pathname: '/bags-footwear', search: `?category=${currentCategory}` }}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${!currentSubcategory ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'}`}
            >
              All
            </Link>
            {/* Map through relevant subcategories and create links */}
            {getSubcategories().map((sub) => (
              <Link
                key={sub}
                to={{ pathname: '/bags-footwear', search: `?category=${currentCategory}&subcategory=${sub.toLowerCase().replace(/\s+/g, '-')}` }}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${currentSubcategory === sub.toLowerCase().replace(/\s+/g, '-') ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'}`}
              >
                {sub}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            {/* Toggle button for filters on mobile */}
            <div className="lg:hidden mb-4">
              <Button onClick={() => setIsFilterOpen(!isFilterOpen)} variant="outline" className="w-full flex items-center justify-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
            {/* ProductFilter component, visible based on isFilterOpen state (for mobile) or always visible on larger screens */}
            <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
              <ProductFilter onFilterChange={setFilters} currentFilters={filters} />
            </div>
          </div>

          {/* Main Content Area - Products Display */}
          <div className="flex-1">
            {/* View Controls (Grid/List) and Product Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-sm text-muted-foreground">{filteredDisplayProducts.length} products found</p>
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-1">
                  {/* Buttons to switch between grid and list view */}
                  <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('grid')}>
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('list')}>
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List Display */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6' : 'space-y-4'}>
              {/* Map through filtered products and render each product card */}
              {filteredDisplayProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="group">
                  <div className={`bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${viewMode === 'list' ? 'flex flex-row items-center' : ''}`}>
                    <div className={`relative ${viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'w-full h-48 sm:h-56'}`}>
                      {/* Product image */}
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      {/* Favorite button overlay */}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite({
                            id: product.id,
                            name: product.name,
                            brand: product.brand,
                            price: `$${product.price}`,
                            originalPrice: product.originalPrice ? `$${product.originalPrice}` : undefined,
                            image: product.image,
                            size: product.size,
                            condition: product.condition,
                            category: product.category
                          });
                        }}
                        className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full shadow-xs transition-colors z-10"
                        title={isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Heart className={`h-4 w-4 transition-colors ${isFavorite(product.id) ? "text-red-500 fill-red-500" : "text-gray-500 hover:text-red-500"}`} />
                      </button>
                    </div>
                    <div className="p-3 sm:p-4 flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          {/* Product brand, name, size, and condition */}
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.brand}</p>
                          <h3 className="font-medium text-sm sm:text-base text-card-foreground group-hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                          {product.size && <p className="text-xs text-gray-500">Size: {product.size}</p>}
                          {product.condition && <p className="text-xs text-gray-500">Condition: {product.condition}</p>}
                        </div>
                      </div>
                      {/* Product rating */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-xs ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      </div>
                      {/* Product price and Add to Cart button */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm sm:text-base text-card-foreground">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        <Button size="sm" className="text-xs">
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {/* Message if no products are found */}
            {filteredDisplayProducts.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                    No products found matching your criteria.
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BagsFootwear;