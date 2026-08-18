import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TrustSection from "@/components/TrustSection";
import AntiqueSection from "@/components/AntiqueSection";
import Footer from "@/components/Footer";
import WelcomeModal from "@/components/WelcomeModal";
import CategoryCarousel from "@/components/CategoryCarousel";
import Navbar from "@/components/Navbar";
import ChatAssistant from "@/components/ChatAssistant";

const Index: React.FC = () => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    // Show welcome modal on first visit after initial paint
    const hasVisited = localStorage.getItem('hasVisitedGratio');
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setShowWelcomeModal(true);
        localStorage.setItem('hasVisitedGratio', 'true');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white font-inter">
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
      />

      <Navbar />

      {/* Page Sections */}
      <Hero />
      <CategoryCarousel />
      <Features />
      <AntiqueSection />
      <TrustSection />
      <Footer />
      <ChatAssistant />

      {/* Mobile Search Bar */}

    </div>
  );
};

export default Index; 