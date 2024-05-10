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
exports.errorValidation = exports.asyncError = exports.errorCreated = exports.middlewareCheck = exports.authenticatePublic = exports.authenticateProtected = exports.generateApiPost = exports.generateApiUser = exports.queryValidate = exports.locationValidate = exports.userValidation = exports.homePage = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const generateDataFunction_1 = require("../generateDataFunction");
const generateDataFunction_2 = require("../generateDataFunction");
class homePage {
    mainPage(req, res) {
        res.json({ message: "Welcome to Home Page" });
    }
}
exports.homePage = homePage;
class userValidation {
    validateUser(req, res) {
        res.json({ message: "user validated!" });
    }
}
exports.userValidation = userValidation;
class locationValidate {
    validateLoco(req, res) {
        res.json({ message: "user can access" });
    }
}
exports.locationValidate = locationValidate;
class queryValidate {
    validateQuery(req, res) {
        res.json({ message: `user ${req.params.id}` });
    }
}
exports.queryValidate = queryValidate;
class generateApiUser {
    generateUserApi(req, res) {
        const users = (0, generateDataFunction_1.generateUsers)();
        res.json(users);
    }
}
exports.generateApiUser = generateApiUser;
class generateApiPost {
    generatePostApi(req, res) {
        const posts = (0, generateDataFunction_2.generatePosts)();
        res.json(posts);
    }
}
exports.generateApiPost = generateApiPost;
class authenticateProtected {
    protectedAuth(req, res) {
        res.json({ message: "Authentication successful" });
    }
}
exports.authenticateProtected = authenticateProtected;
class authenticatePublic {
    publicAuth(req, res) {
        res.json({ message: "This is a public route" });
    }
}
exports.authenticatePublic = authenticatePublic;
class middlewareCheck {
    checkMiddleware(req, res) {
        res.json("Middleware check Done");
    }
}
exports.middlewareCheck = middlewareCheck;
class errorCreated {
    createError(req, res, next) {
        next((0, http_errors_1.default)(500, "Internal server Error"));
    }
}
exports.errorCreated = errorCreated;
class asyncError {
    createAsyncError(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                throw new Error("Async Error");
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.asyncError = asyncError;
class errorValidation {
    errorValidate(req, res) {
        res.status(200).json({ message: "User details retreived successfully" });
    }
}
exports.errorValidation = errorValidation;
