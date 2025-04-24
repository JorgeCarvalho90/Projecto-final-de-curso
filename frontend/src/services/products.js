const backendURL = import.meta.env.VITE_BACKEND_URL;
export const getProducts = async () => {
  return fetch(backendURL + "/products").then((resp) => resp.json());
};

export const getProductsBySlug = async (slug) => {
  return fetch(`${backendURL}/products/${slug}`).then((resp) => resp.json());
};
