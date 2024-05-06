"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const locationValidation = (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    if (!ip) {
        return res.status(400).send("Unable to determine your location");
    }
    const geo = geoip_lite_1.default.lookup(ip);
    const expectedRegion = "IN";
    if (!geo || geo.country !== expectedRegion) {
        return res
            .status(403)
            .json({ error: `Access from your location is not allowed.` });
    }
    next();
};
exports.default = locationValidation;
