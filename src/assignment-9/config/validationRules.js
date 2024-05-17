const Joi = require("joi");

const productSchemaJoi = Joi.object({
  name: Joi.string().max(30).required(),
  brand: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().max(30).required(),
});

module.exports = productSchemaJoi;
