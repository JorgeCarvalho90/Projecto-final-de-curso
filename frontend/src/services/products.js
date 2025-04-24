export const getProducts = async () => {
  return fetch("https://tech-store-coyy.onrender.com/products").then((resp) =>
    resp.json()
  );
};

export const getProductsBySlug = async (slug) => {
  return fetch(`https://tech-store-coyy.onrender.com/products/${slug}`).then(
    (resp) => resp.json()
  );
};
