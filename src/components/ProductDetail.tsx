import { useState, useEffect, useMemo } from "react";
import { 
  Heart, 
  ShoppingCart, 
  ArrowLeft, 
  Star, 
  Share, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useFavorites } from "@/utils/favorites";

// Comprehensive pool of luxury items used for dynamic randomization
const luxuryItemPool = [
  {
    id: 201,
    name: "Chanel Classic Flap Quilted Bag",
    brand: "Chanel",
    price: "$5,200",
    originalPrice: "$6,500",
    images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop&crop=center"],
    condition: "Excellent",
    size: "Medium",
    category: "Bags",
    description: "Iconic Chanel Classic Flap in black caviar leather with 24k gold-plated hardware and signature chain strap.",
    details: ["Caviar Quilted Leather", "24K Gold-Plated CC Turnlock", "Burgundy leather interior", "Includes Authenticity Card & Dustbag"],
    rating: 5,
    reviews: 42,
    inStock: true
  },
  {
    id: 202,
    name: "Saint Laurent Loulou Puffer Shoulder Bag",
    brand: "Saint Laurent",
    price: "$2,650",
    originalPrice: "$3,200",
    images: ["https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=800&fit=crop&crop=center"],
    condition: "Like New",
    size: "Small",
    category: "Bags",
    description: "Soft padded lambskin bag featuring quilted overstitching and the iconic YSL metal signature monogram.",
    details: ["100% Lambskin", "Magnetic snap closure", "Bronze-toned metal hardware", "Made in Italy"],
    rating: 5,
    reviews: 28,
    inStock: true
  },
  {
    id: 203,
    name: "Rolex Submariner Date 41mm",
    brand: "Rolex",
    price: "$13,800",
    originalPrice: "$15,500",
    images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=800&fit=crop&crop=center"],
    condition: "Pristine",
    size: "41mm",
    category: "Watches",
    description: "Oyster Perpetual Submariner Date in Oystersteel with a black Cerachrom bezel and black dial.",
    details: ["Oystersteel Case & Bracelet", "Cerachrom Ceramic Bezel", "Calibre 3235 Movement", "Original Box & Papers"],
    rating: 5,
    reviews: 64,
    inStock: true
  },
  {
    id: 204,
    name: "Hermès Oran Leather Sandals",
    brand: "Hermès",
    price: "$780",
    originalPrice: "$950",
    images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop&crop=center"],
    condition: "New",
    size: "38 EU",
    category: "Shoes",
    description: "Iconic flat sandals in Box calfskin with the signature 'H' cut-out. An essential item in every summer wardrobe.",
    details: ["Box Calfskin leather", "Natural leather sole", "Made in Italy", "Original orange box included"],
    rating: 4.9,
    reviews: 19,
    inStock: true
  },
  {
    id: 205,
    name: "Bottega Veneta Cassette Crossbody",
    brand: "Bottega Veneta",
    price: "$2,400",
    originalPrice: "$3,100",
    images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop&crop=center"],
    condition: "Excellent",
    size: "One Size",
    category: "Bags",
    description: "Padded Intreccio tape crossbody bag in supple nappa lambskin leather with magnetic closure.",
    details: ["100% Lambskin Nappa", "Bonded lambskin lining", "Silver-finish hardware", "Made in Italy"],
    rating: 4.8,
    reviews: 23,
    inStock: true
  },
  {
    id: 206,
    name: "Gucci GG Supreme Wool Trench Coat",
    brand: "Gucci",
    price: "$2,850",
    originalPrice: "$3,800",
    images: ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=800&fit=crop&crop=center"],
    condition: "Like New",
    size: "40 IT",
    category: "Clothing",
    description: "Tailored double-breasted trench coat in beige and ebony GG monogram wool blend canvas.",
    details: ["Wool & Cotton blend", "Horn buttons with GG motif", "Detachable matching belt", "Made in Italy"],
    rating: 5,
    reviews: 15,
    inStock: true
  },
  {
    id: 207,
    name: "Cartier Love Gold Bangle Bracelet",
    brand: "Cartier",
    price: "$6,800",
    originalPrice: "$7,900",
    images: ["https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=800&fit=crop&crop=center"],
    condition: "Pristine",
    size: "17",
    category: "Jewelry",
    description: "Timeless 18K yellow gold oval bracelet with signature screw motifs. Comes with original screwdriver.",
    details: ["18K Yellow Gold", "Original screwdriver tool", "Certificate of Authenticity", "Red presentation box"],
    rating: 5,
    reviews: 37,
    inStock: true
  },
  {
    id: 208,
    name: "Prada Monolith Chunky Lug Boots",
    brand: "Prada",
    price: "$1,350",
    originalPrice: "$1,750",
    images: ["https://images.unsplash.com/photo-1608256246200-53e8b47b9409?w=600&h=800&fit=crop&crop=center"],
    condition: "Excellent",
    size: "39 EU",
    category: "Shoes",
    description: "Combat boots in brushed leather and nylon featuring removable zipped pouches and chunky tread sole.",
    details: ["Brushed calf leather", "Removable pouch straps", "Lightweight rubber lug sole", "Made in Italy"],
    rating: 4.9,
    reviews: 21,
    inStock: true
  },
  {
    id: 209,
    name: "Dior Oblique Saddle Bag",
    brand: "Dior",
    price: "$3,650",
    originalPrice: "$4,200",
    images: ["https://assets.christiandior.com/is/image/diorprod/M0455CBAAM900_SBG_E03-1?$r9x10_raw$&crop=0,0,4000,5000&wid=1024&hei=1107&scale=0.5535&bfc=on&qlt=80"],
    condition: "Like New",
    size: "Medium",
    category: "Bags",
    description: "Legendary Dior Saddle silhouette in blue Dior Oblique jacquard canvas with antique gold 'CD' hardware.",
    details: ["Blue Oblique Jacquard", "Magnetic 'D' stirrup closure", "'CD' handle accents", "Made in Italy"],
    rating: 5,
    reviews: 44,
    inStock: true
  }
];

