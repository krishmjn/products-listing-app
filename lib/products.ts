import { Product } from "./types";

const getApiHost = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (typeof window === "undefined") {
    return "http://localhost:3000";
  }

  return "";
};

export const getProducts = async (): Promise<Product[]> => {
  const apiHost = getApiHost();
  const url = `${apiHost}/api/products`;

  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const getProductById = async (
  id: string
): Promise<Product | undefined> => {
  const apiHost = getApiHost();
  const url = `${apiHost}/api/products/${id}`;

  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    if (res.status === 404) return undefined;
    throw new Error("Failed to fetch product details");
  }
  return res.json();
};
