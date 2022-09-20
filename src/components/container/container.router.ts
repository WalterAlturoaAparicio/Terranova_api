import { BaseRouter } from "../../shared/base.router";
import { ContainerController } from "./container.controller";

export class ContainerRouter extends BaseRouter<ContainerController> {
  constructor() {
    super(ContainerController);
  }
  routes() {
    
    /**
     * @swagger
     * /containers:
     *  post:
     *    summary: Retorna los contenedores con mejor KPI
     *    tags: [Containers]
     *    requestBody: 
     *      required: true
     *      content:
     *          application/json:
     *           schema:
     *              type: object
     *              properties:
     *               containers: 
     *                type: array
     *                items:
     *                  $ref: '#/components/schemas/Container'
     *               budget:
     *                type: number
     *                description: Presupuesto de los contenedores                          
     *        
     *    responses:
     *      200:
     *        description: Almacena todos los contenedores y retorna los mejores KPI dentro del presupuesto
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
     *                  type: array
     *                  items:
     *                      $ref: '#/components/schemas/Container'
     *      400:
     *       content:
     *        application/json:
     *         schema:
     *          type: object
     *          properties:
     *           status:
     *            $ref: '#/components/schemas/status'
     *           msg:
     *            $ref: '#/components/schemas/msg'
     *           error:
     *            $ref: '#/components/schemas/Error'  
     *         example:
     *          status: 400
     *          msg: '* @ApiError'
     *          error: 'La estructura de los contenedores no corresponde!'
     *      500:
     *       content:
     *        application/json:
     *         schema:
     *          type: object
     *          properties:
     *           status:
     *            $ref: '#/components/schemas/status'
     *           msg:
     *            $ref: '#/components/schemas/msg'
     *           error:
     *            $ref: '#/components/schemas/Error'  
     *         example:
     *          status: 500
     *          msg: '* @ApiError'
     *          error: 'Error en el servidor'
     */
    this.router.post("/containers", (req, res) =>
      this.controller.saveContainers(req, res)
    );
  }
}
