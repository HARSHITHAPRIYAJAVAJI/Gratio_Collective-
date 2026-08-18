import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["Accessories", "Sunglasses", "Girl's Collection", "Clothing", "Beauty", "New Products"];

const allProducts = [
  { id: 1, name: "Vintage Watch", category: "Accessories", condition: "Pre-Owned", price: 200, img: "/watch.jpg" },
  { id: 2, name: "Round Shades", category: "Sunglasses", condition: "New", price: 120, img: "/shades.jpg" },
  { id: 3, name: "Floral Dress", category: "Clothing", condition: "Pre-Owned", price: 180, img: "/dress.jpg" },
  { id: 4, name: "Lipstick Set", category: "Beauty", condition: "New", price: 80, img: "/lipstick.jpg" },
];

const ProductsPage: React.FC = () => {
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = allProducts.filter((product) => {
    const matchCondition = selectedCondition === "All" || product.condition === selectedCondition;
    const matchCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchCondition && matchCategory;
  });

  return (
    <div className="min-h-screen bg-white font-inter flex flex-col justify-between">
      <Navbar showBack backTo="/" />
      <div className="flex flex-1 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 border-r border-amber-100 bg-white/60 backdrop-blur-md p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul className="space-y-2">
          <li
            onClick={() => setSelectedCategory("All")}
            className={`cursor-pointer px-2 py-1 rounded-md ${
              selectedCategory === "All" ? "bg-amber-100 font-semibold" : "hover:bg-amber-50"
            }`}
          >
            All
          </li>
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer px-2 py-1 rounded-md ${
                selectedCategory === cat ? "bg-amber-100 font-semibold" : "hover:bg-amber-50"
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>

        <h2 className="text-sm font-bold uppercase tracking-wider text-black mt-6 mb-3">Condition</h2>
        <div className="space-y-1">
          {["All", "New", "Pre-owned", "Very Good"].map((condition) => (
            <button
              key={condition}
              onClick={() => setSelectedCondition(condition)}
              className={`w-full text-left px-2 py-1 text-xs rounded-md ${
                selectedCondition === condition ? "bg-black text-white font-medium" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {condition}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gradient-to-b from-white to-yellow-50">
        <h1 className="text-3xl font-bold mb-6">Women's Wear</h1>

        {/* Category Scroll Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Shop by Category</h2>
          <div className="flex space-x-6 overflow-x-auto pb-4">
            {categories.map((cat) => (
              <div
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex flex-col items-center cursor-pointer ${
                  selectedCategory === cat ? "font-semibold text-pink-600" : "text-gray-600"
                }`}
              >
                <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center shadow">
                  <span className="text-sm font-bold">{cat.charAt(0)}</span>
                </div>
                <span className="text-xs mt-2">{cat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Product Grid Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow-2xs hover:shadow-md transition border border-gray-100 flex flex-col justify-between"
                >
                  <div className="aspect-square bg-gray-50 flex items-center justify-center p-2">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{product.category}</p>
                    <h3 className="font-medium text-xs sm:text-sm text-black line-clamp-1">{product.name}</h3>
                    <p className="text-[11px] text-gray-500">{product.condition}</p>
                    <p className="text-pink-600 font-bold text-xs sm:text-sm mt-1">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full py-8 text-center">No products match the selected filters.</p>
            )}
          </div>
        </section>
      </main>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