export interface ProductDetailProps {
  product: {
    id: number | string;
    name: string;
    brand?: string;
    price: string;
    originalPrice?: string;
    images?: string[];
    image?: string;
    condition?: string;
    size?: string;
    description?: string;
    details?: string[];
    rating?: number;
    reviews?: number;
    inStock?: boolean;
    outOfStock?: boolean;
    category?: string;
    subcategory?: string;
  };
  onBack?: () => void;
  onSelectProduct?: (product: any) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product: initialProduct, 
  onBack,
  onSelectProduct 
}) => {
  const { isFavorite, toggleFavorite, count: favoritesCount } = useFavorites();
  const [activeProduct, setActiveProduct] = useState(initialProduct);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(initialProduct.size || "M");
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedToCartToast, setAddedToCartToast] = useState(false);
  const navigate = useNavigate();

  // Accordion / Dropdown state for Description & Details on the right side
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isShippingOpen, setIsShippingOpen] = useState(false);

  // Sync activeProduct when prop changes
  useEffect(() => {
    setActiveProduct(initialProduct);
    setCurrentImageIndex(0);
    setSelectedSize(initialProduct.size || "M");
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [initialProduct]);

  // Generate 4 randomized recommended products (excluding current active item)
  const recommendedProducts = useMemo(() => {
    const pool = luxuryItemPool.filter(item => String(item.id) !== String(activeProduct.id));
    // Fisher-Yates shuffle
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, [activeProduct.id]);

  const productImages = useMemo(() => {
    if (activeProduct.images && activeProduct.images.length > 0) {
      return activeProduct.images;
    }
    if (activeProduct.image) {
      return [activeProduct.image];
    }
    return ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop"];
  }, [activeProduct]);

  const sizes = ["XS", "S", "M", "L", "XL"];

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const handleAddToCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cart.push({ ...activeProduct, quantity, size: selectedSize });
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("storage"));
      setAddedToCartToast(true);
      setTimeout(() => setAddedToCartToast(false), 3000);
    } catch (err) {
      console.error("Cart error:", err);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleRecommendationClick = (item: any) => {
    if (onSelectProduct) {
      onSelectProduct(item);
    } else {
      setActiveProduct(item);
      setCurrentImageIndex(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isCurrentFavorite = isFavorite(activeProduct.id);

  return (
    <div className="min-h-screen bg-[#fafafa] font-inter text-neutral-900 pb-20">
      {/* Top Banner */}
      <div className="bg-yellow-300 text-center py-2 px-4 w-full">
        <p className="text-xs sm:text-sm font-medium text-black tracking-wide">
          ✨ Complimentary Insured Express Delivery on all luxury orders with code <span className="font-bold">WELCOME10</span>
        </p>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white shadow-xs border-b border-gray-100 sticky top-0 z-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex justify-between items-center h-16">
            {/* Back Button */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleBackClick}
                className="flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-black hover:text-gray-600 bg-gray-100 hover:bg-gray-200 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
                title="Back to collection"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            </div>

            {/* Brand Title */}
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
                <img 
                  src="/images/l.webp" 
                  alt="Gratio Collective" 
                  className="h-10 sm:h-12 w-auto object-contain" 
                />
              </Link>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link to="/favorites" className="relative p-1.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Favorites">
                <Heart className="h-5 w-5 text-black cursor-pointer" />
                {favoritesCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center p-0 font-bold">
                    {favoritesCount}
                  </Badge>
                )}
              </Link>
              <Link to="/profile" className="p-1.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Profile">
                <span className="sr-only">Profile</span>
                <div className="h-5 w-5 text-black flex items-center justify-center font-bold text-xs">👤</div>
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

      {/* Toast Notification */}
      {addedToCartToast && (
        <div className="fixed top-20 right-6 z-50 bg-black text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-300">
          <Check className="h-4 w-4 text-green-400" />
          <span className="text-xs sm:text-sm font-medium">Added to your shopping bag!</span>
        </div>
      )}

      {/* Main Container */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Product Section: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white p-4 sm:p-8 rounded-2xl shadow-xs border border-gray-100">
          {/* Left Column: Image Carousel & Gallery (lg: 6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[3/4] bg-[#f7f7f8] rounded-xl overflow-hidden flex items-center justify-center p-4 border border-gray-100">
              <img
                src={productImages[currentImageIndex]}
                alt={activeProduct.name}
                className="w-full h-full object-contain transition-transform duration-300"
              />

              {/* Image Navigation Arrows */}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2.5 rounded-full shadow-md transition-all hover:scale-105 z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2.5 rounded-full shadow-md transition-all hover:scale-105 z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {productImages.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {productImages.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 bg-gray-50 p-1 transition-all ${
                      idx === currentImageIndex ? "border-black shadow-xs ring-1 ring-black" : "border-gray-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Refined Header, Size/Quantity, CTA, and Collapsible Accordions (lg: 6 cols) */}
          <div className="lg:col-span-6 flex flex-col space-y-5">
            {/* Brand and Item Heading */}
            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  {activeProduct.brand || "Luxury Designer"}
                </span>
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  In Stock & Ready to Ship
                </span>
              </div>

              {/* Reduced font size for item name */}
              <h1 className="text-xl sm:text-2xl font-playfair font-bold text-neutral-900 tracking-tight leading-snug">
                {activeProduct.name}
              </h1>

              {/* Reviews & Ratings */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-400 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < (activeProduct.rating || 5) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {activeProduct.rating || 5}.0 ({activeProduct.reviews || 24} reviews)
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3 py-1">
              <span className="text-2xl sm:text-3xl font-bold text-neutral-900 font-inter">
                {activeProduct.price}
              </span>
              {activeProduct.originalPrice && (
                <span className="text-sm sm:text-base text-gray-400 line-through font-normal">
                  {activeProduct.originalPrice}
                </span>
              )}
              {activeProduct.originalPrice && (
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  SAVE
                </span>
              )}
            </div>

            {/* Compact Size Selector */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Select Size
                </span>
                <span className="text-[11px] text-gray-400">Standard Fit</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-8 min-w-[36px] px-3 rounded-md text-xs font-medium border transition-all cursor-pointer ${
                      selectedSize === size
                        ? "border-black bg-black text-white font-semibold shadow-xs"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Compact Quantity Selector */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 block">
                Quantity
              </span>
              <div className="flex items-center inline-flex border border-gray-200 rounded-md bg-white overflow-hidden shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-8 w-8 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="h-8 w-10 flex items-center justify-center text-xs font-semibold text-neutral-900 border-x border-gray-100">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Cart, Heart Favorite, Share */}
            <div className="flex items-center gap-3 pt-2">
              <Button
                onClick={handleAddToCart}
                disabled={activeProduct.outOfStock}
                className="flex-1 bg-black text-white hover:bg-neutral-800 h-11 text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-all"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {activeProduct.outOfStock ? "Out of Stock" : "Add to Cart"}
              </Button>

              {/* Heart Favorite Button */}
              <button
                onClick={() => toggleFavorite(activeProduct)}
                className={`h-11 w-11 flex items-center justify-center rounded-xl border transition-all cursor-pointer ${
                  isCurrentFavorite 
                    ? "border-red-200 bg-red-50 text-red-500 shadow-xs" 
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }`}
                title={isCurrentFavorite ? "Remove from Favorites" : "Add to Favorites"}
              >
                <Heart className={`h-4 w-4 ${isCurrentFavorite ? "fill-red-500 text-red-500" : ""}`} />
              </button>

              {/* Share Link Button */}
              <button
                onClick={handleShare}
                className="h-11 w-11 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer"
                title="Share link"
              >
                {copiedLink ? <Check className="h-4 w-4 text-emerald-600" /> : <Share className="h-4 w-4" />}
              </button>
            </div>

            {/* Collapsible Dropdowns / Accordions on the Right Side */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              {/* 1. Description Accordion */}
              <div className="border border-gray-100 rounded-xl overflow-hidden bg-[#fafafa]">
                <button
                  onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                  className="w-full flex items-center justify-between p-3.5 text-left text-xs sm:text-sm font-semibold text-neutral-900 hover:bg-gray-100/70 transition"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    Item Description
                  </span>
                  {isDescriptionOpen ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                </button>
                {isDescriptionOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-white">
                    {activeProduct.description || "Exquisite luxury piece meticulously inspected by our verified authenticator team. Exemplifies exceptional craftsmanship, premium materials, and timeless aesthetic."}
                  </div>
                )}
              </div>

              {/* 2. Product Details & Specifications Accordion */}
              <div className="border border-gray-100 rounded-xl overflow-hidden bg-[#fafafa]">
                <button
                  onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                  className="w-full flex items-center justify-between p-3.5 text-left text-xs sm:text-sm font-semibold text-neutral-900 hover:bg-gray-100/70 transition"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-blue-500" />
                    Details & Authenticity
                  </span>
                  {isDetailsOpen ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                </button>
                {isDetailsOpen && (
                  <div className="px-4 pb-4 pt-2 text-xs sm:text-sm text-gray-600 space-y-2 border-t border-gray-100 bg-white">
                    {activeProduct.details && activeProduct.details.length > 0 ? (
                      <ul className="space-y-1.5 list-disc list-inside">
                        {activeProduct.details.map((detail, idx) => (
                          <li key={idx} className="text-gray-700">{detail}</li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="space-y-1.5 list-disc list-inside">
                        <li className="text-gray-700">100% Genuine Designer Authentication Verified</li>
                        <li className="text-gray-700">Condition Grade: {activeProduct.condition || "Excellent"}</li>
                        <li className="text-gray-700">Includes original branded dustbag & packaging</li>
                        <li className="text-gray-700">Hand-curated for Gratio Collective</li>
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* 3. Shipping & Buyer Assurance Accordion */}
              <div className="border border-gray-100 rounded-xl overflow-hidden bg-[#fafafa]">
                <button
                  onClick={() => setIsShippingOpen(!isShippingOpen)}
                  className="w-full flex items-center justify-between p-3.5 text-left text-xs sm:text-sm font-semibold text-neutral-900 hover:bg-gray-100/70 transition"
                >
                  <span className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-emerald-600" />
                    Shipping & Returns
                  </span>
                  {isShippingOpen ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                </button>
                {isShippingOpen && (
                  <div className="px-4 pb-4 pt-2 text-xs text-gray-600 space-y-2.5 border-t border-gray-100 bg-white">
                    <div className="flex items-start gap-2">
                      <Truck className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p><span className="font-semibold text-neutral-900">Direct Insured Delivery:</span> Dispatched within 24 hours with full transit insurance.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <RotateCcw className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p><span className="font-semibold text-neutral-900">14-Day Buyer Protection:</span> Full refund guarantee if not strictly as described.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RECOMMENDED ITEMS SECTION (Dynamic & Randomized for all items) */}
        <section className="mt-14 sm:mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-gray-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                <Sparkles className="h-3.5 w-3.5 text-yellow-500" />
                <span>Curated Recommendations</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-neutral-900">
                You May Also Like
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0">
              Personalized luxury pairings updated in real time
            </p>
          </div>

          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((item) => {
              const isRecFav = isFavorite(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => handleRecommendationClick(item)}
                  className="group cursor-pointer flex flex-col bg-white p-3 rounded-2xl border border-gray-100 shadow-2xs hover:shadow-md transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] bg-[#f7f7f8] rounded-xl overflow-hidden flex items-center justify-center p-3 mb-3">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Condition Tag */}
                    <div className="absolute bottom-2.5 left-2.5 z-10">
                      <span className="bg-neutral-900/80 text-white text-[10px] font-medium px-2 py-0.5 rounded-md backdrop-blur-xs">
                        {item.condition}
                      </span>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item);
                      }}
                      className="absolute top-2.5 right-2.5 p-2 bg-white/90 hover:bg-white rounded-full shadow-xs hover:shadow-md transition-all z-10 cursor-pointer"
                      title={isRecFav ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart className={`h-3.5 w-3.5 transition-colors ${isRecFav ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-500"}`} />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between space-y-1 px-1">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {item.brand}
                      </p>
                      <h3 className="text-xs sm:text-sm font-medium text-neutral-900 line-clamp-2 group-hover:text-black transition-colors leading-snug">
                        {item.name}
                      </h3>
                    </div>

                    <div className="flex items-baseline justify-between pt-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-neutral-900 font-inter">
                          {item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {item.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        Available
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetail;