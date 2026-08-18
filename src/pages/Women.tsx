import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  User, 
  Heart, 
  ArrowLeft, 
  Filter, 
  ChevronDown, 
  X, 
  Check, 
  SlidersHorizontal,
  Sparkles
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import ProductDetail from "@/components/ProductDetail";
import { useFavorites } from "@/utils/favorites";

interface Category {
  name: string;
  count: number;
  subcategories: string[];
}

const categories: Category[] = [
  { name: "All", count: 755, subcategories: [] },
  { name: "Clothing", count: 245, subcategories: ["Dresses", "Tops", "Jackets", "Pants", "Skirts"] },
  { name: "Shoes", count: 189, subcategories: ["Heels", "Sneakers", "Boots", "Flats", "Sandals"] },
  { name: "Bags", count: 156, subcategories: ["Handbags", "Shoulder Bags", "Clutches", "Backpacks", "Totes"] },
  { name: "Accessories", count: 98, subcategories: ["Jewelry", "Scarves", "Belts", "Sunglasses", "Watches"] },
  { name: "Vintage", count: 67, subcategories: ["Dresses", "Jackets", "Jewelry", "Handbags"] }
];

const mockProducts = [
  {
    id: 1,
    name: "Chanel Tweed Jacket",
    brand: "Chanel",
    price: "$2,500",
    originalPrice: "$4,000",
    images: ["/images/jac.jpeg", "/images/jack.jpeg"],
    condition: "Pre-owned",
    size: "38",
    category: "Clothing",
    subcategory: "jackets",
    description: "Classic Chanel tweed jacket in navy and white. Timeless elegance with signature Chanel details.",
    details: ["100% Wool Tweed", "Made in France", "Chain-weighted hem", "Authentic vintage buttons"],
    rating: 5,
    reviews: 12,
    inStock: true
  },
  {
    id: 2,
    name: "Louboutin So Kate Pumps",
    brand: "Christian Louboutin",
    price: "$650",
    originalPrice: "$900",
    images: ["/images/sho.jpeg", "/images/shoe.jpeg"],
    condition: "New",
    size: "38",
    category: "Shoes",
    subcategory: "heels",
    description: "Iconic red sole pumps in black patent leather. The ultimate luxury shoe.",
    details: ["120mm heel", "Patent leather", "Red lacquered sole", "Made in Italy"],
    rating: 4,
    reviews: 8,
    inStock: true
  },
  {
    id: 3,
    name: "Hermès Kelly Bag 32",
    brand: "Hermès",
    price: "$7,800",
    originalPrice: "$9,500",
    images: ["/images/her.jpeg", "/images/herm.jpeg"],
    condition: "New",
    size: "32cm",
    category: "Bags",
    subcategory: "handbags",
    description: "Authentic Hermès Kelly bag in Epsom leather with gold hardware. A true investment piece.",
    details: ["Epsom leather", "Gold hardware", "32cm size", "Includes dustbag and keys"],
    rating: 5,
    reviews: 15,
    inStock: true
  },
  {
    id: 4,
    name: "Gucci Silk Flora Scarf",
    brand: "Gucci",
    price: "$180",
    originalPrice: "$350",
    images: ["/images/guc.jpeg", "/images/gucc.jpeg"],
    condition: "Pre-owned",
    size: "90cm",
    category: "Accessories",
    subcategory: "scarves",
    description: "Elegant Gucci silk scarf with floral print. Adds a touch of sophistication to any outfit.",
    details: ["100% Silk", "Floral print", "90cm x 90cm", "Made in Italy"],
    rating: 4,
    reviews: 22,
    inStock: true
  },
  {
    id: 5,
    name: "Vintage Chanel 1980s Dress",
    brand: "Chanel",
    price: "$1,200",
    originalPrice: "$2,500",
    images: ["/images/chane.jpeg", "/images/chan.jpeg", "/images/cha.jpeg"],
    condition: "Pre-owned",
    size: "36",
    category: "Vintage",
    subcategory: "dresses",
    description: "Rare vintage Chanel dress from the 1980s. A collector's piece in pristine condition.",
    details: ["Wool blend", "Fully lined", "Made in France", "Classic Chanel design"],
    rating: 5,
    reviews: 9,
    inStock: true
  },
  {
    id: 6,
    name: "YSL Tribute Platform Sandals",
    brand: "Saint Laurent",
    price: "$450",
    originalPrice: "$750",
    images: ["/images/ysl.jpeg", "/images/ysl1.jpeg"],
    condition: "Very Good",
    size: "37",
    category: "Shoes",
    subcategory: "sandals",
    description: "Saint Laurent Tribute platform sandals in nude leather. A timeless statement heel.",
    details: ["Leather upper", "Platform sole", "Adjustable ankle strap", "Made in Italy"],
    rating: 4,
    reviews: 14,
    inStock: true
  },
  {
    id: 7,
    name: "Dior Saddle Leather Bag",
    brand: "Dior",
    price: "$3,850",
    originalPrice: "$4,400",
    images: ["https://assets.christiandior.com/is/image/diorprod/M0455CBAAM900_SBG_E03-1?$r9x10_raw$&crop=0,0,4000,5000&wid=1024&hei=1107&scale=0.5535&bfc=on&qlt=80"],
    condition: "New",
    size: "Medium",
    category: "Bags",
    subcategory: "handbags",
    description: "Iconic Dior Saddle bag in black grained calfskin with antique gold-finish metal 'CD' signature.",
    details: ["Grained Calfskin", "Magnetic 'D' stirrup closure", "'CD' signature on handle", "Made in Italy"],
    rating: 5,
    reviews: 31,
    inStock: true
  },
  {
    id: 8,
    name: "Cartier Love Gold Bracelet",
    brand: "Cartier",
    price: "$6,200",
    originalPrice: "$7,500",
    images: ["https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=800&fit=crop&crop=center"],
    condition: "Excellent",
    size: "17",
    category: "Accessories",
    subcategory: "jewelry",
    description: "Authentic Cartier Love Bracelet in 18K yellow gold with signature screw motif.",
    details: ["18K Yellow Gold", "Original screwdriver included", "Hallmarked & certified", "Luxury box"],
    rating: 5,
    reviews: 19,
    inStock: true
  }
];

