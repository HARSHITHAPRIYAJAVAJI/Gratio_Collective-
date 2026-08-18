import { useState, useEffect, useCallback } from "react";

export interface ProductItem {
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
  outOfStock?: boolean;
  trusted?: boolean;
  expert?: boolean;
  likes?: number;
  description?: string;
  details?: string[];
  rating?: number;
  reviews?: number;
}

export const getStoredFavorites = (): ProductItem[] => {
  try {
    const raw = localStorage.getItem("favorites");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error reading favorites from localStorage:", err);
    return [];
  }
};

export const saveFavorites = (items: ProductItem[]) => {
  try {
    localStorage.setItem("favorites", JSON.stringify(items));
    localStorage.setItem("favoritesCount", String(items.length));
    window.dispatchEvent(new Event("favoritesChanged"));
    window.dispatchEvent(new Event("storage"));
  } catch (err) {
    console.error("Error saving favorites to localStorage:", err);
  }
};

export const toggleFavoriteItem = (product: ProductItem): boolean => {
  const current = getStoredFavorites();
  const index = current.findIndex((item) => String(item.id) === String(product.id));
  
  let updated: ProductItem[];
  let isNowFavorite = false;

  if (index > -1) {
    updated = current.filter((item) => String(item.id) !== String(product.id));
    isNowFavorite = false;
  } else {
    const normalizedImage = product.image || (product.images && product.images[0]) || "";
    const normalizedProduct: ProductItem = {
      ...product,
      image: normalizedImage,
      images: product.images || (normalizedImage ? [normalizedImage] : [])
    };
    updated = [normalizedProduct, ...current];
    isNowFavorite = true;
  }

  saveFavorites(updated);
  return isNowFavorite;
};

export const removeFavoriteItem = (id: number | string) => {
  const current = getStoredFavorites();
  const updated = current.filter((item) => String(item.id) !== String(id));
  saveFavorites(updated);
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<ProductItem[]>(() => getStoredFavorites());

  const syncFavorites = useCallback(() => {
    setFavorites(getStoredFavorites());
  }, []);

  useEffect(() => {
    syncFavorites();

    const handleCustom = () => syncFavorites();
    const handleStorage = (e: StorageEvent) => {
      if (!e.key || e.key === "favorites") {
        syncFavorites();
      }
    };

    window.addEventListener("favoritesChanged", handleCustom);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("favoritesChanged", handleCustom);
      window.removeEventListener("storage", handleStorage);
    };
  }, [syncFavorites]);

  const isFavorite = useCallback(
    (id: number | string) => {
      return favorites.some((item) => String(item.id) === String(id));
    },
    [favorites]
  );

  const toggle = useCallback((product: ProductItem) => {
    return toggleFavoriteItem(product);
  }, []);

  const remove = useCallback((id: number | string) => {
    removeFavoriteItem(id);
  }, []);

  return {
    favorites,
    isFavorite,
    toggleFavorite: toggle,
    removeFavorite: remove,
    count: favorites.length
  };
};
