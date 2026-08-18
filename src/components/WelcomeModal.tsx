import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const features = [
    "Authentic pre-owned luxury items",
    "Expert authentication process", 
    "Global marketplace for fashion",
    "Sustainable fashion choices"
  ];

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % features.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isOpen, features.length]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-lg border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle>Welcome to Gratio Collective</DialogTitle>
          <DialogDescription>
            Your premier destination for authenticated luxury fashion and curated vintage.
          </DialogDescription>
        </DialogHeader>
        <div className="text-center p-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-left">
              <Sparkles className="h-6 w-6 text-yellow-500 flex-shrink-0" />
              <div>
                <h4 className="font-semibold font-playfair">Authentic Luxury</h4>
                <p className="text-sm text-gray-600">
                  Every item is rigorously authenticated before reaching you.
                </p>
              </div>
            </div>
            <div className="text-center pt-2">
              <span className="text-xl font-playfair font-bold text-black">
                Gratio Collective
              </span>
            </div>
            
            {/* Animated Features */}
            <div className="h-16 flex items-center justify-center mb-6">
              <div className="text-center transition-all duration-500 ease-in-out">
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <Heart className="h-5 w-5 text-red-500 animate-bounce" />
                  <span className="text-sm font-medium animate-fade-in">
                    {features[currentSlide]}
                  </span>
                  <ShoppingBag className="h-5 w-5 text-green-500 animate-bounce" />
                </div>
              </div>
            </div>

            {/* Offer Badge */}
            <Badge className="bg-yellow-300 text-black text-sm font-semibold mb-6 px-4 py-2 animate-pulse">
              <Star className="h-4 w-4 mr-1" />
              Get 10% off with code WELCOME10
            </Badge>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link to="/signin" onClick={onClose}>
                <Button className="w-full bg-black text-white hover:bg-gray-800 py-3 text-sm font-medium rounded-none">
                  Sign In to Your Account
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                onClick={onClose}
                className="w-full border-gray-300 text-black hover:bg-gray-50 py-3 text-sm font-medium rounded-none"
              >
                Continue Browsing
              </Button>
            </div>

            {/* Small Text */}
            <p className="text-xs text-gray-500 mt-4">
              Join millions discovering authentic luxury fashion
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;