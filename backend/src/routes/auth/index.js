import { User } from "../../models/index.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/auth.js";
import { authSchema } from "./schemas.js";

const authRoutes = [
  {
    method: "post",
    path: "/auth/signup",
    handler: async (req, res) => {
      try {
        const result = authSchema.safeParse(req.body);
        if (!result.success) {
          return res
            .status(404)
            .json({ message: "Bad user input", issues: result.error.issues });
        }

        const checkEmail = await User.findOne({ email: result.data.email });
        if (checkEmail) {
          return res.status(400).json({ message: "Email already registered" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(result.data.password, salt);

        const addUser = await User.create({
          email: result.data.email,
          password: hashedPassword,
        });

        const token = generateToken(addUser);

        res.status(201).json({ acessToken: token });
      } catch {
        return res.status(500).json({ message: "Internal error" });
      }
    },
  },
  {
    method: "post",
    path: "/auth/login",
    handler: async (req, res) => {
      try {
        const result = authSchema.safeParse(req.body);
        if (!result.success) {
          return res
            .status(404)
            .json({ message: "Bad user input", issues: result.error.issues });
        }

        const user = await User.findOne({
          email: result.data.email,
        });

        if (!user) {
          return res
            .status(400)
            .json({ message: "Email or credentials invalid" });
        }

        const isPasswordValid = bcrypt.compareSync(
          result.data.password,
          user.password
        );

        if (!isPasswordValid) {
          return res
            .status(400)
            .json({ message: "Email or credentials invalid" });
        }
        const token = generateToken(user);

        res.status(200).json({ acessToken: token });
      } catch {
        return res.status(500).json({ message: "Internal error" });
      }
    },
  },
];

export default authRoutes;
