import mongoose from 'mongoose';
import Product from './src/models/prtoduct.js';

const sampleProducts = [
    // Existing Electronics products
    {
        title: "Wireless Headphones",
        slug: "wireless-headphones",
        desc: "High-quality wireless headphones with noise cancellation.",
        img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        category: "Electronics",
        size: "One Size",
        price: 99.99,
        availableQty: 50,
        color: "Black"
    },
    {
        title: "Smartphone",
        slug: "smartphone",
        desc: "Latest smartphone with advanced features.",
        img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
        category: "Electronics",
        size: "One Size",
        price: 699.99,
        availableQty: 30,
        color: "White"
    },
    {
        title: "Laptop",
        slug: "laptop",
        desc: "Powerful laptop for work and gaming.",
        img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
        category: "Electronics",
        size: "One Size",
        price: 1299.99,
        availableQty: 20,
        color: "Silver"
    },
    // Existing Clothing products (keeping for general products page)
    {
        title: "T-Shirt",
        slug: "t-shirt",
        desc: "Comfortable cotton t-shirt.",
        img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        category: "Clothing",
        size: "M",
        price: 19.99,
        availableQty: 100,
        color: "Blue"
    },
    {
        title: "Jeans",
        slug: "jeans",
        desc: "Stylish denim jeans.",
        img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
        category: "Clothing",
        size: "32",
        price: 49.99,
        availableQty: 75,
        color: "Black"
    },
    {
        title: "Sneakers",
        slug: "sneakers",
        desc: "Comfortable running sneakers.",
        img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
        category: "Clothing",
        size: "10",
        price: 79.99,
        availableQty: 60,
        color: "White"
    },
    // 6 Men products
    {
        title: "Men's Casual Shirt",
        slug: "mens-casual-shirt",
        desc: "Comfortable casual shirt for everyday wear.",
        img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        category: "Men",
        size: "M",
        price: 29.99,
        availableQty: 80,
        color: "Blue"
    },
    {
        title: "Men's Jeans",
        slug: "mens-jeans",
        desc: "Stylish denim jeans for men.",
        img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
        category: "Men",
        size: "32",
        price: 59.99,
        availableQty: 65,
        color: "Black"
    },
    {
        title: "Men's Sneakers",
        slug: "mens-sneakers",
        desc: "Comfortable running sneakers for men.",
        img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
        category: "Men",
        size: "10",
        price: 89.99,
        availableQty: 55,
        color: "White"
    },
    {
        title: "Men's Jacket",
        slug: "mens-jacket",
        desc: "Warm and stylish jacket for men.",
        img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
        category: "Men",
        size: "L",
        price: 79.99,
        availableQty: 40,
        color: "Gray"
    },
    {
        title: "Men's Watch",
        slug: "mens-watch",
        desc: "Elegant wristwatch for men.",
        img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500",
        category: "Men",
        size: "One Size",
        price: 149.99,
        availableQty: 25,
        color: "Silver"
    },
    {
        title: "Men's Polo Shirt",
        slug: "mens-polo-shirt",
        desc: "Classic polo shirt for casual outings.",
        img: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500",
        category: "Men",
        size: "M",
        price: 39.99,
        availableQty: 70,
        color: "White"
    },
    // 6 Women products
    {
        title: "Women's Dress",
        slug: "womens-dress",
        desc: "Elegant dress for women.",
        img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
        category: "Women",
        size: "M",
        price: 49.99,
        availableQty: 60,
        color: "Red"
    },
    {
        title: "Women's Blouse",
        slug: "womens-blouse",
        desc: "Stylish blouse for women.",
        img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500",
        category: "Women",
        size: "S",
        price: 34.99,
        availableQty: 75,
        color: "Pink"
    },
    {
        title: "Women's Skirt",
        slug: "womens-skirt",
        desc: "Fashionable skirt for women.",
        img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500",
        category: "Women",
        size: "M",
        price: 39.99,
        availableQty: 50,
        color: "Black"
    },
    {
        title: "Women's Heels",
        slug: "womens-heels",
        desc: "High heels for special occasions.",
        img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500",
        category: "Women",
        size: "8",
        price: 79.99,
        availableQty: 35,
        color: "Black"
    },
    {
        title: "Women's Handbag",
        slug: "womens-handbag",
        desc: "Chic handbag for women.",
        img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        category: "Women",
        size: "One Size",
        price: 99.99,
        availableQty: 45,
        color: "Brown"
    },
    {
        title: "Women's Scarf",
        slug: "womens-scarf",
        desc: "Soft and warm scarf for women.",
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
        category: "Women",
        size: "One Size",
        price: 24.99,
        availableQty: 90,
        color: "Blue"
    }
];

async function addSampleProducts() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce');
        console.log('Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        for (const productData of sampleProducts) {
            const product = new Product(productData);
            await product.save();
            console.log(`Added product: ${product.title}`);
        }

        console.log('All sample products added successfully');
    } catch (error) {
        console.error('Error adding products:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

addSampleProducts();
