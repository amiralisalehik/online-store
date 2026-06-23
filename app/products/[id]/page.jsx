import Link from "next/link";

export default async function ProductsDetails({ params }) {
  // const url = await params;
  // const id = await parseInt(url.id);

  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
    cache: "no-store",
  });
  const mainProduct = await res.json();

  // const mainProduct = products.find((product) => product.id === id);

  return (
    <div className="flex gap-8 md:px-[90px] px-10 py-10">
      <img className="w-1/2 rounded-lg" src={mainProduct.image}></img>
      <div className="flex flex-col gap-5">
        <h1 className="text-lg font-bold ">عنوان محصول: {mainProduct.title}</h1>
        <span className="bg-blue-500 text-white font-xs py-1 px-3 w-fit  rounded-lg ">
          <Link href={`/products?category=${mainProduct.category}`}>
            دسته بندی: {mainProduct.category}
          </Link>
        </span>

        <p className="text-sm">{mainProduct.desc}</p>
        <p className="text-sm">
          {" "}
          قیمت: {mainProduct.price.toLocaleString("fa-IR")} تومان
        </p>
        <button className="cursor-pointer  w-fit m-auto bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-5  rounded-lg transition-colors whitespace-nowrap">
          {" "}
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  );
}
