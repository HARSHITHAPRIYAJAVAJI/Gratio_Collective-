import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Shield, UserCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SignIn: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller' | 'admin' | null>(null);
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in:", { role: selectedRole, credentials });
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-white font-inter flex flex-col justify-between">
        <Navbar showBack backTo="/" />
        <div className="flex-1 flex items-center justify-center p-4 py-8 sm:py-12">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-playfair font-semibold mb-2">Welcome Back</h1>
              <p className="text-gray-600">Choose how you'd like to sign in</p>
            </div>

            <div className="space-y-4">
              <Card 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedRole('buyer')}
              >
                <CardContent className="p-6 text-center">
                  <User className="h-12 w-12 mx-auto mb-4 text-gray-700" />
                  <h3 className="font-playfair font-semibold text-lg mb-2">Buyer</h3>
                  <p className="text-sm text-gray-600">Shop authenticated luxury items</p>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedRole('seller')}
              >
                <CardContent className="p-6 text-center">
                  <UserCheck className="h-12 w-12 mx-auto mb-4 text-gray-700" />
                  <h3 className="font-playfair font-semibold text-lg mb-2">Seller</h3>
                  <p className="text-sm text-gray-600">Sell your luxury items with ease</p>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedRole('admin')}
              >
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-red-600" />
                  <h3 className="font-playfair font-semibold text-lg mb-2">Admin</h3>
                  <p className="text-sm text-gray-600">Monitor sellers and product details</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-inter flex flex-col justify-between">
      <Navbar showBack backTo="/" />
      <div className="flex-1 flex items-center justify-center p-4 py-8 sm:py-12">
        <div className="max-w-md w-full">
          <Card>
            <CardHeader className="text-center">
              <button 
                onClick={() => setSelectedRole(null)}
                className="inline-flex items-center text-sm text-gray-600 mb-2 hover:text-black self-start"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Change role
              </button>
              <CardTitle className="font-playfair text-2xl">
                {selectedRole === 'admin' ? 'Admin Login' : selectedRole === 'seller' ? 'Seller Login' : 'Buyer Login'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className={`w-full ${
                    selectedRole === 'admin' 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-black hover:bg-gray-800'
                  } text-white`}
                >
                  Sign In as {selectedRole === 'admin' ? 'Admin' : selectedRole === 'seller' ? 'Seller' : 'Buyer'}
                </Button>

                <div className="text-center">
                  <a href="#" className="text-sm text-gray-600 hover:text-black">
                    Forgot your password?
                  </a>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <a href="#" className="text-black hover:underline">
                      Sign up
                    </a>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;