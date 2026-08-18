import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Upload, 
  Camera, 
  Sparkles, 
  Package, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Tag,
  PlusCircle,
  LogOut,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/utils/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface SellerItem {
  id: string;
  title: string;
  brand: string;
  category: string;
  condition: string;
  price: string;
  status: "active" | "in_review" | "sold";
  image: string;
  views: number;
  date: string;
}

const initialSellerInventory: SellerItem[] = [
  {
    id: "LOT-401",
    title: "Vintage Rolex Day-Date 36 Champagne Dial",
    brand: "Rolex",
    category: "Jewelry",
    condition: "Very Good",
    price: "$14,500",
    status: "active",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=500&fit=crop&crop=center",
    views: 312,
    date: "Listed 3 days ago"
  },
  {
    id: "LOT-402",
    title: "Hermès Kelly 28 Sellier Epsom Gold",
    brand: "Hermès",
    category: "Bags",
    condition: "Pristine",
    price: "$21,000",
    status: "in_review",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop&crop=center",
    views: 89,
    date: "Submitted today"
  },
  {
    id: "LOT-403",
    title: "Chanel Tweed Bouclé Jacket FW95",
    brand: "Chanel",
    category: "Women",
    condition: "Excellent",
    price: "$4,200",
    status: "sold",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&h=500&fit=crop&crop=center",
    views: 640,
    date: "Sold for $4,200"
  }
];

