import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  User, 
  Heart, 
  ArrowLeft, 
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
  { name: "All", count: 450, subcategories: [] },
  { name: "Boys", count: 160, subcategories: ["Coats & Jackets", "T-Shirts", "Sweatshirts", "Pants", "Tracksuits"] },
  { name: "Girls", count: 170, subcategories: ["Dresses", "Jackets", "Skirts", "Tops", "Sets"] },
  { name: "Baby & Toddler", count: 75, subcategories: ["Rompers", "Onesies", "First Walkers", "Outerwear"] },
  { name: "Kids Footwear", count: 85, subcategories: ["Sneakers", "Boots", "Sandals", "School Shoes"] },
  { name: "School & Gear", count: 60, subcategories: ["Backpacks", "Lunch Sets", "Accessories"] }
];

const mockChildrenProducts = [
  {
    id: 201,
    name: "Burberry Kids Heritage Trench Coat",
    brand: "Burberry",
    price: "$180",
    originalPrice: "$340",
    images: [
      "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=600&h=800&fit=crop&crop=center"
    ],
    condition: "Very Good",
    size: "8Y",
    category: "Boys",
    subcategory: "coats-&-jackets",
    description: "Classic double-breasted honey gabardine trench coat featuring Vintage check cotton lining.",
    details: ["100% Cotton Gabardine", "Vintage Check lining", "Buffalo horn buttons", "Dry clean"],
    rating: 5,
    reviews: 14,
    inStock: true
  },
  {
    id: 202,
    name: "Girls Sparkle Unicorn Tulle Dress",
    brand: "H&M Kids",
    price: "$25",
    originalPrice: "$45",
    images: [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&h=800&fit=crop&crop=center"
    ],
    condition: "Like New",
    size: "6Y",
    category: "Girls",
    subcategory: "dresses",
    description: "Whimsical pastel party dress with layered sparkle tulle skirt and delicate sequin detailing.",
    details: ["Soft organic cotton lining", "Multi-layered tulle skirt", "Glitter waistband", "Machine wash 30°C"],
    rating: 4,
    reviews: 28,
    inStock: true
  },
  {
    id: 203,
    name: "Baby Nike Air Max Pre-Schoolers",
    brand: "Nike",
    price: "$38",
    originalPrice: "$60",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop&crop=center"
    ],
    condition: "Excellent",
    size: "12M",
    category: "Baby & Toddler",
    subcategory: "first-walkers",
    description: "Comfortable cushioned sneakers with elastic easy-strap closures designed for first steps.",
    details: ["Breathable mesh & synthetic leather", "Max Air cushioning", "Velcro closure", "Non-slip sole"],
    rating: 5,
    reviews: 32,
    inStock: true
  },
  {
    id: 204,
    name: "JanSport SuperBreak School Backpack",
    brand: "JanSport",
    price: "$45",
    originalPrice: "$65",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop&crop=center"
    ],
    condition: "Very Good",
    size: "Standard",
    category: "School & Gear",
    subcategory: "backpacks",
    description: "Durable school backpack with padded shoulder straps, front utility pocket, and main compartment.",
    details: ["600 Denier Polyester", "Padded back panel", "Side water bottle pocket", "26L capacity"],
    rating: 5,
    reviews: 19,
    inStock: true
  },
  {
    id: 205,
    name: "Mini Rodini Organic Panda Sweatshirt",
    brand: "Mini Rodini",
    price: "$48",
    originalPrice: "$85",
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&h=800&fit=crop&crop=center"
    ],
    condition: "Like New",
    size: "6Y",
    category: "Boys",
    subcategory: "sweatshirts",
    description: "Signature Mini Rodini relaxed sweatshirt crafted from 100% GOTS-certified organic cotton.",
    details: ["100% Organic Cotton", "GOTS certified", "Ribbed trims", "Soft fleece interior"],
    rating: 4,
    reviews: 11,
    inStock: true
  },
  {
    id: 206,
    name: "Gucci Kids Interlocking G Cotton Tee",
    brand: "Gucci",
    price: "$95",
    originalPrice: "$165",
    images: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=800&fit=crop&crop=center"
    ],
    condition: "Excellent",
    size: "10Y",
    category: "Boys",
    subcategory: "t-shirts",
    description: "Premium jersey cotton tee featuring the archival Gucci vintage logo print across the chest.",
    details: ["100% Premium Cotton", "Crew neck", "Vintage logo print", "Made in Italy"],
    rating: 5,
    reviews: 22,
    inStock: true
  },
  {
    id: 207,
    name: "Zara Kids Floral Embroidered Denim",
    brand: "Zara Kids",
    price: "$28",
    originalPrice: "$55",
    images: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=800&fit=crop&crop=center"
    ],
    condition: "Very Good",
    size: "7Y",
    category: "Girls",
    subcategory: "jackets",
    description: "Light wash denim jacket accented with colorful floral embroidery on the back and shoulders.",
    details: ["100% Cotton Denim", "Snap button front", "Floral embroidery", "Side pockets"],
    rating: 4,
    reviews: 17,
    inStock: true
  },
  {
    id: 208,
    name: "Moncler Enfant Down Puffer Vest",
    brand: "Moncler",
    price: "$130",
    originalPrice: "$240",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=800&fit=crop&crop=center"
    ],
    condition: "Excellent",
    size: "8Y",
    category: "Boys",
    subcategory: "coats-&-jackets",
    description: "Glossy laqué nylon gilet filled with premium down for lightweight all-weather warmth.",
    details: ["Nylon laqué exterior", "Dist down-filled", "Felt Moncler logo", "Zip front closure"],
    rating: 5,
    reviews: 35,
    inStock: true
  }
];

