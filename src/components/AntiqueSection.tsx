import { Heart } from "lucide-react";

const AntiqueSection: React.FC = () => {
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
      price: "$339",
      likes: 17,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop&crop=center",
      badge: "WE LOVE"
    },
    {
      id: 2,
      brand: "MIU MIU", 
      name: "Miu Wander leather crossbody bag",
      price: "$956",
      likes: 98,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop&crop=center",
      badge: "WE LOVE"
    },
    {
      id: 3,
      brand: "LOUIS VUITTON",
      name: "Neverfull leather tote",
      originalPrice: "$1,125",
      price: "$978",
      likes: 4,
      image: "https://images.unsplash.com/photo-1594736797933-d0301ba5aa37?w=300&h=300&fit=crop&crop=center",
      badge: "WE LOVE",
      trusted: true
    },
    {
      id: 4,
      brand: "DIOR",
      name: "Saddle leather handbag", 
      originalPrice: "$1,203",
      price: "$814",
      likes: 94,
      image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=300&h=300&fit=crop&crop=center",
      badge: "WE LOVE"
    },
    {
      id: 5,
      brand: "GUCCI",
      name: "Blondie leather handbag",
      price: "$734", 
      likes: 15,
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300&h=300&fit=crop&crop=center",
      badge: "WE LOVE",
      expert: true
    }
  ];

  return (
    <section className="py-7 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
    

        {/* We Love Section */}
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold font-playfair text-black">We Love</h2>
          <button className="text-sm font-medium text-black border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-colors">
            View all
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-3">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white text-black text-xs px-2 py-1 rounded">
                    {product.badge}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center space-x-1">
                  <Heart className="h-4 w-4 text-black" />
                  <span className="text-xs text-black">{product.likes}</span>
                </div>
                {product.trusted && (
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded flex items-center">
                      🛡️ Trusted Seller
                    </span>
                  </div>
                )}
                {product.expert && (
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded flex items-center">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default AntiqueSection;
