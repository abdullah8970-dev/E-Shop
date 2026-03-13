import mongoose from "mongoose";
import { NextResponse } from "next/server";

const connectDb = (handler) => async (...args) => {
    try {
        if (mongoose.connections[0].readyState > 0)
            {
            console.log("Database already connected");
            return await handler(...args);
            }
        console.log("Connecting to database...");
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce');
        console.log("Database connected successfully");
        return await handler(...args);
    } catch (error)
    {
        console.error("Database connection error:", error);
        return NextResponse.json({ msg: "Database connection error", error: error.message }, { status: 500 });
    }
};

export default connectDb;
