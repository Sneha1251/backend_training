const rateLimiter = (limit) => (req, res, next) => {
  const requests = new Map();
  const ip = req.ip;
  const current = requests.get(ip) || 0;

  if (current >= limit) {
    res.status(429).json({ error: "Too many Requests" });
    return;
  }

  requests.set(ip, current + 1);
  next();

  setTimeout(() => {
    requests.delete(ip);
  }, 5000);
  console.log(requests);
};

module.exports = rateLimiter;
