import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDatabase();

    const { user, cart, totalPrice } = await req.json();

    console.log(
      "full body:",
      JSON.stringify({ user, cart, totalPrice }, null, 2),
    );
    console.log("cart[0]:", JSON.stringify(cart[0], null, 2));

    const newOrder = new Order({
      user,
      cart,
      totalPrice,
      status: "pending",
      createdAt: new Date(),
    });

    await newOrder.save();

    return NextResponse.json({ message: "با موفقیت ثبت شد" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در دریفایت اطلاعات" },
      { status: 500 },
    );
  }
}
