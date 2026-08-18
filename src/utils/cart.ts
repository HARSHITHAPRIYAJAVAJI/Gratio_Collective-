import { useState, useEffect, useCallback, useMemo } from "react";

export interface CartItem {
  id: number | string;
  name: string;
  brand?: string;
  price: string;
  originalPrice?: string;
  image?: string;
  images?: string[];
  condition?: string;
  size?: string;
  category?: string;
  subcategory?: string;
  quantity: number;
  selectedSize?: string;
}

export const getStoredCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem("cart");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    
    // Normalize items
    return parsed.map((item: any) => ({
      ...item,
      quantity: typeof item.quantity === "number" && item.quantity > 0 ? item.quantity : 1,
      selectedSize: item.selectedSize || item.size || "Standard",
      image: item.image || (item.images && item.images[0]) || "/images/l.webp"
    }));
  } catch (err) {
    console.error("Error reading cart from localStorage:", err);
    return [];
  }
};

export const saveCart = (items: CartItem[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(items));
    const totalCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    localStorage.setItem("cartCount", String(totalCount));
    
    // Trigger window events for instant real-time synchronization across components
    window.dispatchEvent(new Event("cartChanged"));
    window.dispatchEvent(new Event("storage"));
  } catch (err) {
    console.error("Error saving cart to localStorage:", err);
  }
};

export const addToCartItem = (
  product: any, 
  quantity = 1, 
  selectedSize?: string
): { success: boolean; cart: CartItem[] } => {
  const currentCart = getStoredCart();
  const sizeToUse = selectedSize || product.size || "Standard";
  
  const existingIndex = currentCart.findIndex(
    (item) => String(item.id) === String(product.id) && (item.selectedSize || item.size || "Standard") === sizeToUse
  );

  let updatedCart: CartItem[];
  const normalizedImage = product.image || (product.images && product.images[0]) || "/images/l.webp";

  if (existingIndex > -1) {
    // Increase quantity of existing item
    updatedCart = currentCart.map((item, idx) => {
      if (idx === existingIndex) {
        return {
          ...item,
          quantity: item.quantity + (quantity > 0 ? quantity : 1)
        };
      }
      return item;
    });
  } else {
    // Add new item to front of cart
    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      brand: product.brand || "Luxury Maison",
      price: product.price,
      originalPrice: product.originalPrice,
      image: normalizedImage,
      images: product.images || (normalizedImage ? [normalizedImage] : []),
      condition: product.condition || "Very Good",
      size: product.size || sizeToUse,
      category: product.category,
      subcategory: product.subcategory,
      quantity: quantity > 0 ? quantity : 1,
      selectedSize: sizeToUse
    };
    updatedCart = [newItem, ...currentCart];
  }

  saveCart(updatedCart);
  return { success: true, cart: updatedCart };
};

export const updateCartItemQuantity = (
  id: number | string, 
  selectedSize: string | undefined, 
  quantity: number
) => {
  const currentCart = getStoredCart();
  const sizeToMatch = selectedSize || "Standard";

  if (quantity <= 0) {
    const updated = currentCart.filter(
      (item) => !(String(item.id) === String(id) && (item.selectedSize || item.size || "Standard") === sizeToMatch)
    );
    saveCart(updated);
    return;
  }

  const updated = currentCart.map((item) => {
    if (String(item.id) === String(id) && (item.selectedSize || item.size || "Standard") === sizeToMatch) {
      return { ...item, quantity };
    }
    return item;
  });

  saveCart(updated);
};

export const removeCartItem = (id: number | string, selectedSize?: string) => {
  const currentCart = getStoredCart();
  const sizeToMatch = selectedSize;

  const updated = currentCart.filter((item) => {
    if (String(item.id) === String(id)) {
      if (sizeToMatch !== undefined) {
        return (item.selectedSize || item.size || "Standard") !== sizeToMatch;
      }
      return false;
    }
    return true;
  });

  saveCart(updated);
};

