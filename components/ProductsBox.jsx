"use client";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function ProductsBox({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="p-5 flex flex-col justify-between gap-3 bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100 hover:border-gray-200  rounded-lg overflow-hidden ">
      {/* image product */}
      <div className="flex justify-center items-center h-40 ">
        <Link href={`/products/${product._id}`}>
          <Image
            className="w-full max-w-[180px] rounded-lg  "
            alt={product.title}
            src={product.image}
            width={400}
            height={400}
          />
        </Link>
      </div>
      {/* product detils */}
      <div className="flex flex-col gap-3 ">
        <Link href={`/products/${product._id}`}>
          <h1 className="text-sm font-bold">{product.title}</h1>
        </Link>
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={()=>{addToCart(product)}}
            className="bg-blue-500 hover:bg-blue-600 text-white text-[10px] p-2  rounded-lg transition-colors whitespace-nowrap"
          >
            {" "}
            افزودن به سبد خرید
          </button>
          <span className="text-xs text-left ">
            {product.price.toLocaleString("fa-IR")} تومان
          </span>
        </div>
      </div>
    </div>
  );
}
