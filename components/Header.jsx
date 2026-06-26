"use client";
import { FiMenu , FiX } from "react-icons/fi";
import Link from "next/link";
import "./header.css";
import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";

const urls = [
  { id: 0, title: "صفحه اصلی", src: "/" },
  { id: 1, title: "فروشگاه", src: "/products" },
  { id: 2, title: "سبد خرید", src: "/cart" },
];

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  const {cart , NumberOfProducts} = useContext(CartContext);

  function handleClickMenu() {
    setIsActive((prev) => !prev);
  }

  return (
    <header>
      <button
        onClick={() => {
          handleClickMenu();
        }}
      >
        <FiMenu size={20}> </FiMenu>
      </button>
      <nav className={`nav  ${isActive ? "active" : ""}`}>
        <button
        className="close"
          onClick={() => {
            handleClickMenu();
          }}
        >
          <FiX size={20}/>
        </button>
        <ul >
          {urls.map((url) => (
            <li  key={url.id}>
              <Link onClick={()=>{setIsActive(false)}} href={url.src}>
              {url.title}
              {url.src === "/cart" && (cart.length>0 ? <span className="px-2  m-1  bg-black rounded-full ">{NumberOfProducts().toLocaleString("fa-IR")}</span> : "") }
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Link className="font-bold" href="/">
        آنلاین استور
      </Link>
    </header>
  );
}
