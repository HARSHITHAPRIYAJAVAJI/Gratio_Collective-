import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Menu, Search, User, Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Favorites: React.FC = () => {
  // Mock favorite items data
  const favoriteItems = [
    {
      id: 1,
      name: "Chanel Classic Flap Bag",
      brand: "Chanel",
      price: "$4,500",
      originalPrice: "$6,000",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=400&fit=crop&crop=center",
      condition: "Excellent",
      size: "Medium"
    },
    {
      id: 2,
      name: "Louis Vuitton Neverfull MM",
      brand: "Louis Vuitton",
      price: "$1,200",
      originalPrice: "$1,800",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop&crop=center",
      condition: "Very Good",
      size: "MM"
    },
    {
      id: 3,
      name: "Hermès Birkin 35",
      brand: "Hermès",
      price: "Out of Stock",
      originalPrice: "$12,000",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=400&fit=crop&crop=center",
      condition: "Like New",
      size: "35cm",
      outOfStock: true
    }
  ];

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

      {/* Favorites Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-3 mb-8">
          <Heart className="h-6 w-6 text-red-500 fill-current" />
          <h1 className="text-3xl font-playfair font-bold text-black">My Favorites</h1>
          <Badge className="bg-gray-100 text-black">{favoriteItems.length}</Badge>
        </div>

        {favoriteItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-playfair font-semibold text-gray-500 mb-2">No favorites yet</h2>
            <p className="text-gray-400 mb-6">Start browsing and add items to your favorites</p>
            <Link to="/">
              <Button className="bg-black text-white hover:bg-gray-800">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteItems.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img 
                    src={item.image}
                    alt={item.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                  </button>
                  {item.outOfStock && (
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
                    <span className={`font-semibold ${item.outOfStock ? 'text-gray-500' : 'text-black'}`}>
                      {item.price}
                    </span>
                    {item.originalPrice && !item.outOfStock && (
                      <span className="text-xs text-gray-500 line-through">{item.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;