export const clearStoredCart = () => {
  saveCart([]);
};

export const parsePrice = (priceStr: string | number): number => {
  if (typeof priceStr === "number") return priceStr;
  if (!priceStr) return 0;
  const cleaned = String(priceStr).replace(/[^0-9.]/g, "");
  return parseFloat(cleaned) || 0;
};

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(() => getStoredCart());
  const [couponCode, setCouponCode] = useState<string>(() => localStorage.getItem("appliedCoupon") || "");
  const [couponDiscount, setCouponDiscount] = useState<number>(() => {
    const saved = localStorage.getItem("appliedCoupon");
    if (saved === "WELCOME10") return 0.10;
    if (saved === "LUXURY20") return 0.20;
    return 0;
  });

  const syncCart = useCallback(() => {
    setCart(getStoredCart());
  }, []);

  useEffect(() => {
    syncCart();

    const handleCustom = () => syncCart();
    const handleStorage = (e: StorageEvent) => {
      if (!e.key || e.key === "cart" || e.key === "cartCount") {
        syncCart();
      }
    };

    window.addEventListener("cartChanged", handleCustom);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("cartChanged", handleCustom);
      window.removeEventListener("storage", handleStorage);
    };
  }, [syncCart]);

  const totalItemsCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = parsePrice(item.price);
      return sum + (price * (item.quantity || 1));
    }, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return subtotal * couponDiscount;
  }, [subtotal, couponDiscount]);

  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;
    if (subtotal >= 1000) return 0; // Complimentary white glove shipping over $1000
    return 35; // Standard insured luxury shipping
  }, [subtotal]);

  const estimatedTax = useMemo(() => {
    if (subtotal === 0) return 0;
    return (subtotal - discountAmount) * 0.08; // Estimated 8% sales tax
  }, [subtotal, discountAmount]);

  const grandTotal = useMemo(() => {
    if (subtotal === 0) return 0;
    return Math.max(0, subtotal - discountAmount + shipping + estimatedTax);
  }, [subtotal, discountAmount, shipping, estimatedTax]);

  const applyCoupon = useCallback((code: string): { success: boolean; message: string } => {
    const clean = code.trim().toUpperCase();
    if (clean === "WELCOME10") {
      setCouponCode("WELCOME10");
      setCouponDiscount(0.10);
      localStorage.setItem("appliedCoupon", "WELCOME10");
      return { success: true, message: "10% Welcome Discount applied successfully!" };
    }
    if (clean === "LUXURY20") {
      setCouponCode("LUXURY20");
      setCouponDiscount(0.20);
      localStorage.setItem("appliedCoupon", "LUXURY20");
      return { success: true, message: "20% Exclusive Collector Discount applied!" };
    }
    return { success: false, message: "Invalid promo code. Try WELCOME10 for 10% off." };
  }, []);

  const removeCoupon = useCallback(() => {
    setCouponCode("");
    setCouponDiscount(0);
    localStorage.removeItem("appliedCoupon");
  }, []);

  const addItem = useCallback((product: any, quantity = 1, size?: string) => {
    return addToCartItem(product, quantity, size);
  }, []);

  const updateQuantity = useCallback((id: number | string, size: string | undefined, qty: number) => {
    updateCartItemQuantity(id, size, qty);
  }, []);

  const removeItem = useCallback((id: number | string, size?: string) => {
    removeCartItem(id, size);
  }, []);

  const clear = useCallback(() => {
    clearStoredCart();
    removeCoupon();
  }, [removeCoupon]);

  return {
    cart,
    count: totalItemsCount,
    subtotal,
    discountAmount,
    couponCode,
    couponDiscount,
    shipping,
    estimatedTax,
    total: grandTotal,
    addToCart: addItem,
    updateQuantity,
    removeFromCart: removeItem,
    clearCart: clear,
    applyCoupon,
    removeCoupon
  };
};
