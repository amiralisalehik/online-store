export const dynamic = "force-dynamic";
import HeroSection from "@/components/HeroSection";
import LatestProducts from "@/components/LatestProducts";

export default function Home() {
  return (
    <>
      <HeroSection></HeroSection>
      <h1 className="text-lg mt-5 font-bold text-center ">محصولات پرفروش</h1>

      <LatestProducts></LatestProducts>
    </>
  );
}
