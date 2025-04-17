import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "5h",
    }
  );
  return token;
};
