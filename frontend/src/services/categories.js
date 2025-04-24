export const getCategories = async () => {
  return fetch("https://tech-store-coyy.onrender.com/categories").then((resp) =>
    resp.json()
  );
};
