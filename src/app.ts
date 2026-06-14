import express from "express";
import { masterRouter } from "./routes/index.js";

const app = express();
app.use(express.json());
app.use("/api/v1/", masterRouter);
app.listen(3000, () => {
  console.log("server is spinning");
});
