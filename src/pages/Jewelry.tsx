import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, User, Heart, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductFilter from "@/components/ProductFilter";
import ProductDetail from "@/components/ProductDetail";
import { useFavorites } from "@/utils/favorites";

const Jewelry: React.FC = () => {
  const { isFavorite, toggleFavorite, count: favoritesCount } = useFavorites();
  const [filters, setFilters] = useState({});
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const navigate = useNavigate();

  const jewelryProducts = [
    {
      id: 1,
      name: "Cartier Love Bracelet",
      brand: "Cartier",
      price: "$6,500",
      originalPrice: "$7,200",
      images: [
        "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop&crop=center"
      ],
      condition: "Excellent",
      size: "17",
      description: "The iconic Cartier Love bracelet in 18k rose gold. A symbol of uncompromising love.",
      details: ["18k Rose Gold", "Size 17", "Includes original screwdriver", "Certificate of authenticity"],
      rating: 5,
      reviews: 24,
      inStock: true,
      type: "preowned"
    },
    {
      id: 2,
      name: "Tiffany & Co. Diamond Ring",
      brand: "Tiffany & Co.",
      price: "$12,800",
      originalPrice: "$15,000",
      images: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=500&fit=crop&crop=center"
      ],
      condition: "Like New",
      size: "6",
      description: "Stunning diamond solitaire ring from Tiffany & Co. with exceptional clarity.",
      details: ["1.2 carat diamond", "Platinum setting", "VVS1 clarity", "Size 6"],
      rating: 5,
      reviews: 18,
      inStock: true,
      type: "preowned"
    },
    {
      id: 3,
      name: "Rolex Datejust Watch",
      brand: "Rolex",
      price: "Out of Stock",
      originalPrice: "$8,500",
      images: [
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=500&fit=crop&crop=center"
      ],
      condition: "Very Good",
      size: "36mm",
      description: "Classic Rolex Datejust with steel and gold construction.",
      details: ["36mm case", "Automatic movement", "Steel and gold", "Date function"],
      rating: 4,
      reviews: 31,
      inStock: false,
      type: "preowned"
    }
  ];

  if (selectedProduct) {
    const product = jewelryProducts.find(p => p.id === selectedProduct);
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
              <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
                <img 
                  src="/images/l.png" 
                  alt="Gratio Collective" 
                  className="h-10 sm:h-12 w-auto object-contain" 
                />
              </Link>
            </div>

            <div className="flex items-center space-x-4">
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
              <div className="relative p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                <ShoppingCart className="h-5 w-5 text-black cursor-pointer" />
                <Badge className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                  0
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <ProductFilter onFilterChange={setFilters} currentFilters={filters} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-playfair font-bold text-black mb-8">Jewelry & Watches</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {jewelryProducts.map((item) => {
            const isFav = isFavorite(item.id);
            return (
            <div 
              key={item.id} 
              className="group cursor-pointer"
              onClick={() => setSelectedProduct(item.id)}
            >
              <div className="relative overflow-hidden rounded-lg mb-3 aspect-[3/4] bg-gray-50 flex items-center justify-center p-2">
                <img 
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <button 
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item);
                  }}
                  aria-label="Toggle favorite"
                >
                  <Heart className={`h-4 w-4 transition-colors ${isFav ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-500"}`} />
                </button>
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">{item.brand}</p>
                <h3 className="font-medium text-black line-clamp-2">{item.name}</h3>
                <p className="text-xs text-gray-500">Size: {item.size} • {item.condition}</p>
                <div className="flex items-center space-x-2">
                  <span className={`font-semibold ${item.inStock ? 'text-black' : 'text-gray-500'}`}>
                    {item.price}
                  </span>
                  {item.originalPrice && item.inStock && (
                    <span className="text-xs text-gray-500 line-through">{item.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Jewelry;