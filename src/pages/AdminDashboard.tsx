import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ShieldCheck, 
  Users, 
  PackageCheck, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Search, 
  ArrowUpRight, 
  SlidersHorizontal,
  DollarSign,
  TrendingUp,
  RefreshCw,
  LogOut,
  Sparkles,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/utils/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PendingItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  condition: string;
  price: string;
  seller: string;
  sellerRating: number;
  submittedDate: string;
  image: string;
  serialNumber: string;
  status: "pending" | "approved" | "rejected";
}

interface SellerProfile {
  id: string;
  name: string;
  boutiqueName: string;
  email: string;
  joinedDate: string;
  totalSales: string;
  rating: number;
  status: "verified" | "pending_kyc" | "flagged";
  itemsCount: number;
}

const initialPendingItems: PendingItem[] = [
  {
    id: "AUTH-8921",
    name: "Chanel Classic Double Flap Medium",
    brand: "Chanel",
    category: "Bags",
    condition: "Excellent",
    price: "$7,850",
    seller: "Atelier Parisienne",
    sellerRating: 4.9,
    submittedDate: "Today, 11:20 AM",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop&crop=center",
    serialNumber: "31849201 (Hologram Tag Verified)",
    status: "pending"
  },
  {
    id: "AUTH-8922",
    name: "Rolex Submariner Date 116610LN",
    brand: "Rolex",
    category: "Jewelry & Watches",
    condition: "Very Good",
    price: "$11,200",
    seller: "Geneva Timepieces",
    sellerRating: 5.0,
    submittedDate: "Today, 09:45 AM",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&crop=center",
    serialNumber: "M9283401 (Card + Box Complete)",
    status: "pending"
  },
  {
    id: "AUTH-8923",
    name: "Hermès Birkin 30 Togo Leather",
    brand: "Hermès",
    category: "Bags",
    condition: "Pristine",
    price: "$18,500",
    seller: "Luxury Vault London",
    sellerRating: 4.9,
    submittedDate: "Yesterday",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=500&fit=crop&crop=center",
    serialNumber: "Stamp Z (2021) Blind Stamp",
    status: "pending"
  },
  {
    id: "AUTH-8924",
    name: "Cartier Love Bracelet 18k Gold",
    brand: "Cartier",
    category: "Jewelry & Watches",
    condition: "Very Good",
    price: "$6,500",
    seller: "Vanderbilt Antiques",
    sellerRating: 4.8,
    submittedDate: "2 days ago",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500&h=500&fit=crop&crop=center",
    serialNumber: "CRD982001 (Certificate included)",
    status: "approved"
  }
];

const initialSellers: SellerProfile[] = [
  {
    id: "SEL-101",
    name: "Claire DuPont",
    boutiqueName: "Atelier Parisienne",
    email: "claire@atelierparis.com",
    joinedDate: "Jan 2023",
    totalSales: "$142,500",
    rating: 4.9,
    status: "verified",
    itemsCount: 38
  },
  {
    id: "SEL-102",
    name: "Marcus Vance",
    boutiqueName: "Geneva Timepieces",
    email: "marcus@genevatime.ch",
    joinedDate: "Nov 2022",
    totalSales: "$289,000",
    rating: 5.0,
    status: "verified",
    itemsCount: 19
  },
  {
    id: "SEL-103",
    name: "Elena Rostova",
    boutiqueName: "Imperial Vintage Vault",
    email: "elena@imperialvintage.co",
    joinedDate: "Feb 2024",
    totalSales: "$34,200",
    rating: 4.7,
    status: "pending_kyc",
    itemsCount: 12
  }
];

