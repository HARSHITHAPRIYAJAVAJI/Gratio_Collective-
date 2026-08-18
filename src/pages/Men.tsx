import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  { name: "All", count: 620, subcategories: [] },
  { name: "Suits & Tailoring", count: 120, subcategories: ["Suits", "Blazers", "Trousers", "Tuxedos"] },
  { name: "Shirts & Tops", count: 180, subcategories: ["Polo", "Casual Shirts", "Dress Shirts", "T-Shirts"] },
  { name: "Shoes & Sneakers", count: 145, subcategories: ["Sneakers", "Loafers", "Boots", "Oxfords"] },
  { name: "Watches & Jewelry", count: 85, subcategories: ["Luxury Watches", "Chronograph", "Automatic", "Bracelets"] },
  { name: "Accessories & Bags", count: 90, subcategories: ["Belts", "Wallets", "Bags", "Ties", "Sunglasses"] }
];

const mockMenProducts = [
  {
    id: 101,
    name: "Tom Ford Slim Fit Wool Suit",
    brand: "Tom Ford",
    price: "$2,800",
    originalPrice: "$4,200",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=center"
    ],
    condition: "Excellent",
    size: "40R",
    category: "Suits & Tailoring",
    subcategory: "suits",
    description: "Impeccable Tom Ford slim fit suit in charcoal virgin wool. Handcrafted Italian tailoring.",
    details: ["100% Virgin Wool", "Slim fit silhouette", "Two-button horn closure", "Made in Italy"],
    rating: 5,
    reviews: 7,
    inStock: true
  },
  {
    id: 102,
    name: "Ralph Lauren Custom Slim Polo",
    brand: "Ralph Lauren",
    price: "$85",
    originalPrice: "$135",
    images: [
      "https://images.unsplash.com/photo-1618354691373-5f99e139964d?w=600&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&h=800&fit=crop&crop=center"
    ],
    condition: "Like New",
    size: "M",
    category: "Shirts & Tops",
    subcategory: "polo",
    description: "Iconic polo shirt in navy blue with signature Ralph Lauren embroidered player.",
    details: ["100% Cotton Pique", "Custom slim fit", "Ribbed collar & armbands", "Machine washable"],
    rating: 4,
    reviews: 12,
    inStock: true
  },
  {
    id: 103,
    name: "Gucci Double G Leather Belt",
    brand: "Gucci",
    price: "$340",
    originalPrice: "$520",
    images: [
      "https://images.unsplash.com/photo-1612827376449-9e199ca963c4?w=600&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop&crop=center"
    ],
    condition: "Very Good",
    size: "34",
    category: "Accessories & Bags",
    subcategory: "belts",
    description: "Timeless Gucci black smooth leather belt featuring the signature palladium-toned double G buckle.",
    details: ["Genuine Smooth Leather", "Palladium-toned buckle", "3.5cm width", "Made in Italy"],
    rating: 5,
    reviews: 16,
    inStock: true
  },
  {
    id: 104,
    name: "Balenciaga Track Sneaker",
    brand: "Balenciaga",
    price: "$1,280",
    originalPrice: "$1,450",
    images: [
      "https://cdn-images.farfetch-contents.com/13/27/38/32/13273832_54473592_1000.jpg"
    ],
    condition: "New",
    size: "11 US",
    category: "Shoes & Sneakers",
    subcategory: "sneakers",
    description: "Multifaceted high-tech design with dynamic layered sole structure and signature Balenciaga branding.",
    details: ["Layered mesh and nylon", "Embossed BB logo", "Augmented back sole", "Washed vintage effect"],
    rating: 5,
    reviews: 24,
    inStock: true
  },
  {
    id: 105,
    name: "Rolex Submariner Date Watch",
    brand: "Rolex",
    price: "$9,200",
    originalPrice: "$13,500",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=800&fit=crop&crop=center"
    ],
    condition: "Excellent",
    size: "41mm",
    category: "Watches & Jewelry",
    subcategory: "luxury-watches",
    description: "Iconic Rolex Submariner Date in Oystersteel with black Cerachrom bezel. Certified Chronometer.",
    details: ["Oystersteel 904L", "Calibre 3235 automatic", "Waterproof 300m", "Original box & papers"],
    rating: 5,
    reviews: 31,
    inStock: true
  },
  {
    id: 106,
    name: "Saint Laurent Classic Biker Jacket",
    brand: "Saint Laurent",
    price: "$2,650",
    originalPrice: "$4,800",
    images: [
      "/images/jack.jpeg",
      "/images/jac.jpeg"
    ],
    condition: "Excellent",
    size: "48 (M)",
    category: "Suits & Tailoring",
    subcategory: "blazers",
    description: "Classic Saint Laurent motorcycle jacket with asymmetrical zip closure, epaulets, and silver hardware.",
    details: ["100% Lambskin Leather", "Silk cupro lining", "Multiple zip pockets", "Made in Italy"],
    rating: 5,
    reviews: 19,
    inStock: true
  },
  {
    id: 107,
    name: "Adidas Ultraboost 1.0",
    brand: "Adidas",
    price: "$140",
    originalPrice: "$190",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=600&h=800&fit=crop&crop=center"
    ],
    condition: "New",
    size: "10 US",
    category: "Shoes & Sneakers",
    subcategory: "sneakers",
    description: "High-performance running and lifestyle sneakers with energy-returning Boost midsole technology.",
    details: ["Primeknit upper", "Continental Rubber outsole", "Boost cushioning", "Torsion system"],
    rating: 4,
    reviews: 42,
    inStock: true
  },
  {
    id: 108,
    name: "Bottega Veneta Intrecciato Pouch",
    brand: "Bottega Veneta",
    price: "$1,150",
    originalPrice: "$1,650",
    images: [
      "/images/herm.jpeg",
      "/images/her.jpeg"
    ],
    condition: "Like New",
    size: "Standard",
    category: "Accessories & Bags",
    subcategory: "bags",
    description: "Handcrafted calfskin leather clutch with Bottega Veneta's iconic maxi Intreccio weave.",
    details: ["100% Calfskin", "Intreccio woven leather", "Zip top closure", "Made in Italy"],
    rating: 5,
    reviews: 14,
    inStock: true
  }
];

