import User from "../models/User";
import { checkPassword } from "../services/auth";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth";

class SessionsController {
    async create(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ error: "User / Password not found." });
            const passwordCheched = await checkPassword(user, password);
            if (!passwordCheched) return res.status(404).json({ error: "User / Password not found." });
            const { id } = user;
            return res.json({
                user: {
                    id,
                    email
                },
                token: jwt.sign({ id }, authConfig.secret, { expiresIn: authConfig.experisIn })
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error." });
        }
    }
}

export default new SessionsController();