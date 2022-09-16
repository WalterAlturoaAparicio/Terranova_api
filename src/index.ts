import express from "express";
import emoji from "node-emoji";
import dotenv from "dotenv";
import morgan from "morgan";

import containerController from "./controllers/container.controller";
import statsController from "./controllers/stats.controller";

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/containers", containerController);
app.get("/stats", statsController);

app.get("*", (_req, res) => {
  res.status(404).send("Ruta no definida");
});

app.listen(PORT, () => {
  console.log(emoji.get("computer"), "Servidor Puerto: " + PORT);
});
