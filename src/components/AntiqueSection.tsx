import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/utils/favorites";

const AntiqueSection: React.FC = () => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const features = [
    {
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&crop=center",
      title: "PRE-LOVED YOU CAN TRUST"
    },
    {
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&h=200&fit=crop&crop=center&auto=format&q=75",
      title: "AUTHENTICITY GUARANTEED"
    },
    {
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300&h=200&fit=crop&crop=center&auto=format&q=75",
      title: "SELL EFFORTLESSLY"
    },
    {
      image: "https://images.unsplash.com/photo-1594736797933-d0301ba5aa37?w=300&h=200&fit=crop&crop=center&auto=format&q=75",
      title: "DEALS UP TO 70% OFF RETAIL"
    },
    {
      image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=300&h=200&fit=crop&crop=center&auto=format&q=75",
      title: "COMMUNITY EDITS"
    }
  ];

  const products = [
    {
      id: 1,
      brand: "BALENCIAGA",
      name: "Track leather low trainers",
      size: "11 US",
      originalPrice: "$1,450",
      price: "$1,280",
      likes: 17,
      image: "/images/shoe.webp",
      badge: "WE LOVE"
    },
    {
      id: 2,
      brand: "MIU MIU",
      name: "Miu Wander leather crossbody bag",
      originalPrice: "$2,750",
      price: "$2,320",
      likes: 98,
      image: "/images/chane.webp",
      badge: "WE LOVE"
    },
    {
      id: 3,
      brand: "LOUIS VUITTON",
      name: "Neverfull leather tote",
      originalPrice: "$2,150",
      price: "$1,750",
      likes: 4,
      image: "/images/herm.webp",
      badge: "WE LOVE",
      trusted: true
    },
    {
      id: 4,
      brand: "DIOR",
      name: "Saddle leather handbag",
      originalPrice: "$4,400",
      price: "$3,850",
      likes: 94,
      image: "/images/guc.webp",
      badge: "WE LOVE"
    },
    {
      id: 5,
      brand: "GUCCI",
      name: "Blondie leather handbag",
      originalPrice: "$2,350",
      price: "$1,890",
      likes: 15,
      image: "/images/ysl.webp",
      badge: "WE LOVE",
      expert: true
    }
  ];

  return (
    <section className="py-7 px-4 sm:px-6 lg:px-8 xl:px-10 bg-white w-full">
      <div className="w-full">


        {/* We Love Section */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold font-playfair text-black">We Love</h2>
          <button className="text-sm font-medium text-black border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-colors">
            View all
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-4">
          {products.map((product) => {
            const isFav = isFavorite(product.id);
            return (
              <div key={product.id} className="group cursor-pointer flex flex-col justify-between">
                <div className="relative overflow-hidden rounded-lg mb-2 aspect-square bg-[#f7f7f8] flex items-center justify-center p-2.5">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 z-10">
                    <span className="bg-white/95 text-black font-semibold text-[9px] tracking-wider uppercase px-1.5 py-0.5 rounded shadow-2xs">
                      {product.badge}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product);
                    }}
                    className="absolute top-2 right-2 flex items-center space-x-1 bg-white/90 hover:bg-white px-1.5 py-0.5 rounded-full shadow-2xs hover:shadow-xs transition-all z-10"
                    title={isFav ? "Remove from favorites" : "Add to favorites"}
                    aria-label="Toggle favorite"
                  >
                    <Heart className={`h-3 w-3 transition-colors ${isFav ? "text-red-500 fill-red-500" : "text-gray-500 hover:text-red-500"}`} />
                    <span className="text-[10px] text-black font-medium">{product.likes ? product.likes + (isFav ? 1 : 0) : ""}</span>
                  </button>
                  {product.trusted && (
                    <div className="absolute bottom-2 left-2 z-10">
                      <span className="bg-orange-100/95 text-orange-700 text-[9px] px-1.5 py-0.5 rounded flex items-center font-medium shadow-2xs">
                        🛡️ Trusted
                      </span>
                    </div>
                  )}
                  {product.expert && (
                    <div className="absolute bottom-2 left-2 z-10">
                      <span className="bg-orange-100/95 text-orange-700 text-[9px] px-1.5 py-0.5 rounded flex items-center font-medium shadow-2xs">
                        🏆 Expert
                      </span>
                    </div>
                  )}
                </div>

              <div className="space-y-0.5">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{product.brand}</h3>
                <p className="text-xs sm:text-sm font-medium text-black line-clamp-1 group-hover:underline">{product.name}</p>
                {product.size && (
                  <p className="text-[11px] text-gray-500">Size: {product.size}</p>
                )}
                <div className="flex items-center space-x-1.5 pt-0.5">
                  <span className="text-xs sm:text-sm font-bold text-red-600">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-[10px] text-gray-400 line-through">{product.originalPrice}</span>
                  )}
                </div>
                <div className="flex items-center text-[10px] text-gray-500 pt-0.5">
                  <span className="mr-1.5">📦 Direct</span>
                  <span>🇺🇸 US</span>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AntiqueSection;
