import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "changeme-secret";
export function signToken(payload, options = {}) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h", ...options });
}
export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}
export function signRefreshToken(payload, options = {}) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d", ...options });
}
//# sourceMappingURL=jwt.js.map