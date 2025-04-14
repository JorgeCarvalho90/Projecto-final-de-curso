import { Category } from "../../models/index.js";

const categoriesRoutes = [
  {
    method: "get",
    path: "/categories",
    handler: async (req, res) => {
      const categories = await Category.find();
      res.status(200).json(categories);
    },
  },
];

export default categoriesRoutes;
