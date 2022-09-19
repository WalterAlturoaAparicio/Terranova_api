import express, { Application } from "express";
import emoji from "node-emoji";
import dotenv from "dotenv";
import morgan from "morgan";

import { HttpResponse } from "./shared/http.response";
import { ContainerController } from "./container/container.controller";
import { db } from "./config/config";
import { StatController } from "./stat/stat.controller";

dotenv.config();

class Server {
  private app: Application;
  private port: String;
  private apiPaths = {
    container: "/containers",
    stats: "/stats",
  };

  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse(),
    private readonly containerController: ContainerController = new ContainerController(),
    private readonly statController: StatController = new StatController()
  ) {
    this.app = express();
    this.port = process.env.PORT || "8080";

    this.middlewares();
    this.routes();
    this.dbConnect();
    this.listen();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(morgan("dev"));
  }
  routes() {
    this.app.post(this.apiPaths.container, (req, res) =>
      this.containerController.saveContainers(req, res)
    );

    this.app.get(this.apiPaths.stats, (req, res) =>
      this.statController.getStats(req, res)
    );

    this.app.use("*", (_req, res) => {
      return this.httpResponse.NotFound(res, "Not Found");
    });
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(emoji.get("computer"), "Servidor Puerto: " + this.port);
    });
  }
  async dbConnect() {
    try {
      await db.authenticate();
      console.log(`${emoji.get("egg")} Base de datos conectada! (api)`);
    } catch (error) {
      throw new Error("!!!" + error);
    }
  }
}

new Server();
