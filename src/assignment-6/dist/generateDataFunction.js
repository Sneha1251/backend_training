"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUsers = exports.generatePosts = void 0;
const mockData_1 = __importDefault(require("./mockData"));
const generateUsers = () => mockData_1.default.users;
exports.generateUsers = generateUsers;
const generatePosts = () => mockData_1.default.posts;
exports.generatePosts = generatePosts;