const Women: React.FC = () => {
  const { isFavorite, toggleFavorite, count: favoritesCount } = useFavorites();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  // Sync with searchParams
  useEffect(() => {
    const sub = searchParams.get("subcategory");
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
    }
    if (sub) {
      setSelectedSubcategory(sub);
    }
  }, [searchParams]);

  const handleCategorySelect = (catName: string) => {
    setSelectedCategory(catName);
    setSelectedSubcategory(null);
    const newParams = new URLSearchParams(searchParams);
    if (catName === "All") {
      newParams.delete("category");
      newParams.delete("subcategory");
    } else {
      newParams.set("category", catName);
      newParams.delete("subcategory");
    }
    setSearchParams(newParams);
  };

  const handleSubcategorySelect = (subName: string | null) => {
    setSelectedSubcategory(subName);
    const newParams = new URLSearchParams(searchParams);
    if (subName) {
      newParams.set("subcategory", subName.toLowerCase().replace(/\s+/g, "-"));
    } else {
      newParams.delete("subcategory");
    }
    setSearchParams(newParams);
  };

  const toggleCondition = (cond: string) => {
    setSelectedConditions(prev => 
      prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSelectedSubcategory(null);
    setSelectedConditions([]);
    setSelectedSizes([]);
    setSearchParams(new URLSearchParams());
  };

  const handleToggleFavorite = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    // Filter by Category
    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Filter by Subcategory
    if (selectedSubcategory) {
      const normalized = selectedSubcategory.toLowerCase().replace(/-/g, " ");
      result = result.filter(p => p.subcategory.toLowerCase().includes(normalized));
    }

    // Filter by Condition
    if (selectedConditions.length > 0) {
      result = result.filter(p => selectedConditions.includes(p.condition));
    }

    // Filter by Size
    if (selectedSizes.length > 0) {
      result = result.filter(p => selectedSizes.includes(p.size));
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => {
        const pA = parseFloat(a.price.replace(/[^0-9.]/g, ""));
        const pB = parseFloat(b.price.replace(/[^0-9.]/g, ""));
        return pA - pB;
      });
    } else if (sortBy === "price-high") {
      result.sort((a, b) => {
        const pA = parseFloat(a.price.replace(/[^0-9.]/g, ""));
        const pB = parseFloat(b.price.replace(/[^0-9.]/g, ""));
        return pB - pA;
      });
    }

    return result;
  }, [selectedCategory, selectedSubcategory, selectedConditions, selectedSizes, sortBy]);

  const activeCategoryObj = categories.find(c => c.name.toLowerCase() === selectedCategory.toLowerCase());
  const activeFiltersCount = selectedConditions.length + selectedSizes.length + (selectedCategory !== "All" ? 1 : 0) + (selectedSubcategory ? 1 : 0);

  if (selectedProduct) {
    const product = mockProducts.find(p => p.id === selectedProduct);
    if (product) {
      return (
        <ProductDetail 
          product={product} 
          onBack={() => setSelectedProduct(null)} 
          onSelectProduct={(p) => setSelectedProduct(p.id)}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Top Banner */}
      <div className="bg-yellow-300 text-center py-2 w-full">
        <p className="text-xs sm:text-sm font-medium text-black">Get 10% off with code WELCOME10*</p>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link 
                to="/" 
                className="flex items-center space-x-1.5 text-xs sm:text-sm font-medium text-black hover:text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
                <img 
                  src="/images/l.webp" 
                  alt="Gratio Collective" 
                  className="h-10 sm:h-12 w-auto object-contain" 
                />
              </Link>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link to="/favorites" className="relative p-1.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Favorites">
                <Heart className="h-5 w-5 text-black cursor-pointer" />
                {favoritesCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                    {favoritesCount}
                  </Badge>
                )}
              </Link>
              <Link to="/profile" className="p-1.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Profile">
                <User className="h-5 w-5 text-black cursor-pointer" />
              </Link>
              <Link to="/cart" className="relative p-1.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Cart">
                <ShoppingCart className="h-5 w-5 text-black cursor-pointer" />
                <Badge className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                  0
                </Badge>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest mb-1.5">
            <Sparkles className="h-3.5 w-3.5 text-yellow-500" />
            <span>Luxury Women's Department</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-black tracking-tight">
              Women's Collection
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Showing <span className="text-black font-bold">{filteredProducts.length}</span> curated items
            </p>
          </div>
        </div>

        {/* Horizontal Category Navigation Bar (Pills) */}
        <div className="mb-6 border-b border-gray-100 pb-5">
          <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto scrollbar-hide py-1">
            {categories.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.name.toLowerCase();
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 flex items-center space-x-1.5 ${
                    isActive 
                      ? "bg-black text-white shadow-sm scale-100" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-white text-gray-500"}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Subcategory Sub-pills (if active category has subcategories) */}
          {activeCategoryObj && activeCategoryObj.subcategories.length > 0 && (
            <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide mt-3 pt-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1 flex-shrink-0">
                Explore {activeCategoryObj.name}:
              </span>
              <button
                onClick={() => handleSubcategorySelect(null)}
                className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  !selectedSubcategory 
                    ? "bg-neutral-800 text-white" 
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                All {activeCategoryObj.name}
              </button>
              {activeCategoryObj.subcategories.map((sub) => {
                const isSubActive = selectedSubcategory?.toLowerCase() === sub.toLowerCase().replace(/\s+/g, "-");
                return (
                  <button
                    key={sub}
                    onClick={() => handleSubcategorySelect(isSubActive ? null : sub)}
                    className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                      isSubActive 
                        ? "bg-neutral-800 text-white" 
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-black"
                    }`}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Toolbar: Active filters & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center space-x-2 flex-wrap gap-y-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 text-xs sm:text-sm h-9 px-3.5 rounded-lg font-medium transition-colors ${
                showFilters || activeFiltersCount > 0 ? "border-black bg-gray-50" : "border-gray-300"
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center ml-1">
                  {activeFiltersCount}
                </span>
              )}
              <ChevronDown className={`h-3.5 w-3.5 text-gray-500 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </Button>

            {/* Active filter badges */}
            {selectedConditions.map(cond => (
              <span 
                key={cond} 
                onClick={() => toggleCondition(cond)}
                className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full flex items-center space-x-1 cursor-pointer hover:bg-gray-200 transition-colors"
              >
                <span>{cond}</span>
                <X className="h-3 w-3 text-gray-500" />
              </span>
            ))}

            {selectedSizes.map(size => (
              <span 
                key={size} 
                onClick={() => toggleSize(size)}
                className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full flex items-center space-x-1 cursor-pointer hover:bg-gray-200 transition-colors"
              >
                <span>Size: {size}</span>
                <X className="h-3 w-3 text-gray-500" />
              </span>
            ))}

            {activeFiltersCount > 0 && (
              <button 
                onClick={clearAllFilters} 
                className="text-xs text-red-600 hover:text-red-700 font-medium underline ml-2"
              >
                Reset all
              </button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs text-gray-500 hidden sm:inline">Sort:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs sm:text-sm bg-white font-medium focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
            >
              <option value="newest">Sort by: Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Expandable Filter Panel */}
        {showFilters && (
          <div className="bg-gray-50/80 border border-gray-200 rounded-2xl p-5 mb-8 transition-all animate-in fade-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-black">Refine Selection</h3>
              <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-black">
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Condition Filter */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2.5">Item Condition</h4>
                <div className="flex flex-wrap gap-2">
                  {["New", "Pre-owned", "Very Good"].map(cond => {
                    const isChecked = selectedConditions.includes(cond);
                    return (
                      <button
                        key={cond}
                        onClick={() => toggleCondition(cond)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center space-x-1.5 ${
                          isChecked 
                            ? "bg-black text-white border-black" 
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {isChecked && <Check className="h-3 w-3" />}
                        <span>{cond}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2.5">Sizes</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["XS", "S", "M", "L", "XL", "36", "37", "38", "32cm"].map(size => {
                    const isChecked = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`min-w-[36px] h-8 px-2 rounded-md text-xs font-medium border transition-colors ${
                          isChecked 
                            ? "bg-black text-white border-black font-semibold" 
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick perks */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2.5">Buyer Assurance</h4>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <p className="flex items-center">🛡️ 100% Authenticity Verified</p>
                  <p className="flex items-center">📦 Direct Insured Shipping</p>
                  <p className="flex items-center">🔄 14-Day Buyer Return Protection</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full-Width Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
            <h3 className="text-lg font-playfair font-bold text-black mb-2">No items found</h3>
            <p className="text-sm text-gray-500 mb-4">Try clearing some filters or exploring another category.</p>
            <Button onClick={clearAllFilters} className="bg-black text-white hover:bg-gray-800">
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isFav = isFavorite(product.id);
              return (
                <div
                  key={product.id}
                  className="group cursor-pointer flex flex-col"
                  onClick={() => setSelectedProduct(product.id)}
                >
                  {/* Image Card */}
                  <div className="relative overflow-hidden rounded-xl mb-3 aspect-[3/4] bg-[#f7f7f8] flex items-center justify-center p-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-white/95 text-black font-semibold text-[10px] tracking-wider uppercase px-2 py-1 rounded shadow-xs">
                        {product.category}
                      </span>
                    </div>

                    {/* Favorite Button */}
                    <button
                      className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-xs hover:shadow-md transition-all z-10"
                      onClick={(e) => handleToggleFavorite(e, product)}
                      aria-label="Add to favorites"
                    >
                      <Heart className={`h-4 w-4 transition-colors ${isFav ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-500"}`} />
                    </button>

                    {/* Condition Tag */}
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="bg-neutral-900/80 text-white text-[10px] font-medium px-2 py-0.5 rounded-md backdrop-blur-xs">
                        {product.condition}
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-1 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{product.brand}</p>
                      <h3 className="font-medium text-sm text-black line-clamp-1 group-hover:underline transition-all">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Size: {product.size}
                      </p>
                    </div>

                    <div className="pt-1 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-red-600">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-500 flex items-center">
                        📦 Direct
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Women;