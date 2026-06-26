export const dynamic = "force-dynamic";
import LatestProducts from "@/components/LatestProducts";

export default function Home() {
  return (
    <>
      <h1>home</h1>
      <h1 className="text-lg font-bold text-center ">محصولات پرفروش</h1>
      <LatestProducts></LatestProducts>
    </>
  );
}
