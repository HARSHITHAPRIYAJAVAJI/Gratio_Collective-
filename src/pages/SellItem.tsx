import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, Camera } from "lucide-react";
import { Link } from "react-router-dom";

const Sellitem: React.FC = () => {
  const [formData, setFormData] = useState({
    brand: "",
    category: "",
    condition: "",
    size: "",
    title: "",
    description: "",
    price: "",
    originalPrice: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Header */}
      <div className="border-b border-gray-200 py-4">
        <div className="max-w-4xl mx-auto px-4 flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-playfair font-semibold">Sell an Item</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">Item Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    placeholder="e.g. Chanel, Louis Vuitton"
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="">Select Category</option>
                    <option value="bags">Bags</option>
                    <option value="shoes">Shoes</option>
                    <option value="clothing">Clothing</option>
                    <option value="accessories">Accessories</option>
                    <option value="jewelry">Jewelry & Watches</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="condition">Condition</Label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={formData.condition}
                    onChange={(e) => setFormData({...formData, condition: e.target.value})}
                  >
                    <option value="">Select Condition</option>
                    <option value="new">New with tags</option>
                    <option value="excellent">Excellent</option>
                    <option value="very-good">Very good</option>
                    <option value="good">Good</option>
                    <option value="satisfactory">Satisfactory</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="size">Size</Label>
                  <Input
                    id="size"
                    placeholder="e.g. Medium, 38, OS"
                    value={formData.size}
                    onChange={(e) => setFormData({...formData, size: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Item title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your item..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="originalPrice">Original Price ($)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      placeholder="0"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Your Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Photo Upload Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {[1, 2, 3, 4].map((index) => (
                    <div
                      key={index}
                      className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                    >
                      <div className="text-center">
                        <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Add Photo</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Add up to 8 photos. The first photo will be your cover image.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">Selling Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Use natural lighting for photos</li>
                  <li>• Show any flaws or wear</li>
                  <li>• Include close-ups of important details</li>
                  <li>• Be honest about the condition</li>
                  <li>• Research similar items for pricing</li>
                </ul>
              </CardContent>
            </Card>

            <Button 
              onClick={handleSubmit} 
              className="w-full bg-black text-white hover:bg-gray-800"
              size="lg"
            >
              List Item
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sellitem;