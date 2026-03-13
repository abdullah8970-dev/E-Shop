import connectDb from "@/middleware/mongoose";
import Product from "@/models/prtoduct";

const handler = async (request) => {
    try {
        const body = await request.json();
        const product = new Product(body);
        await product.save();
        return Response.json({ success: true, message: "Product added successfully" });
    } catch (error) {
        return Response.json({ success: false, error: error.message });
    }
};

export const POST = connectDb(handler);