const AdminDashboard: React.FC = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<PendingItem[]>(initialPendingItems);
  const [sellers, setSellers] = useState<SellerProfile[]>(initialSellers);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleApprove = (id: string, name: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: "approved" } : item));
    setActionNotice(`✓ "${name}" (${id}) has been successfully authenticated and published live to the catalog!`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleReject = (id: string, name: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: "rejected" } : item));
    setActionNotice(`Listing "${name}" (${id}) was rejected. Seller has been notified with verification notes.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleToggleSellerStatus = (id: string) => {
    setSellers(prev => prev.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === "verified" ? "flagged" : "verified";
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const pendingCount = items.filter(i => i.status === "pending").length;

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-inter flex flex-col justify-between">
      <Navbar showBack backTo="/" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                Maison Administrator Portal
              </span>
              <span className="text-xs text-gray-500 font-medium">Logged in as {user?.email || "admin@gratio.com"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-playfair font-bold text-black tracking-tight">
              Curator & Platform Administration
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/sell">
              <Button variant="outline" size="sm" className="rounded-xl border-gray-300 text-xs font-semibold">
                + Simulate New Submission
              </Button>
            </Link>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              size="sm" 
              className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold"
            >
              <LogOut className="h-3.5 w-3.5 mr-1" />
              Exit Admin
            </Button>
          </div>
        </div>

        {/* Action Notice Alert */}
        {actionNotice && (
          <div className="my-4 p-3.5 rounded-xl bg-neutral-900 text-white text-xs font-medium flex items-center justify-between shadow-md animate-in fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>{actionNotice}</span>
            </div>
            <button onClick={() => setActionNotice(null)} className="text-gray-400 hover:text-white">
              ✕
            </button>
          </div>
        )}

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
          <Card className="rounded-2xl border-gray-200 bg-white shadow-2xs">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Marketplace GMV</p>
                <h3 className="text-2xl font-bold text-black mt-1">$1,489,200</h3>
                <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-0.5 mt-1">
                  <TrendingUp className="h-3 w-3" /> +18.4% this month
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-black">
                <DollarSign className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-gray-200 bg-white shadow-2xs">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Authentication Queue</p>
                <h3 className="text-2xl font-bold text-black mt-1">{pendingCount} Items</h3>
                <span className="text-[11px] text-amber-600 font-medium flex items-center gap-0.5 mt-1">
                  Requires appraiser review
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-gray-200 bg-white shadow-2xs">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Verified Sellers</p>
                <h3 className="text-2xl font-bold text-black mt-1">128 Maisons</h3>
                <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-0.5 mt-1">
                  99.4% Fulfillment rate
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-gray-200 bg-white shadow-2xs">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Active Orders in Escrow</p>
                <h3 className="text-2xl font-bold text-black mt-1">42 Orders</h3>
                <span className="text-[11px] text-gray-500 font-medium flex items-center gap-0.5 mt-1">
                  Insured transit active
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <PackageCheck className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="authentication" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 p-1 rounded-xl h-11">
            <TabsTrigger value="authentication" className="rounded-lg text-xs sm:text-sm font-semibold px-4">
              Physical Authentication Queue ({pendingCount})
            </TabsTrigger>
            <TabsTrigger value="sellers" className="rounded-lg text-xs sm:text-sm font-semibold px-4">
              Seller Directory & KYC
            </TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-lg text-xs sm:text-sm font-semibold px-4">
              Platform Analytics
            </TabsTrigger>
          </TabsList>

          {/* Authentication Queue Tab */}
          <TabsContent value="authentication" className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Filter by brand, serial, or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <span className="text-xs text-gray-500 font-medium">
                Showing {items.length} submitted luxury lots
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {items
                .filter(i => 
                  i.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  i.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  i.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((item) => (
                  <Card key={item.id} className="rounded-2xl border-gray-200 bg-white overflow-hidden shadow-2xs hover:border-gray-300 transition-all">
                    <div className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                      {/* Left: Thumbnail & Details */}
                      <div className="flex items-start sm:items-center gap-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-neutral-100 text-neutral-800 rounded">
                              {item.id}
                            </span>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                              {item.brand} • {item.category}
                            </span>
                            {item.status === "approved" && (
                              <Badge className="bg-emerald-600 text-white text-[10px]">Verified & Live</Badge>
                            )}
                            {item.status === "rejected" && (
                              <Badge className="bg-red-600 text-white text-[10px]">Rejected</Badge>
                            )}
                            {item.status === "pending" && (
                              <Badge variant="outline" className="border-amber-400 text-amber-700 bg-amber-50 text-[10px]">
                                In Physical Queue
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-black font-playfair">{item.name}</h3>
                          <p className="text-xs text-gray-500">
                            Condition: <strong className="text-black">{item.condition}</strong> • Serial / Stamp: <code className="bg-gray-100 px-1 py-0.5 rounded text-[11px]">{item.serialNumber}</code>
                          </p>
                          <p className="text-xs text-gray-500">
                            Consigned by: <span className="font-semibold text-black">{item.seller}</span> ({item.sellerRating}★) • {item.submittedDate}
                          </p>
                        </div>
                      </div>

                      {/* Right: Price & Appraisal Actions */}
                      <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between w-full md:w-auto gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
                        <div className="text-left md:text-right">
                          <span className="text-[10px] uppercase font-bold text-gray-400 block">Declared Price</span>
                          <span className="text-xl font-bold text-black">{item.price}</span>
                        </div>

                        {item.status === "pending" ? (
                          <div className="flex items-center gap-2">
                            <Button 
                              onClick={() => handleApprove(item.id, item.name)}
                              size="sm" 
                              className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                              Approve & Publish
                            </Button>
                            <Button 
                              onClick={() => handleReject(item.id, item.name)}
                              variant="outline" 
                              size="sm" 
                              className="border-red-300 text-red-600 hover:bg-red-50 rounded-xl text-xs font-semibold"
                            >
                              <XCircle className="h-3.5 w-3.5 mr-1" />
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs font-semibold text-gray-400">
                            Action completed
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Seller Directory & KYC Tab */}
          <TabsContent value="sellers" className="space-y-4">
            <Card className="rounded-2xl border-gray-200 bg-white overflow-hidden shadow-2xs">
              <CardHeader className="p-5 border-b border-gray-100">
                <CardTitle className="text-lg font-playfair font-bold">Verified Maison Partners & Boutiques</CardTitle>
                <CardDescription className="text-xs text-gray-500">
                  Manage consignor accreditation, verify identity passports, and monitor seller dispute ratings.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-semibold">
                      <tr>
                        <th className="py-3 px-4">Seller ID & Boutique</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Total GMV</th>
                        <th className="py-3 px-4">Active Lots</th>
                        <th className="py-3 px-4">Rating</th>
                        <th className="py-3 px-4">KYC Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {sellers.map((seller) => (
                        <tr key={seller.id} className="hover:bg-gray-50/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-black block">{seller.boutiqueName}</span>
                            <span className="text-gray-400 text-[11px]">{seller.name} • {seller.id}</span>
                          </td>
                          <td className="py-3.5 px-4 text-gray-600">{seller.email}</td>
                          <td className="py-3.5 px-4 font-bold text-black">{seller.totalSales}</td>
                          <td className="py-3.5 px-4 text-gray-600">{seller.itemsCount} pieces</td>
                          <td className="py-3.5 px-4 font-semibold text-amber-600">★ {seller.rating}</td>
                          <td className="py-3.5 px-4">
                            {seller.status === "verified" && (
                              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 text-[10px]">
                                Accredited
                              </Badge>
                            )}
                            {seller.status === "pending_kyc" && (
                              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 text-[10px]">
                                Documents Pending
                              </Badge>
                            )}
                            {seller.status === "flagged" && (
                              <Badge className="bg-red-100 text-red-800 hover:bg-red-100 text-[10px]">
                                Suspended
                              </Badge>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <Button
                              onClick={() => handleToggleSellerStatus(seller.id)}
                              variant="outline"
                              size="sm"
                              className="text-[11px] h-7 rounded-lg"
                            >
                              {seller.status === "verified" ? "Flag Account" : "Verify Account"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Platform Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <Card className="rounded-2xl border-gray-200 bg-white p-6 shadow-2xs">
              <h3 className="font-playfair font-bold text-xl mb-2 text-black">Marketplace Health & Audit Logs</h3>
              <p className="text-xs text-gray-500 mb-6">
                Real-time tracking of luxury category volume, average order values, and authenticity pass rates.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Authenticity Pass Rate</span>
                  <h4 className="text-2xl font-bold text-emerald-700 mt-1">99.8%</h4>
                  <p className="text-[11px] text-gray-500 mt-1">2 fraudulent submissions intercepted</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Average Order Value (AOV)</span>
                  <h4 className="text-2xl font-bold text-black mt-1">$4,320</h4>
                  <p className="text-[11px] text-gray-500 mt-1">Watches & Handbags leading demand</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Consignment Payout Balance</span>
                  <h4 className="text-2xl font-bold text-black mt-1">$318,400</h4>
                  <p className="text-[11px] text-emerald-600 mt-1">Scheduled for Friday disbursement</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
