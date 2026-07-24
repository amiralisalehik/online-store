import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row  gap-5 md:gap-20 mt-[30px] mb-[50px] px-[10px] md:px-[140px]">
      <div className="flex gap-4 flex-col justify-center">
        <h1 className="text-center md:text-right text-lg mt-5 font-bold ">
          سایت فروشگاهی امیرعلی صالحی
        </h1>
        <p className="text-sm">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است
        </p>
        <Link href="/products">
          <button className="self-center md:self-start  text-sm mt-[10px] w-fit  cursor-pointer bg-blue-500 hover:bg-blue-600 text-white  py-2 px-4 rounded-lg transition-colors whitespace-nowrap">
            مشاهده محصولات
          </button>
        </Link>
      </div>

      <Image
        className="rounded-md  "
        src="/img/hero.png"
        width={600}
        height={300}
        alt="banner"
      ></Image>
    </div>
  );
}
