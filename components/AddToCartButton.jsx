'use client'

import { CartContext } from "@/context/CartContext"
import { useContext } from "react"


export default function AddtoCartButton({product}){

    const {addToCart } = useContext(CartContext)

    return(
        <button onClick={()=>addToCart(product)}
         className="cursor-pointer w-fit self-center  bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-8  rounded-lg transition-colors whitespace-nowrap">
          {" "}
          افزودن به سبد خرید
        </button>
    )
}