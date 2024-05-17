"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const queryValidation = (req, res, next) => {
    const { id } = req.params;
    const { error } = joi_1.default.number().validate(id);
    if (error) {
        return res
            .status(400)
            .json({ error: `Query parameter '${id}' must be numeric.` });
    }
    next();
};
exports.default = queryValidation;
