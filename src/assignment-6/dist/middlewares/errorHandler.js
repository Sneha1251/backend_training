"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
};
exports.default = errorHandler;
