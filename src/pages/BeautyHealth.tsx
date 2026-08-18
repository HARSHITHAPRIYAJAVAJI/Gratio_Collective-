import { useState, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Heart, SlidersHorizontal, ChevronDown, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductDetail from "@/components/ProductDetail";
import { useFavorites } from "@/utils/favorites";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const mockBeautyProducts = [
  {
    id: 1,
    name: "Sublimage La Crème Ultimate Skin Care",
    brand: "Chanel",
    price: "$380",
    originalPrice: "$450",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop"
    ],
    category: "Skincare",
    condition: "New",
    size: "50g",
    description: "Exceptional revitalizing face cream enriched with Planifolia PFA for ultimate radiance and youth.",
    details: ["Planifolia Polyfractioned Vanilla", "50g sealed jar", "Includes golden spatula", "100% genuine sealed"],
    rating: 4.9,
    reviews: 54,
    inStock: true
  },
  {
    id: 2,
    name: "Masterclass Pro Artist Makeup Set",
    brand: "MAC",
    price: "$159",
    originalPrice: "$229",
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop"
    ],
    category: "Makeup",
    condition: "New",
    size: "Full Set",
    description: "Complete professional 24-piece brush and pigment kit in a travel-ready leather roll.",
    details: ["24 Professional Brushes", "Hypoallergenic synthetic bristles", "Leatherette roll case", "Limited edition"],
    rating: 4.8,
    reviews: 62,
    inStock: true
  },
  {
    id: 3,
    name: "Hair Perfector No. 3, 4 & 5 Bundle",
    brand: "Olaplex",
    price: "$75",
    originalPrice: "$98",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop"
    ],
    category: "Hair",
    condition: "New",
    size: "250ml x 3",
    description: "Complete bond maintenance repair routine with Bond Multiplier technology for damaged hair.",
    details: ["No.3 Treatment, No.4 Shampoo, No.5 Conditioner", "Sulfate-free", "Color-safe", "Brand new sealed"],
    rating: 4.9,
    reviews: 88,
    inStock: true
  },
  {
    id: 4,
    name: "Sauvage Elixir Eau de Parfum",
    brand: "Dior",
    price: "$199",
    originalPrice: "$250",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop"
    ],
    category: "Fragrance",
    condition: "New",
    size: "60ml",
    description: "An extraordinarily concentrated fragrance steeped in the iconic freshness of Sauvage with a heady heart of spices.",
    details: ["60ml Spray", "Notes of Cinnamon, Nutmeg, Cardamom & Lavender", "Nighttime intensity", "Batch verified"],
    rating: 5.0,
    reviews: 112,
    inStock: true
  },
  {
    id: 5,
    name: "Dyson Airwrap Multi-Styler Complete",
    brand: "Dyson",
    price: "$480",
    originalPrice: "$599",
    images: [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&h=400&fit=crop"
    ],
    category: "Hair",
    condition: "Very Good",
    size: "Complete Long",
    description: "Engineered for multiple hair types with Coanda airflow technology for curling, shaping, and smoothing without extreme heat.",
    details: ["Includes 6 styling attachments", "Copper/Nickel colorway", "Storage case included", "Condition grade A"],
    rating: 4.8,
    reviews: 49,
    inStock: true
  },
  {
    id: 6,
    name: "Baccarat Rouge 540 Extrait de Parfum",
    brand: "Maison Francis Kurkdjian",
    price: "$390",
    originalPrice: "$475",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop"
    ],
    category: "Fragrance",
    condition: "New",
    size: "70ml",
    description: "Luminous and intense aroma of amber woody and floral aura featuring Egyptian grandiflorum jasmine and bitter almond.",
    details: ["70ml Extrait Spray", "Red crystal bottle with gold cap", "Longest lasting sillage", "Original box"],
    rating: 5.0,
    reviews: 97,
    inStock: true
  }
];

const categories = [
  { name: "All", count: 6 },
  { name: "Skincare", count: 1 },
  { name: "Makeup", count: 1 },
  { name: "Hair", count: 2 },
  { name: "Fragrance", count: 2 },
  { name: "Wellness", count: 0 }
];

const BeautyHealth: React.FC = () => {
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
    return mockBeautyProducts.filter((product) => {
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
    const product = mockBeautyProducts.find(p => p.id === selectedProduct);
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
              Beauty & Health
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
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Brands & Maisons</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["Chanel", "MAC", "Olaplex", "Dior", "Dyson", "Maison Francis Kurkdjian"].map(brand => {
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

              {/* Category */}
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Department</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["Skincare", "Makeup", "Hair", "Fragrance"].map(type => {
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

export default BeautyHealth;