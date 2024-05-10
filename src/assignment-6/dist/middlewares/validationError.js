"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationError = (req, res, next) => {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
        return res.json("Id must be a number");
    }
    next();
};
exports.default = validationError;
