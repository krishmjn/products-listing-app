import { Product } from "./types";
import products from "@/data/products.json";

export const PRODUCTS = products;

export const getProducts = async (): Promise<Product[]> => {
  return Promise.resolve(products);
};

export const getProductById = async (
  id: string
): Promise<Product | undefined> => {
  const product = products.find((p) => p.id === id);
  return Promise.resolve(product);
};
