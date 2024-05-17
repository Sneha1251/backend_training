"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validationRules_1 = __importDefault(require("../validationRules"));
const validateRequest = (req, res, next) => {
    const { error } = validationRules_1.default.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
exports.default = validateRequest;
