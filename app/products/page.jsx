import Header from "@/components/Header";
import LatestProducts from "@/components/LatestProducts";
import SearchBar from "@/components/SearchBar";

export default async function Products({ searchParams }) {
    
    const {category} = await searchParams
  
    return (
    <>
     
      <h1 className="mt-5 text-lg font-bold text-center ">
                {category ? `دسته بندی : ${category}` : "فروشگاه "}
      </h1>
      <SearchBar></SearchBar>
      <LatestProducts category={category}></LatestProducts>
    </> 
  );
}
