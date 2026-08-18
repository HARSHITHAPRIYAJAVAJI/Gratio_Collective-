import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Menu, Search, User, Heart, X, Filter, Grid, List } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import ProductFilter from "@/components/ProductFilter";
import { useFavorites } from "@/utils/favorites";

const Vintage: React.FC = () => {
  const { isFavorite, toggleFavorite, count: favoritesCount } = useFavorites();
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const subcategory = searchParams.get('subcategory');
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const allProducts = [
    { id: 1, name: "Vintage Chanel Bag", price: 2999, originalPrice: 3999, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop", brand: "Chanel", category: "bags", rating: 4.9, reviews: 234 },
    { id: 2, name: "1960s Dress", price: 189, originalPrice: 259, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop", brand: "Vintage", category: "clothing", rating: 4.7, reviews: 156 },
    { id: 3, name: "Antique Watch", price: 1299, originalPrice: 1799, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop", brand: "Rolex", category: "watches", rating: 4.8, reviews: 89 },
    { id: 4, name: "Retro Sunglasses", price: 149, originalPrice: 199, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&h=300&fit=crop", brand: "Ray-Ban", category: "accessories", rating: 4.6, reviews: 345 },
    { id: 5, name: "Vintage Jewelry Set", price: 599, originalPrice: 899, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop", brand: "Vintage", category: "jewelry", rating: 4.5, reviews: 123 },
    { id: 6, name: "Classic Record Player", price: 399, originalPrice: 549, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", brand: "Technics", category: "collectibles", rating: 4.9, reviews: 267 }
  ];

  const subcategories = ["Bags", "Clothing", "Watches", "Accessories", "Jewelry", "Collectibles"];

  useEffect(() => {
    let filtered = allProducts;
    if (subcategory) {
      filtered = allProducts.filter(product => 
        product.category === subcategory.toLowerCase()
      );
    }
    setFilteredProducts(filtered);
  }, [subcategory]);

    const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Top Banner */}
      <div className="bg-yellow-300 text-center py-2">
        <p className="text-xs sm:text-sm font-medium text-black">Get 10% off with code WELCOME10*</p>
      </div>

      {/* Navigation */}
      <nav className="bg-background shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button onClick={toggleMobileMenu} className="md:hidden p-2 rounded-full hover:bg-accent transition-colors">
                <Menu className="h-5 w-5 text-foreground" />
              </button>
             
              <button onClick={toggleSearch} className="p-2 rounded-full hover:bg-accent transition-colors">
                <Search className="h-5 w-5 text-foreground" />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? 'w-48 sm:w-80 opacity-100' : 'w-0 opacity-0'}`}>
                <form onSubmit={handleSearch} className="relative">
                  <input type="text" placeholder="Search vintage items..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-4 pr-10 py-2 bg-muted border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </form>
              </div>
            </div>

            <div className="flex items-center">
              <Link to="/" className="text-lg sm:text-2xl font-playfair font-bold text-foreground">Graito Collective</Link>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/sell" className="hidden sm:block">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-3 sm:px-4 py-2 text-xs sm:text-sm">Sell</Button>
              </Link>
              <Link to="/signin" className="hidden sm:block text-xs sm:text-sm font-medium text-foreground hover:text-muted-foreground">Sign in</Link>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-foreground mb-2">Vintage Collection</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Discover timeless pieces with history and character</p>
        </div>

        {/* Subcategories */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link to="/vintage" className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${!subcategory ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'}`}>All</Link>
            {subcategories.map((sub) => (
              <Link key={sub} to={`/vintage?subcategory=${sub.toLowerCase().replace(/\s+/g, '-')}`} className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${subcategory === sub.toLowerCase().replace(/\s+/g, '-') ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'}`}>{sub}</Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            <div className="lg:hidden mb-4">
              <Button onClick={() => setIsFilterOpen(!isFilterOpen)} variant="outline" className="w-full flex items-center justify-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
            <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
              <ProductFilter
                onFilterChange={() => {}}
                currentFilters={{}}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* View Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-sm text-muted-foreground">{filteredProducts.length} products found</p>
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-1">
                  <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('grid')}>
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('list')}>
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6' : 'space-y-4'}>
              {filteredProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="group">
                  <div className={`bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${viewMode === 'list' ? 'flex' : ''}`}>
                    <div className={`relative ${viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'w-full h-48 sm:h-56'}`}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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
                          <h3 className="font-medium text-sm sm:text-base text-card-foreground group-hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">{product.brand}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-xs ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vintage;