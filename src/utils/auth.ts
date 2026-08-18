import { useState, useEffect } from "react";

export interface UserSession {
  email: string;
  name: string;
  role: "buyer" | "seller" | "admin";
  isAuthenticated: boolean;
  storeName?: string;
  avatar?: string;
  memberSince?: string;
}

const AUTH_STORAGE_KEY = "gratio_auth_user";

export const getStoredUser = (): UserSession | null => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse auth user:", e);
    return null;
  }
};

export const setStoredUser = (user: UserSession | null) => {
  try {
    if (!user) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } else {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    }
    window.dispatchEvent(new Event("authChanged"));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Failed to save auth user:", e);
  }
};

export const useAuth = () => {
  const [user, setUser] = useState<UserSession | null>(getStoredUser);

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(getStoredUser());
    };

    window.addEventListener("authChanged", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const login = (role: "buyer" | "seller" | "admin", email: string, name?: string) => {
    const defaultNames = {
      buyer: "Sarah Johnson",
      seller: "Maison Collector",
      admin: "Chief Curator"
    };

    const session: UserSession = {
      email,
      name: name && name.trim() ? name.trim() : defaultNames[role],
      role,
      isAuthenticated: true,
      storeName: role === "seller" ? "Atelier Vintage NYC" : undefined,
      memberSince: "March 2024"
    };

    setStoredUser(session);
    return session;
  };

  const logout = () => {
    setStoredUser(null);
  };

  return {
    user,
    role: user?.role || null,
    isAuthenticated: !!user?.isAuthenticated,
    login,
    logout
  };
};
