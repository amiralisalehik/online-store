import Link from "next/link";
import { FiMail } from "react-icons/fi";
import { LiaTelegram } from "react-icons/lia";
import { PiPhone } from "react-icons/pi";

export default function Footer() {
  return (
    <div className="text-sm flex flex-col  items-center gap-10 md:flex-row md:items-start md:gap-3 justify-around text-gray-200 pt-6 pb-10 px-3  bg-gradient-to-r from-[#3b83f6] to-[#06b6d4]">
      <div className="flex self-center flex-col gap-2 text-center ">
        <p className="font-bold text-base text-white">سایت فروشگاهی امیرعلی صالحی</p>
        <p className="text-xs ">
          بهترین محصولات دیجیتال با قیمت مناسب و ارسال سریع
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-white">دسته‌بندی‌ ها</p>
        <ul className="flex flex-col gap-2">
          <Link href="/products/?category=لپ تاپ">
            <li>لپ تاپ</li>
          </Link>
          <Link href="/products/?category=موبایل">
            <li>موبایل</li>
          </Link>
          <Link href="/products/?category=ایرپاد">
            <li>لوازم جانبی</li>
          </Link>
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-white">دسترسی سریع</p>
        <ul className="flex flex-col gap-2">
          <Link href="/">
            <li>صفحه اصلی</li>
          </Link>
          <Link href="/products">
            <li>فروشگاه</li>
          </Link>
          <Link href="/cart">
            <li>سبد خرید</li>
          </Link>
          <Link href="https://online-store-admin-dashboard-one.vercel.app/">
            <li>ورود به پنل ادمین</li>
          </Link>
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-white">ارتباط با ما</p>
        <ul dir="ltr" className="flex flex-col gap-2">
          <li>
            <Link href="tel:09120387219" className="flex items-center gap-2">
              <PiPhone size={25} />
              <span>09120387219</span>
            </Link>
          </li>

          <li>
            <Link
              href="mailto:amiralisalehik@gmail.com"
              className="flex items-center gap-2"
            >
              <FiMail size={20} />
              <span>amiralisalehik@gmail.com</span>
            </Link>
          </li>

          <li>
            <Link
              href="https://t.me/Amirali_Salehik"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <LiaTelegram size={20} />
              <span>@Amirali_Salehik</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
