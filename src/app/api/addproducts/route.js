import mongoose from 'mongoose';
import Product from "@/models/prtoduct";

const handler = async (request) => {
    try {
        if (mongoose.connections[0].readyState === 0) {
            await mongoose.connect('mongodb://localhost:27017/ecommerce');
        }
        const body = await request.json();
        const product = new Product(body);
        await product.save();
        return Response.json({ success: true, message: "Product added successfully" });
    } catch (error) {
        return Response.json({ success: false, error: error.message });
    }
};

export const POST = handler;
