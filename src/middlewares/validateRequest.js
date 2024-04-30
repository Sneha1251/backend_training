const userSchema = require("../assignment-3/config/validationRules");

const validateRequest = (req, res, next) => {
  const route = req.originalUrl;

  if (!userSchema[route]) {
    return next();
  }
  const { error } = userSchema[route].validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validateRequest;
