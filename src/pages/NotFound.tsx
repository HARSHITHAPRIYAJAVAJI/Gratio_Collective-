import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white font-inter flex flex-col justify-between">
      <Navbar showBack backTo="/" />
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-playfair font-bold text-neutral-900 mb-3">404</h1>
          <p className="text-lg text-gray-600 mb-6 font-playfair">Oops! The luxury piece or page could not be found.</p>
          <Link to="/">
            <Button className="bg-black text-white hover:bg-neutral-800 px-6 py-2 rounded-lg">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
