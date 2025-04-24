import { z } from "zod";
import { Product } from "../../models/index.js";
import { Stripe } from "stripe";

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

        if (products.length !== productsIds.length) {
          return res
            .status(40)
            .json({ message: "Some products were not found" });
        }
        const orderId = "";
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const lineItems = result.data.products.map((product) => {
          const backendProduct = product.find(
            (item) => item._id === product._id
          );
          return {};
        });
        const FRONTEND_URL = process.env.FRONTEND_URL;
        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          line_items: [
            {
              price_data: {
                currency: "eur",
                product_data: {
                  name: "Custom Product",
                },
                unit_amount: 1000,
              },
              quantity: 2,
            },
          ],
          success_url: `${FRONTEND_URL}/sucess?orderID=${orderId}`,
          cancel_url: `${FRONTEND_URL}/cancel`,
        });
        return res
          .status(200)
          .json({ payment_url: sessionStorage.session.url });
      } catch {
        return res.status(500).json({ message: "Internal error" });
      }
    },
  },
];

export default orderRoutes;
