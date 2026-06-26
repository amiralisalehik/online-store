"use client";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

export default function Cart() {
  const { cart, clearCart, updateQuantity, getTotal, removeFromCart } =
    useContext(CartContext);

  let totalPrice = getTotal();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    postalCode: "",
  });

  function handleChange(event) {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const orderData = {
      user: userInfo,
      cart,
      totalPrice,
    };
    console.log("cart being sent:", JSON.stringify(cart, null, 2));
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (res.ok) {
        alert("سفارش شما با موفقیت ثبت شد");
        clearCart();
        setUserInfo({
          name: "",
          email: "",
          phone: "",
          city: "",
          address: "",
          postalCode: "",
        });
      } else {
        alert("خطا در ثبت سفارش - اطلاعات را به درستی وارد کنید");
      }
    } catch (error) {
      alert("مشکلی پیش آمده از سمت سرور ریسپانس");
    }
  }

  if (cart.length === 0) {
    return (
      <div className="h-[calc(100vh-40px)] flex gap-10 flex-col items-center justify-center">
        <p className="font-bold text-center ">سبد خرید شما خالی است ! </p>
        <Link href="/products">
          <button className="text-xs cursor-pointer p-3 text-white rounded-md bg-blue-400 w-fit">
            دیدن محصولات
          </button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className=" flex flex-col md:flex-row gap-8 m-10 md:mx-[90px]">
        <div className="bg-white md:w-3/5 p-5  shadow-[-4px_-2px_10px_rgba(0,0,0,0.15)] rounded-lg ">
          <h1 className="text-md mb-4 font-bold object-cover">سبد خرید</h1>
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className=" p-3 border-b-2 border-gray-300 ">تعداد</th>

                <th colSpan={2} className=" p-3 border-b-2 border-gray-300 ">
                  محصول
                </th>

                <th className=" p-3 border-b-2 border-gray-300 ">
                  قیمت (تومان)
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {cart.map((product, index) => (
                <tr
                  className={`border-b border-gray-200 hover:bg-gray-100 transition-colors
                         ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} `}
                  key={product._id}
                >
                  <td className="p-1 ">
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) =>
                        updateQuantity(product._id, Number(e.target.value))
                      }
                      min="1"
                      className="w-12 text-center  rounded p-1 outline-none"
                    />
                  </td>
                  <td className=" text-center">
                    <button onClick={() => removeFromCart(product._id)}>
                      <FiTrash2 size={20}></FiTrash2>
                    </button>
                  </td>
                  <td className="py-2  pr-3  flex items-center justify-between">
                    <p>{product.title}</p>
                    <Image
                      className="rounded-md h-14 object-cover"
                      src={product.image}
                      height={150}
                      width={150}
                      alt={product.title}
                    ></Image>
                  </td>

                  <td className="p-3">
                    {product.price.toLocaleString("fa-IR")}
                  </td>
                </tr>
              ))}
              <tr
                className={`border-b border-gray-200 hover:bg-gray-100 transition-colors`}
              >
                <td colSpan={3} className="p-3 font-bold text-right">
                  مجموع کل
                </td>

                <td className="p-3 font-bold text-md">
                  {totalPrice.toLocaleString("fa-IR")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="md:w-2/5  bg-white  p-5  shadow-[-4px_-2px_10px_rgba(0,0,0,0.15)] rounded-lg ">
          <h1 className="text-md mb-4 font-bold object-cover">اطلاعات شما</h1>
          <form onSubmit={handleSubmit} className="text-xs flex flex-col">
            <label className="block mb-1 text-gray-600 ">
              نام و نام خانوادگی
            </label>
            <input
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              className="w-full mb-3 p-2 border border-gray-100 rounded-md outline-none bg-gray-50"
              type="text"
              placeholder=" نام و نام خانوادگی"
              required
            />
            <label className="block mb-1 text-gray-600 ">ایمیل</label>
            <input
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              className="w-full text-left mb-3 p-2 border border-gray-100 rounded-md outline-none bg-gray-50"
              type="email"
              placeholder="example@email.com"
            />

            <label className="block mb-1 text-gray-600 ">تلفن </label>
            <input
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              className="w-full mb-3 p-2 border border-gray-100 rounded-md outline-none bg-gray-50"
              type="tel"
              placeholder="09123456789"
              required
            />

            <label className="block mb-1 text-gray-600 ">شهر</label>
            <input
              name="city"
              value={userInfo.city}
              onChange={handleChange}
              className="w-full mb-3 p-2 border border-gray-100 rounded-md outline-none bg-gray-50"
              type="text"
              placeholder=" شهر"
            />
            <label className="block mb-1 text-gray-600 ">آدرس</label>
            <input
              name="address"
              value={userInfo.address}
              onChange={handleChange}
              className="w-full mb-3 p-2 border border-gray-100 rounded-md outline-none bg-gray-50"
              type="text"
              placeholder=" آدرس"
            />
            <label className="block mb-1 text-gray-600 ">کد پستی</label>
            <input
              name="postalCode"
              value={userInfo.postalCode}
              onChange={handleChange}
              className="w-full mb-3 p-2 border border-gray-100 rounded-md outline-none bg-gray-50"
              type="number"
              placeholder=" کد پستی"
            />

            <button
              className="cursor-pointer w-fit mx-auto my-5 py-3 px-10 bg-black text-white font-bold rounded-md  "
              type="submit"
            >
              {" "}
              ثبت اطلاعات{" "}
            </button>
          </form>
        </div>
      </div>
    );
  }
}
