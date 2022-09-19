import { Request, Response } from "express";
import { HttpResponse } from "../shared/http.response";
import * as StatService from "../stat/stat.service";

export class StatController {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  public async getStats(_req: Request, res: Response) {
    try {
      const finalStat = await StatService.getFinalStats();
      return this.httpResponse.Ok(res, finalStat);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }
}
