export const getFavorites = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  } catch {
    return [];
  }
};

export const saveFavorites = (favorites: string[]): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error("Failed to save favorites:", error);
  }
};

export const addFavorite = (productId: string): void => {
  const favorites = getFavorites();
  if (!favorites.includes(productId)) {
    saveFavorites([...favorites, productId]);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("favoritesChanged"));
    }
  }
};

export const removeFavorite = (productId: string): void => {
  const favorites = getFavorites();
  const newFavorites = favorites.filter((id) => id !== productId);
  if (newFavorites.length !== favorites.length) {
    saveFavorites(newFavorites);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("favoritesChanged"));
    }
  }
};

export const isFavorite = (productId: string): boolean => {
  return getFavorites().includes(productId);
};
