import connectDb from "@/middleware/mongoose";
import Product from "@/models/prtoduct";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const handler = async (request, { params }) => {
    const resolvedParams = await params;
    const { id } = resolvedParams || {};
    if (!id) 
        {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }
    if (!mongoose.Types.ObjectId.isValid(id)) 
        {
        return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
        }
    let product = await Product.findById(id);

    if (!product) 
        {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
    return NextResponse.json({ product });
};

export const GET = connectDb(handler);
