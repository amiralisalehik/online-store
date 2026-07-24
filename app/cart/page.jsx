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

  const [errors, setErrors] = useState({});
  // { name: "" , email: "" } errors for form

  function validate() {
    let newErrors = {};
    let isValid = true;

    if (!userInfo.name.trim()) {
      newErrors.name = "نام الزامی است.";
      isValid = false;
    } else if (userInfo.name.trim().length < 3) {
      newErrors.name = "نام باید بیشتر از 3 کاراکتر باشد";
      isValid = false;
    }
    const phoneRejex = /^09[0-9]{9}$/;
    if (!userInfo.phone) {
      newErrors.phone = "شماره تلفن الزامی است";
      isValid = false;
    } else if (!phoneRejex.test(userInfo.phone)) {
      newErrors.phone = "شماره موبایل معتبر نیست";
      isValid = false;
    }

    if (userInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
      newErrors.email = "فرمت ایمیل اشتباه است";
      isValid = false;
    }
    if (!userInfo.postalCode) {
      newErrors.postalCode = "کد پستی الزامی است";
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(userInfo.postalCode)) {
      newErrors.postalCode = "کد پستی معتبر نیست";
      isValid = false;
    }
    if (!userInfo.city) {
      newErrors.city = "وارد کردن شهر الزامی است";
      isValid = false;
    }
    if (!userInfo.address) {
      newErrors.address = "وارد کردن آدرس الزامی است";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
    }
    return isValid;
  }

  function handleChange(event) {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    if (errors[event.target.name]) {
      setErrors({ ...errors, [event.target.name]: "" });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

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
                      <FiTrash2 className="cursor-pointer" size={20}></FiTrash2>
                    </button>
                  </td>
                  <td className="py-2  pr-3  flex items-center justify-around">
                    <p>{product.title}</p>
                    <img
                      className="rounded-md h-20 w-20 object-cover"
                      src={product.image}
                      height={150}
                      width={150}
                      alt={product.title}
                    />
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

        <div className="md:w-2/5 max-h-fit  bg-white  p-5  shadow-[-4px_-2px_10px_rgba(0,0,0,0.15)] rounded-lg ">
          <h1 className="text-md mb-4 font-bold object-cover">اطلاعات شما</h1>
          <form onSubmit={handleSubmit} className="text-xs flex flex-col">
            <label className="block mb-1 text-gray-600 ">
              نام و نام خانوادگی
            </label>
            <input
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              className={`w-full mb-2 p-2 border ${errors.name ? "border-red-700" : " border-gray-100 "} rounded-md outline-none bg-gray-50`}
              type="text"
              placeholder=" نام و نام خانوادگی"
            />

            {errors.name && <p className="text-red-700 mb-2">{errors.name}</p>}
            <label className="block mb-1 text-gray-600 ">ایمیل</label>
            <input
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              className={`w-full mb-2 p-2 border ${errors.email ? "border-red-700" : " border-gray-100 "} rounded-md outline-none bg-gray-50`}
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="text-red-700 mb-2">{errors.email}</p>
            )}

            <label className="block mb-1 text-gray-600 ">تلفن </label>
            <input
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              className={`w-full mb-2 p-2 border ${errors.phone ? "border-red-700" : " border-gray-100 "} rounded-md outline-none bg-gray-50`}
              type="tel"
              placeholder="09123456789"
            />
            {errors.phone && (
              <p className="text-red-700 mb-2">{errors.phone}</p>
            )}

            <label className="block mb-1 text-gray-600 ">شهر</label>
            <input
              name="city"
              value={userInfo.city}
              onChange={handleChange}
              className={`w-full mb-2 p-2 border ${errors.city ? "border-red-700" : " border-gray-100 "} rounded-md outline-none bg-gray-50`}
              type="text"
              placeholder=" شهر"
            />
            {errors.city && <p className="text-red-700 mb-2">{errors.city}</p>}

            <label className="block mb-1 text-gray-600 ">آدرس</label>
            <input
              name="address"
              value={userInfo.address}
              onChange={handleChange}
              className={`w-full mb-2 p-2 border ${errors.address ? "border-red-700" : " border-gray-100 "} rounded-md outline-none bg-gray-50`}
              type="text"
              placeholder=" آدرس"
            />
            {errors.address && (
              <p className="text-red-700 mb-2">{errors.address}</p>
            )}

            <label className="block mb-1 text-gray-600 ">کد پستی</label>
            <input
              name="postalCode"
              value={userInfo.postalCode}
              onChange={handleChange}
              className={`w-full mb-2 p-2 border ${errors.postalCode ? "border-red-700" : " border-gray-100 "} rounded-md outline-none bg-gray-50`}
              type="text"
              placeholder=" کد پستی"
            />
            {errors.postalCode && (
              <p className="text-red-700 mb-2">{errors.postalCode}</p>
            )}

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
