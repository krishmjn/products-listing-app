import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";
import { PRODUCTS } from "@/data/products";
import { getProductById } from "@/lib/products";
import Image from "next/image";

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

const ProductDetailsPage: React.FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          Back to Products
        </Link>

        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="relative h-96 bg-gray-700 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill={true}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={true}
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <span className="inline-block bg-blue-800 text-blue-100 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-white mb-4">
                  {product.name}
                </h1>

                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center">
                    <Star
                      size={20}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="ml-1 text-lg text-gray-300">
                      {product.rating} / 5.0
                    </span>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {product.description}
                </p>

                <div className="text-4xl font-bold text-white-600 mb-6">
                  ${product.price}
                </div>
              </div>

              <FavoriteButton productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
