const customHeader = (customHeaderValue) => (req, res, next) => {
  res.setHeader("X-custom-Header", customHeaderValue);
  next();
};

module.exports = customHeader;
