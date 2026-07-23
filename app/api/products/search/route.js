import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.trim() === "") {
    return NextResponse.json({ prodoct: [] });
  }

  await connectToDatabase();

  const product = await Product.find({
    title: { $regex: query, $options: "i" },
  }).limit(5);

  return NextResponse.json({ product });
}
