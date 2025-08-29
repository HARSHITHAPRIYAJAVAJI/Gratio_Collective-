import { useState } from "react";
import { Heart, ShoppingCart, ArrowLeft, Star, Share, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";

interface ProductDetailProps {
  product: {
    id: number;
    name: string;
    brand: string;
    price: string;
    originalPrice?: string;
    images: string[];
    condition: string;
    size: string;
    description: string;
    details: string[];
    rating: number;
    reviews: number;
    inStock: boolean;
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.size);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const sizes = ["XS", "S", "M", "L", "XL"];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
    // Cart functionality will be implemented
  };

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
    console.log(`${isFavorite ? 'Removed from' : 'Added to'} favorites: ${product.name}`);
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
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5 text-black" />
                <span className="text-sm font-medium">Back</span>
              </button>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-96 lg:h-[600px] object-cover rounded-lg"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
                  >
                    <ChevronLeft className="h-6 w-6 text-black" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
                  >
                    <ChevronRight className="h-6 w-6 text-black" />
                  </button>
                </>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-black' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">{product.brand}</p>
              <h1 className="text-3xl font-playfair font-bold text-black mt-1">{product.name}</h1>
              
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-black">{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">{product.originalPrice}</span>
              )}
              <Badge className="bg-green-100 text-green-800">
                {product.condition}
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-black mb-2">Size</h3>
                <div className="flex space-x-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-black mb-2">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border border-gray-300 rounded">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button 
              onClick={() => {
                handleAddToCart();
                // Example: Save to localStorage or global state for cart
                const cart = JSON.parse(localStorage.getItem("cart") || "[]");
                cart.push({ ...product, quantity, size: selectedSize });
                localStorage.setItem("cart", JSON.stringify(cart));
              }}
              className="flex-1 bg-black text-white hover:bg-gray-800 h-12"
              disabled={!product.inStock}
              >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button
              onClick={() => {
                handleAddToFavorites();
                // Example: Save to localStorage or global state for favorites
                const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
                // Prevent duplicates
                if (!favorites.some((item: any) => item.id === product.id)) {
                favorites.push(product);
                localStorage.setItem("favorites", JSON.stringify(favorites));
                }
              }}
              variant="outline"
              className="h-12 px-6"
              >
              <Heart className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-current' : ''}`} />
              </Button>
              <Button
              variant="outline"
              className="h-12 px-6"
              onClick={() => {
                // Example: Share functionality (copy link)
                navigator.clipboard.writeText(window.location.href);
                alert("Product link copied!");
              }}
              >
              <Share className="h-5 w-5" />
              </Button>
            </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-black mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div>
                <h3 className="font-medium text-black mb-2">Details</h3>
                <ul className="space-y-1">
                  {product.details.map((detail, index) => (
                    <li key={index} className="text-sm text-gray-600">• {detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default ProductDetail;