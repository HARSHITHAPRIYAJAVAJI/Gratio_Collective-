import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Search, User, Heart, ArrowLeft } from "lucide-react";
import { Link,useSearchParams } from "react-router-dom";
import { useState ,useEffect} from "react";
import ProductFilter from "@/components/ProductFilter";

const Children: React.FC = () => {
  const [filters, setFilters] = useState({});
const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const childrenProducts = [
    {
      id: 1,
      name: "Burberry Kids Trench Coat",
      brand: "Burberry",
      price: "$180",
      originalPrice: "$320",
      image: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=300&h=400&fit=crop&crop=center",
      condition: "Very Good",
      size: "8Y",
      type: "preowned",
      subcategory: "boys"
    },
    {
      id: 2,
      name: "Girls Unicorn Dress",
      brand: "H&M Kids",
      price: "$25",
      originalPrice: "$40",
      image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=300&h=400&fit=crop&crop=center",
      condition: "Like New",
      size: "6Y",
      type: "new",
      subcategory: "girls"
    },
    {
      id: 3,
      name: "Baby Nike Sneakers",
      brand: "Nike",
      price: "$35",
      originalPrice: "$50",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=400&fit=crop&crop=center",
      condition: "Excellent",
      size: "12M",
      type: "preowned",
      subcategory: "baby"
    },
    {
      id: 4,
      name: "School Backpack",
      brand: "JanSport",
      price: "$45",
      originalPrice: "$60",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop&crop=center",
      condition: "Very Good",
      size: "Standard",
      type: "preowned",
      subcategory: "school-wear"
    },
    {
      id: 5,
      name: "Mini Rodini Panda Sweatshirt",
      brand: "Mini Rodini",
      price: "$45",
      originalPrice: "$80",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=300&h=400&fit=crop&crop=center",
      condition: "Good",
      size: "6Y",
      type: "preowned",
      subcategory: "boys"
    },
    {
      id: 6,
      name: "Gucci Kids Logo T-shirt",
      brand: "Gucci",
      price: "$90",
      originalPrice: "$150",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=400&fit=crop&crop=center",
      condition: "Excellent",
      size: "10Y",
      type: "preowned",
      subcategory: "boys"
    },
    {
      id: 7,
      name: "Zara Kids Denim Jacket",
      brand: "Zara",
      price: "$25",
      originalPrice: "$50",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=300&h=400&fit=crop&crop=center",
      condition: "Very Good",
      size: "7Y",
      type: "preowned",
      subcategory: "girls"
    },
    {
      id: 8,
      name: "H&M Kids Floral Dress",
      brand: "H&M",
      price: "$15",
      originalPrice: "$30",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=center",
      condition: "Good",
      size: "5Y",
      type: "preowned",
      subcategory: "girls"
    },
    {
      id: 9,
      name: "Moncler Kids Down Vest",
      brand: "Moncler",
      price: "$120",
      originalPrice: "$220",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300&h=400&fit=crop&crop=center",
      condition: "Excellent",
      size: "9Y",
      type: "preowned",
      subcategory: "boys"
    },
    {
      id: 10,
      name: "Nike Kids Air Max Sneakers",
      brand: "Nike",
      price: "$40",
      originalPrice: "$75",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300&h=400&fit=crop&crop=center",
      condition: "Very Good",
      size: "8Y",
      type: "preowned",
      subcategory: "boys"
    },
    {
      id: 11,
      name: "Adidas Kids Tracksuit",
      brand: "Adidas",
      price: "$35",
      originalPrice: "$60",
      image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=300&h=400&fit=crop&crop=center",
      condition: "Good",
      size: "6Y",
      type: "preowned",
      subcategory: "boys"
    }
  ];

  useEffect(() => {
    const subcategory = searchParams.get('subcategory');
    if (subcategory) {
      const filtered = childrenProducts.filter(product =>
        product.subcategory === subcategory
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(childrenProducts);
    }
  }, [searchParams]);

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
              <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="h-5 w-5 text-black" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="h-5 w-5 text-black" />
              </button>
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
        <div className="mb-8">
          <h1 className="text-3xl font-playfair font-bold text-black">Children's Fashion</h1>
          {searchParams.get('subcategory') && (
            <p className="text-gray-600 mt-1">
              Showing results for: {searchParams.get('subcategory')?.replace('-', ' ')}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
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

export default Children;