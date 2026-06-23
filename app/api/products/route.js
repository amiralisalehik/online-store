import { connectToDatabase } from "@/lib/mongodb";
import product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    let products;

    if (category) {
      products = await product.find({ category });
    } else {
      products = await product.find({});
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("API ERROR:", error.message);
    return NextResponse.json(
      { error: "خطا در دریافت اطلاعات" },
      { status: 500 },
    );
  }
}
