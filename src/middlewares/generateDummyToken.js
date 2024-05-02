const jwt=require('jsonwebtoken');
const generateDummyToken = (req, res, next) => {
  const payload = {
    id: 1,
    email: "sneha123@gmail.com",
    roles: "trainee engineer",
  };

  const token = jwt.sign(payload, process.env.JWT_SECURITY_KEY);
  req.headers.authorization = "Bearer" + " " + token;
  next();
};

module.exports = generateDummyToken;
