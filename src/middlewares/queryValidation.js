const Joi = require("joi");

const queryValidation = (req, res, next) => {
  const { id } = req.params;
  const { error } = Joi.number().validate(id);
  if (error) {
    return res
      .status(400)
      .json({ error: `Query parameter '${id}' must be numeric.` });
  }
  next();
};

module.exports = queryValidation;
