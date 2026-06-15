import express from "express";
import { masterRouter } from "./routes/index.js";
import { ErrorHandler } from "./middleware/ErrorHandler.js";
import helmet from "helmet";
import { corsMiddleware } from "./middleware/CorsMiddleware.js";
import { rateLimiterMiddleware } from "./middleware/RateLimiterMiddleware.js";
import Morgan from "morgan";

const app = express();
app.use(helmet());
app.use(Morgan("combined"));
app.use(express.json());
app.use(corsMiddleware);
app.use(rateLimiterMiddleware);
app.use("/api/v1/", masterRouter);
app.use(ErrorHandler);

export default app;
