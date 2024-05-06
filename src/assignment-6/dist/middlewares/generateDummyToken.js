"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateDummyToken = (req, res, next) => {
    const payload = {
        id: 1,
        email: "sneha123@gmail.com",
        roles: "trainee engineer",
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECURITY_KEY);
    req.headers.authorization = "Bearer" + " " + token;
    next();
};
exports.default = generateDummyToken;
