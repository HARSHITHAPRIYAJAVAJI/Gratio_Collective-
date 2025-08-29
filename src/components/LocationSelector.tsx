import { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const LocationSelector: React.FC = () => {
  const [location, setLocation] = useState("Select Location");
  const [isOpen, setIsOpen] = useState(false);

  const countries = [
    "United States", "United Kingdom", "Canada", "Australia", "Germany", 
    "France", "Italy", "Spain", "Japan", "South Korea", "India", "Brazil"
  ];

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation("Current Location");
          console.log("Location detected:", position.coords);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation("Location unavailable");
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm bg-white text-black border-gray-300 hover:bg-gray-100"
        >
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">{location}</span>
          <span className="sm:hidden">Location</span>
          <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2">Select Your Location</h4>
            <Button 
              onClick={detectLocation}
              variant="outline" 
              className="w-full text-sm mb-3"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Use Current Location
            </Button>
          </div>
          <div>
            <h5 className="text-xs font-medium text-gray-500 mb-2">Popular Countries</h5>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => {
                    setLocation(country);
                    setIsOpen(false);
                  }}
                  className="w-full text-left text-sm py-2 px-3 hover:bg-gray-100 rounded"
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LocationSelector;
