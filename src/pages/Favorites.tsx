import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  User, 
  Heart, 
  ArrowLeft, 
  Trash2, 
  Sparkles,
  ShoppingBag
} from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites, ProductItem } from "@/utils/favorites";
import ProductDetail from "@/components/ProductDetail";

const Favorites: React.FC = () => {
  const { favorites, removeFavorite, count } = useFavorites();
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const handleAddToCart = (e: React.MouseEvent, product: ProductItem) => {
    e.stopPropagation();
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (!cart.find((item: any) => String(item.id) === String(product.id))) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("storage"));
      }
    } catch (err) {
      console.error("Cart error:", err);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to remove all saved favorites?")) {
      localStorage.setItem("favorites", "[]");
      localStorage.setItem("favoritesCount", "0");
      window.dispatchEvent(new Event("favoritesChanged"));
      window.dispatchEvent(new Event("storage"));
    }
  };

  if (selectedProduct) {
    return (
      <ProductDetail 
        product={selectedProduct} 
        onBack={() => setSelectedProduct(null)} 
        onSelectProduct={(p) => setSelectedProduct(p)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Top Banner */}
      <div className="bg-yellow-300 text-center py-2 w-full">
        <p className="text-xs sm:text-sm font-medium text-black">Get 10% off with code WELCOME10*</p>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link 
                to="/" 
                className="flex items-center space-x-1.5 text-xs sm:text-sm font-medium text-black hover:text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <Link to="/" className="text-xl sm:text-2xl font-playfair font-bold text-black tracking-tight">
                Graito Collective
              </Link>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link to="/profile" className="p-1.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Profile">
                <User className="h-5 w-5 text-black cursor-pointer" />
              </Link>
              <Link to="/cart" className="relative p-1.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Cart">
                <ShoppingCart className="h-5 w-5 text-black cursor-pointer" />
                <Badge className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                  0
                </Badge>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8">
        {/* Header Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center space-x-2 text-xs text-gray-500 uppercase tracking-widest mb-1">
              <Sparkles className="h-3.5 w-3.5 text-yellow-500" />
              <span>Saved Luxury Wishlist</span>
            </div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-black tracking-tight">
                My Favorites
              </h1>
              <span className="bg-black text-white text-xs sm:text-sm font-semibold px-2.5 py-0.5 rounded-full">
                {count} {count === 1 ? "item" : "items"}
              </span>
            </div>
          </div>

          {count > 0 && (
            <div className="flex items-center space-x-3">
              <Link to="/women">
                <Button variant="outline" className="text-xs sm:text-sm h-9 border-gray-300">
                  Continue Shopping
                </Button>
              </Link>
              <button 
                onClick={handleClearAll}
                className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1 hover:underline"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {count === 0 ? (
          <div className="text-center py-20 bg-gray-50/70 rounded-2xl border border-gray-200/80 max-w-2xl mx-auto my-8 px-6">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-playfair font-bold text-black mb-2">Your wishlist is empty</h2>
            <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
              Save your favorite luxury fashion, vintage items, and designer pieces by clicking the heart icon on any product.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/women">
                <Button className="bg-black text-white hover:bg-gray-800 rounded-lg px-5">
                  Explore Women
                </Button>
              </Link>
              <Link to="/men">
                <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white rounded-lg px-5">
                  Explore Men
                </Button>
              </Link>
              <Link to="/children">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg px-5">
                  Explore Kids
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((product) => {
              const displayImage = product.image || (product.images && product.images[0]) || "";
              return (
                <div
                  key={product.id}
                  className="group cursor-pointer flex flex-col justify-between"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div>
                    {/* Image Card */}
                    <div className="relative overflow-hidden rounded-xl mb-3 aspect-[3/4] bg-[#f7f7f8] flex items-center justify-center p-3">
                      {displayImage ? (
                        <img
                          src={displayImage}
                          alt={product.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                          No Image
                        </div>
                      )}

                      {/* Category Badge */}
                      {product.category && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="bg-white/95 text-black font-semibold text-[10px] tracking-wider uppercase px-2 py-1 rounded shadow-xs">
                            {product.category}
                          </span>
                        </div>
                      )}

                      {/* Remove Favorite Button */}
                      <button
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-all z-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFavorite(product.id);
                        }}
                        title="Remove from favorites"
                        aria-label="Remove from favorites"
                      >
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                      </button>

                      {/* Out of Stock Overlay */}
                      {product.outOfStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 backdrop-blur-xs">
                          <span className="text-white font-semibold text-sm">Out of Stock</span>
                        </div>
                      )}

                      {/* Condition Tag */}
                      {product.condition && !product.outOfStock && (
                        <div className="absolute bottom-3 left-3 z-10">
                          <span className="bg-neutral-900/80 text-white text-[10px] font-medium px-2 py-0.5 rounded-md backdrop-blur-xs">
                            {product.condition}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="space-y-1">
                      {product.brand && (
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{product.brand}</p>
                      )}
                      <h3 className="font-medium text-sm text-black line-clamp-1 group-hover:underline transition-all">
                        {product.name}
                      </h3>
                      {product.size && (
                        <p className="text-xs text-gray-500">Size: {product.size}</p>
                      )}
                      <div className="flex items-center space-x-2 pt-0.5">
                        <span className={`font-bold text-sm ${product.outOfStock ? 'text-gray-400' : 'text-red-600'}`}>
                          {product.price}
                        </span>
                        {product.originalPrice && !product.outOfStock && (
                          <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 mt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                    <Button
                      size="sm"
                      disabled={product.outOfStock}
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full text-xs h-8 bg-black text-white hover:bg-gray-800 rounded-lg flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;