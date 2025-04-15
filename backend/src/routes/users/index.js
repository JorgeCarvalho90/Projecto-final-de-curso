import { User } from "../../models/index.js";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .strict();

const userRoutes = [
  {
    method: "post",
    path: "/signup",
    handler: async (req, res) => {
      try {
        const result = userSchema.safeParse(req.body);
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

        const token = jwt.sign(
          { email: addUser.email },
          process.env.JWT_SECRET,
          { expiresIn: "5h" }
        );

        res.status(201).json(addUser);
      } catch {
        return res.status(500).json({ message: "Internal error" });
      }
    },
  },
];

export default userRoutes;
