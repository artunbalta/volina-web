"use client";

import { useState } from "react";
import Image from "next/image";
import { User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Mock authentication - check for admin credentials
    if (email === "admin@volina.org") {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsLoginOpen(false);
      router.push("/dashboard");
    } else {
      setError("Invalid credentials. Try admin@volina.org");
    }
    
    setIsLoading(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10 pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/VolinaLogo.png"
              alt="Volina AI Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
              priority
            />
            <span className="font-semibold text-white text-lg tracking-tight">
              Volina<span className="text-blue-400">AI</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Team
            </button>
            <button
              onClick={() => scrollToSection("demo")}
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Demo
            </button>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Login Dialog */}
            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-white/70 hover:text-white hover:bg-white/10">
                  <User className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-center">
                    Welcome Back
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Sign in to access your Volina dashboard
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@volina.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter any password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-red-600 text-center">{error}</p>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4\" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Demo credentials: <code className="bg-gray-100 px-1 rounded">admin@volina.org</code>
                  </p>
                </form>
              </DialogContent>
            </Dialog>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white/70 hover:text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => scrollToSection("features")}
                className="text-left px-4 py-2 text-white/70 hover:bg-white/10 rounded-lg"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("team")}
                className="text-left px-4 py-2 text-white/70 hover:bg-white/10 rounded-lg"
              >
                Team
              </button>
              <button
                onClick={() => scrollToSection("demo")}
                className="text-left px-4 py-2 text-white/70 hover:bg-white/10 rounded-lg"
              >
                Demo
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

