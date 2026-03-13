import connectDb from "@/middleware/mongoose";
import Product from "@/models/prtoduct";
import { NextResponse } from "next/server";

const handler = async (request) => {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query = {};
    if (category) {
        
        query.category = category;
    }

    let products = await Product.find(query);
    return NextResponse.json({ products });
};

export const GET = connectDb(handler);
