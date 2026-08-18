import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Menu, Search, User, Heart, X, Filter, Grid, List, ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const HomeKitchen: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [conditionFilter, setConditionFilter] = useState<'all' | 'new' | 'preowned'>('all');

  const subcategory = searchParams.get('subcategory');

  const allProducts = [
    { id: 1, name: "Modern Sofa Set", price: 899, originalPrice: 1299, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop", brand: "IKEA", category: "furniture", rating: 4.5, reviews: 234, condition: "new" },
    { id: 2, name: "Dining Table Oak", price: 599, originalPrice: 799, image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=300&h=300&fit=crop", brand: "West Elm", category: "furniture", rating: 4.8, reviews: 189, condition: "preowned" },
    { id: 3, name: "Kitchen Mixer", price: 199, originalPrice: 299, image: "https://images.unsplash.com/photo-1574781330855-d0db3cc96da6?w=300&h=300&fit=crop", brand: "KitchenAid", category: "kitchen", rating: 4.7, reviews: 567, condition: "new" },
    { id: 4, name: "Ceramic Vase Set", price: 49, originalPrice: 79, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop", brand: "CB2", category: "decor", rating: 4.3, reviews: 78, condition: "new" },
    { id: 5, name: "LED Floor Lamp", price: 129, originalPrice: 179, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop", brand: "Philips", category: "lighting", rating: 4.6, reviews: 345, condition: "preowned" },
    { id: 6, name: "Storage Ottoman", price: 89, originalPrice: 129, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop", brand: "Target", category: "storage", rating: 4.4, reviews: 123, condition: "new" },
    { id: 7, name: "Luxury Bedding Set", price: 159, originalPrice: 229, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=300&fit=crop", brand: "Brooklinen", category: "bedding", rating: 4.9, reviews: 892, condition: "new" },
    { id: 8, name: "Coffee Maker Pro", price: 299, originalPrice: 399, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop", brand: "Breville", category: "kitchen", rating: 4.8, reviews: 456, condition: "preowned" }
  ];

  const subcategories = ["Furniture", "Decor", "Kitchen", "Bedding", "Lighting", "Storage"];

  useEffect(() => {
    let filtered = allProducts;
    if (subcategory) {
      filtered = filtered.filter(product => 
        product.category === subcategory.toLowerCase().replace('-', '')
      );
    }
    if (conditionFilter !== 'all') {
      filtered = filtered.filter(product => product.condition === conditionFilter);
    }
    setFilteredProducts(filtered);
  }, [subcategory, conditionFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    
    <div className="min-h-screen bg-background font-inter">
      <div className="bg-yellow-300 text-center py-2">
        <p className="text-xs sm:text-sm font-medium text-black">Get 10% off with code WELCOME10*</p>
      </div>
      {/* Navigation */}
      <nav className="bg-background shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-5 w-5 text-black" />
                <span className="text-sm font-medium">Back</span>
              </Link>
              <button onClick={toggleMobileMenu} className="md:hidden p-2 rounded-full hover:bg-accent transition-colors">
                <Menu className="h-5 w-5 text-foreground" />
              </button>
              <button onClick={toggleSearch} className="p-2 rounded-full hover:bg-accent transition-colors">
                <Search className="h-5 w-5 text-foreground" />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? 'w-48 sm:w-80 opacity-100' : 'w-0 opacity-0'}`}>
                <form onSubmit={handleSearch} className="relative">
                  <input type="text" placeholder="Search home & kitchen..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-4 pr-10 py-2 bg-muted border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </form>
              </div>
            </div>
            <div className="flex items-center">
              <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
                <img 
                  src="/images/l.webp" 
                  alt="Gratio Collective" 
                  className="h-10 sm:h-12 w-auto object-contain" 
                />
              </Link>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/sell" className="hidden sm:block">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-3 sm:px-4 py-2 text-xs sm:text-sm">Sell</Button>
              </Link>
              <Link to="/signin" className="hidden sm:block text-xs sm:text-sm font-medium text-foreground hover:text-muted-foreground">Sign in</Link>
              <Link to="/favorites" className="relative">
                <Heart className="h-5 w-5 text-foreground cursor-pointer" />
                <Badge className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">3</Badge>
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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-foreground mb-2">Home & Kitchen</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Transform your living space with premium home essentials</p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
          <Button variant={conditionFilter === 'all' ? 'default' : 'outline'} onClick={() => setConditionFilter('all')} size="sm">All</Button>
          <Button variant={conditionFilter === 'new' ? 'default' : 'outline'} onClick={() => setConditionFilter('new')} size="sm">New</Button>
          <Button variant={conditionFilter === 'preowned' ? 'default' : 'outline'} onClick={() => setConditionFilter('preowned')} size="sm">Preowned</Button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">{filteredProducts.length} products found</p>
          <div className="flex gap-2">
            <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('grid')}><Grid className="h-4 w-4" /></Button>
            <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('list')}><List className="h-4 w-4" /></Button>
          </div>
        </div>

        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
          {filteredProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="group">
              <div className={`bg-card rounded-xl shadow-md overflow-hidden transition ${viewMode === 'list' ? 'flex' : ''}`}>
                <div className={`${viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'h-48 sm:h-56'} relative`}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4 flex-1">
                  <h3 className="font-semibold text-sm sm:text-base text-card-foreground line-clamp-2 group-hover:text-primary">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
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
                      <span className="font-bold text-sm">${product.price}</span>
                      {product.originalPrice && <span className="text-xs line-through text-muted-foreground">${product.originalPrice}</span>}
                    </div>
                    <Button size="sm" className="text-xs"><ShoppingCart className="h-4 w-4 mr-1" />Add</Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeKitchen;
