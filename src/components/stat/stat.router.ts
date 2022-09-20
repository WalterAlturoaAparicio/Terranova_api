import { BaseRouter } from "../../shared/base.router";
import { StatController } from "./stat.controller";

export class StatRouter extends BaseRouter<StatController> {
  constructor() {
    super(StatController);
  }
  routes() {
    
    /**
     * @swagger
     * /stats:
     *  get:
     *    summary: Retorna un stat de las peticiones hechas a /containers
     *    tags: [Stats]
     *    responses:
     *      200:
     *        description: Stat sumando los stats guardados en la base de datos
     *        content:
     *          application/json:
     *             schema:
     *              type: object
     *              properties:
     *               status:
     *                $ref: '#/components/schemas/status'
     *               msg:
     *                $ref: '#/components/schemas/msg'
     *               data:
     *                $ref: '#/components/schemas/FinalStat'
     */
    this.router.get("/stats", (req, res) => this.controller.getStats(req, res));
  }
}
