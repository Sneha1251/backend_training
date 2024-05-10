"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware3 = exports.middleware2 = exports.middleware1 = void 0;
const middleware1 = (req, res, next) => {
    console.log("Middleware 1");
    next();
};
exports.middleware1 = middleware1;
const middleware2 = (req, res, next) => {
    console.log("Middleware 2");
    next();
};
exports.middleware2 = middleware2;
const middleware3 = (req, res, next) => {
    console.log("Middleware 3");
    next();
};
exports.middleware3 = middleware3;
