import { useState, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Heart, SlidersHorizontal, ChevronDown, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductDetail from "@/components/ProductDetail";
import { useFavorites } from "@/utils/favorites";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const mockFootwearProducts = [
  {
    id: 1,
    name: "Nike Air Jordan 1 Retro High OG",
    brand: "Nike",
    price: "$280",
    originalPrice: "$350",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
    ],
    category: "Sneakers",
    condition: "New",
    size: "10 US",
    description: "Chicago colorway Air Jordan 1 High in premium full-grain leather with Air-Sole heel unit.",
    details: ["Full-grain leather", "Solid rubber outsole", "Original packaging & extra laces", "Deadstock condition"],
    rating: 4.9,
    reviews: 142,
    inStock: true
  },
  {
    id: 2,
    name: "Classic Premium 6-Inch Waterproof Boots",
    brand: "Timberland",
    price: "$199",
    originalPrice: "$299",
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e8b47b9409?w=400&h=400&fit=crop"
    ],
    category: "Boots",
    condition: "Very Good",
    size: "9.5 US",
    description: "Original direct-attach waterproof nubuck leather construction with anti-fatigue technology.",
    details: ["Waterproof nubuck leather", "Primaloft insulation", "Rubber lug outsole", "Padded collar"],
    rating: 4.6,
    reviews: 89,
    inStock: true
  },
  {
    id: 3,
    name: "Christian Louboutin Kate 100 Pumps",
    brand: "Christian Louboutin",
    price: "$650",
    originalPrice: "$895",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop"
    ],
    category: "Heels",
    condition: "Very Good",
    size: "38 IT",
    description: "Iconic pointed-toe black patent leather stiletto pumps with signature red lacquered sole.",
    details: ["100mm Stiletto heel", "Patent calf leather", "Signature red sole", "Includes dust bag"],
    rating: 4.8,
    reviews: 56,
    inStock: true
  },
  {
    id: 4,
    name: "Pinch Penny Classic Leather Loafers",
    brand: "Cole Haan",
    price: "$120",
    originalPrice: "$168",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"
    ],
    category: "Casual",
    condition: "New",
    size: "10.5 US",
    description: "Hand-burnished calfskin leather moccasin loafers with Grand.OS cushioned comfort sole.",
    details: ["Hand-burnished leather", "Grand.OS cushioning", "Leather sole", "Slip-on design"],
    rating: 4.7,
    reviews: 34,
    inStock: true
  },
  {
    id: 5,
    name: "Hurricane XLT2 Performance Sandals",
    brand: "Teva",
    price: "$59",
    originalPrice: "$89",
    images: [
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop"
    ],
    category: "Sandals",
    condition: "New",
    size: "9 US",
    description: "Quick-dry webbing strap athletic sandals made from recycled plastic polyester yarn.",
    details: ["Quick-dry REPREVE webbing", "EVA foam midsole", "Rugged Durabrasion rubber sole", "Hook-and-loop closure"],
    rating: 4.4,
    reviews: 23,
    inStock: true
  },
  {
    id: 6,
    name: "Park Avenue Cap-Toe Oxford Shoes",
    brand: "Allen Edmonds",
    price: "$249",
    originalPrice: "$395",
    images: [
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=400&fit=crop"
    ],
    category: "Formal",
    condition: "Pre-owned",
    size: "10D US",
    description: "Timeless American luxury Goodyear welted cap-toe oxfords in European calfskin leather.",
    details: ["360º Bench Welt construction", "Single oak leather sole", "CustomCork insole", "Handcrafted in USA"],
    rating: 4.9,
    reviews: 64,
    inStock: true
  }
];

const categories = [
  { name: "All", count: 6 },
  { name: "Sneakers", count: 1 },
  { name: "Boots", count: 1 },
  { name: "Heels", count: 1 },
  { name: "Casual", count: 1 },
  { name: "Sandals", count: 1 },
  { name: "Formal", count: 1 }
];