const Men: React.FC = () => {
  const { isFavorite, toggleFavorite, count: favoritesCount } = useFavorites();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

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

  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const toggleCondition = (condition: string) => {
    setSelectedConditions(prev => 
      prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSelectedSubcategory(null);
    setSelectedConditions([]);
    setSelectedSizes([]);
    setSelectedBrands([]);
    setSearchParams(new URLSearchParams());
  };

  const handleToggleFavorite = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  const filteredProducts = useMemo(() => {
    let result = [...mockMenProducts];

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

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
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
  }, [selectedCategory, selectedSubcategory, selectedConditions, selectedSizes, selectedBrands, sortBy]);

  const activeCategoryObj = categories.find(c => c.name.toLowerCase() === selectedCategory.toLowerCase());
  const activeFiltersCount = selectedConditions.length + selectedSizes.length + selectedBrands.length + (selectedCategory !== "All" ? 1 : 0) + (selectedSubcategory ? 1 : 0);

  if (selectedProduct) {
    const product = mockMenProducts.find(p => p.id === selectedProduct);
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
      <Navbar showBack backTo="/" />

      {/* Main Container */}
      <main className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-4 sm:py-6">
        {/* Page Header */}
        <div className="mb-3 sm:mb-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-playfair font-bold text-black tracking-tight">
              Men's Fashion & Watches
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Showing <span className="text-black font-bold">{filteredProducts.length}</span> curated items
            </p>
          </div>
        </div>

        {/* Horizontal Category Navigation Bar */}
        <div className="mb-4 border-b border-gray-100 pb-3">
          <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto scrollbar-hide py-0.5">
            {categories.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.name.toLowerCase();
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center space-x-1.5 ${
                    isActive 
                      ? "bg-black text-white shadow-2xs scale-100" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-white text-gray-500"}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Subcategories */}
          {activeCategoryObj && activeCategoryObj.subcategories.length > 0 && (
            <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-hide mt-2 pt-1.5">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mr-1 flex-shrink-0">
                Explore {activeCategoryObj.name}:
              </span>
              <button
                onClick={() => handleSubcategorySelect(null)}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
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
                    className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
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

            {selectedBrands.map(brand => (
              <span 
                key={brand} 
                onClick={() => toggleBrand(brand)}
                className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full flex items-center space-x-1 cursor-pointer hover:bg-gray-200 transition-colors"
              >
                <span>{brand}</span>
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
          <div className="bg-gray-50/90 border border-gray-200 rounded-xl p-3.5 sm:p-4 mb-6 transition-all animate-in fade-in duration-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-black">Refine Selection</h3>
              <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-black">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Item Condition</h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {["New", "Pre-owned", "Very Good"].map(cond => {
                    const isChecked = selectedConditions.includes(cond);
                    return (
                      <button
                        key={cond}
                        onClick={() => toggleCondition(cond)}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors flex items-center space-x-1 ${
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
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Designers / Brands</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["Rolex", "Louis Vuitton", "Gucci", "Tom Ford", "Prada", "Burberry", "Omega"].map(brand => {
                    const isChecked = selectedBrands.includes(brand);
                    return (
                      <button
                        key={brand}
                        onClick={() => toggleBrand(brand)}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors flex items-center space-x-1 ${
                          isChecked 
                            ? "bg-black text-white border-black" 
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {isChecked && <Check className="h-3 w-3" />}
                        <span>{brand}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Sizes</h4>
                <div className="flex flex-wrap gap-1">
                  {["S", "M", "L", "XL", "34", "40R", "41mm", "10 US", "11 US"].map(size => {
                    const isChecked = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`min-w-[30px] h-7 px-1.5 rounded text-xs font-medium border transition-colors ${
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-4">
            {filteredProducts.map((product) => {
              const isFav = isFavorite(product.id);
              return (
                <div
                  key={product.id}
                  className="group cursor-pointer flex flex-col"
                  onClick={() => setSelectedProduct(product.id)}
                >
                  <div className="relative overflow-hidden rounded-lg mb-2 aspect-square bg-[#f7f7f8] flex items-center justify-center p-2.5">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-2 left-2 z-10">
                      <span className="bg-white/95 text-black font-semibold text-[9px] tracking-wider uppercase px-1.5 py-0.5 rounded shadow-2xs">
                        {product.category}
                      </span>
                    </div>

                    <button
                      className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-2xs hover:shadow-xs transition-all z-10"
                      onClick={(e) => handleToggleFavorite(e, product)}
                      aria-label="Add to favorites"
                    >
                      <Heart className={`h-3.5 w-3.5 transition-colors ${isFav ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-500"}`} />
                    </button>

                    <div className="absolute bottom-2 left-2 z-10">
                      <span className="bg-neutral-900/80 text-white text-[9px] font-medium px-1.5 py-0.5 rounded backdrop-blur-xs">
                        {product.condition}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-0.5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{product.brand}</p>
                      <h3 className="font-medium text-xs sm:text-sm text-black line-clamp-1 group-hover:underline transition-all">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-gray-500">
                        Size: {product.size}
                      </p>
                    </div>

                    <div className="pt-0.5 flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-xs sm:text-sm text-red-600">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-[10px] text-gray-400 line-through">{product.originalPrice}</span>
                        )}
                      </div>
                      <span className="text-[9px] text-gray-500 flex items-center">
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
      <Footer />
    </div>
  );
};

export default Men;
