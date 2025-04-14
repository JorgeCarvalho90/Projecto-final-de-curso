import { Category, Product } from "../../models/index.js";
import { z } from "zod";

const RegexMongoObjectId = /^[0-9a-fA-F]{24}$/;

const idSchema = z.string().regex(RegexMongoObjectId, {
  message: "Invalid ObjectId format",
});

const productSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    price: z.number().min(0),
    images: z.array(z.string()).optional(),
    sku: z.string(),
    slug: z.string().toLowerCase(),
    category: z.string().regex(RegexMongoObjectId),
    isActive: z.boolean().default(true),
  })
  .strict();

const productRoutes = [
  {
    method: "get",
    path: "/products",
    handler: async (req, res) => {
      const products = await Product.find().populate(["category"]);
      res.status(200).json(products);
    },
  },
  {
    method: "get",
    path: "/products/:id",
    handler: async (req, res) => {
      try {
        const { id } = req.params;

        const result = idSchema.safeParse(id);
        if (!result.success) {
          return res.status(400).json({ message: "Bad user input" });
        }

        const product = await Product.findById(id).populate(["category"]);
        if (!product) {
          return res.status(404).json({ message: "Not found" });
        }

        res.status(200).json(product);
      } catch {
        return res.status(500).json({ message: "Internal error" });
      }
    },
  },
  {
    method: "post",
    path: "/products",
    handler: async (req, res) => {
      try {
        const result = productSchema.safeParse(req.body);
        if (!result.success) {
          return res
            .status(404)
            .json({ message: "Bad user input", issues: result.error.issues });
        }

        const category = await Category.findById(result.data.category);

        console.log(category);
        if (!category) {
          return res.status(404).json({ message: "Category not found" });
        }

        const addProduct = await Product.create(result.data);

        res.status(200).json(addProduct);
      } catch {
        return res.status(500).json({ message: "Internal error" });
      }
    },
  },
  {
    method: "put",
    path: "/products/:id",
    handler: async (req, res) => {
      try {
        const result = productSchema.safeParse(req.body);
        if (!result.success) {
          return res
            .status(404)
            .json({ message: "Bad user input", issues: result.error.issues });
        }
        const { id } = req.params;

        const product = await Product.findById(id).populate(["category"]);
        if (!product) {
          return res.status(404).json({ message: "Not found" });
        }
        const category = await Category.findById(result.data.category);

        console.log(category);
        if (!category) {
          return res.status(404).json({ message: "Category not found" });
        }

        // const addProduct = await Product.updateOne(result.data);

        res.status(200).json(addProduct);
      } catch {
        return res.status(500).json({ message: "Internal error" });
      }
    },
  },
];

export default productRoutes;
