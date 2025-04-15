import productRoutes from "./products/index.js";
import categoryRoutes from "./categories/index.js";
import userRoutes from "./users/index.js";

const routes = [...productRoutes, ...categoryRoutes, ...userRoutes];

export default function loadRoutes(app) {
  routes.forEach((route) => {
    app[route.method](route.path, route.handler);
  });
}
