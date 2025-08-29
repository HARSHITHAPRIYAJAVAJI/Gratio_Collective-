import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, User, Heart, ArrowLeft, Filter, ChevronDown } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import ProductDetail from "@/components/ProductDetail";

const Women: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const categories = [
    { name: "Clothing", count: 245, subcategories: ["Dresses", "Tops", "Jackets", "Pants", "Skirts"] },
    { name: "Shoes", count: 189, subcategories: ["Heels", "Sneakers", "Boots", "Flats", "Sandals"] },
    { name: "Bags", count: 156, subcategories: ["Handbags", "Shoulder Bags", "Clutches", "Backpacks", "Totes"] },
    { name: "Accessories", count: 98, subcategories: ["Jewelry", "Scarves", "Belts", "Sunglasses", "Watches"] },
    { name: "Vintage", count: 67, subcategories: ["60s", "70s", "80s", "90s", "2000s"] }
  ];

  const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(null);

  const handleCategoryClick = (index: number) => {
    setOpenCategoryIndex(openCategoryIndex === index ? null : index);
  };

  const mockProducts = [
    {
      id: 1,
      name: "Chanel Tweed Jacket",
      brand: "Chanel",
      price: "$2,500",
      originalPrice: "$4,000",
      images: [
        "/images/jac.jpeg",
        "/images/jack.jpeg"
      ],
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
      images: [
        "/images/sho.jpeg", "/images/shoe.jpeg"
      ],
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
      name: "Hermès Kelly Bag",
      brand: "Hermès",
      price: "Out of Stock",
      originalPrice: "$8,000",
      images: [
        "/images/her.jpeg", "/images/herm.jpeg"
      ],
      condition: "New",
      size: "32cm",
      category: "Bags",
      subcategory: "handbags",
      description: "Authentic Hermès Kelly bag in Epsom leather. A true investment piece.",
      details: ["Epsom leather", "Gold hardware", "32cm size", "Includes dustbag and keys"],
      rating: 5,
      reviews: 15,
      inStock: false,
      outOfStock: true
    },
    {
      id: 4,
      name: "Gucci Silk Scarf",
      brand: "Gucci",
      price: "$180",
      originalPrice: "$350",
      images: [
        "/images/guc.jpeg", "/images/gucc.jpeg"
      ],
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
      name: "Vintage Chanel Dress",
      brand: "Chanel",
      price: "$1,200",
      originalPrice: "$2,500",
      images: [
        "/images/chane.jpeg", "/images/chan.jpeg", "/images/cha.jpeg"
      ],
      condition: "Pre-owned",
      size: "36",
      category: "Vintage",
      subcategory: "dresses",
      description: "Rare vintage Chanel dress from the 1980s. A collector's item.",
      details: ["Wool blend", "Fully lined", "Made in France", "Classic Chanel design"],
      rating: 5,
      reviews: 9,
      inStock: true
    },
    {
      id: 6,
      name: "YSL Tribute Sandals",
      brand: "Saint Laurent",
      price: "$450",
      originalPrice: "$750",
      images: [
        "/images/ysl.jpeg", "/images/ysl1.jpeg"
      ],
      condition: "Very Good",
      size: "37",
      category: "Shoes",
      subcategory: "sandals",
      description: "Saint Laurent Tribute platform sandals in nude leather. A statement shoe.",
      details: ["Leather upper", "Platform sole", "Adjustable ankle strap", "Made in Italy"],
      rating: 4,
      reviews: 14,
      inStock: true
    }
  ];

  useEffect(() => {
    const subcategory = searchParams.get('subcategory');
    let currentFilteredProducts = mockProducts;

    if (subcategory) {
      currentFilteredProducts = currentFilteredProducts.filter(product =>
        product.subcategory === subcategory
      );
    }

    // Apply condition filters
    const conditionFilters = selectedFilters.filter(filter => ["New", "Pre-owned"].includes(filter));
    if (conditionFilters.length > 0) {
      currentFilteredProducts = currentFilteredProducts.filter(product =>
        conditionFilters.includes(product.condition)
      );
    }

    setFilteredProducts(currentFilteredProducts);
  }, [searchParams, selectedFilters]); // Added selectedFilters to dependency array

  if (selectedProduct) {
    const product = mockProducts.find(p => p.id === selectedProduct);
    if (product) {
      return <ProductDetail product={product} />;
    }
  }

  const handleAddToFavorites = (product: any) => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!favs.find((item: any) => item.id === product.id)) {
      favs.push(product);
      localStorage.setItem("favorites", JSON.stringify(favs));
    }
  };

  const handleAddToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!cart.find((item: any) => item.id === product.id)) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Top Banner */}
      <div className="bg-yellow-300 text-center py-2">
        <p className="text-sm font-medium text-black">Get 10% off with code WELCOME10*</p>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-5 w-5 text-black" />
                <span className="text-sm font-medium">Back</span>
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-2xl font-playfair font-bold text-black">
                Graito Collective
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/favorites" className="relative">
                <Heart className="h-5 w-5 text-black cursor-pointer" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </Badge>
              </Link>
              <Link to="/profile">
                <User className="h-5 w-5 text-black cursor-pointer" />
              </Link>
              <div className="relative">
                <ShoppingCart className="h-5 w-5 text-black cursor-pointer" />
                <Badge className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-black">Women</h1>
            {searchParams.get('subcategory') && (
              <p className="text-gray-600 mt-1">
                Showing results for: {searchParams.get('subcategory')?.replace('-', ' ')}
              </p>
            )}
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div>
                <h3 className="font-playfair font-semibold text-lg mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <div key={index}>
                      <div
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleCategoryClick(index)}
                      >
                        <div>
                          <span className="font-medium text-black">{category.name}</span>
                          <span className="text-sm text-gray-500 ml-2">({category.count})</span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 text-gray-400 transition-transform ${openCategoryIndex === index ? "rotate-180" : ""}`}
                        />
                      </div>
                      {/* Subcategories */}
                      {openCategoryIndex === index && (
                        <div className="ml-6 mt-2 space-y-1">
                          {category.subcategories.map((sub, subIdx) => (
                            <div
                              key={subIdx}
                              className="text-sm text-gray-700 py-1 px-2 rounded hover:bg-gray-100 cursor-pointer"
                              onClick={e => {
                                e.stopPropagation();
                                // This sets the search param, which the useEffect listens to
                                const newSearchParams = new URLSearchParams(searchParams);
                                newSearchParams.set('subcategory', sub.toLowerCase().replace(' ', '-'));
                                window.history.pushState({}, '', `?${newSearchParams.toString()}`);
                              }}
                            >
                              {sub}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {showFilters && (
                <div>
                  <h3 className="font-playfair font-semibold text-lg mb-4">Filters</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Size</h4>
                      <div className="space-y-2">
                        {["XS", "S", "M", "L", "XL"].map((size) => (
                          <label key={size} className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">{size}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Condition</h4>
                      <div className="space-y-2">
                        {["New", "Pre-owned"].map((condition) => (
                          <label key={condition} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className="rounded"
                              checked={selectedFilters.includes(condition)}
                              onChange={(e) => {
                                const newFilters = [...selectedFilters];
                                if (e.target.checked) {
                                  newFilters.push(condition);
                                } else {
                                  const index = newFilters.indexOf(condition);
                                  if (index > -1) {
                                    newFilters.splice(index, 1);
                                  }
                                }
                                setSelectedFilters(newFilters);
                              }}
                            />
                            <span className="text-sm">{condition}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{filteredProducts.length} items</p>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>Sort by: Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProduct(product.id)}
                >
                  <div className="relative overflow-hidden rounded-lg mb-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                      onClick={e => {
                        e.stopPropagation();
                        handleAddToFavorites(product);
                      }}
                    >
                      <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
                    </button>
                    {product.outOfStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">Out of Stock</span>
                      </div>
                    )}
                    <Badge className="absolute top-3 left-3 bg-black text-white text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{product.brand}</p>
                    <h3 className="font-medium text-black line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-gray-500">Size: {product.size} • {product.condition}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold ${product.outOfStock ? 'text-gray-500' : 'text-black'}`}>
                        {product.price}
                      </span>
                      {product.originalPrice && !product.outOfStock && (
                        <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (() => {
        const product = mockProducts.find(p => p.id === selectedProduct);
        if (!product) return null;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-black"
                onClick={() => setSelectedProduct(null)}
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full md:w-56 h-72 object-cover rounded-lg"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold font-playfair mb-2">{product.name}</h2>
                    <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                    <p className="text-sm text-gray-500 mb-1">Category: {product.category}</p>
                    <p className="text-sm text-gray-500 mb-1">Size: {product.size}</p>
                    <p className="text-sm text-gray-500 mb-1">Condition: {product.condition}</p>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`font-semibold text-lg ${product.outOfStock ? 'text-gray-500' : 'text-black'}`}>
                        {product.price}
                      </span>
                      {product.originalPrice && !product.outOfStock && (
                        <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    {product.outOfStock && (
                      <span className="inline-block bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs mb-2">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button
                      variant="outline"
                      disabled={product.outOfStock}
                      onClick={() => {
                        handleAddToCart(product);
                        window.dispatchEvent(new Event("storage"));
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        handleAddToFavorites(product);
                        window.dispatchEvent(new Event("storage"));
                      }}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

export default Women;