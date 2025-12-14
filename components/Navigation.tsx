"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Home, Menu, X } from "lucide-react";
import { getFavorites } from "@/lib/favourites";
import ClientSideOnlyBadge from "./ClientSideOnlyBadge";

const Navigation: React.FC = () => {
  const [favCount, setFavCount] = useState(() => {
    if (typeof window !== "undefined") {
      return getFavorites().length;
    }
    return 0;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleStorage = () => setFavCount(getFavorites().length);
    window.addEventListener("storage", handleStorage);
    window.addEventListener("favoritesChanged", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("favoritesChanged", handleStorage);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <ShoppingBag className="text-blue-600" size={28} />
            <span className="text-xl font-bold text-gray-900">ShopHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-100"
            >
              <Home size={20} />
              <span className="font-medium">Home</span>
            </Link>
            <Link
              href="/favorites"
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors relative text-gray-600 hover:bg-gray-100"
            >
              <Heart size={20} />
              <span className="font-medium">Favorites</span>
              <ClientSideOnlyBadge>
                {favCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favCount}
                  </span>
                )}
              </ClientSideOnlyBadge>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={20} />
              Home
            </Link>
            <Link
              href="/favorites"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <Heart size={20} />
              Favorites
              <ClientSideOnlyBadge>
                {favCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favCount}
                  </span>
                )}
              </ClientSideOnlyBadge>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
