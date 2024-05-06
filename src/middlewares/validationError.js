const validationError = (req, res, next) => {
  const { id } = req.params;
  if (!id || isNaN(id)) {
    res.json("Id must be a number");
  }

  next();
};
module.exports = validationError;
