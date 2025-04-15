import mongoose from "mongoose";
import { productsSchema } from "./product.js";
import { categorySchema } from "./category.js";
import { userSchema } from "./user.js";

export const Product = mongoose.model("Product", productsSchema);
export const Category = mongoose.model("Category", categorySchema);
export const User = mongoose.model("User", userSchema);
