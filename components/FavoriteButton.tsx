"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { addFavorite, removeFavorite, isFavorite } from "@/lib/favourites";
import ConfirmationModal from "./ConfirmationModal";

interface FavoriteButtonProps {
  productId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ productId }) => {
  const [isFav, setIsFav] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [actionType, setActionType] = useState<"remove" | null>(null);

  useEffect(() => {
    setIsFav(isFavorite(productId));
  }, [productId]);

  const showConfirmModal = () => {
    setActionType("remove");
    setModalVisible(true);
  };

  const handleModalOk = () => {
    if (actionType === "remove") {
      removeFavorite(productId);
      setIsFav(false);
      window.dispatchEvent(new Event("favoritesChanged"));
    }
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setActionType(null);
  };

  const handleToggle = () => {
    if (isFav) {
      showConfirmModal();
    } else {
      addFavorite(productId);
      setIsFav(true);
      window.dispatchEvent(new Event("favoritesChanged"));
    }
  };

  const okButtonProps = { danger: true, type: "primary" as const };

  return (
    <>
      <button
        onClick={handleToggle}
        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all w-full cursor-pointer
          ${
            isFav
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-600 text-gray-200 hover:bg-gray-500"
          }`}
      >
        <Heart size={20} className={isFav ? "fill-white" : ""} />
        {isFav ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      {isFav && (
        <ConfirmationModal
          title="Remove from Favorites"
          content={
            <p>
              Are you sure you want to remove this product from your favorites?
            </p>
          }
          isVisible={modalVisible}
          onConfirm={handleModalOk}
          onCancel={handleModalCancel}
          okText="Remove"
          cancelText="Cancel"
          okButtonProps={okButtonProps}
        />
      )}
    </>
  );
};

export default FavoriteButton;
