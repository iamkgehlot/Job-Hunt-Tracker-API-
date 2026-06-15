import cors from "cors";

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["POST", "GET", "DELETE", "PATCH"],
  optionsSuccessStatus: 200,
};
export const corsMiddleware = cors(corsOptions);
