import { Product } from "./types";

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
};

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${getBaseUrl()}/api/products`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const getProductById = async (
  id: string
): Promise<Product | undefined> => {
  const res = await fetch(`${getBaseUrl()}/api/products/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    if (res.status === 404) return undefined;
    throw new Error("Failed to fetch product details");
  }
  return res.json();
};
