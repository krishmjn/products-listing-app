"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, HeartOff } from "lucide-react";
import { Product } from "@/lib/types";
import Image from "next/image";
import ConfirmationModal from "./ConfirmationModal";

interface ProductCardProps {
  product: Product;
  onRemoveFavorite?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onRemoveFavorite,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const showConfirmModal = () => {
    setModalVisible(true);
  };

  const handleModalOk = () => {
    if (onRemoveFavorite) {
      onRemoveFavorite(product.id);
    }
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };
  const okButtonProps = { danger: true, type: "primary" as const };

  return (
    <div className="bg-gray-700 rounded-xl shadow-lg overflow-hidden  shadow-lg hover:shadow-2xl">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative h-64 bg-gray-600 overflow-hidden">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-600">
              <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
          <Image
            src={product.image}
            alt={product.name}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
            className={`object-cover hover:scale-105 transition-transform duration-300 ${
              loading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setLoading(false)}
          />
          <span className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {product.category}
          </span>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 h-14">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-sm text-gray-300">
                {product.rating}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <div className="p-5 pt-0 flex justify-between items-center">
        <span className="text-2xl font-bold text-white">
          ${product.price}
        </span>
        <div className="flex gap-2">
          {onRemoveFavorite && (
            <button
              onClick={showConfirmModal}
              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
              aria-label="Remove from Favorites"
            >
              <HeartOff size={20} />
            </button>
          )}
          <Link href={`/product/${product.id}`}>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer">
              View Details
            </button>
          </Link>
        </div>
      </div>
      <ConfirmationModal
        title="Remove from Favorites"
        content={
          <p>
            Are you sure you want to remove {product.name} from your favorites?
          </p>
        }
        isVisible={modalVisible}
        onConfirm={handleModalOk}
        onCancel={handleModalCancel}
        okText="Remove"
        cancelText="Cancel"
        okButtonProps={okButtonProps}
      />
    </div>
  );
};

export default ProductCard;
