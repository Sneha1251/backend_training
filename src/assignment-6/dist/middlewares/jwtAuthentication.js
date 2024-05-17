"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtAuthentication = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized- Token missing" });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECURITY_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Forbidden- Invalid token" });
        }
        next();
    });
};
exports.default = jwtAuthentication;
