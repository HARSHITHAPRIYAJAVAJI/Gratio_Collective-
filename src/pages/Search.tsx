import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Heart, Filter } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";

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
    setSearchQuery(query);
  }, [query]);

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
      <Navbar showBack backTo="/" />

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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-4">
            {mockResults.map((item) => (
              <div key={item.id} className="group cursor-pointer flex flex-col justify-between">
                <div className="relative overflow-hidden rounded-lg mb-2 aspect-square bg-gray-50 flex items-center justify-center p-2.5">
                  <img 
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-2xs hover:shadow-xs transition-shadow">
                    <Heart className="h-3.5 w-3.5 text-gray-400 hover:text-red-500" />
                  </button>
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">Out of Stock</span>
                    </div>
                  )}
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{item.brand}</p>
                  <h3 className="font-medium text-xs sm:text-sm text-black line-clamp-1 group-hover:underline">{item.name}</h3>
                  <p className="text-[11px] text-gray-500">{item.condition}</p>
                  <div className="flex items-center space-x-1.5 pt-0.5">
                    <span className={`font-bold text-xs sm:text-sm ${!item.inStock ? 'text-gray-500' : 'text-black'}`}>
                      {item.price}
                    </span>
                    {item.originalPrice && item.inStock && (
                      <span className="text-[10px] text-gray-500 line-through">{item.originalPrice}</span>
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
      <Footer />
    </div>
  );
};

export default Search;