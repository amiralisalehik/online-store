import { connectToDatabase } from "@/lib/mongodb";
import product from "@/models/product";
import { NextResponse } from "next/server";


export async function GET(req ,{params}) {
    try{
        await connectToDatabase()
        const {id} = await params;

        const mainProduct = await product.findOne({_id : id})
        return NextResponse.json(mainProduct , {status:200})
    }catch(error){
    console.error("API ERROR:", error.message);
        
        return NextResponse.json({error: error} , {status:500})
    }
}