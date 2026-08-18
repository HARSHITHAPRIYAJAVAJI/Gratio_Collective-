import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Package, Settings, CreditCard, MapPin, Phone, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-inter">
      <Navbar showBack backTo="/" />

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-3 mb-8">
          <User className="h-6 w-6 text-black" />
          <h1 className="text-3xl font-playfair font-bold text-black">My Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-600" />
                </div>
                <CardTitle className="font-playfair">Sarah Johnson</CardTitle>
                <p className="text-sm text-gray-600">Member since March 2024</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">sarah.johnson@email.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">New York, NY</span>
                </div>
                <Button className="w-full bg-black text-white hover:bg-gray-800">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Profile Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="grid w-full grid-cols-4 h-10">
                <TabsTrigger value="orders" className="text-xs sm:text-sm px-1 sm:px-3">Orders</TabsTrigger>
                <TabsTrigger value="selling" className="text-xs sm:text-sm px-1 sm:px-3">Selling</TabsTrigger>
                <TabsTrigger value="payments" className="text-xs sm:text-sm px-1 sm:px-3">Payments</TabsTrigger>
                <TabsTrigger value="addresses" className="text-xs sm:text-sm px-1 sm:px-3">Addresses</TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="space-y-4">
                <h3 className="font-playfair font-semibold text-lg">Recent Orders</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((order) => (
                    <Card key={order}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex space-x-4">
                            <img
                              src={`https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=80&h=80&fit=crop&crop=center`}
                              alt="Product"
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <h4 className="font-medium">Chanel Classic Flap Bag</h4>
                              <p className="text-sm text-gray-600">Order #GC{1000 + order}</p>
                              <p className="text-sm text-gray-600">Ordered on March {10 + order}, 2024</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">$4,500</p>
                            <Badge className="bg-green-100 text-green-800">Delivered</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="selling" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-playfair font-semibold text-lg">My Listings</h3>
                  <Link to="/sell">
                    <Button className="bg-black text-white hover:bg-gray-800">
                      Sell New Item
                    </Button>
                  </Link>
                </div>
                <div className="text-center py-16">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-playfair font-semibold text-gray-500 mb-2">No items listed yet</h4>
                  <p className="text-gray-400 mb-6">Start selling your luxury items today</p>
                  <Link to="/sell">
                    <Button className="bg-black text-white hover:bg-gray-800">
                      Create Your First Listing
                    </Button>
                  </Link>
                </div>
              </TabsContent>

              <TabsContent value="payments" className="space-y-4">
                <h3 className="font-playfair font-semibold text-lg">Payment Methods</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <CreditCard className="h-8 w-8 text-gray-600" />
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-600">Expires 12/25</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 ml-auto">Default</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Button variant="outline" className="w-full">
                  Add New Payment Method
                </Button>
              </TabsContent>

              <TabsContent value="addresses" className="space-y-4">
                <h3 className="font-playfair font-semibold text-lg">Shipping Addresses</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-5 w-5 text-gray-600 mt-1" />
                      <div>
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-sm text-gray-600">123 Fifth Avenue</p>
                        <p className="text-sm text-gray-600">New York, NY 10001</p>
                        <p className="text-sm text-gray-600">United States</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 ml-auto">Default</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Button variant="outline" className="w-full">
                  Add New Address
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;