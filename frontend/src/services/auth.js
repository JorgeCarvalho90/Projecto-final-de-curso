export const signup = async (email, password) => {
  return fetch(`https://tech-store-coyy.onrender.com/auth/signup`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((resp) => resp.json());
};

export const login = async (email, password) => {
  return fetch("https://tech-store-coyy.onrender.com/auth/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((resp) => resp.json());
};
