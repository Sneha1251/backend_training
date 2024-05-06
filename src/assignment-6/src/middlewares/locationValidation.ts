import geoip from "geoip-lite";
import { Request, Response, NextFunction } from "express";

const locationValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.ip || req.connection.remoteAddress;
  if (!ip) {
    return res.status(400).send("Unable to determine your location");
  }
  const geo = geoip.lookup(ip);

  const expectedRegion = "IN";
  if (!geo || geo.country !== expectedRegion) {
    return res
      .status(403)
      .json({ error: `Access from your location is not allowed.` });
  }
  next();
};

export default locationValidation;
