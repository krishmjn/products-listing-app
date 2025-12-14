"use client";

import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "@/components/ProductCard";
import { getFavorites, removeFavorite } from "@/lib/favourites";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/lib/types";
import { Heart, Loader2 } from "lucide-react";

const FavoritesPage: React.FC = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(() => {
    setLoading(true);
    const favoriteIds = getFavorites();
    const products = PRODUCTS.filter((p) => favoriteIds.includes(p.id));
    setFavoriteProducts(products);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadFavorites();

    const handleFavoritesChanged = () => loadFavorites();
    window.addEventListener("favoritesChanged", handleFavoritesChanged);
    window.addEventListener("storage", handleFavoritesChanged);

    return () => {
      window.removeEventListener("favoritesChanged", handleFavoritesChanged);
      window.removeEventListener("storage", handleFavoritesChanged);
    };
  }, [loadFavorites]);

  const handleRemoveFavorite = (productId: string) => {
    removeFavorite(productId);
    setFavoriteProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
    window.dispatchEvent(new Event("favoritesChanged"));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2
            size={48}
            className="text-blue-600 animate-spin mx-auto mb-4"
          />
          <p className="text-gray-300">
            Loading your favorite products...
          </p>
        </div>
      </div>
    );
  }

  if (favoriteProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Heart
            size={64}
            className="text-gray-600 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white mb-2">
            No Favorites Yet
          </h2>
          <p className="text-gray-300 mb-6">
            Start adding products to your favorites!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            My Favorites
          </h1>
          <p className="text-gray-300">
            You have {favoriteProducts.length} favorite products
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onRemoveFavorite={handleRemoveFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
