import { z } from "zod";
import { Product } from "../../models/index.js";

const orderSchema = z
  .object({
    email: z.string().email(),
    products: z.array(
      z.object({
        _id: z.string(),
        quantity: z.number(),
      })
    ),
  })
  .strict();

const orderRoutes = [
  {
    method: "post",
    path: "/orders",
    handler: async (req, res) => {
      try {
        const result = orderSchema.safeParse(req.body);
        if (!result.success) {
          return res
            .status(400)
            .json({ message: "Bad user input", issues: result.error.issues });
        }

        const productsIds = result.data.products.map(
          (products) => products._id
        );

        const products = await Product.find({
          _id: { $in: productsIds },
        });

        if (products.length !== productsIds) {
          return res
            .status(40)
            .json({ message: "Some products were not found" });
        }
        res.status(200).json({ order: null });
      } catch {
        return res.status(500).json({ message: "Internal error" });
      }
    },
  },
];

export default orderRoutes;
