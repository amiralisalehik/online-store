import ProductsBox from "./ProductsBox";

export default function ProductsList({ products }) {
  if (!Array.isArray(products) || products.length === 0) {
    return <p className="text-center py-10">محصولی یافت نشد.</p>;
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 px-[50px] py-[20px] ">
      {products.map((product) => (
        <ProductsBox key={product._id} product={product} />
      ))}
    </div>
  );
}
