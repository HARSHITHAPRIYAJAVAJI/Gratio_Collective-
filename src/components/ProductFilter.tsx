import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import React, { useState } from "react";

interface ProductFilterProps {
  onFilterChange: (filters: any) => void;
  currentFilters: any;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange, currentFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const genders = ["Men", "Women", "Children"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const fits = ["Slim", "Regular", "Relaxed", "Oversized"];
  const colors = ["Black", "White", "Blue", "Red", "Green", "Brown", "Grey", "Pink"];
  const brands = ["Chanel", "Louis Vuitton", "Gucci", "Prada", "Hermès", "Dior"];
  const occasions = ["Casual", "Formal", "Party", "Work", "Sport", "Evening"];
  const discounts = ["0-25%", "25-50%", "50-75%", "75%+"];
  const ratings = ["5 Stars", "4+ Stars", "3+ Stars", "2+ Stars"];

  const handleFilterChange = (category: string, value: string) => {
    const newFilters = { ...currentFilters };
    if (!newFilters[category]) {
      newFilters[category] = [];
    }
    
    if (newFilters[category].includes(value)) {
      newFilters[category] = newFilters[category].filter((item: string) => item !== value);
    } else {
      newFilters[category].push(value);
    }
    
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  return (
    <div className="bg-white border-b border-gray-200 py-3 sm:py-4 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Product Type Filter */}
            <div className="flex space-x-1 sm:space-x-2">
              <Button
                variant={currentFilters.type === "preowned" ? "default" : "outline"}
                onClick={() => onFilterChange({ ...currentFilters, type: "preowned" })}
                className="text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 h-8 sm:h-auto"
              >
                Pre-owned
              </Button>
              <Button
                variant={currentFilters.type === "new" ? "default" : "outline"}
                onClick={() => onFilterChange({ ...currentFilters, type: "new" })}
                className="text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 h-8 sm:h-auto"
              >
                New
              </Button>
            </div>

            {/* Advanced Filters */}
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 h-8 sm:h-auto">
                  <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">More </span>Filters
                  <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 sm:w-96 p-4 sm:p-6 max-h-96 overflow-y-auto">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between">
                     <h3 className="font-semibold text-black text-sm sm:text-base">Filters</h3>
                    <Button variant="ghost" onClick={clearFilters} className="text-xs sm:text-sm">
                      Clear all
                    </Button>
                  </div>

                  {/* Gender Filter */}
                  <div>
                     <h4 className="font-medium text-xs sm:text-sm mb-2">Gender</h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {genders.map((gender) => (
                        <Badge
                          key={gender}
                          variant={currentFilters.gender?.includes(gender) ? "default" : "outline"}
                          className="cursor-pointer text-xs"
                          onClick={() => handleFilterChange("gender", gender)}
                        >
                          {gender}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Size Filter */}
                  <div>
                    <h4 className="font-medium text-xs sm:text-sm mb-2">Size</h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {sizes.map((size) => (
                        <Badge
                          key={size}
                          variant={currentFilters.size?.includes(size) ? "default" : "outline"}
                          className="cursor-pointer text-xs"
                          onClick={() => handleFilterChange("size", size)}
                        >
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Colors Filter */}
                  <div>
                    <h4 className="font-medium text-xs sm:text-sm mb-2">Colors</h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {colors.map((color) => (
                        <Badge
                          key={color}
                          variant={currentFilters.colors?.includes(color) ? "default" : "outline"}
                          className="cursor-pointer text-xs"
                          onClick={() => handleFilterChange("colors", color)}
                        >
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Brands Filter */}
                  <div>
                     <h4 className="font-medium text-xs sm:text-sm mb-2">Brands</h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {brands.map((brand) => (
                        <Badge
                          key={brand}
                          variant={currentFilters.brands?.includes(brand) ? "default" : "outline"}
                          className="cursor-pointer text-xs"
                          onClick={() => handleFilterChange("brands", brand)}
                        >
                          {brand}
                          </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Occasions Filter */}
                  <div>
                    <h4 className="font-medium text-xs sm:text-sm mb-2">Occasions</h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {occasions.map((occasion) => (
                        <Badge
                          key={occasion}
                          variant={currentFilters.occasions?.includes(occasion) ? "default" : "outline"}
                          className="cursor-pointer text-xs"
                          onClick={() => handleFilterChange("occasions", occasion)}
                        >
                          {occasion}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Discount Filter */}
                  <div>
                    <h4 className="font-medium text-xs sm:text-sm mb-2">Discount</h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {discounts.map((discount) => (
                        <Badge
                          key={discount}
                          variant={currentFilters.discounts?.includes(discount) ? "default" : "outline"}
                          className="cursor-pointer text-xs"
                          onClick={() => handleFilterChange("discounts", discount)}
                        >
                          {discount}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <h4 className="font-medium text-xs sm:text-sm mb-2">Rating</h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {ratings.map((rating) => (
                        <Badge
                          key={rating}
                          variant={currentFilters.ratings?.includes(rating) ? "default" : "outline"}
                          className="cursor-pointer text-xs"
                          onClick={() => handleFilterChange("ratings", rating)}
                        >
                          {rating}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;