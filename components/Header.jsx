"use client";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import "./header.css";
import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { CiShop, CiShoppingBasket, CiHome } from "react-icons/ci";

const urls = [
  { id: 0, title: "صفحه اصلی", src: "/", icon: CiHome },
  { id: 1, title: "فروشگاه", src: "/products", icon: CiShop },
  { id: 2, title: "سبد خرید", src: "/cart", icon: CiShoppingBasket },
];

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  const { cart, NumberOfProducts } = useContext(CartContext);

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
          <FiX size={20} />
        </button>
        <ul>
          {urls.map((url) => {
            const Icon = url.icon;
            return (
              <li key={url.id}>
                <Link className="flex gap-1 items-center"
                  onClick={() => {
                    setIsActive(false);
                  }}
                  href={url.src}
                >
                  <Icon size={20}></Icon>
                  <span> {url.title}</span>
                  {url.src === "/cart" &&
                    (cart.length > 0 ? (
                      <span className="px-2  m-1  bg-black rounded-full ">
                        {NumberOfProducts().toLocaleString("fa-IR")}
                      </span>
                    ) : (
                      ""
                    ))}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Link className="font-bold" href="/">
       سایت فروشگاهی امیرعلی صالحی
      </Link>
    </header>
  );
}
