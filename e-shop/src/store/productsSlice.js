import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        items: [
            {
                id: 1,
                name: "Wireless Bluetooth Headphones",
                price: 59.99,
                category: "electronics",
                description: "Comfortable over-ear headphones with noise isolation and 20-hour battery life.",
                image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800"
            },
            {
                id: 2,
                name: "Smart LED Desk Lamp",
                price: 34.50,
                category: "home",
                description: "Adjustable color temperature and brightness with touch controls.",
                image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"
            },
            {
                id: 3,
                name: "Portable Power Bank 20,000mAh",
                price: 29.90,
                category: "electronics",
                description: "Fast charging power bank suitable for phones, tablets, and small gadgets.",
                image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQTYlxtI0eUlfp7gGXEQ0SHjjhkJ85q0xBhYMBXGiwXysgsyAvoOPwmcUGNr0iuoEgnFkoJ_d2iiLlJYH_2BiVaRdvQTmy0PTHb4ozVps85mzRSuJzB15EUDnrHKmVx5QVfLe1mSTc&usqp=CAc"
            },
            {
                id: 4,
                name: "Stainless Steel Water Bottle 1L",
                price: 14.99,
                category: "sports",
                description: "Keeps drinks cold up to 24 hours and hot up to 12 hours.",
                image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800"
            },
            {
                id: 5,
                name: "4K Streaming Media Player",
                price: 89.00,
                category: "electronics",
                description: "Supports 4K HDR, Wi-Fi 6 and voice control for smooth streaming.",
                image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800"
            },
            {
                id: 6,
                name: "Ceramic Aroma Diffuser",
                price: 24.99,
                category: "home",
                description: "Ultrasonic diffuser with soft LED lighting for relaxation and fresh air.",
                image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTXyFCa1crnNh_d8SKAOjRK4Dy-Rne0Rlc7qXfOUwLRXv-yYMx810EJLbX-KxpyEoQ-uwOefoky80BHIcqD-4G-raUFj0r_jNLKPEcvlXwa3MgOVQhOb1EjhJS6o3m4pA&usqp=CAc"
            },
            {
                id: 7,
                name: "Soft Cotton Bath Towel Set",
                price: 39.99,
                category: "home",
                description: "Set of 4 premium bath towels made from 100% soft cotton.",
                image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRT-0HBQXFTvyqylpHyPJoARe613o7qqdrpQ-TSwAk_eLwv-PohdID0Vlh03eF3tNeb4WHPQozPFXefyC2aeO-BDuNzNQ2uLAfdAtAECOAYvzETgWujzbSYsaGgmfjy-McEEXtAQA&usqp=CAc"
            },
            {
                id: 8,
                name: "Men’s Running Shoes",
                price: 64.95,
                category: "sports",
                description: "Lightweight running shoes with breathable fabric and shock absorption.",
                image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRpx-FVOY59bGQE64MleZDxLSZFB4_o0CAO437xHobMWCtdkP5yvDVXGVO_kQd-wUi48gXX2ztLozBWqjHLsBbueyQEdFPhWRnxzZWuW6AYD8a6QBhQ5SBaWkIzSlEMSryPRjJWgQ&usqp=CAc"
            },
            {
                id: 9,
                name: "Women’s Fitness Leggings",
                price: 27.50,
                category: "sports",
                description: "High-waist leggings with stretch-fit fabric ideal for gym workouts.",
                image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800"
            },
            {
                id: 10,
                name: "Cordless Screwdriver Set",
                price: 49.99,
                category: "tools",
                description: "Rechargeable electric screwdriver with 20 magnetic bits.",
                image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQhzk0-9VMymgs7UIzK4syYx69EUHiH4n4eZdKXb0r8QlS0IBSU_qn04eRBl4zFzwXu7NBOnGnGwY86h7UR-qE4oImgI6BEXSrXEXtn0cv0oB26P8t8QBtj9IbS6q60&usqp=CAc"
            },
            {
                id: 11,
                name: "Kids Building Blocks Set",
                price: 22.00,
                category: "toys",
                description: "120 colorful blocks designed to boost creativity and motor skills.",
                image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQcPOsRcuS30OVOX0lEGkapHLqf5RcT3xZba9MiR5kdfim90nxKIS5JitcS8qAyB6_wLYIjkDCIjsRPG26DTCT1ZBSuJVYfM3yxgiz_e2uUGx_IdZTZXoKLS3A93o-Ik20ijv44LBA&usqp=CAc"
            },
            {
                id: 12,
                name: "Plush Teddy Bear 40cm",
                price: 18.99,
                category: "toys",
                description: "Soft and hypoallergenic plush bear suitable for all ages.",
                image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800"
            },
            {
                id: 13,
                name: "USB-C Fast Charging Cable",
                price: 8.99,
                category: "electronics",
                description: "Durable braided cable supporting 60W fast charging.",
                image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=800"
            },
            {
                id: 14,
                name: "Makeup Brush Set (12 pcs)",
                price: 19.95,
                category: "beauty",
                description: "High-quality synthetic brushes designed for flawless makeup application.",
                image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSjm6Knt5dVRWAlzqz1VbXRB8SZ3sNKQp25iHn45PcLujOMR-L7SNdVCjr5Pem3EJqGjM4uLYAf4bjQVWAQ8ozMXK5fGTb3aRslnnLZ-vb3fpAAIHoSqTpPX3mQVAM58sTG0l0oOzL9XQ&usqp=CAc"
            },
            {
                id: 15,
                name: "Facial Moisturizing Cream",
                price: 15.49,
                category: "beauty",
                description: "Hydrating daily cream suitable for all skin types.",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbnkJG8jzjEbP0RvePj7Z81fVT9HLaWTHIkA&s"
            },
            {
                id: 16,
                name: "Electric Hair Trimmer",
                price: 44.99,
                category: "beauty",
                description: "Rechargeable trimmer with adjustable cutting heads.",
                image: "https://ineed.ua/files/resized/products/sddd.1800x1800w.jpg"
            },
            {
                id: 17,
                name: "Stainless Steel Cookware Set (5 pcs)",
                price: 79.90,
                category: "home",
                description: "Durable stainless steel pots with heat-resistant handles.",
                image: "https://content1.rozetka.com.ua/goods/images/big/363167050.jpg"
            },
            {
                id: 18,
                name: "Yoga Mat Premium 8mm",
                price: 28.99,
                category: "sports",
                description: "Non-slip extra-thick yoga mat for home and studio workouts.",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"
            },
            {
                id: 19,
                name: "LED Backlit Gaming Keyboard",
                price: 45.00,
                category: "electronics",
                description: "Mechanical-feel keyboard with RGB lighting and 12 media keys.",
                image: "https://microless.com/cdn/product_description/7250815_1613287848.jpg"
            },
            {
                id: 20,
                name: "Electric Kettle 1.7L",
                price: 32.75,
                category: "home",
                description: "Fast-boil kettle with auto shut-off and stainless steel interior.",
                image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRlA9N841hIb-92XseYfq4UtmR98mSz1aWg6cOXxEonlejWQASp0Z3qxcfDkli0S5rPvthX2xuln2TvryrNUWtj2ZdZNw5gOiOjhaeaV5IYSpZtfPK1tEEp2D80shX0JtRu40tgtQ&usqp=CAc"
            }
        ]
    },
    reducers: {},
});

export default productsSlice.reducer;
