import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Search, User, Heart, ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductFilter from "@/components/ProductFilter";
import ProductDetail from "@/components/ProductDetail";

const Men: React.FC = () => {
  const [filters, setFilters] = useState({});
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const menProducts = [
    {
      id: 1,
      name: "Tom Ford Slim Fit Suit",
      brand: "Tom Ford",
      price: "$2,800",
      originalPrice: "$4,200",
      images: [
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=center"
      ],
      condition: "Excellent",
      size: "L",
      type: "preowned",
      subcategory: "suits",
      description: "Impeccable Tom Ford slim fit suit in charcoal wool. Perfect for formal occasions.",
      details: ["100% Virgin Wool", "Slim fit", "Two-button closure", "Dry clean only"],
      rating: 5,
      reviews: 7,
      inStock: true
    },
    {
      id: 2,
      name: "Ralph Lauren Polo Shirt",
      brand: "Ralph Lauren",
      price: "$85",
      originalPrice: "$120",
      images: [
        "https://images.unsplash.com/photo-1618354691373-5f99e139964d?w=300&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300&h=400&fit=crop&crop=center"
      ],
      condition: "Like New",
      size: "M",
      type: "new",
      subcategory: "shirts",
      description: "Classic polo shirt in navy blue with signature Ralph Lauren polo player.",
      details: ["100% Cotton Pique", "Classic fit", "Ribbed collar", "Machine washable"],
      rating: 4,
      reviews: 12,
      inStock: true
    },
    {
      id: 3,
      name: "Gucci Leather Belt",
      brand: "Gucci",
      price: "$320",
      originalPrice: "$480",
      images: [
        "https://images.unsplash.com/photo-1612827376449-9e199ca963c4?w=300&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=center"
      ],
      condition: "Very Good",
      size: "34",
      type: "preowned",
      subcategory: "accessories",
      description: "Elegant Gucci leather belt with iconic double G buckle.",
      details: ["Genuine Leather", "Silver buckle", "Made in Italy", "Includes dust bag"],
      rating: 4,
      reviews: 5,
      inStock: true
    },
    {
      id: 4,
      name: "Adidas Ultraboost Sneakers",
      brand: "Adidas",
      price: "$150",
      originalPrice: "$180",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=300&h=400&fit=crop&crop=center"
      ],
      condition: "Excellent",
      size: "10",
      type: "new",
       subcategory: "shoes",
      description: "Comfortable and stylish Adidas Ultraboost sneakers for running or casual wear.",
      details: ["Primeknit upper", "Boost midsole", "Continental rubber outsole", "Lace closure"],
      rating: 5,
      reviews: 18,
      inStock: true
    },
    {
      id: 5,
      name: "Rolex Submariner Watch",
      brand: "Rolex",
      price: "$8,500",
      originalPrice: "$12,000",
      images: [
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=500&fit=crop&crop=center"
      ],
      condition: "Excellent",
      size: "40mm",
      type: "preowned",
      subcategory: "watches",
      description: "Iconic Rolex Submariner dive watch in stainless steel.",
      details: ["Stainless steel", "Automatic movement", "Water resistant", "Certificate included"],
      rating: 5,
      reviews: 3,
      inStock: true
    },
  ];

  useEffect(() => {
    const subcategory = searchParams.get('subcategory');
    if (subcategory) {
      const filtered = menProducts.filter(product => 
        product.subcategory === subcategory
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(menProducts);
    }
  }, [searchParams]);

  if (selectedProduct) {
    const product = menProducts.find(p => p.id === selectedProduct);
    if (product) {
      return <ProductDetail product={product} />;
    }
  }
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
              <Link to="/profile" className="text-sm font-medium text-black hover:text-gray-600">
                Profile
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
      
      <ProductFilter onFilterChange={setFilters} currentFilters={filters} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-playfair font-bold text-black mb-8">Men's Fashion</h1>
         <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-playfair font-bold text-black">Men's Fashion</h1>
          {searchParams.get('subcategory') && (
            <p className="text-gray-600 mt-1">
              Showing results for: {searchParams.get('subcategory')?.replace('-', ' ')}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {filteredProducts.map((item) => (
            <div 
              key={item.id} 
              className="group cursor-pointer"
              onClick={() => setSelectedProduct(item.id)}
            >
              <div className="relative overflow-hidden rounded-lg mb-3">
                <img 
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                 <button 
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Added to favorites:', item.name);
                  }}
                >
                  <Heart className="h-4 w-4 text-red-500 fill-current" />
                </button>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">{item.brand}</p>
                <h3 className="font-medium text-black line-clamp-2">{item.name}</h3>
                <p className="text-xs text-gray-500">Size: {item.size} • {item.condition}</p>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-black">{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">{item.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Men;
