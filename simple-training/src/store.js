const store = {
  products: [
    {
      code: "100000001",
      name: "Chocolate Milk",
      category: "Dairy",
      price: 19.99,
      onStore: 12,
      src: "https://picsum.photos/seed/100000001/800/600"
    },
    {
      code: "100000002",
      name: "Cheddar Cheese",
      category: "Dairy",
      price: 29.5,
      onStore: 8,
      src: "https://picsum.photos/seed/100000002/800/600"
    },
    {
      code: "100000003",
      name: "Greek Yogurt",
      category: "Dairy",
      price: 14.2,
      onStore: 20,
      src: "https://picsum.photos/seed/100000003/800/600"
    },
    {
      code: "100000004",
      name: "Croissant Butter",
      category: "Bakery",
      price: 6.5,
      onStore: 0,
      src: "https://picsum.photos/seed/100000004/800/600"
    },
    {
      code: "100000005",
      name: "Whole Wheat Bread",
      category: "Bakery",
      price: 9.99,
      onStore: 15,
      src: "https://picsum.photos/seed/100000005/800/600"
    },
    {
      code: "100000006",
      name: "Organic Apples",
      category: "Fruits",
      price: 4.3,
      onStore: 40,
      src: "https://picsum.photos/seed/100000006/800/600"
    },
    {
      code: "100000007",
      name: "Bananas",
      category: "Fruits",
      price: 3.1,
      onStore: 35,
      src: "https://picsum.photos/seed/100000007/800/600"
    },
    {
      code: "100000008",
      name: "Chicken Breast",
      category: "Meat",
      price: 42.0,
      onStore: 10,
      src: "https://picsum.photos/seed/100000008/800/600"
    },
    {
      code: "100000009",
      name: "Salmon Fillet",
      category: "Seafood",
      price: 89.99,
      onStore: 5,
      src: "https://picsum.photos/seed/100000009/800/600"
    },
    {
      code: "100000010",
      name: "Olive Oil Extra Virgin",
      category: "Grocery",
      price: 55.0,
      onStore: 7,
      src: "https://picsum.photos/seed/100000010/800/600"
    },
    {
      code: "100000011",
      name: "Tomatoes",
      category: "Vegetables",
      price: 8.99,
      onStore: 30,
      src: "https://picsum.photos/seed/100000011/800/600"
    },
    {
      code: "100000012",
      name: "Cucumbers",
      category: "Vegetables",
      price: 7.5,
      onStore: 28,
      src: "https://picsum.photos/seed/100000012/800/600"
    },
    {
      code: "100000013",
      name: "Potatoes",
      category: "Vegetables",
      price: 6.2,
      onStore: 50,
      src: "https://picsum.photos/seed/100000013/800/600"
    },
    {
      code: "100000014",
      name: "Red Onions",
      category: "Vegetables",
      price: 5.4,
      onStore: 24,
      src: "https://picsum.photos/seed/100000014/800/600"
    },
    {
      code: "100000015",
      name: "Garlic",
      category: "Vegetables",
      price: 4.9,
      onStore: 40,
      src: "https://picsum.photos/seed/100000015/800/600"
    },
    {
      code: "100000016",
      name: "Carrots",
      category: "Vegetables",
      price: 5.99,
      onStore: 33,
      src: "https://picsum.photos/seed/100000016/800/600"
    },
    {
      code: "100000017",
      name: "Bell Peppers Mix",
      category: "Vegetables",
      price: 12.99,
      onStore: 18,
      src: "https://picsum.photos/seed/100000017/800/600"
    },
    {
      code: "100000018",
      name: "Iceberg Lettuce",
      category: "Vegetables",
      price: 9.2,
      onStore: 14,
      src: "https://picsum.photos/seed/100000018/800/600"
    },
    {
      code: "100000019",
      name: "Broccoli",
      category: "Vegetables",
      price: 11.5,
      onStore: 16,
      src: "https://picsum.photos/seed/100000019/800/600"
    },
    {
      code: "100000020",
      name: "Spinach",
      category: "Vegetables",
      price: 10.0,
      onStore: 12,
      src: "https://picsum.photos/seed/100000020/800/600"
    },
    {
      code: "100000021",
      name: "Strawberries",
      category: "Fruits",
      price: 18.99,
      onStore: 20,
      src: "https://picsum.photos/seed/100000021/800/600"
    },
    {
      code: "100000022",
      name: "Blueberries",
      category: "Fruits",
      price: 22.5,
      onStore: 15,
      src: "https://picsum.photos/seed/100000022/800/600"
    },
    {
      code: "100000023",
      name: "Oranges",
      category: "Fruits",
      price: 9.99,
      onStore: 26,
      src: "https://picsum.photos/seed/100000023/800/600"
    },
    {
      code: "100000024",
      name: "Lemons",
      category: "Fruits",
      price: 7.99,
      onStore: 22,
      src: "https://picsum.photos/seed/100000024/800/600"
    },
    {
      code: "100000025",
      name: "Avocados",
      category: "Fruits",
      price: 24.99,
      onStore: 10,
      src: "https://picsum.photos/seed/100000025/800/600"
    },
    {
      code: "100000026",
      name: "Grapes",
      category: "Fruits",
      price: 16.4,
      onStore: 0,
      src: "https://picsum.photos/seed/100000026/800/600"
    },
    {
      code: "100000027",
      name: "Peaches",
      category: "Fruits",
      price: 14.8,
      onStore: 16,
      src: "https://picsum.photos/seed/100000027/800/600"
    },
    {
      code: "100000028",
      name: "Pears",
      category: "Fruits",
      price: 13.3,
      onStore: 17,
      src: "https://picsum.photos/seed/100000028/800/600"
    },
    {
      code: "100000029",
      name: "Pineapple",
      category: "Fruits",
      price: 19.0,
      onStore: 9,
      src: "https://picsum.photos/seed/100000029/800/600"
    },
    {
      code: "100000030",
      name: "Mango",
      category: "Fruits",
      price: 17.6,
      onStore: 11,
      src: "https://picsum.photos/seed/100000030/800/600"
    },
  ]
};

export default store;
