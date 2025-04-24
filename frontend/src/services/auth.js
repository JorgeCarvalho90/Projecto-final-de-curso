const backendURL = import.meta.env.VITE_BACKEND_URL;
export const signup = async (email, password) => {
  return fetch(backendURL + "/auth/signup", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((resp) => resp.json());
};

export const login = async (email, password) => {
  return fetch(backendURL + "/auth/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((resp) => resp.json());
};
