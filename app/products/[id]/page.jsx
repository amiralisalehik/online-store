import AddtoCartButton from "@/components/AddToCartButton";
import Link from "next/link";

export default async function ProductsDetails({ params }) {
  
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
    cache: "no-store",
  });
  const mainProduct = await res.json();


  return (
    <div className="flex flex-col md:flex-row gap-12 md:px-[90px] px-10 py-10">
      <img className="md:w-1/2 rounded-lg" src={mainProduct.image}></img>
      <div className="md:w-1/2 flex flex-col gap-5">
        <h1 className="text-lg font-bold ">عنوان محصول: {mainProduct.title}</h1>
        <span className="bg-blue-500 text-white font-xs py-1 px-3 w-fit  rounded-lg ">
          <Link href={`/products?category=${mainProduct.category}`}>
            دسته بندی: {mainProduct.category}
          </Link>
        </span>

        <p className="text-sm">{mainProduct.desc}</p>
        <p className="text-base font-semibold">
          {" "}
          قیمت: {mainProduct.price.toLocaleString("fa-IR")} تومان
        </p>
        <AddtoCartButton product={mainProduct} ></AddtoCartButton>
      </div>
    </div>
  );
}
