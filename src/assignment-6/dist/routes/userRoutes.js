"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const queryValidation_1 = __importDefault(require("../middlewares/queryValidation"));
const locationValidation_1 = __importDefault(require("../middlewares/locationValidation"));
const generateDataFunction_1 = require("../generateDataFunction");
const generateDataFunction_2 = require("../generateDataFunction");
const jwtAuthentication_1 = __importDefault(require("../middlewares/jwtAuthentication"));
const generateDummyToken_1 = __importDefault(require("../middlewares/generateDummyToken"));
const logger_1 = __importDefault(require("../middlewares/logger"));
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
const customHeader_1 = __importDefault(require("../middlewares/customHeader"));
const rateLimiter_1 = __importDefault(require("../middlewares/rateLimiter"));
const validationError_1 = __importDefault(require("../middlewares/validationError"));
const middlewareChain_1 = require("../middlewares/middlewareChain");
const app = (0, express_1.default)();
app.use(logger_1.default);
app.use((0, customHeader_1.default)("MyCustomValue"));
app.use((0, rateLimiter_1.default)(1));
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Home Page" });
});
app.post("/validate", validateRequest_1.default, (req, res) => {
    res.json({ message: "user validated!" });
});
app.get("/location", locationValidation_1.default, (req, res) => {
    res.json({ message: "user can access" });
});
app.post("/query/:id", queryValidation_1.default, (req, res) => {
    res.json({ message: `user ${req.params.id}` });
});
app.get("/api/users", (req, res) => {
    const users = (0, generateDataFunction_1.generateUsers)();
    res.json(users);
});
app.post("/api/posts", (req, res) => {
    const posts = (0, generateDataFunction_2.generatePosts)();
    res.json(posts);
});
app.get("/authenticate/protected", generateDummyToken_1.default, jwtAuthentication_1.default, (req, res) => {
    res.json({ message: "Authentication successful" });
});
app.get("/authenticate/public", (req, res) => {
    res.json({ message: "This is a public route" });
});
app.get("/middleware", middlewareChain_1.middleware1, middlewareChain_1.middleware2, middlewareChain_1.middleware3, (req, res) => {
    res.json("Middleware check Done");
});
app.get("/error-500", (req, res, next) => {
    next((0, http_errors_1.default)(500, "Internal server Error"));
});
app.get("/async-error", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        throw new Error("Async Error");
    }
    catch (err) {
        next(err);
    }
}));
app.get("/validation/error/:id", validationError_1.default, (req, res) => {
    res.status(200).json({ message: "User details retreived successfully" });
});
app.use(errorHandler_1.default);
app.listen(5000, () => {
    console.log("server is running on port 5000");
});
