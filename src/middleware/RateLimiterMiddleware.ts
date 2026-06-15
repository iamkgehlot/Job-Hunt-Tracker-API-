import rateLimit from "express-rate-limit";

export const rateLimiterMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "max attempt reached for this ip, please try after some time",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
