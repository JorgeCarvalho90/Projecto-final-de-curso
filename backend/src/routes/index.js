import productRoutes from "./products/index.js";
import categoriesRoutes from "./categories/index.js";

const routes = [...productRoutes, ...categoriesRoutes];

export default function loadRoutes(app) {
  routes.forEach((route) => {
    app[route.method](route.path, route.handler);
  });
}
