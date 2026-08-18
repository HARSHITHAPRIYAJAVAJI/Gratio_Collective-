import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Shield, UserCheck, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/utils/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller' | 'admin' | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. Please verify.");
      return;
    }

    const activeRole = selectedRole || 'buyer';
    const activeEmail = formData.email.trim() || `${activeRole}@gratio.com`;
    const activeName = formData.name.trim();

    // Log the user into the real-time auth store
    login(activeRole, activeEmail, activeName);

    const redirectDestinations = {
      buyer: "/",
      seller: "/sell",
      admin: "/admin"
    };

    setSubmittedMessage(
      `✓ Authenticated as ${activeRole.toUpperCase()}! Redirecting to ${
        activeRole === 'buyer' ? 'Boutique Collection' : activeRole === 'seller' ? 'Seller Studio' : 'Admin Console'
      }...`
    );

    setTimeout(() => {
      navigate(redirectDestinations[activeRole]);
    }, 800);
  };

  const handleRoleSelect = (role: 'buyer' | 'seller' | 'admin') => {
    setSelectedRole(role);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setSubmittedMessage(null);
    if (!formData.email) {
      setFormData(prev => ({
        ...prev,
        email: role === 'admin' ? 'admin@gratio.com' : role === 'seller' ? 'seller@gratio.com' : 'buyer@gratio.com'
      }));
    }
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-white font-inter flex flex-col justify-between">
        <Navbar showBack backTo="/" />
        <div className="flex-1 flex items-center justify-center p-4 py-8 sm:py-12">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-playfair font-bold mb-2 text-black">Welcome to Gratio</h1>
              <p className="text-sm text-gray-500">Choose your account type to proceed</p>
            </div>

            <div className="space-y-3.5">
              <Card 
                className="cursor-pointer hover:border-black hover:shadow-md transition-all duration-200 group"
                onClick={() => handleRoleSelect('buyer')}
              >
                <CardContent className="p-5 sm:p-6 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-3 group-hover:bg-black group-hover:text-white transition-colors">
                    <User className="h-6 w-6" />
                  </div>
                  <h3 className="font-playfair font-bold text-lg mb-1 text-black">Buyer Account</h3>
                  <p className="text-xs text-gray-500">Shop verified luxury vintage & authenticated designer pieces</p>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:border-black hover:shadow-md transition-all duration-200 group"
                onClick={() => handleRoleSelect('seller')}
              >
                <CardContent className="p-5 sm:p-6 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-3 group-hover:bg-black group-hover:text-white transition-colors">
                    <UserCheck className="h-6 w-6" />
                  </div>
                  <h3 className="font-playfair font-bold text-lg mb-1 text-black">Seller / Collector Studio</h3>
                  <p className="text-xs text-gray-500">List luxury items, track consignments, and manage sales</p>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:border-black hover:shadow-md transition-all duration-200 group"
                onClick={() => handleRoleSelect('admin')}
              >
                <CardContent className="p-5 sm:p-6 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="font-playfair font-bold text-lg mb-1 text-black">Maison Admin Console</h3>
                  <p className="text-xs text-gray-500">Curate listings, approve authentications, and oversee sellers</p>
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
          <Card className="border border-neutral-200 shadow-sm rounded-2xl">
            <CardHeader className="text-center pb-4">
              <button 
                onClick={() => {
                  setSelectedRole(null);
                  setIsSignUp(false);
                }}
                className="inline-flex items-center text-xs font-semibold text-gray-500 hover:text-black mb-3 self-start transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                Change Role
              </button>

              <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[11px] font-semibold uppercase tracking-wider mb-2 self-center mx-auto">
                <span>{selectedRole === 'admin' ? 'Admin Portal' : selectedRole === 'seller' ? 'Seller Hub' : 'Buyer Account'}</span>
              </div>

              <CardTitle className="font-playfair text-2xl sm:text-3xl font-bold text-black">
                {isSignUp 
                  ? `Create ${selectedRole === 'admin' ? 'Admin' : selectedRole === 'seller' ? 'Seller' : 'Buyer'} Account` 
                  : `Sign In as ${selectedRole === 'admin' ? 'Admin' : selectedRole === 'seller' ? 'Seller' : 'Buyer'}`}
              </CardTitle>
              <p className="text-xs text-gray-500 mt-1">
                {isSignUp ? "Join the Gratio Collective luxury network" : "Enter your credentials to access your portal"}
              </p>
            </CardHeader>

            <CardContent>
              {submittedMessage && (
                <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>{submittedMessage}</span>
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {/* Full Name for Sign Up */}
                {isSignUp && (
                  <div>
                    <Label htmlFor="name" className="text-xs font-semibold text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="e.g. Sarah Johnson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-1 h-10 rounded-xl"
                    />
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <Label htmlFor="email" className="text-xs font-semibold text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={
                      selectedRole === 'admin' 
                        ? 'admin@gratio.com' 
                        : selectedRole === 'seller' 
                          ? 'seller@gratio.com' 
                          : 'buyer@gratio.com'
                    }
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-1 h-10 rounded-xl"
                  />
                </div>

                {/* Password Field with Eye Toggle */}
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-xs font-semibold text-gray-700">
                      Password
                    </Label>
                    {!isSignUp && (
                      <a href="#" className="text-[11px] font-medium text-gray-500 hover:text-black">
                        Forgot Password?
                      </a>
                    )}
                  </div>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className="h-10 pr-10 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black p-1 transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field with Eye Toggle (Sign Up Mode) */}
                {isSignUp && (
                  <div>
                    <Label htmlFor="confirmPassword" className="text-xs font-semibold text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                        className="h-10 pr-10 rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black p-1 transition-colors"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className={`w-full h-11 rounded-xl text-sm font-semibold shadow-xs ${
                    selectedRole === 'admin' 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-black hover:bg-neutral-800'
                  } text-white transition-all`}
                >
                  {isSignUp 
                    ? `Create ${selectedRole === 'admin' ? 'Admin' : selectedRole === 'seller' ? 'Seller' : 'Buyer'} Account` 
                    : `Sign In as ${selectedRole === 'admin' ? 'Admin' : selectedRole === 'seller' ? 'Seller' : 'Buyer'}`}
                </Button>

                {/* Toggle Sign In / Sign Up Mode */}
                <div className="text-center pt-2">
                  <p className="text-xs text-gray-600">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUp(!isSignUp);
                        setSubmittedMessage(null);
                      }}
                      className="font-bold text-black hover:underline cursor-pointer ml-1"
                    >
                      {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
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