const Footwear: React.FC = () => {
  const [searchParams] = useSearchParams();
  const subcategoryParam = searchParams.get('subcategory');

  const { isFavorite, toggleFavorite } = useFavorites();
  const [selectedCategory, setSelectedCategory] = useState(
    subcategoryParam ? subcategoryParam.charAt(0).toUpperCase() + subcategoryParam.slice(1) : "All"
  );
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const toggleCondition = (condition: string) => {
    setSelectedConditions(prev => 
      prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSelectedConditions([]);
    setSelectedBrands([]);
    setSelectedTypes([]);
    setSortBy("newest");
  };

  const filteredProducts = useMemo(() => {
    return mockFootwearProducts.filter((product) => {
      if (selectedCategory !== "All" && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      if (selectedConditions.length > 0 && !selectedConditions.includes(product.condition)) {
        return false;
      }
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      if (selectedTypes.length > 0 && !selectedTypes.includes(product.category)) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[$,]/g, '')) || 0;
      const priceB = parseFloat(b.price.replace(/[$,]/g, '')) || 0;
      if (sortBy === "price-low") return priceA - priceB;
      if (sortBy === "price-high") return priceB - priceA;
      if (sortBy === "popular") return b.rating - a.rating;
      return b.id - a.id;
    });
  }, [selectedCategory, selectedConditions, selectedBrands, selectedTypes, sortBy]);

  const activeFiltersCount = selectedConditions.length + selectedBrands.length + selectedTypes.length + (selectedCategory !== "All" ? 1 : 0);

  if (selectedProduct) {
    const product = mockFootwearProducts.find(p => p.id === selectedProduct);
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
              Footwear Collection
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
                  onClick={() => setSelectedCategory(cat.name)}
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

            {selectedTypes.map(type => (
              <span 
                key={type} 
                onClick={() => toggleType(type)}
                className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full flex items-center space-x-1 cursor-pointer hover:bg-gray-200 transition-colors"
              >
                <span>{type}</span>
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
              {/* Condition Filter */}
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

              {/* Brands Filter */}
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Footwear Brands</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["Nike", "Timberland", "Christian Louboutin", "Cole Haan", "Teva", "Allen Edmonds"].map(brand => {
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

              {/* Styles */}
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Silhouette & Style</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["Sneakers", "Boots", "Heels", "Casual", "Sandals", "Formal"].map(type => {
                    const isChecked = selectedTypes.includes(type);
                    return (
                      <button
                        key={type}
                        onClick={() => toggleType(type)}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors flex items-center space-x-1 ${
                          isChecked 
                            ? "bg-black text-white border-black" 
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {isChecked && <Check className="h-3 w-3" />}
                        <span>{type}</span>
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
            {filteredProducts.map((item) => {
              const isFav = isFavorite(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedProduct(item.id)}
                  className="group cursor-pointer flex flex-col justify-between"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-lg mb-2 aspect-square bg-[#f7f7f8] flex items-center justify-center p-2.5">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category Overlay Badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <span className="bg-white/90 text-neutral-900 text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded shadow-2xs backdrop-blur-xs">
                        {item.category}
                      </span>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-2xs hover:shadow-xs transition-all z-10 cursor-pointer"
                      title={isFav ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart className={`h-3.5 w-3.5 transition-colors ${isFav ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-500"}`} />
                    </button>

                    {/* Condition Tag */}
                    <div className="absolute bottom-2 left-2 z-10">
                      <span className="bg-neutral-900/80 text-white text-[9px] font-medium px-1.5 py-0.5 rounded backdrop-blur-xs">
                        {item.condition}
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      {item.brand}
                    </p>
                    <h3 className="font-medium text-xs sm:text-sm text-neutral-900 line-clamp-1 group-hover:text-black transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-gray-500">Size: {item.size}</p>
                    <div className="flex items-baseline justify-between pt-0.5">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-xs sm:text-sm text-neutral-950 font-inter">
                          {item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-[10px] text-gray-400 line-through">
                            {item.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">
                        Available
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

export default Footwear;