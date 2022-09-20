import express, { Application } from "express";
import emoji from "node-emoji";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express";

import { HttpResponse } from "./shared/http.response";
import { db } from "./config/config";
import { specs } from "./shared/swagger";
import { ContainerRouter } from "./components/container/container.router";
import { StatRouter } from "./components/stat/stat.router";

dotenv.config();


export class ServerApi {
  public app: Application;
  private port = process.env.PORT || "8080";

  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {
    this.app = express();
    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());

    this.app.use(morgan("dev"));
  }

  routes() {
    this.app.use("/", this.routers());
    this.app.use("/api", swaggerUI.serve, swaggerUI.setup(specs));

    this.app.use("*", (_req, res) => {
      return this.httpResponse.NotFound(res, "Not Found");
    });
  }

  routers(): Array<express.Router> {
    return [new ContainerRouter().router, new StatRouter().router];
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(emoji.get("computer"), "Servidor Puerto: " + this.port);
    });
  }
  async dbConnect() {
    try {
      await db.authenticate();
      console.log(`${emoji.get("avocado")} Base de datos conectada!`);
    } catch (error) {
      throw new Error("!!!" + error);
    }
  }
}

new ServerApi().listen();
