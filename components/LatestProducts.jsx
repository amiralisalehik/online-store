import ProductsList from "./ProductsList";

export default async function LatestProducts({ category }) {
  // const category = cat?.category;

  const url = category
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/products?category=${category}`
    : `${process.env.NEXT_PUBLIC_API_URL}/api/products`;

  const res = await fetch(url);
  const products = await res.json();

  return (
    <div className="px-[10px] md:px-[90px]">
      <ProductsList products={products} />
    </div>
  );
}
