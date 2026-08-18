import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, 
  Truck, ArrowLeft, Heart, Check, Sparkles, Tag, Lock, CreditCard, RefreshCw
} from "lucide-react";
import { useCart, CartItem } from "@/utils/cart";
import { useFavorites } from "@/utils/favorites";

const popularSuggestions = [
  {
    id: 101,
    name: "Classic Flap Medium Lambskin Bag",
    brand: "Chanel",
    price: "$8,900",
    originalPrice: "$10,200",
    image: "/images/c.jpeg",
    condition: "Pre-owned",
    size: "Medium",
    category: "Women"
  },
  {
    id: 102,
    name: "Submariner Date 41mm Oystersteel",
    brand: "Rolex",
    price: "$14,500",
    originalPrice: "$16,000",
    image: "/images/rolex.webp",
    condition: "Very Good",
    size: "41mm",
    category: "Men"
  },
  {
    id: 103,
    name: "Love Bracelet 18k Yellow Gold",
    brand: "Cartier",
    price: "$7,350",
    originalPrice: "$8,000",
    image: "/images/cart.jpeg",
    condition: "New",
    size: "17cm",
    category: "Jewelry"
  },
  {
    id: 104,
    name: "Birkin 30 Togo Gold Hardware",
    brand: "Hermès",
    price: "$24,500",
    originalPrice: "$28,000",
    image: "/images/herm.jpeg",
    condition: "Like New",
    size: "30cm",
    category: "Bags"
  }
];

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    count, 
    subtotal, 
    discountAmount, 
    couponCode, 
    shipping, 
    estimatedTax, 
    total, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    applyCoupon, 
    removeCoupon,
    addToCart
  } = useCart();

  const { toggleFavorite, isFavorite } = useFavorites();

  const [promoInput, setPromoInput] = useState("");
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyCoupon(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setPromoInput("");
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fakeOrderNum = "GC-" + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(fakeOrderNum);
    setOrderPlaced(true);
    setIsCheckingOut(false);
    clearCart();
  };

  const freeShippingThreshold = 1000;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="min-h-screen bg-[#fafafa] font-inter text-neutral-900 flex flex-col justify-between">
      <Navbar showBack backTo="/" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-black font-medium">Shopping Bag</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-gray-200 pb-4">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl sm:text-3xl font-playfair font-bold text-black tracking-tight">
                Shopping Bag
              </h1>
              {count > 0 && (
                <span className="bg-black text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {count} {count === 1 ? "item" : "items"}
                </span>
              )}
            </div>
            {count > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-gray-500 hover:text-red-600 underline font-medium transition-colors self-start sm:self-auto"
              >
                Clear all items
              </button>
            )}
          </div>
        </div>

        {/* Order Confirmed State */}
        {orderPlaced ? (
          <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-sm my-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Order Confirmed</span>
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-black mt-2 mb-3">
              Thank You for Your Order!
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Your authentication & insurance concierge is preparing your items. We have sent receipt and tracking details to your registered email.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs font-mono text-gray-700 max-w-md mx-auto mb-8">
              Order Reference: <span className="font-bold text-black">{orderNumber}</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/" className="w-full sm:w-auto">
                <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-xl px-6 py-2.5 text-sm font-medium">
                  Continue Shopping
                </Button>
              </Link>
              <Link to="/profile" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full border-gray-300 rounded-xl px-6 py-2.5 text-sm font-medium">
                  View in Purchases
                </Button>
              </Link>
            </div>
          </div>
        ) : cart.length === 0 ? (
          /* Empty Cart State */
          <div className="py-12 sm:py-16">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-16 text-center max-w-2xl mx-auto shadow-xs">
              <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100">
                <ShoppingBag className="h-9 w-9" />
              </div>
              <h2 className="text-xl sm:text-2xl font-playfair font-bold text-black mb-2">
                Your Shopping Bag is Empty
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mb-8">
                Discover authenticated luxury fashion, rare vintage pieces, timepieces, and statement jewelry ready for your collection.
              </p>
              
              {/* Category Quicklinks */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                {[
                  { name: "Women's Collection", path: "/women" },
                  { name: "Men's Luxury", path: "/men" },
                  { name: "Fine Jewelry", path: "/jewelry" },
                  { name: "Vintage Archive", path: "/vintage" },
                  { name: "Bags & Footwear", path: "/bags" }
                ].map((item) => (
                  <Link key={item.name} to={item.path}>
                    <span className="inline-block text-xs font-medium bg-gray-100 hover:bg-black hover:text-white text-gray-800 px-3.5 py-1.5 rounded-full transition-all duration-200">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>

              <Link to="/">
                <Button className="bg-black text-white hover:bg-gray-800 rounded-xl px-8 py-3 text-sm font-medium shadow-sm">
                  Explore Curated Marketplace
                </Button>
              </Link>
            </div>

            {/* Recommended Luxury Suggestions */}
            <div className="mt-14">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-playfair font-bold text-black">
                    Trending Luxury Pieces
                  </h3>
                  <p className="text-xs text-gray-500">Curated selections from top authenticated designers</p>
                </div>
                <Link to="/women" className="text-xs font-medium text-black hover:underline flex items-center gap-1">
                  <span>View Catalog</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {popularSuggestions.map((item) => (
                  <div key={item.id} className="group bg-white rounded-2xl p-3 sm:p-4 border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="aspect-[4/5] bg-gray-50 rounded-xl overflow-hidden mb-3 relative flex items-center justify-center p-2">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                        />
                        <span className="absolute top-2 left-2 bg-black/80 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md backdrop-blur-xs">
                          {item.condition}
                        </span>
                      </div>
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{item.brand}</div>
                      <h4 className="text-xs sm:text-sm font-semibold text-black line-clamp-1 mt-0.5">{item.name}</h4>
                      <div className="mt-1.5 flex items-baseline gap-2">
                        <span className="text-sm font-bold text-black">{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">{item.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(item, 1, item.size)}
                      className="mt-3 w-full bg-gray-100 hover:bg-black hover:text-white text-gray-900 text-xs font-semibold py-2 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Populated Cart (2-Column Grid) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left Column: Cart Items List (lg: 8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Shipping Bar */}
              <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Truck className="h-4 w-4 text-black" />
                    {subtotal >= freeShippingThreshold ? (
                      <span className="text-green-700 font-bold">You qualify for Complimentary White-Glove Insured Delivery!</span>
                    ) : (
                      <span>
                        Add <span className="font-bold text-black">${amountNeededForFreeShipping.toLocaleString()}</span> more for Complimentary Insured Shipping
                      </span>
                    )}
                  </span>
                  <span className="font-bold text-black">{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-black h-full transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="bg-white rounded-2xl border border-gray-200/80 divide-y divide-gray-100 shadow-xs overflow-hidden">
                {cart.map((item: CartItem) => {
                  const isFav = isFavorite(item.id);
                  const selectedSz = item.selectedSize || item.size || "Standard";

                  return (
                    <div 
                      key={`${item.id}-${selectedSz}`} 
                      className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 hover:bg-gray-50/40 transition-colors"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-24 h-28 sm:w-28 sm:h-32 flex-shrink-0 bg-gray-50 border border-gray-100 rounded-xl overflow-hidden flex items-center justify-center p-2 self-start">
                        <img
                          src={item.image || "/images/l.webp"}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Info & Quantity Actions */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                                {item.brand || "Designer Maison"}
                              </span>
                              <h3 className="text-sm sm:text-base font-semibold text-black line-clamp-2 mt-0.5">
                                {item.name}
                              </h3>
                            </div>
                            <span className="text-sm sm:text-base font-bold text-black whitespace-nowrap">
                              {item.price}
                            </span>
                          </div>

                          {/* Attributes Badges */}
                          <div className="flex flex-wrap items-center gap-1.5 mt-2">
                            <span className="bg-gray-100 text-gray-700 text-[10px] font-medium px-2 py-0.5 rounded-md">
                              Condition: <span className="font-semibold text-black">{item.condition || "Very Good"}</span>
                            </span>
                            <span className="bg-gray-100 text-gray-700 text-[10px] font-medium px-2 py-0.5 rounded-md">
                              Size: <span className="font-semibold text-black">{selectedSz}</span>
                            </span>
                            <span className="bg-amber-50 text-amber-800 text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                              <ShieldCheck className="h-3 w-3 text-amber-600" />
                              <span>Authenticity Guaranteed</span>
                            </span>
                          </div>
                        </div>

                        {/* Bottom Row: Quantity Selector + Action Buttons */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-gray-50">
                          {/* Quantity Modifier */}
                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-2xs">
                            <button
                              onClick={() => updateQuantity(item.id, selectedSz, item.quantity - 1)}
                              className="p-1.5 hover:bg-gray-100 text-gray-600 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-black">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, selectedSz, item.quantity + 1)}
                              className="p-1.5 hover:bg-gray-100 text-gray-600 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          {/* Action Links */}
                          <div className="flex items-center space-x-3 text-xs font-medium">
                            <button
                              onClick={() => toggleFavorite(item as any)}
                              className={`flex items-center space-x-1 transition-colors ${
                                isFav ? "text-red-600 font-semibold" : "text-gray-500 hover:text-black"
                              }`}
                            >
                              <Heart className={`h-3.5 w-3.5 ${isFav ? "fill-red-600" : ""}`} />
                              <span>{isFav ? "Saved to Wishlist" : "Save for later"}</span>
                            </button>

                            <button
                              onClick={() => removeFromCart(item.id, selectedSz)}
                              className="text-gray-400 hover:text-red-600 flex items-center space-x-1 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continue Shopping Link */}
              <div className="pt-2">
                <Link
                  to="/"
                  className="inline-flex items-center text-xs sm:text-sm font-semibold text-black hover:text-gray-600 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-1.5" />
                  <span>Continue Exploring Collections</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Order Summary (lg: 4 cols) */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-xs sticky top-24 space-y-5">
                <h2 className="text-base font-bold text-black uppercase tracking-wider">
                  Order Summary
                </h2>

                {/* Promo Code Input */}
                <div>
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Promo or VIP Code"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs uppercase focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      variant="outline" 
                      className="border-black text-black hover:bg-black hover:text-white rounded-xl text-xs px-3 font-semibold h-auto"
                    >
                      Apply
                    </Button>
                  </form>

                  {/* Promo Message / Applied Badge */}
                  {couponCode ? (
                    <div className="mt-2 flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5 text-xs text-emerald-800">
                      <span className="font-semibold flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-emerald-600" />
                        Code {couponCode} ({couponCode === "WELCOME10" ? "10% Off" : "20% Off"})
                      </span>
                      <button onClick={removeCoupon} className="text-emerald-700 hover:text-emerald-950 font-bold ml-2">
                        x
                      </button>
                    </div>
                  ) : (
                    <div className="mt-1.5 flex items-center justify-between text-[11px] text-gray-400">
                      <span>Use code <button onClick={() => applyCoupon("WELCOME10")} className="font-bold text-black underline">WELCOME10</button> for 10% off</span>
                    </div>
                  )}

                  {promoMessage && !couponCode && (
                    <p className={`text-xs mt-1.5 ${promoMessage.isError ? "text-red-500" : "text-emerald-600"}`}>
                      {promoMessage.text}
                    </p>
                  )}
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-2.5 text-xs sm:text-sm border-t border-b border-gray-100 py-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({count} {count === 1 ? "item" : "items"})</span>
                    <span className="font-medium text-black">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Discount ({couponCode})</span>
                      <span>-${discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span>Insured Delivery</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="font-bold text-green-700 uppercase text-xs">Complimentary</span>
                      ) : (
                        <span className="font-medium text-black">${shipping.toFixed(2)}</span>
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Sales Tax (8%)</span>
                    <span className="font-medium text-black">${estimatedTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="flex justify-between items-baseline">
                  <span className="text-base font-bold text-black">Total Due</span>
                  <span className="text-xl font-bold font-playfair text-black">
                    ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Checkout CTA */}
                <Button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full bg-black text-white hover:bg-gray-800 rounded-xl py-3 text-sm font-semibold shadow-md flex items-center justify-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  <span>Proceed to Secure Checkout</span>
                </Button>

                {/* Trust Badges */}
                <div className="pt-2 space-y-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-[11px] text-gray-500">
                    <ShieldCheck className="h-4 w-4 text-black flex-shrink-0" />
                    <span>Physical Multi-point Authentication Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500">
                    <Truck className="h-4 w-4 text-black flex-shrink-0" />
                    <span>Full Courier Insurance & Signature on Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500">
                    <RefreshCw className="h-4 w-4 text-black flex-shrink-0" />
                    <span>14-Day Authenticated Returns Policy</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="pt-1 text-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1.5">
                    Accepted Payment Methods
                  </span>
                  <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 font-semibold">
                    <span className="border border-gray-200 px-2 py-0.5 rounded">Visa</span>
                    <span className="border border-gray-200 px-2 py-0.5 rounded">Mastercard</span>
                    <span className="border border-gray-200 px-2 py-0.5 rounded">Amex</span>
                    <span className="border border-gray-200 px-2 py-0.5 rounded">Apple Pay</span>
                    <span className="border border-gray-200 px-2 py-0.5 rounded">Klarna</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {isCheckingOut && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-black" />
                  <h3 className="text-base font-bold text-black uppercase tracking-wider">
                    Express Luxury Checkout
                  </h3>
                </div>
                <button
                  onClick={() => setIsCheckingOut(false)}
                  className="text-gray-400 hover:text-black text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-3 flex justify-between text-xs">
                  <span className="text-gray-600 font-medium">Total to Charge:</span>
                  <span className="font-bold text-black">${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="Alex Mercer"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                    Shipping & Delivery Address
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="742 Evergreen Terrace, Apt 4B"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-2"
                    placeholder="Street address"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      defaultValue="New York, NY"
                      className="px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="City, State"
                    />
                    <input
                      type="text"
                      required
                      defaultValue="10001"
                      className="px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="ZIP code"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                    Card Details (Simulated Sandbox)
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      defaultValue="4242 •••• •••• 4242"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-gray-800 rounded-xl py-3 text-sm font-semibold shadow-sm mt-4"
                >
                  Pay & Authorize Order (${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                </Button>

                <p className="text-[10px] text-gray-400 text-center">
                  256-bit Encrypted SSL Connection • Verified Direct Maison Escrow
                </p>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
