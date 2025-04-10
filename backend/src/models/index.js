import mongoose from "mongoose"
import { productSchema } from "./product.js";
import { categorySchema } from "./category.js";  

export const Products = mongoose.model('products', productSchema);
export const Categories = mongoose.model('categories', categorySchema);