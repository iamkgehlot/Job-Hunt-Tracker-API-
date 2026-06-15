import app from "./app.js";
import { configs } from "./config/config.js";

const PORT = configs.PORT;

const server = app.listen(PORT, () => {
  console.log("server is spinning");
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated");
  });
});
