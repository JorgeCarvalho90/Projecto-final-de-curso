const backendURL = import.meta.env.VITE_BACKEND_URL;
export const getCategories = async () => {
  return fetch(backendURL + "/categories").then((resp) => resp.json());
};
