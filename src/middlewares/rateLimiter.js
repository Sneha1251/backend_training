const rateLimiter = (limit) => {
    const requests = new Map();
    return (req, res, next) => {
        const ip = req.ip; // Get the IP address of the incoming request
        const current = requests.get(ip) || 0; // Get the current request count for the IP address
        if (current >= limit) {
            res.status(429).json({ error: "Too Many Requests" });
            return;
        }
        requests.set(ip, current + 1); // Increment the request count for the IP address
        next(); // Call next middleware or route handler

        // Reset request count after a certain time interval (5 seconds)
        setTimeout(() => {
            requests.delete(ip); // Delete the request count for the IP address
        }, 5000);

        console.log(requests); // Log the current request counts (for debugging)
    };
};

module.exports = rateLimiter;
