import React from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types";
import { getProducts } from "@/lib/products";

const ProductListPage: React.FC = async () => {
  const products: Product[] = await getProducts();

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Browse Products
          </h1>
          <p className="text-gray-300">
            Discover our curated collection of quality products
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
