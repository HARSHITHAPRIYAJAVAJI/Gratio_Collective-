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
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&h=200&fit=crop&crop=center",
      title: "NEGOTIATE YOUR PRICE"
    },
    {
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300&h=200&fit=crop&crop=center",
      title: "SELL EFFORTLESSLY"
    },
    {
      image: "https://images.unsplash.com/photo-1594736797933-d0301ba5aa37?w=300&h=200&fit=crop&crop=center",
      title: "DEALS UP TO 70% OFF RETAIL"
    },
    {
      image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=300&h=200&fit=crop&crop=center",
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
      image: "https://cdn-images.farfetch-contents.com/13/27/38/32/13273832_54473592_1000.jpg",
      badge: "WE LOVE"
    },
    {
      id: 2,
      brand: "MIU MIU",
      name: "Miu Wander leather crossbody bag",
      originalPrice: "$2,750",
      price: "$2,320",
      likes: 98,
      image: "https://www.mytheresa.com/image/1094/1238/100/2a/P00839961.jpg",
      badge: "WE LOVE"
    },
    {
      id: 3,
      brand: "LOUIS VUITTON",
      name: "Neverfull leather tote",
      originalPrice: "$2,150",
      price: "$1,750",
      likes: 4,
      image: "https://www.theluxurypop.com/cdn/shop/files/IMG_8782-Photoroom.jpg?v=1786010331&width=1200",
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
      image: "https://assets.christiandior.com/is/image/diorprod/M0455CBAAM900_SBG_E03-1?$r9x10_raw$&crop=0,0,4000,5000&wid=1024&hei=1107&scale=0.5535&bfc=on&qlt=80",
      badge: "WE LOVE"
    },
    {
      id: 5,
      brand: "GUCCI",
      name: "Blondie leather handbag",
      originalPrice: "$2,350",
      price: "$1,890",
      likes: 15,
      image: "https://retag.in/cdn/shop/files/0L3A5637.jpg?v=1768906292",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
          {products.map((product) => {
            const isFav = isFavorite(product.id);
            return (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl mb-3 aspect-[3/4] bg-[#f7f7f8] flex items-center justify-center p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-white/95 text-black font-semibold text-[10px] tracking-wider uppercase px-2 py-1 rounded shadow-xs">
                      {product.badge}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product);
                    }}
                    className="absolute top-3 right-3 flex items-center space-x-1 bg-white/90 hover:bg-white px-2 py-1 rounded-full shadow-xs hover:shadow-md transition-all z-10"
                    title={isFav ? "Remove from favorites" : "Add to favorites"}
                    aria-label="Toggle favorite"
                  >
                    <Heart className={`h-3.5 w-3.5 transition-colors ${isFav ? "text-red-500 fill-red-500" : "text-gray-500 hover:text-red-500"}`} />
                    <span className="text-xs text-black font-medium">{product.likes ? product.likes + (isFav ? 1 : 0) : ""}</span>
                  </button>
                  {product.trusted && (
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="bg-orange-100/95 text-orange-700 text-xs px-2 py-0.5 rounded-md flex items-center font-medium shadow-xs">
                        🛡️ Trusted Seller
                      </span>
                    </div>
                  )}
                  {product.expert && (
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="bg-orange-100/95 text-orange-700 text-xs px-2 py-0.5 rounded-md flex items-center font-medium shadow-xs">
                        🏆 Expert Seller
                      </span>
                    </div>
                  )}
                </div>

              <div className="space-y-1">
                <h3 className="text-sm font-bold text-black">{product.brand}</h3>
                <p className="text-sm text-gray-600">{product.name}</p>
                {product.size && (
                  <p className="text-xs text-gray-500">{product.size}</p>
                )}
                <div className="flex items-center space-x-2">
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                  )}
                  <span className="text-sm font-bold text-red-600">{product.price}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="mr-2">📦 Direct Shipping</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="mr-1">🇺🇸</span>
                  <span>United States</span>
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
