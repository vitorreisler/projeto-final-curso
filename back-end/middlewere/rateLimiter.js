const setRateLimit = require("express-rate-limit");

// Rate limit middleware
const rateLimitMiddleware = setRateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: "You have exceeded your 100 requests per minute limit.",
  headers: true,
});

module.exports = rateLimitMiddleware;