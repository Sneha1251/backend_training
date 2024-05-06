const geoip = require("geoip-lite");

const locationValidation = (req, res, next) => {
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

module.exports = locationValidation;
