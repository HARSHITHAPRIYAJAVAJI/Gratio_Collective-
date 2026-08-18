import { useState, useEffect } from "react";
import { MapPin, ChevronDown, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const LocationSelector: React.FC = () => {
  const [location, setLocation] = useState(() => {
    return localStorage.getItem("userLocation") || "Select Location";
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  const countries = [
    "United States", "United Kingdom", "Canada", "Australia", "Germany", 
    "France", "Italy", "Spain", "Japan", "South Korea", "India", "Brazil"
  ];

  const fetchAreaName = async (lat: number, lon: number): Promise<string> => {
    // 1. Try BigDataCloud Client Reverse Geocoding API (Fast and precise for cities & localities)
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      if (response.ok) {
        const data = await response.json();
        const city = data.city || data.locality || data.principalSubdivision;
        const sub = data.locality && data.city && data.locality !== data.city ? `${data.locality}, ${data.city}` : null;
        const stateOrCountry = data.countryCode || data.countryName || data.principalSubdivision;

        if (sub) {
          return sub;
        } else if (city && stateOrCountry) {
          return `${city}, ${stateOrCountry}`;
        } else if (city) {
          return city;
        } else if (data.countryName) {
          return data.countryName;
        }
      }
    } catch (err) {
      console.warn("BigDataCloud geocode failed, falling back to OpenStreetMap:", err);
    }

    // 2. Fallback to OpenStreetMap Nominatim API
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=14&addressdetails=1`,
        { headers: { "Accept-Language": "en" } }
      );
      if (response.ok) {
        const data = await response.json();
        const addr = data.address || {};
        const area = addr.suburb || addr.neighbourhood || addr.residential || addr.city_district;
        const city = addr.city || addr.town || addr.village || addr.county;
        const country = addr.country_code ? addr.country_code.toUpperCase() : addr.country;

        if (area && city) {
          return `${area}, ${city}`;
        } else if (city && country) {
          return `${city}, ${country}`;
        } else if (city) {
          return city;
        } else if (data.name) {
          return data.name;
        }
      }
    } catch (err) {
      console.warn("Nominatim reverse geocode failed:", err);
    }

    return "Current Location";
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsDetecting(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const areaName = await fetchAreaName(latitude, longitude);
          setLocation(areaName);
          localStorage.setItem("userLocation", areaName);
          setIsOpen(false);
        } catch (error) {
          console.error("Error determining area name:", error);
          setLocation("Current Location");
          localStorage.setItem("userLocation", "Current Location");
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        console.error("Error getting geolocation:", error);
        setIsDetecting(false);
        if (error.code === error.PERMISSION_DENIED) {
          alert("Location permission was denied. Please select a location manually from the list or enable location in your browser settings.");
        } else {
          alert("Unable to retrieve your location. Please select your country or area manually.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleSelectCountry = (country: string) => {
    setLocation(country);
    localStorage.setItem("userLocation", country);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center space-x-1.5 text-xs sm:text-sm bg-white text-black border-gray-300 hover:bg-gray-50 h-9 px-3 rounded-md font-medium shadow-none transition-colors max-w-[200px] truncate"
          title={location}
        >
          {isDetecting ? (
            <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-black animate-spin flex-shrink-0" />
          ) : (
            <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-700 flex-shrink-0" />
          )}
          <span className="truncate max-w-[140px]">{isDetecting ? "Detecting..." : location}</span>
          <ChevronDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-500 flex-shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4 bg-white shadow-xl border border-gray-200 rounded-xl z-50">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm text-black mb-1">Your Delivery Location</h4>
            <p className="text-xs text-gray-500 mb-3">Detect real-time area for local delivery and pricing</p>
            <Button 
              onClick={detectLocation}
              disabled={isDetecting}
              className="w-full text-xs sm:text-sm bg-black text-white hover:bg-gray-800 h-9 rounded-lg flex items-center justify-center space-x-2 transition"
            >
              {isDetecting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span>Detecting Area...</span>
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4 mr-2 text-yellow-400" />
                  <span>Detect My Current Area</span>
                </>
              )}
            </Button>
          </div>

          <div className="border-t border-gray-100 pt-3">
            <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Or Choose Country</h5>
            <div className="space-y-0.5 max-h-48 overflow-y-auto pr-1">
              {countries.map((country) => {
                const isSelected = location === country;
                return (
                  <button
                    key={country}
                    onClick={() => handleSelectCountry(country)}
                    className={`w-full text-left text-xs sm:text-sm py-2 px-3 rounded-md flex items-center justify-between transition-colors ${
                      isSelected 
                        ? "bg-gray-100 font-semibold text-black" 
                        : "hover:bg-gray-50 text-gray-700 font-normal"
                    }`}
                  >
                    <span>{country}</span>
                    {isSelected && <Check className="h-4 w-4 text-black" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LocationSelector;
