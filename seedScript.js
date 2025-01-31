import dotenv from "dotenv";
import mongoose, { Types } from "mongoose";
import Product from "./models/productModel.js";
import Category from "./models/categoryModel.js";
import { categoriesData, productData } from "./seedData.js";

dotenv.config();

async function seedDatabase() {

    try {

        await mongoose.connect(process.env.MONGO_URI)

        await Product.deleteMany({})
        await Category.deleteMany({})

        const categoryDocs = await Category.insertMany(categoriesData);

        // need to create map of categories and products 
        // "map" means let say "Fashion" category is there then how many products are there in that category , that linking is required

        const categoryMap = categoryDocs.reduce((map, category) => {
            map[category.name] = category._id;
            return map;
        });

        const productWithCategoryId = productData.map((product) => ({
            ...product,
            category: categoryMap[product.category],
        }));

        await Product.insertMany(productWithCategoryId);


    } catch (error) {
        console.log("Database Error", error);
    } finally {
        mongoose.connection.close();
    }


}

seedDatabase();