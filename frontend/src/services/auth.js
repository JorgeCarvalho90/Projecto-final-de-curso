export const signup = async (email, password) => {
  return fetch("http://localhost:3000/auth/signup", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((resp) => resp.json());
};

export const login = async (email, password) => {
  return fetch("http://localhost:3000/auth/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((resp) => resp.json());
};
