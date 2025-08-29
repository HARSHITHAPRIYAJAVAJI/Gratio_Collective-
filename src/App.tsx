import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import AntiqueSection from "./components/AntiqueSection";
import Bags from "./pages/BagsFootwear";
import Children from "./pages/Children";
import Favorites from "./pages/Favorites";
import HomeKitchen from "./pages/HomeKitchen";
import Index from "./pages/Index";
import Jewelry from "./pages/Jewelry";
import Men from "./pages/Men";
import NotFound from "./pages/NotFound";
import ProductsPage from "./pages/ProductsPage";
import Profile from "./pages/Profile";
import Electronics from "./pages/Electronics";
import Search from "./pages/Search";
import Sellitem from "./pages/SellItem";
import SignIn from "./pages/SignIn";
import Women from "./pages/Women";
import Vintage from "./pages/Vintage";
import CategoryCarousel from "./components/CategoryCarousel";
import WelcomeModal from "./components/WelcomeModal";
import Footer from "./components/Footer";
import "./App.css";
import "./styles/globals.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sell" element={<Sellitem />} />
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
          <Route path="electronics" element={<Electronics />} />
          <Route path="/home-kitchen" element={<HomeKitchen />} />
          <Route path="/vintage" element={<Vintage />} />
          <Route path="/antiques" element={<AntiqueSection />} />
          <Route path="/category-carousel" element={<CategoryCarousel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;