const Sellitem: React.FC = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const [inventory, setInventory] = useState<SellerItem[]>(initialSellerInventory);
  const [activeTab, setActiveTab] = useState("inventory");
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    brand: "",
    category: "bags",
    condition: "excellent",
    size: "",
    title: "",
    description: "",
    price: "",
    serialNumber: "",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop&crop=center"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.brand || !formData.price) {
      alert("Please fill in the title, brand, and asking price.");
      return;
    }

    const newItem: SellerItem = {
      id: `LOT-${Math.floor(100 + Math.random() * 900)}`,
      title: formData.title,
      brand: formData.brand,
      category: formData.category,
      condition: formData.condition === "new" ? "New" : formData.condition === "excellent" ? "Excellent" : "Very Good",
      price: formData.price.startsWith("$") ? formData.price : `$${formData.price}`,
      status: "in_review",
      image: formData.imageUrl,
      views: 1,
      date: "Submitted just now"
    };

    setInventory([newItem, ...inventory]);
    setSuccessToast(`✓ "${formData.title}" was submitted to Maison Appraisers for physical authentication!`);
    setActiveTab("inventory");
    setFormData({
      brand: "",
      category: "bags",
      condition: "excellent",
      size: "",
      title: "",
      description: "",
      price: "",
      serialNumber: "",
      imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop&crop=center"
    });

    setTimeout(() => setSuccessToast(null), 5000);
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-inter flex flex-col justify-between">
      <Navbar showBack backTo="/" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                Maison Partner Hub
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {user?.name || "Maison Collector"} ({user?.email || "seller@gratio.com"})
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-playfair font-bold text-black tracking-tight">
              Seller & Consignment Studio
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              onClick={() => setActiveTab("new-listing")}
              className="bg-black text-white hover:bg-neutral-800 rounded-xl text-xs font-semibold shadow-xs"
            >
              <PlusCircle className="h-4 w-4 mr-1.5" />
              Consign New Luxury Lot
            </Button>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              size="sm" 
              className="rounded-xl border-gray-300 text-xs font-semibold"
            >
              <LogOut className="h-3.5 w-3.5 mr-1" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Success Alert */}
        {successToast && (
          <div className="my-4 p-4 rounded-xl bg-neutral-900 text-white text-xs font-medium flex items-center justify-between shadow-lg animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>{successToast}</span>
            </div>
            <button onClick={() => setSuccessToast(null)} className="text-gray-400 hover:text-white">✕</button>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
          <Card className="rounded-2xl border-gray-200 bg-white shadow-2xs">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Net Earnings</p>
                <h3 className="text-2xl font-bold text-black mt-1">$39,700</h3>
                <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-0.5 mt-1">
                  <TrendingUp className="h-3 w-3" /> Payout active
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <DollarSign className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-gray-200 bg-white shadow-2xs">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Active Live Listings</p>
                <h3 className="text-2xl font-bold text-black mt-1">
                  {inventory.filter(i => i.status === "active").length} Lots
                </h3>
                <span className="text-[11px] text-gray-500 font-medium">In public showroom</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-black flex items-center justify-center">
                <Package className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-gray-200 bg-white shadow-2xs">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">In Appraisal Queue</p>
                <h3 className="text-2xl font-bold text-black mt-1">
                  {inventory.filter(i => i.status === "in_review").length} Lots
                </h3>
                <span className="text-[11px] text-amber-600 font-medium">Pending expert sign-off</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Clock className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-gray-200 bg-white shadow-2xs">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Seller Tier</p>
                <h3 className="text-2xl font-bold text-black mt-1">Tier 1 Elite</h3>
                <span className="text-[11px] text-purple-700 font-medium">Reduced 8% platform fee</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <Sparkles className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Managing Inventory vs Creating New Listing */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-gray-200 p-1 rounded-xl h-11">
            <TabsTrigger value="inventory" className="rounded-lg text-xs sm:text-sm font-semibold px-4">
              My Consigned Inventory ({inventory.length})
            </TabsTrigger>
            <TabsTrigger value="new-listing" className="rounded-lg text-xs sm:text-sm font-semibold px-4">
              + Consign New Luxury Item
            </TabsTrigger>
          </TabsList>

          {/* Inventory Table Tab */}
          <TabsContent value="inventory" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {inventory.map((item) => (
                <Card key={item.id} className="rounded-2xl border-gray-200 bg-white p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.id}</span>
                        <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">{item.brand}</span>
                        {item.status === "active" && <Badge className="bg-emerald-600 text-white text-[10px]">Live</Badge>}
                        {item.status === "in_review" && <Badge variant="outline" className="border-amber-400 bg-amber-50 text-amber-800 text-[10px]">Appraisal in Progress</Badge>}
                        {item.status === "sold" && <Badge className="bg-neutral-900 text-white text-[10px]">Sold & Paid</Badge>}
                      </div>
                      <h3 className="font-playfair font-bold text-base text-black">{item.title}</h3>
                      <p className="text-xs text-gray-500">
                        Condition: <strong className="text-black">{item.condition}</strong> • {item.views} prospective buyers • {item.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 gap-2">
                    <span className="text-xl font-bold text-black">{item.price}</span>
                    <span className="text-[11px] text-gray-400">
                      Estimated payout: <strong className="text-emerald-700 font-semibold">{item.price}</strong>
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* New Listing Form Tab */}
          <TabsContent value="new-listing" className="space-y-4">
            <Card className="rounded-2xl border-gray-200 bg-white p-6 sm:p-8 shadow-2xs">
              <div className="max-w-2xl mb-6">
                <h2 className="text-xl sm:text-2xl font-playfair font-bold text-black">Consign a Luxury Piece</h2>
                <p className="text-xs text-gray-500 mt-1">
                  All consignments are verified by our in-house master appraisers before being presented to vetted collectors worldwide.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brand" className="text-xs font-semibold text-gray-700">Maison / Brand *</Label>
                    <Input
                      id="brand"
                      placeholder="e.g. Hermès, Chanel, Rolex, Cartier"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      required
                      className="mt-1 rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-xs font-semibold text-gray-700">Department *</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full mt-1 h-10 px-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="bags">Bags & Leather Goods</option>
                      <option value="jewelry">Jewelry & Timepieces</option>
                      <option value="women">Women's Ready-to-Wear</option>
                      <option value="men">Men's Ready-to-Wear</option>
                      <option value="vintage">Rare Vintage & Antiques</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="title" className="text-xs font-semibold text-gray-700">Item Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Chanel Vintage Quilted Flap Bag 24k Gold Hardware"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="mt-1 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="condition" className="text-xs font-semibold text-gray-700">Condition *</Label>
                    <select
                      id="condition"
                      value={formData.condition}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                      className="w-full mt-1 h-10 px-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="new">New / Unworn</option>
                      <option value="excellent">Excellent</option>
                      <option value="very-good">Very Good</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="size" className="text-xs font-semibold text-gray-700">Size / Dimensions</Label>
                    <Input
                      id="size"
                      placeholder="e.g. 28cm, 36mm, M"
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      className="mt-1 rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="price" className="text-xs font-semibold text-gray-700">Asking Price ($ USD) *</Label>
                    <Input
                      id="price"
                      placeholder="e.g. $8,500"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      className="mt-1 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="serialNumber" className="text-xs font-semibold text-gray-700">Serial Number / Date Stamp / Hallmarks</Label>
                  <Input
                    id="serialNumber"
                    placeholder="e.g. Serial #, Blind Stamp, Certificate ID"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                    className="mt-1 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-xs font-semibold text-gray-700">Provenance & Item Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe provenance, inclusions (original box, dustbag, papers), and condition nuances..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="mt-1 rounded-xl"
                  />
                </div>

                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto px-8 h-11 bg-black text-white hover:bg-neutral-800 rounded-xl text-sm font-semibold shadow-xs"
                  >
                    Submit for Physical Authentication & Listing
                  </Button>
                </div>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Sellitem;