import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-inter">
      <Navbar showBack backTo="/" />

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
      <Footer />
    </div>
  );
};

export default AboutUs;
