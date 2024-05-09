const jwt = require("jsonwebtoken");

const jwtAuthentication = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized- Token missing" });
  }

  jwt.verify(token, process.env.JWT_SECURITY_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden- Invalid token" });
    }
    req.user = user;
    next();
  });
};

module.exports = jwtAuthentication;
