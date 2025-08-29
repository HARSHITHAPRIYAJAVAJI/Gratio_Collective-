import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const LanguageSelector: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Português", flag: "🇧🇷" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "zh", name: "中文", flag: "🇨🇳" }
  ];

  const handleLanguageChange = (language: any) => {
    setSelectedLanguage(language.name);
    setIsOpen(false);
    // Here you would implement actual language switching logic
    console.log("Language changed to:", language.code);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm hover:bg-accent"
        >
          <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">{selectedLanguage}</span>
          <span className="sm:hidden">Lang</span>
          <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <div className="space-y-1">
          <h4 className="font-medium text-sm mb-2 px-2">Select Language</h4>
          <div className="max-h-64 overflow-y-auto">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language)}
                className={`w-full flex items-center space-x-3 px-2 py-2 text-sm rounded hover:bg-accent transition-colors ${
                  selectedLanguage === language.name ? 'bg-accent' : ''
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSelector;