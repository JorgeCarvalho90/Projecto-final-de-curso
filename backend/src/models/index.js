import mongoose from "mongoose";
import { productsSchema } from "./product.js";
import { categorySchema } from "./category.js";

export const Product = mongoose.model("Product", productsSchema);
export const Category = mongoose.model("Category", categorySchema);
