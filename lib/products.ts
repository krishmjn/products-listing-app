import { Product } from './types';

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const products = await res.json();
  return products;
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) {
    if (res.status === 404) {
      return undefined;
    }
    throw new Error('Failed to fetch product details');
  }
  const product = await res.json();
  return product;
};