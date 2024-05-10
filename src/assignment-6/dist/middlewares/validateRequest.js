"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// interface ValidationSchema {
//   [key: string]: {
//     validate: (data: any) => { error?: string };
//   };
// }
const userSchema = require("../validationRules");
const validateRequest = (req, res, next) => {
    const route = req.originalUrl;
    const { error } = userSchema[route].validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
exports.default = validateRequest;
