import { Request, Response } from "express";
import * as ContainerService from "./container.service";
import * as StatService from "../stat/stat.service";
import { HttpResponse } from "../shared/http.response";

export class ContainerController {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  public async saveContainers(req: Request, res: Response) {
    const { containers, budget } = req.body;
    try {
      if (!containers || containers.length === 0) {
        return this.httpResponse.BadRequest(
          res,
          new Error("No hay contenedores")
        );
      }

      if (!budget || typeof budget !== "number") {
        return this.httpResponse.BadRequest(
          res,
          new Error("El presupuesto debe ser un número")
        );
      }

      for (const container of containers) {
        if (!ContainerService.validContainer(container))
          return this.httpResponse.BadRequest(
            res,
            new Error("La estructura de los contenedores no corresponde!")
          );
      }
      await ContainerService.createContainers(containers);
      const [kpi, others] = ContainerService.getKpi(containers, budget);
      await StatService.createStat(kpi,others, budget);
      
      return this.httpResponse.Ok(res, kpi);
    } catch (error: any) {
      return this.httpResponse.Error(res, error);
    }
  }
}
