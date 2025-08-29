import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Search as SearchIcon, User, Heart, ArrowLeft, Filter } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Mock search suggestions
  const mockSuggestions = [
    "Chanel bag", "Louis Vuitton", "Hermès", "Gucci shoes", "Prada", 
    "Designer dresses", "Vintage jewelry", "Rolex watch", "YSL handbag", "Dior"
  ];

  // Mock search results
  const mockResults = [
    {
      id: 1,
      name: "Chanel Classic Flap Bag",
      brand: "Chanel",
      price: "$4,500",
      originalPrice: "$6,000",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=400&fit=crop&crop=center",
      condition: "Excellent",
      inStock: true
    },
    {
      id: 2,
      name: "Louis Vuitton Neverfull MM",
      brand: "Louis Vuitton", 
      price: "$1,200",
      originalPrice: "$1,800",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop&crop=center",
      condition: "Very Good",
      inStock: true
    },
    {
      id: 3,
      name: "Hermès Birkin 35",
      brand: "Hermès",
      price: "Out of Stock",
      originalPrice: "$12,000", 
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=400&fit=crop&crop=center",
      condition: "Like New",
      inStock: false
    }
  ];

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

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

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8 relative">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search by brand, item..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              {/* Search Suggestions */}
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
                  {suggestions.map((suggestion, index) => (
                    <div 
                      key={index}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-2"
                      onClick={() => setSearchQuery(suggestion)}
                    >
                      <SearchIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}
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

      {/* Search Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-playfair font-bold text-black">
              {searchQuery ? `Search results for "${searchQuery}"` : 'Search Products'}
            </h1>
            <p className="text-gray-600 mt-1">{mockResults.length} items found</p>
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>

        {searchQuery ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockResults.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img 
                    src={item.image}
                    alt={item.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                    <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
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
                  <p className="text-xs text-gray-500">{item.condition}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`font-semibold ${!item.inStock ? 'text-gray-500' : 'text-black'}`}>
                      {item.price}
                    </span>
                    {item.originalPrice && item.inStock && (
                      <span className="text-xs text-gray-500 line-through">{item.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-playfair font-semibold text-gray-500 mb-2">Start your search</h2>
            <p className="text-gray-400">Search for luxury items by brand, category, or style</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;