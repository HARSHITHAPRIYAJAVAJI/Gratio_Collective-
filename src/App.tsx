import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import "./App.css";
import "./styles/globals.css";

// Lazy-load secondary route pages to dramatically reduce initial JavaScript bundle size & boost FCP/LCP
const AboutUs = lazy(() => import("./pages/AboutUs"));
const AntiqueSection = lazy(() => import("./components/AntiqueSection"));
const Bags = lazy(() => import("./pages/BagsFootwear"));
const Children = lazy(() => import("./pages/Children"));
const Favorites = lazy(() => import("./pages/Favorites"));
const HomeKitchen = lazy(() => import("./pages/HomeKitchen"));
const Jewelry = lazy(() => import("./pages/Jewelry"));
const Men = lazy(() => import("./pages/Men"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const Profile = lazy(() => import("./pages/Profile"));
const Electronics = lazy(() => import("./pages/Electronics"));
const Search = lazy(() => import("./pages/Search"));
const Sellitem = lazy(() => import("./pages/SellItem"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Women = lazy(() => import("./pages/Women"));
const Vintage = lazy(() => import("./pages/Vintage"));
const Cart = lazy(() => import("./pages/Cart"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const CategoryCarousel = lazy(() => import("./components/CategoryCarousel"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/sell" element={<Sellitem />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/women" element={<Women />} />
            <Route path="/men" element={<Men />} />
            <Route path="/children" element={<Children />} />
            <Route path="/bags" element={<Bags />} />
            <Route path="/jewelry" element={<Jewelry />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/search" element={<Search />} />
            <Route path="/products/:id" element={<ProductsPage />} />
            <Route path="/electronics" element={<Electronics />} />
            <Route path="/home-kitchen" element={<HomeKitchen />} />
            <Route path="/vintage" element={<Vintage />} />
            <Route path="/antiques" element={<AntiqueSection />} />
            <Route path="/category-carousel" element={<CategoryCarousel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;