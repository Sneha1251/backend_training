"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customHeader = (customHeaderValue) => (req, res, next) => {
    res.setHeader("X-custom-Header", customHeaderValue);
    next();
};
exports.default = customHeader;
