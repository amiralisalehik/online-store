"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      setResult([]);
      return;
    }

    const timer = setTimeout(async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/search?q=${query}`,
      );
      const data = await res.json();

      setResult(data.product ?? []);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative px-5 py-2 px-[10px] md:px-[140px]">
      <input
        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none  "
        type="text"
        placeholder="جستجوی محصول"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onFocus={() => setShowResult(true)}
        onBlur={() => setTimeout(() => setShowResult(false), 150)}
      ></input>

      {showResult && result.length > 0 && (
        <ul className="absolute left-[10] right-[10]  md:left-[140] md:right-[140] top-full bg-gray-200  rounded border border-gray-400">
          {result.map((product) => (
            <li
              className="order-b border-gray-100 last:border-0"
              key={product._id}
            >
              <Link
                className="block px-3 py-2 text-sm hover:bg-gray-50"
                href={`/products/${product._id}`}
              >
                {product.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
