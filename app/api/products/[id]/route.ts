import { NextResponse } from "next/server";
import { PRODUCTS } from "@/data/products";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (product) {
    return NextResponse.json(product);
  } else {
    return new NextResponse("Product not found", { status: 404 });
  }
}
