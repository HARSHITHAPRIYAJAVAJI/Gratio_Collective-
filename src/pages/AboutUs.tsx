import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Menu, Search, User, Heart, X, ArrowLeft, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const AboutUs: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Top Banner */}
      <div className="bg-yellow-300 text-center py-2">
        <p className="text-xs sm:text-sm font-medium text-black">Get 10% off with code WELCOME10*</p>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Menu className="h-5 w-5 text-black" />
              </button>
              
              <Link to="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                <span className="text-xs sm:text-sm font-medium">Back</span>
              </Link>
            </div>

            <div className="flex items-center">
              <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
                <img 
                  src="/images/l.webp" 
                  alt="Gratio Collective" 
                  className="h-10 sm:h-12 w-auto object-contain" 
                />
              </Link>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/favorites" className="relative">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-black cursor-pointer" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  3
                </Badge>
              </Link>
              <div className="relative">
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-black cursor-pointer" />
                <Badge className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  0
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="bg-white w-64 h-full shadow-lg">
              <div className="flex justify-between items-center p-4 border-b">
                <span className="text-lg font-playfair font-bold">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-4 space-y-4">
                <Link to="/women" className="block py-2 text-sm font-medium text-black">Women</Link>
                <Link to="/men" className="block py-2 text-sm font-medium text-black">Men</Link>
                <Link to="/children" className="block py-2 text-sm font-medium text-black">Children</Link>
                <Link to="/bags" className="block py-2 text-sm font-medium text-black">Bags</Link>
                <Link to="/jewelry" className="block py-2 text-sm font-medium text-black">Jewelry</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* About Us Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-black mb-4">
            About Gratio Collective
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Your premier destination for luxury fashion and authentic designer pieces
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&crop=center"
              alt="Luxury Fashion Store"
              className="w-full h-64 sm:h-80 object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-black mb-4">Our Story</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="mb-6">
                Founded with a passion for authentic luxury fashion, Gratio Collective has been curating the finest designer pieces for discerning customers worldwide. We believe that luxury should be accessible, sustainable, and authentic.
              </p>
              <p className="text-gray-600">
                Our team of experts carefully authenticates every piece, ensuring you receive only the highest quality items from the world's most prestigious fashion houses.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-black mb-2">Authenticity Guaranteed</h3>
            <p className="text-gray-600">Every item is authenticated by our team of experts</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-black mb-2">Sustainable Fashion</h3>
            <p className="text-gray-600">Extending the life of luxury pieces through resale</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-black mb-2">Global Shipping</h3>
            <p className="text-gray-600">Delivering luxury worldwide with care and security</p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-black mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Discover unique pieces, connect with fellow fashion enthusiasts, and be part of the sustainable luxury movement.
          </p>
          <Link to="/signin">
            <Button className="bg-black text-white hover:bg-gray-800 px-6 py-3">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