const Children: React.FC = () => {
  const { isFavorite, toggleFavorite, count: favoritesCount } = useFavorites();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  useEffect(() => {
    const sub = searchParams.get("subcategory");
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
    if (sub) setSelectedSubcategory(sub);
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

  const filteredProducts = useMemo(() => {
    let result = [...mockChildrenProducts];

    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedSubcategory) {
      const normalized = selectedSubcategory.toLowerCase().replace(/-/g, " ");
      result = result.filter(p => p.subcategory.toLowerCase().includes(normalized));
    }

    if (selectedConditions.length > 0) {
      result = result.filter(p => selectedConditions.includes(p.condition));
    }

    if (selectedSizes.length > 0) {
      result = result.filter(p => selectedSizes.includes(p.size));
    }

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
    const product = mockChildrenProducts.find(p => p.id === selectedProduct);
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
            <span>Kids & Toddler Department</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-black tracking-tight">
              Children's Fashion & Gear
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Showing <span className="text-black font-bold">{filteredProducts.length}</span> curated items
            </p>
          </div>
        </div>

        {/* Horizontal Category Navigation Bar */}
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

          {/* Subcategories */}
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

        {/* Toolbar */}
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
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2.5">Item Condition</h4>
                <div className="flex flex-wrap gap-2">
                  {["New", "Pre-owned", "Excellent", "Like New", "Very Good"].map(cond => {
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

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2.5">Sizes</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["12M", "5Y", "6Y", "7Y", "8Y", "9Y", "10Y", "Standard"].map(size => {
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

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2.5">Buyer Assurance</h4>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <p className="flex items-center">🛡️ 100% Quality & Authenticity Checked</p>
                  <p className="flex items-center">📦 Fast Insured Delivery</p>
                  <p className="flex items-center">🔄 Easy 14-Day Returns</p>
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
                  <div className="relative overflow-hidden rounded-xl mb-3 aspect-[3/4] bg-[#f7f7f8] flex items-center justify-center p-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-white/95 text-black font-semibold text-[10px] tracking-wider uppercase px-2 py-1 rounded shadow-xs">
                        {product.category}
                      </span>
                    </div>

                    <button
                      className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-xs hover:shadow-md transition-all z-10"
                      onClick={(e) => handleToggleFavorite(e, product)}
                      aria-label="Add to favorites"
                    >
                      <Heart className={`h-4 w-4 transition-colors ${isFav ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-500"}`} />
                    </button>

                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="bg-neutral-900/80 text-white text-[10px] font-medium px-2 py-0.5 rounded-md backdrop-blur-xs">
                        {product.condition}
                      </span>
                    </div>
                  </div>

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

export default Children;